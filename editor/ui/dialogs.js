// ─── New file ────────────────────────────────────────────────────────────────

async function onNewFile(force = false) {
    if (!(await checkForSavingChanges()) && !force) return

    currentFile = Object.assign({}, defaultFileObject)
    currentFile.compilerOptions = Object.assign({}, compileOptionsBaseOptions)
    renderCompilerOptionsView()
    updateWorkspaceWithNewXML(defaultFileXML)
}

// ─── Open file ───────────────────────────────────────────────────────────────

async function onOpenFile() {
    if (!(await checkForSavingChanges())) return

    const { canceled, filePaths } = await window.electronAPI.showOpenDialog({
        properties: ['openFile'],
        filters: [{
            name: 'Orchestra Language',
            extensions: ['orchestra'],
        }],
    })

    if (canceled || !filePaths || filePaths.length === 0) return
    openFileWithPath(filePaths[0])
}

// ─── Save ────────────────────────────────────────────────────────────────────

async function onSaveFile(force = false) {
    const hasPath = await checkPathAndAskForPathIfNeeded(force)
    if (hasPath) saveFileWithInfo()
}

function onSaveFileAs() {
    onSaveFile(true)
}

// ─── Export SVG ──────────────────────────────────────────────────────────────

async function onExportWorkspaceToSVG() {
    if (workspace.getTopBlocks().length === 1) {
        const { canceled, filePath } = await window.electronAPI.showSaveDialog({
            filters: [{ name: 'SVG', extensions: ['svg'] }],
        })
        if (!canceled && filePath) exportSVGImageTo(filePath)
    } else {
        alert('Your workspace contains blocks in top level other than Quartet Compose Block. Please clean up your workspace and try again.')
    }
}

// ─── Check and ask for file path ─────────────────────────────────────────────

async function checkPathAndAskForPathIfNeeded(forceAsk = false) {
    if (currentFile.path !== defaultEmptyPath && !forceAsk) {
        return true
    }

    const { canceled, filePath } = await window.electronAPI.showSaveDialog({
        filters: [{ name: 'Orchestra Language', extensions: ['orchestra'] }],
    })

    if (!canceled && filePath) {
        currentFile.path = filePath
        return true
    }

    currentFile = Object.assign({}, defaultFileObject)
    return false
}

// ─── Check for saving changes ────────────────────────────────────────────────

async function checkForSavingChanges() {
    if (getFileDirtStatus()) {
        const { response } = await window.electronAPI.showMessageBox({
            buttons: ['Save Them', "Cancel", "Don't Save"],
            title: 'Orchestra',
            message: "Don't let your saves be lost",
            detail: "If you don't save then everything since your last save will be lost. You're a developer you know that.",
        })

        if (response === 0) {
            await onSaveFile()
            return true
        }
        if (response === 1) return false
    }
    return true
}
