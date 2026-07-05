// ─── State ───────────────────────────────────────────────────────────────────

let monacoInitialized = false
let monacoLoading = false

// ─── Fetch matches ───────────────────────────────────────────────────────────

function playgroundFetchLatestMatches() {
    const matches = []
    let counter = 1
    updatePlaygroundFlags()
    const regX = compileRegExpForPlayground()
    const text = playgroundEditor.getValue()

    while (true) {
        const match = regX.exec(text)
        if (match === null) return matches

        matches.push({
            endIndex: match[0].length + match.index,
            groups: match.slice(1),
            no: counter++,
            startIndex: match.index,
            text: match[0],
        })
    }
}

// ─── Test compiled regexp ────────────────────────────────────────────────────

function testCompiledRegExp() {
    try {
        if (playgroundCompiledRegX === '' || playgroundCompiledRegX === undefined)
            return false
        if (detectAllBoundaryRegExp.test(playgroundCompiledRegX))
            return false
        compileRegExpForPlayground()
        return true
    } catch (e) {
        return false
    }
}

// ─── Match provider ──────────────────────────────────────────────────────────

function pushDecorationsToTheModel() {
    if (!testCompiledRegExp()) return
    if (!playgroundEditor || !playgroundEditor.getModel()) return

    playgroundLatestMatches = playgroundFetchLatestMatches()

    const decorations = playgroundLatestMatches.map((match) => {
        const startPosition = playgroundEditor.getModel().getPositionAt(match.startIndex)
        const endPosition = playgroundEditor.getModel().getPositionAt(match.endIndex)

        return {
            range: new monaco.Range(
                startPosition.lineNumber,
                startPosition.column,
                endPosition.lineNumber,
                endPosition.column
            ),
            options: {
                className: 'match-token',
                hoverMessage: { value: createHoverMessage(match) },
            },
        }
    })

    playgroundOldDecorations = playgroundEditor.deltaDecorations(playgroundOldDecorations, decorations)
}

// ─── Remove decorations ──────────────────────────────────────────────────────

function removeDecorationsFromPlayground() {
    if (!playgroundEditor) return
    playgroundOldDecorations = playgroundEditor.deltaDecorations(playgroundOldDecorations, [{
        range: new monaco.Range(1, 1, 1, 1),
        options: {},
    }])
}

// ─── Creating hover message ──────────────────────────────────────────────────

function createHoverMessage(match) {
    let groupCounter = 1
    const groups = match.groups.map((group) => {
        const groupValue = group === undefined ? '_Empty_' : '`' + group + '`'
        return `Group ${groupCounter++}: ${groupValue}`
    })

    return (
        `__Match No. ${match.no}__\n\n` +
        `Range: ${match.startIndex} &mdash; ${match.endIndex - 1}\n\n` +
        `*****\n\n` +
        `\`\`\`\n${match.text}\n\`\`\`\n\n` +
        (groupCounter === 1 ? '' : '\n\n*****\n\n') +
        groups.join('\n\n')
    )
}

// ─── Init Monaco editor ──────────────────────────────────────────────────────

function initMonacoEditor(callback) {
    playgroundCompiledRegX = fetchLatestCompiledRegExp()
    updatePlaygroundFlags()
    playgroundFontSize = 14
    playgroundOldDecorations = []

    // If Monaco is already initialized, just update and call callback
    if (monacoInitialized && playgroundEditor) {
        pushDecorationsToTheModel()
        if (callback) callback()
        return
    }

    // If Monaco is currently loading, wait for it
    if (monacoLoading) {
        const checkReady = setInterval(() => {
            if (monacoInitialized && playgroundEditor) {
                clearInterval(checkReady)
                pushDecorationsToTheModel()
                if (callback) callback()
            }
        }, 50)
        return
    }

    monacoLoading = true

    const monacoPath = pathLib.join('node_modules', 'monaco-editor', 'min')
    const baseUrl = window.location.href
        .replace(/\/[^/]*\?.*$/, '')
        .replace(/\/[^/]*$/, '')

    require.config({
        baseUrl: baseUrl + '/' + monacoPath,
    })

    self.module = undefined
    try { self.process = self.process || {}; self.process.browser = true; } catch(e) {}

    require(['vs/editor/editor.main'], function () {
        const MatchLanguageName = 'CurrentMatchLanguage'
        monaco.languages.register({ id: MatchLanguageName })

        setupPlaygroundMonacoThemes(monaco)

        const lastValue = ''
        playgroundEditor = monaco.editor.create(document.getElementById(playgroundEditorID), {
            value: lastValue,
            language: MatchLanguageName,
            fontFamily: 'Source Code Pro, monospace',
            fontSize: playgroundFontSize,
            lineHeight: getPlaygroundLineHeight(),
            suggestOnTriggerCharacters: false,
            renderWhitespace: true,
            insertSpaces: true,
            tabSize: 4,
            mouseWheelZoom: false,
            quickSuggestions: false,
            minimap: { enabled: false },
            theme: WindowTheme,
            wordWrap: 'off',
            automaticLayout: false,
        })

        setupPlaygroundChangeContentEvent()
        pushDecorationsToTheModel()

        monacoInitialized = true
        monacoLoading = false

        if (callback) callback()
    })
}

