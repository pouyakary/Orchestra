// ─── Window drag fix ─────────────────────────────────────────────────────────

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

// ─── Constants ───────────────────────────────────────────────────────────────

const orchestraVersionSpanId = 'orchestra-version'
const orchestraBuildSpanId = 'orchestra-build'
const quartetVersionSpanId = 'quartet-version'

// ─── On load ─────────────────────────────────────────────────────────────────

window.onload = applyOnLoadSettings

async function applyOnLoadSettings() {
    const options = JSON.parse(decodeURI(window.location.search.substring(1)))
    const appName = await window.electronAPI.getAppName()

    document.getElementById('app-name').innerText = appName
    document.getElementById(orchestraVersionSpanId).innerText = options.orchestraVersion
    document.getElementById(quartetVersionSpanId).innerText = options.quartetVersion

    // Show close button on non-macOS
    if (window.electronAPI.getPlatform() !== 'darwin') {
        document.getElementById('close-button').hidden = false
    }
}

// ─── Exit button ─────────────────────────────────────────────────────────────

function onExit() {
    window.electronAPI.closeWindow()
}
