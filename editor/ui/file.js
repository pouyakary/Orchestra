// ─── Set dirty ───────────────────────────────────────────────────────────────

function setFileDirty(dirt) {
    currentFile.dirty = dirt
    window.electronAPI.setDocumentEdited(dirt)
    updateConsoleTitle()
}

function getFileDirtStatus() {
    return currentFile.emptyNewFile ? false : currentFile.dirty
}

function getFileName() {
    return currentFile.path === defaultEmptyPath
        ? 'Untitled.orchestra'
        : pathLib.basename(currentFile.path)
}

// ─── Serialize ───────────────────────────────────────────────────────────────

function serializeFile() {
    return JSON.stringify({
        workspaceXML: serializeWorkspaceIntoXML(),
        playgroundText: playgroundEditor.getValue(),
        compilerOptions: {
            target: currentFile.compilerECMAScriptTarget,
            format: currentFile.compilerOutputFormat,
        },
    })
}

function serializeWorkspaceIntoXML() {
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))
}

// ─── Save ────────────────────────────────────────────────────────────────────

function saveFileWithInfo() {
    const fileJSON = serializeFile()
    window.electronAPI.writeFile(currentFile.path, fileJSON).then(() => {
        setFileDirty(false)
        new Log('Saved!')
    }).catch(() => {
        alert(`Could not save your file at "${currentFile.path}"`)
        currentFile = Object.assign({}, defaultFileObject)
    })
}

// ─── Open ────────────────────────────────────────────────────────────────────

function openFileWithPath(filePath) {
    window.electronAPI.readFile(filePath).then((fileJSONString) => {
        loadFileIntoWindow(fileJSONString, filePath)
    }).catch(() => {
        report('Error: Could not open the file.')
    })
}

function loadFileIntoWindow(fileJSONString, filePath) {
    try {
        const fileJSON = Object.assign(emptyBaseFileJSON, JSON.parse(fileJSONString))

        if (fileJSON.workspaceXML !== undefined && fileJSON.workspaceXML !== null) {
            updateWorkspaceWithNewXML(fileJSON.workspaceXML)
            currentFile.path = filePath
            setFileDirty(true)
        }

        if (fileJSON.playgroundText !== undefined && fileJSON.playgroundText !== '')
            playgroundEditor.setValue(fileJSON.playgroundText)

        currentFile.compilerECMAScriptTarget = fileJSON.compilerOptions.target
        currentFile.compilerOutputFormat = fileJSON.compilerOptions.format
        renderCompilerOptionsView()

        new Log('Opened!')
    } catch (error) {
        report(`Could not load the file because of a broken file problem.${error}`)
    }
}

// ─── Export SVG ──────────────────────────────────────────────────────────────

function exportSVGImageTo(filePath) {
    const fileSVGString = renderWorkspaceIntoSVG()
    window.electronAPI.writeFile(filePath, fileSVGString).then(() => {
        new Log('SVG got exported!')
    }).catch(() => {
        alert('File could not be saved. Please try again.')
    })
}
