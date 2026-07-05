// ─── Init developer tools infrastructure ─────────────────────────────────────

function initDeveloperToolsInfrastructure() {
    overrideDevToolsClearAPI()
    overrideDevToolsLogAPI()
    printDeveloperToolsWelcomeMessage()
}

// ─── Open dev tools ──────────────────────────────────────────────────────────

function openDeveloperToolsWindow() {
    window.electronAPI.openDevTools()
}

// ─── Console welcome message ─────────────────────────────────────────────────

function printDeveloperToolsWelcomeMessage() {
    const firstStyle = 'font-weight: bold;font-size: 14px;font-family: Helvetica, Arial;'
    const secondStyle = 'font-size: 14px;font-family: Helvetica, Arial;'
    originalDevToolsLogFunction(
        '\n%cOrchestra Hall %c\u2022 Copyright 2016-present by Pouya Kary. All rights reserved.\n\n',
        firstStyle, secondStyle
    )
}

// ─── Override developer tools API ────────────────────────────────────────────

function overrideDevToolsClearAPI() {
    const orchestraClearFunction = () => {
        originalDevToolsClearFunction()
        printDeveloperToolsWelcomeMessage()
    }
    console.clear = orchestraClearFunction
    clear = orchestraClearFunction
}

// ─── Override log command ────────────────────────────────────────────────────

function overrideDevToolsLogAPI() {
    const newConsoleLogFunction = (...args) => {
        const timeOfLog = new Date()
        const message = `%c${timeOfLog.getHours()}:${timeOfLog.getMinutes()}:${timeOfLog.getSeconds()}:${timeOfLog.getMilliseconds()}%c`
        const messageColorCSS = 'color: #AAAAAA;'
        const messageResetCSS = 'color: default;'
        originalDevToolsLogFunction(message, messageColorCSS, messageResetCSS, ...args)
    }
    console.log = newConsoleLogFunction
    log = newConsoleLogFunction
}