// ─── On change events ────────────────────────────────────────────────────────

function setupPlaygroundChangeContentEvent() {
    const delay = 100
    clearTimeout(playgroundDecorationDelayerTimeout)

    playgroundEditor.getModel().onDidChangeContent(() => {
        clearTimeout(playgroundDecorationDelayerTimeout)
        removeDecorationsFromPlayground()
        playgroundDecorationDelayerTimeout = setTimeout(pushDecorationsToTheModel, delay)
    })
}

// ─── Open file on playground ─────────────────────────────────────────────────

function onOpenFileOnPlayground() {
    window.electronAPI.showOpenDialog({
        properties: ['openFile'],
    }).then(({ canceled, filePaths }) => {
        if (canceled || !filePaths || filePaths.length === 0) return
        window.electronAPI.readFile(filePaths[0]).then((fileData) => {
            playgroundEditor.setValue(fileData)
        })
    })
}

// ─── On run test drive ───────────────────────────────────────────────────────

function onPerformTestDrive() {
    onChangeWindowToPlayground()
}

// ─── Set playground color ────────────────────────────────────────────────────

function changePlaygroundThemeTo(mode) {
    if (playgroundEditor) {
        monaco.editor.setTheme(WindowTheme)
        playgroundEditor.updateOptions({ theme: WindowTheme })
    }
}

// ─── Font size ───────────────────────────────────────────────────────────────

function playgroundMakeFontSizeBigger() {
    playgroundFontSize++
    updatePlaygroundFontSize()
}

function playgroundMakeFontSizeSmaller() {
    playgroundFontSize--
    updatePlaygroundFontSize()
}

function updatePlaygroundFontSize() {
    if (playgroundEditor)
        playgroundEditor.updateOptions({
            fontSize: playgroundFontSize,
            lineHeight: getPlaygroundLineHeight(),
        })
}

function getPlaygroundLineHeight() {
    return Math.floor(playgroundFontSize * 1.8)
}

// ─── Themes ──────────────────────────────────────────────────────────────────

function setupPlaygroundMonacoThemes(monaco) {
    monaco.editor.defineTheme('light', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'F7F7F7' }],
        colors: {
            'editor.foreground': '#141414',
            'editor.background': '#F7F7F7',
            'editorCursor.foreground': '#00BBEC',
            'editor.lineHighlightBackground': '#F7F7F7',
            'editorLineNumber.foreground': '#2A75C0',
            'editor.selectionBackground': '#C2E8F4',
            'editor.inactiveSelectionBackground': '#88000015',
        },
    })

    monaco.editor.defineTheme('dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '1E1E1E' }],
        colors: {
            'editor.foreground': '#C1C1C1',
            'editor.background': '#1E1E1E',
            'editorCursor.foreground': '#7DA76F',
            'editor.lineHighlightBackground': '#1E1E1E',
            'editorLineNumber.foreground': '#668BB7',
            'editor.selectionBackground': '#E0DEFF',
            'editor.inactiveSelectionBackground': '#88000015',
        },
    })
}

// ─── Update playground flags ─────────────────────────────────────────────────

function updatePlaygroundFlags() {
    playgroundActivatedFlags = setCompiledFlags({ g: true })
}

// ─── Compile regexp for playground use ────────────────────────────────────────

function compileRegExpForPlayground() {
    const regExpCode = `/${playgroundCompiledRegX.replace(/\//g, '\\/') }/${playgroundActivatedFlags}`
    const es5Version = regexpu.transpileCode(regExpCode)
    return eval(es5Version)
}
