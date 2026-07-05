// ─── Change to editor ────────────────────────────────────────────────────────

function onChangeWindowToEditor() {
    CurrentActiveView = 'editor'
    setActiveTabInMenu()
    document.getElementById(EditorWindowScreenElement).hidden = false
    document.getElementById(PlaygroundWindowScreenElement).hidden = true
    document.getElementById(TabsPlaceholder).className = 'editor-tab'

    Blockly.fireUiEvent(window, 'resize')
}

// ─── Change to playground ────────────────────────────────────────────────────

function onChangeWindowToPlayground() {
    CurrentActiveView = 'playground'
    setActiveTabInMenu()
    document.getElementById(EditorWindowScreenElement).hidden = true
    document.getElementById(PlaygroundWindowScreenElement).hidden = false
    document.getElementById(TabsPlaceholder).className = 'playground-tab'

    initMonacoEditor(() => {
        if (playgroundEditor) {
            playgroundEditor.layout()
        }
    })
}
