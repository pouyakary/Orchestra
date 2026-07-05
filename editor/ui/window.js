// ─── Handle window args ──────────────────────────────────────────────────────

function handleWindowArgs() {
    const options = JSON.parse(decodeURI(window.location.search.substring(1)))
    setWindowColorMode(options.theme)

    if (options.file)
        openFileWithPath(options.file)
    else if (options.regexp)
        importRegExp(options.regexp)
}

// ─── Change color mode ───────────────────────────────────────────────────────

function changeColorMode() {
    if (WindowTheme === 'dark')
        setWindowColorMode('light')
    else
        setWindowColorMode('dark')
}

function setWindowColorMode(mode, sendMessage = true) {
    if (mode === 'light') {
        WindowTheme = 'light'
        setViewColorModeMenuActivation(false)
        document.body.className = ''
    } else {
        WindowTheme = 'dark'
        setViewColorModeMenuActivation(true)
        document.body.className = 'dark'
    }

    changePlaygroundThemeTo(mode)
}

// ─── Window close/quit ───────────────────────────────────────────────────────

async function fireWindowCloseRequest() {
    if (await onBeforeWindowClose('Close'))
        window.electronAPI.closeWindow()
}

function fireAppQuitRequest() {
    onBeforeWindowClose('Quit').then((canClose) => {
        if (canClose) window.electronAPI.closeWindow()
    })
}

async function onBeforeWindowClose(closeButtonText) {
    if (getFileDirtStatus()) {
        const { response } = await window.electronAPI.showMessageBox({
            buttons: ["Let's Save", "Don't Close", `Nah! Just ${closeButtonText}`],
            title: 'Orchestra',
            message: 'You have changes that are not saved. Should we do something or pretend this conversation never happened?',
            detail: "A Jedi always takes care of it's files. Be in the good side and may the Force be with you.",
        })

        if (response === 0) {
            await onSaveFile()
            return true
        }
        if (response === 1) return false
    }
    return true
}

// ─── Window minimize/maximize/fullscreen ─────────────────────────────────────

function fireWindowMinimizeRequest() {
    window.electronAPI.minimizeWindow()
}

function fireWindowMaximizeRequest() {
    if (window.electronAPI.getPlatform() === 'darwin')
        fireWindowFullScreenRequest()
    else
        fireWindowJustMaximizeMinimizeRequest()
}

function fireWindowFullScreenRequest() {
    window.electronAPI.toggleFullScreen()
}

function fireWindowJustMaximizeMinimizeRequest() {
    window.electronAPI.maximizeWindow()
}

// ─── Lock screen position ────────────────────────────────────────────────────

function onLockScreenPosition() {
    const lock = !getMenuForScreenLock().checked
    window.electronAPI.setMovable(lock)
    window.electronAPI.setResizable(lock)
}

// ─── Window buttons (no-op, native traffic lights used) ──────────────────────

function makeWindowButtonsBlur() {}
function makeWindowButtonsActive() {}

// ─── Resize ──────────────────────────────────────────────────────────────────

window.onresize = () => {
    if (playgroundEditor !== undefined)
        playgroundEditor.layout()
}

// ─── IPC sends ───────────────────────────────────────────────────────────────

function openNewWindow() {
    // Handled via menu action in main process
}

function onOpenHelpPage() {
    // Handled via menu action in main process
}

function openHelpWindowForReference(refID) {
    // Handled via menu action in main process
}

function openAboutPage() {
    // Handled via menu action in main process
}

// ─── Disable zoom ────────────────────────────────────────────────────────────

function disableZoomOnINIT() {
    // Zoom is handled by the menu
}

// ─── Theme change listener ───────────────────────────────────────────────────

window.electronAPI.onThemeChange((mode) => {
    setWindowColorMode(mode, false)
})

// ─── Menu action listener ────────────────────────────────────────────────────

window.electronAPI.onMenuAction((action) => {
    switch (action) {
        case 'new-file': onNewFile(); break
        case 'open-file': onOpenFile(); break
        case 'save-file': onSaveFile(); break
        case 'save-file-as': onSaveFileAs(); break
        case 'export-svg': onExportWorkspaceToSVG(); break
        case 'copy-regexp': onCopyRegExp(); break
        case 'toggle-theme': changeColorMode(); break
        case 'switch-editor': onChangeWindowToEditor(); break
        case 'switch-playground': onChangeWindowToPlayground(); break
        case 'maximize': fireWindowJustMaximizeMinimizeRequest(); break
        case 'toggle-lock': onLockScreenPosition(); break
    }
})

// ─── Drag/drop prevention ────────────────────────────────────────────────────

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())
