// ─── Window drag fix ─────────────────────────────────────────────────────────

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

// ─── Help window reference listener ──────────────────────────────────────────

window.electronAPI.onHelpWindowOpenRef((ref) => {
    scrollToID(ref)
})

// ─── On load ─────────────────────────────────────────────────────────────────

window.onload = onLoad

function onLoad() {
    createTableOfContents()
    moveToReferenceAtLoad()
}

// ─── Globals ─────────────────────────────────────────────────────────────────

/** @type {Element} */
var sidebar

// ─── Parse URL at run time ───────────────────────────────────────────────────

function moveToReferenceAtLoad() {
    const id = window.location.search.substring(1)
    if (id !== 'none')
        scrollToID(id, true)
}

// ─── Scroll to ID ────────────────────────────────────────────────────────────

function scrollToID(id, noAnimation = false) {
    const topMargin = /^ref-/.test(id) ? 35 : 100
    document.getElementById('content').scrollTop =
        document.getElementById(id).offsetTop - topMargin
}

// ─── Create table contents ───────────────────────────────────────────────────

function createTableOfContents() {
    const contents = document.getElementById('content')
    sidebar = document.getElementById('sidebar')

    for (const section of contents.children) {
        createTableOfContentForSection(section)
        addSeparator()
    }
}

function createTableOfContentForSection(section) {
    const sectionSidebarElement = document.createElement('div')
    sectionSidebarElement.className = 'sidebar-section-item'
    addFunctionForScrollOnClick(sectionSidebarElement, section.id)
    sectionSidebarElement.innerText = section.querySelector('h1').innerText
    sidebar.appendChild(sectionSidebarElement)

    const blockRows = section.querySelectorAll('.row')
    for (let index = 0; index < blockRows.length; index++)
        createHeaderSidebarEntry(blockRows[index])
}

function createHeaderSidebarEntry(blockRow) {
    try {
        if (blockRow.id === '') return

        const headerSidebarElement = document.createElement('div')
        headerSidebarElement.className = 'sidebar-header-item'
        headerSidebarElement.innerHTML = '&bullet; ' + blockRow.querySelector('h2').innerText
        addFunctionForScrollOnClick(headerSidebarElement, blockRow.id)
        sidebar.appendChild(headerSidebarElement)
    } catch (error) {
        console.error(error)
    }
}

function addFunctionForScrollOnClick(element, destId) {
    element.onclick = () => scrollToID(destId)
}

function addSeparator() {
    const separator = document.createElement('div')
    separator.className = 'sidebar-separator-item'
    sidebar.appendChild(separator)
}
