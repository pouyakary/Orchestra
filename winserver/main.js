const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  shell,
  Menu,
  clipboard,
} = require("electron");
const fs = require("fs");
const path = require("path");

const orchestraVersion = "1.0";
const quartetVersion = "1.2";
const settingsFilePath = path.join(
  app.getPath("userData"),
  "orchestraSettings.json",
);

let windows = new Set();
let windowCount = 0;
let isHelpWindowOpen = false;
let isAboutWindowOpen = false;
let isWinServerLoaded = false;
let helpWindow = null;
let firstLoadFilePath = null;
let settings = { windowThemeStatus: "light" };

// ─── Settings ────────────────────────────────────────────────────────────────

function loadSettings() {
  try {
    Object.assign(
      settings,
      JSON.parse(fs.readFileSync(settingsFilePath, "utf8")),
    );
  } catch {
    // No settings file yet
  }
}

function saveSettings() {
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings));
}

function updateSettings(newSettings) {
  Object.assign(settings, newSettings);
  saveSettings();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function broadcast(messageId, data) {
  for (const win of windows) {
    if (!win.isDestroyed()) {
      win.webContents.send(messageId, data);
    }
  }
}

// ─── Preload paths ───────────────────────────────────────────────────────────

function getPreloadPath() {
  return path.join(__dirname, "preload.js");
}

// ─── Window creation ─────────────────────────────────────────────────────────

function createWindow(args = { mode: "start" }) {
  windowCount++;

  const windowWidth = 1100;
  const windowHeight = 640;

  const isMac = process.platform === "darwin";

  const editorWindow = new BrowserWindow({
    show: false,
    width: windowWidth,
    minWidth: windowWidth - 150,
    height: windowHeight,
    minHeight: windowHeight - 100,
    frame: !isMac,
    titleBarStyle: isMac ? "hiddenInset" : undefined,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: getPreloadPath(),
    },
  });

  editorWindow.maximize();
  editorWindow.setMenuBarVisibility(false);

  const windowOptions = {
    theme: settings.windowThemeStatus,
  };

  if (args.mode === "file") windowOptions.file = args.file;
  if (args.mode === "parse") windowOptions.regexp = args.regexp;

  windows.add(editorWindow);

  const indexPath = path.join(__dirname, "..", "view", "index.html");
  const query = encodeURI(JSON.stringify(windowOptions));
  editorWindow.loadURL(`file://${indexPath}?${query}`);

  editorWindow.once("ready-to-show", () => {
    editorWindow.show();
    editorWindow.focus();
  });

  editorWindow.on("closed", () => {
    windows.delete(editorWindow);
    windowCount--;
  });

  return editorWindow;
}

// ─── Help window ─────────────────────────────────────────────────────────────

function openHelpWindow(arg = "") {
  if (isHelpWindowOpen) return;
  isHelpWindowOpen = true;

  helpWindow = new BrowserWindow({
    title: "Orchestra Blocks Reference",
    width: 1050,
    minWidth: 1050,
    height: 600,
    minHeight: 200,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: getPreloadPath(),
    },
  });

  windows.add(helpWindow);

  const helpPath = path.join(__dirname, "..", "windows", "help", "index.html");
  const query = arg === "" ? "none" : `ref-${arg}`;
  helpWindow.loadURL(`file://${helpPath}?${query}`);

  helpWindow.on("closed", () => {
    isHelpWindowOpen = false;
    windows.delete(helpWindow);
    helpWindow = null;
  });
}

// ─── About window ────────────────────────────────────────────────────────────

function openAboutWindow(parent) {
  if (isAboutWindowOpen) return;
  isAboutWindowOpen = true;

  const aboutWindowHeight = 440;
  const aboutWindowWidth = 650;

  const aboutWindow = new BrowserWindow({
    title: "Orchestra Hall",
    titleBarStyle: "inset",
    width: aboutWindowWidth,
    minWidth: aboutWindowWidth,
    maxWidth: aboutWindowWidth,
    height: aboutWindowHeight,
    minHeight: aboutWindowHeight,
    maxHeight: aboutWindowHeight,
    minimizable: false,
    maximizable: false,
    resizable: false,
    fullscreen: false,
    parent: parent,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: getPreloadPath(),
    },
  });

  const aboutPath = path.join(
    __dirname,
    "..",
    "windows",
    "about",
    "index.html",
  );
  const query = encodeURI(
    JSON.stringify({
      theme: settings.windowThemeStatus,
      orchestraVersion,
      quartetVersion,
    }),
  );
  aboutWindow.loadURL(`file://${aboutPath}?${query}`);

  aboutWindow.once("ready-to-show", () => {
    aboutWindow.show();
  });

  windows.add(aboutWindow);

  aboutWindow.on("closed", () => {
    isAboutWindowOpen = false;
    windows.delete(aboutWindow);
  });
}

