// ─── File defaults ───────────────────────────────────────────────────────────

const defaultFileXML = '<xml><block type="compose" deletable="false"></block></xml>'
const defaultEmptyPath = 'Undefined'

const defaultFileObject = {
    path: defaultEmptyPath,
    dirty: true,
    emptyNewFile: true,
    compilerECMAScriptTarget: 'es6',
    compilerOutputFormat: 'regexp',
}

const compileOptionsBaseOptions = {
    target: 'es6',
    format: 'regexp',
}

const emptyBaseFileJSON = {
    compilerOptions: Object.assign({}, compileOptionsBaseOptions),
}

// ─── Electron API (via preload) ──────────────────────────────────────────────

// window.electronAPI is exposed by contextBridge in preload.js
// All files should access it directly as window.electronAPI

// ─── Node modules via preload bridge ─────────────────────────────────────────

const regulex = window.electronAPI.regulex
const concerto = window.electronAPI.concerto
const regexpu = window.electronAPI.regexpu
const pathLib = window.electronAPI.path

// ─── IDs ─────────────────────────────────────────────────────────────────────

const EditorWindowScreenElement = 'EditorView'
const PlaygroundWindowScreenElement = 'PlaygroundView'
const TabsPlaceholder = 'header-tabs'
const playgroundEditorID = 'playground-editor'
const composeBlockIDforSVGCanvas = 'TheComposeBlockSVGCanvas'
const editorContainerId = 'quartet-editor-container'
const ribbonToggleConsoleIconId = 'toggle-console-icon'
const logConsoleId = 'ribbon-console-regexp'

// ─── Class names ─────────────────────────────────────────────────────────────

const hideShowSideConsoleClassName = 'show-console-view'
const activeRibbonIconClass = 'ribbon-icon-active'

// ─── Special chars ───────────────────────────────────────────────────────────

const __SPACE_UNICODE_STRING__ = '\\u0020'
const emptyLogConsoleValue = '&smashp;'

const emptyTimeoutObject = (() => {
    let x = setTimeout(() => {}, 100)
    clearTimeout(x)
    return x
})()

// ─── Compiler ────────────────────────────────────────────────────────────────

const defaultActivatedFlagsValue = {
    m: false, g: false, i: false, u: false, y: false,
}

// ─── Developer tools ────────────────────────────────────────────────────────

const originalDevToolsClearFunction = console.clear
const originalDevToolsLogFunction = console.log

// ─── Playground ──────────────────────────────────────────────────────────────

const detectAllBoundaryRegExp = /^(?:(?:\\b|\\B|\^|\$))+$/g

const detectOrchestraWithEOL =
    /(?:^|[^\\])(\\n|\\r|\\f|\\v|\\u0085|\\u2028|\\u2029|(?:\[(?:[^A-Z\[\]\^])*(?:\\s(?:[^A-Z\[\]])*\\S|\\w(?:[^A-Z\[\]])*\\W|\\W(?:[^A-Z\[\]])*\\w|\\S(?:[^A-Z\[\]])*\\s)(?:[^A-Z\[\]])*\]|\[\^(?:[^A-Z\[\]\^])*\]))/g

const checkIfEmptyExcludeSet =
    /^\[\^(?:[^A-Z\[\]\^])*\]$/
