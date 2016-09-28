
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const { ipcRenderer } = require('electron');

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    function onLoad ( ) {
        createTableOfContents( );
        moveToReferenceAtLoad( );
    }

//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

    /** @type {Element} */
    let sidebar;

//
// ─── PARSE URL AT RUN TIME ──────────────────────────────────────────────────────
//

    function moveToReferenceAtLoad ( ) {
        let id = getQueryString('ref');
        if ( id !== null ) {
            scrollToID( `ref-${ id }` );
        }
    }

//
// ─── GET QUERY STRING ───────────────────────────────────────────────────────────
//

    function getQueryString ( field ) {
        var href = window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

//
// ─── SCROLL TO ID ───────────────────────────────────────────────────────────────
//

    function scrollToID ( id ) {
        window.scrollTo( 0, document.getElementById( id ).offsetTop - 100 );
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
        addFunctionForScrollOnClick( sectionSidebarElement, section.id );
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
        addFunctionForScrollOnClick( headerSidebarElement, header.id );
        sidebar.appendChild( headerSidebarElement );
    }

//
// ─── ADD SCROLL EVENT ───────────────────────────────────────────────────────────
//

    function addFunctionForScrollOnClick ( element, destId ) {
        element.onclick = ( ) => {
            scrollToID( destId )
        };
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
