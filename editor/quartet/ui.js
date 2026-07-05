// ─── Update code on change ───────────────────────────────────────────────────

function quartetOnUIChange(event) {
    switch (event.type) {
        case Blockly.Events.MOVE:
            return
        case Blockly.Events.UI:
            currentFile.emptyNewFile = false
            break
        default:
            setFileDirty(true)
    }

    if (event.type === Blockly.Events.UI && event.element === 'selected')
        quartetActiveBlockId = event.newValue || event.blockId

    const compiledRegX = QuartetGenerator.blockToCode(ComposeBlock)
    setConsoleRegEx('/' + compiledRegX + '/')

    updateFlagsForLatestBuild()
    refreshActivatedFlagConsoleView()
}

// ─── Set playground flags ────────────────────────────────────────────────────

function setCompiledFlags(options = {}) {
    function mapOptionsToFlagList(key) {
        const baseValue = activatedFlags[key]
        const optionValue = options[key]
        return (baseValue || optionValue) ? key : ''
    }

    return Object.keys(activatedFlags)
        .map(mapOptionsToFlagList)
        .join('')
}

// ─── Fetch latest compiled regex ─────────────────────────────────────────────

function fetchLatestCompiledRegExp() {
    const latestCompiledRegEx = getCurrentRegExpFromConsole()
    if (latestCompiledRegEx.length < 3) return ''
    return latestCompiledRegEx.substring(1, latestCompiledRegEx.length - 1)
}

// ─── Get current regex ───────────────────────────────────────────────────────

function getCurrentRegExpFromConsole() {
    return document.querySelector('storage')
        .innerText
        .replace(/\u00A0/g, ' ')
}

// ─── On regexp copy ──────────────────────────────────────────────────────────

function onCopyRegExp() {
    window.electronAPI.writeClipboardText(compileRegExpForCopy())
}

// ─── Compile regexp for copy ─────────────────────────────────────────────────

function compileRegExpForCopy() {
    let regX = getCurrentRegExpFromConsole()
    regX = transformRegExpBasedOnTargetECMAScript(regX)
    regX = transformRegExpBasedOnFormat(regX)
    return regX
}

// ─── Compile regexp based on target ──────────────────────────────────────────

function transformRegExpBasedOnTargetECMAScript(regX) {
    const regExpFlags = setCompiledFlags()
    const regExpBodyCode = '/' + regX.substring(1, regX.length - 1).replace(/\//g, '\\/') + '/'
    const regExpCode = regExpBodyCode + regExpFlags

    if (currentFile.compilerECMAScriptTarget === 'es5') {
        try {
            return regexpu.transpileCode(regExpCode)
        } catch (e) {
            new Log('Error: This Orchestra is not ES5-Compatible')
        }
    }
    return regExpCode
}

// ─── Transform regexp based on format ────────────────────────────────────────

function transformRegExpBasedOnFormat(regX) {
    if (currentFile.compilerOutputFormat === 'string') {
        return onGetEscapedStringRegExp(regX)
    }
    return regX
}

// ─── On copy escaped string regexp ───────────────────────────────────────────

function onGetEscapedStringRegExp(source) {
    const regExyBody = source.substring(1).replace(/\/[mgiuys]*$/, '')
    const regX = new RegExp(regExyBody)
        .source
        .replace(/\\|"/g, match => match === '\\' ? '\\\\' : '\\"')
    return '"' + regX + '"'
}
