const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const regulex = require('regulex')
const concerto = require('concerto-compiler')
const regexpu = require('regexpu')

contextBridge.exposeInMainWorld('electronAPI', {
    // File operations
    readFile: (filePath) => ipcRenderer.invoke('file:read', filePath),
    writeFile: (filePath, data) => ipcRenderer.invoke('file:write', filePath, data),

    // Dialogs
    showOpenDialog: (options) => ipcRenderer.invoke('dialog:open', options),
    showSaveDialog: (options) => ipcRenderer.invoke('dialog:save', options),
    showMessageBox: (options) => ipcRenderer.invoke('dialog:message', options),

    // Shell
    openExternal: (url) => ipcRenderer.invoke('shell:open-external', url),

    // Clipboard
    writeClipboardText: (text) => ipcRenderer.invoke('clipboard:write-text', text),

    // App info
    getAppName: () => ipcRenderer.invoke('app:get-name'),
    getPlatform: () => process.platform,

    // Path utilities (exposed since require('path') is unavailable in renderer)
    path: {
        basename: (p) => path.basename(p),
        join: (...args) => path.join(...args),
    },

    // Node modules needed by the renderer
    regulex: {
        parse: (input) => regulex.parse(input),
    },
    concerto: {
        compile: (ast) => concerto.compile(ast),
    },
    regexpu: {
        transpileCode: (code) => regexpu.transpileCode(code),
    },

    // Window controls
    minimizeWindow: () => ipcRenderer.send('window:minimize'),
    maximizeWindow: () => ipcRenderer.send('window:maximize'),
    closeWindow: () => ipcRenderer.send('window:close'),
    toggleFullScreen: () => ipcRenderer.send('window:toggle-fullscreen'),
    setDocumentEdited: (edited) => ipcRenderer.send('window:set-edited', edited),
    setRepresentedFilename: (name) => ipcRenderer.send('window:set-represented-filename', name),
    setMovable: (movable) => ipcRenderer.send('window:set-movable', movable),
    setResizable: (resizable) => ipcRenderer.send('window:set-resizable', resizable),
    openDevTools: () => ipcRenderer.send('window:open-devtools'),
    isMaximized: () => ipcRenderer.invoke('window:is-maximized'),
    isFullScreen: () => ipcRenderer.invoke('window:is-fullscreen'),

    // Window events from main process
    onThemeChange: (callback) => {
        ipcRenderer.on('change-theme-to', (_, mode) => callback(mode))
    },
    onHelpWindowOpenRef: (callback) => {
        ipcRenderer.on('help-window-open-ref', (_, ref) => callback(ref))
    },
    onMenuAction: (callback) => {
        ipcRenderer.on('menu-action', (_, action) => callback(action))
    },
})