// ─── App menu ────────────────────────────────────────────────────────────────

function buildAppMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "New File",
          accelerator: "CmdOrCtrl+N",
          click: () => broadcast("menu-action", "new-file"),
        },
        {
          label: "New Window",
          accelerator: "Shift+CmdOrCtrl+N",
          click: () => createWindow(),
        },
        { type: "separator" },
        {
          label: "Open...",
          accelerator: "CmdOrCtrl+O",
          click: () => broadcast("menu-action", "open-file"),
        },
        { type: "separator" },
        {
          label: "Save",
          accelerator: "CmdOrCtrl+S",
          click: () => broadcast("menu-action", "save-file"),
        },
        {
          label: "Save As",
          accelerator: "Shift+CmdOrCtrl+S",
          click: () => broadcast("menu-action", "save-file-as"),
        },
        { type: "separator" },
        {
          label: "Export to SVG",
          accelerator: "CmdOrCtrl+E",
          click: () => broadcast("menu-action", "export-svg"),
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
        {
          label: "Copy Compiled RegExp",
          accelerator: "Shift+CmdOrCtrl+C",
          click: () => broadcast("menu-action", "copy-regexp"),
        },
        { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Night Mode",
          accelerator: "Shift+CmdOrCtrl+N",
          type: "checkbox",
          click: () => broadcast("menu-action", "toggle-theme"),
        },
        { type: "separator" },
        {
          label: "Editor",
          accelerator: "CmdOrCtrl+E",
          type: "radio",
          click: () => broadcast("menu-action", "switch-editor"),
        },
        {
          label: "Playground",
          accelerator: "CmdOrCtrl+P",
          type: "radio",
          click: () => broadcast("menu-action", "switch-playground"),
        },
      ],
    },
    {
      label: "Window",
      role: "window",
      submenu: [
        { role: "minimize" },
        {
          label: "Maximize",
          accelerator: "Shift+CmdOrCtrl+M",
          click: () => broadcast("menu-action", "maximize"),
        },
        { role: "togglefullscreen" },
        {
          label: "Lock Position and Size",
          accelerator: "Shift+CmdOrCtrl+L",
          type: "checkbox",
          click: () => broadcast("menu-action", "toggle-lock"),
        },
        { role: "close" },
        { type: "separator" },
        {
          label: "Open Developer Tools",
          accelerator: "Shift+CmdOrCtrl+D",
          click: (_, win) => {
            if (win) win.webContents.openDevTools({ mode: "detach" });
          },
        },
      ],
    },
    {
      label: "Help",
      role: "help",
      submenu: [
        {
          label: "Orchestra Blocks Reference (Offline)",
          click: () => openHelpWindow(),
        },
        { type: "separator" },
        {
          label: "RegExp on ECMA-262 Edition 6.0",
          click: () =>
            shell.openExternal(
              "http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-regular-expression-objects",
            ),
        },
        {
          label: "RegExp on MDN Web Docs",
          click: () =>
            shell.openExternal(
              "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
            ),
        },
        { type: "separator" },
        {
          label: "Pouya Kary's Website",
          click: () => shell.openExternal("https://pouyakary.org/"),
        },
        {
          label: "Report an issue...",
          click: () =>
            shell.openExternal("https://github.com/pmkary/orchestra/issues"),
        },
        {
          label: "Orchestra on GitHub",
          click: () =>
            shell.openExternal("https://github.com/pmkary/orchestra"),
        },
      ],
    },
  ];

  // macOS app menu
  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { label: "About Orchestra", click: (_, win) => openAboutWindow(win) },
        { type: "separator" },
        { label: "Services", role: "services", submenu: [] },
        { type: "separator" },
        {
          label: `Hide ${app.getName()}`,
          accelerator: "Command+H",
          role: "hide",
        },
        {
          label: "Hide Others",
          accelerator: "Command+Alt+H",
          role: "hideOthers",
        },
        { label: "Show All", role: "unhide" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: () => app.quit() },
      ],
    });
  } else {
    // Windows/Linux: add About to Help menu
    template[template.length - 1].submenu.push(
      { type: "separator" },
      { label: "About Orchestra", click: (_, win) => openAboutWindow(win) },
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ─── IPC handlers ────────────────────────────────────────────────────────────

function setupIPC() {
  // File operations
  ipcMain.handle("file:read", async (_, filePath) => {
    return fs.promises.readFile(filePath, "utf8");
  });

  ipcMain.handle("file:write", async (_, filePath, data) => {
    await fs.promises.writeFile(filePath, data, "utf8");
  });

  // Dialogs
  ipcMain.handle("dialog:open", async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(win, options);
    return result;
  });

  ipcMain.handle("dialog:save", async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showSaveDialog(win, options);
    return result;
  });

  ipcMain.handle("dialog:message", async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showMessageBox(win, options);
    return result;
  });

  // Shell
  ipcMain.handle("shell:open-external", async (_, url) => {
    await shell.openExternal(url);
  });

  // Clipboard
  ipcMain.handle("clipboard:write-text", async (_, text) => {
    clipboard.writeText(text);
  });

  // App info
  ipcMain.handle("app:get-name", () => app.getName());

  // Window controls
  ipcMain.on("window:minimize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.minimize();
  });

  ipcMain.on("window:maximize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
    }
  });

  ipcMain.on("window:close", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.close();
  });

  ipcMain.on("window:toggle-fullscreen", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setFullScreen(!win.isFullScreen());
  });

  ipcMain.on("window:set-edited", (event, edited) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setDocumentEdited(edited);
  });

  ipcMain.on("window:set-represented-filename", (event, filename) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setRepresentedFilename(filename);
  });

  ipcMain.on("window:set-movable", (event, movable) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setMovable(movable);
  });

  ipcMain.on("window:set-resizable", (event, resizable) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setResizable(resizable);
  });

  ipcMain.on("window:open-devtools", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.webContents.openDevTools({ mode: "detach" });
  });

  // Window state queries
  ipcMain.handle("window:is-maximized", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return win ? win.isMaximized() : false;
  });

  ipcMain.handle("window:is-fullscreen", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return win ? win.isFullScreen() : false;
  });

  // Theme
  ipcMain.on("theme-change", (_, mode) => {
    updateSettings({ windowThemeStatus: mode });
    broadcast("change-theme-to", mode);
  });

  // Help window
  ipcMain.on("open-help-page", () => openHelpWindow());

  ipcMain.on("open-help-for-ref", (_, arg) => {
    if (isHelpWindowOpen && helpWindow) {
      helpWindow.focus();
      helpWindow.webContents.send("help-window-open-ref", `ref-${arg}`);
    } else {
      openHelpWindow(arg);
    }
  });

  ipcMain.on("open-new-window", () => createWindow());

  ipcMain.on("open-about-page", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    openAboutWindow(win);
  });

  ipcMain.on("app-quit", () => app.quit());

  // Window focus/blur state for renderer
  ipcMain.on("window:request-state", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      event.sender.send("window-state", {
        isMaximized: win.isMaximized(),
        isFullScreen: win.isFullScreen(),
      });
    }
  });
}

// ─── Parse args ──────────────────────────────────────────────────────────────

function parseArgs(args) {
  if (args.length === 2 && args[1].endsWith(".orchestra")) {
    return { mode: "file", file: args[1] };
  }
  if (args.length === 3 && args[1] === "parse") {
    return { mode: "parse", regexp: args[2] };
  }
  return { mode: "start" };
}

// ─── App lifecycle ───────────────────────────────────────────────────────────

app.requestSingleInstanceLock();

app.on("open-file", (event, filePath) => {
  event.preventDefault();
  if (isWinServerLoaded) {
    createWindow({ mode: "file", file: filePath });
  } else {
    firstLoadFilePath = filePath;
  }
});

app.on("ready", () => {
  if (isWinServerLoaded) return;

  console.log(`Orchestra, Version ${orchestraVersion}`);
  console.log("Copyright 2016-present - Pouya Kary. All Rights Reserved.");
  isWinServerLoaded = true;

  loadSettings();
  setupIPC();
  buildAppMenu();

  const args = firstLoadFilePath
    ? { mode: "file", file: firstLoadFilePath }
    : parseArgs(process.argv);

  firstLoadFilePath = null;
  createWindow(args);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (windowCount === 0) createWindow();
});
