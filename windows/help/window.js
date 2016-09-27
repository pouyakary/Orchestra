
//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    function onLoad ( ) {
        createTableOfContents( );
    }

//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

    /** @type {Element} */
    let sidebar;

//
// ─── SCROLL TO ID ───────────────────────────────────────────────────────────────
//

    function scrollToID ( id ) {

    }

//
// ─── CREATE TABLE CONTENTS ──────────────────────────────────────────────────────
//

    function createTableOfContents ( ) {
        let contents = document.getElementById('content');
        sidebar = document.getElementById('sidebar');
        let contentLength = contents.children.length;

        for ( let index = 0; index < contentLength; index++ ) {
            let section = contents.children[ index ];
            createTableOfContentForSection( section );

            if ( index < contentLength - 1 ) {
                addSeparator( );
            }
        }
    }

//
// ─── CREATE TABLE OF CONTENT ENTRY FOR CONTENT ──────────────────────────────────
//

    /** @param {Element} section */
    function createTableOfContentForSection ( section ) {
        // Header setup
        let sectionSidebarElement = document.createElement('div');
        sectionSidebarElement.className = 'sidebar-section-item';
        sectionSidebarElement.onclick = scrollToID( section.id );
        sectionSidebarElement.innerText = section.querySelector('h1').innerText;
        sidebar.appendChild( sectionSidebarElement );

        // Children setup
        let blockHeaders = section.querySelectorAll('h2');
        for ( let index = 0; index < blockHeaders.length; index++ ) {
            createHeaderSidebarEntry( blockHeaders[ index ] );
        }

    }

//
// ─── CREATE HEADER SIDEBAR ENTRY ────────────────────────────────────────────────
//

    /** @param {Element} header */
    function createHeaderSidebarEntry ( header ) {
        let headerSidebarElement = document.createElement('div');
        headerSidebarElement.className = 'sidebar-header-item';
        headerSidebarElement.innerText = header.innerText;
        headerSidebarElement.onclick = scrollToID( header.id );
        sidebar.appendChild( headerSidebarElement );
    }

//
// ─── ADD SEPARATOR ──────────────────────────────────────────────────────────────
//

    function addSeparator ( ) {
        let separator = document.createElement('div');
        separator.className = 'sidebar-separator-item';
        sidebar.appendChild( separator );
    }

// ────────────────────────────────────────────────────────────────────────────────
