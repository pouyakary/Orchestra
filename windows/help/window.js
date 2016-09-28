
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    //const { ipcRenderer } = require('electron');

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    /*
    ipcRenderer.on ( 'help-window-open-ref', ( event, arg ) => {
        scrollToID( arg );
    });*/

    window.onload = onLoad;

//
// ─── ON LOAD FUNCTION ───────────────────────────────────────────────────────────
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
        let id = window.location.search.substring( 1 );
        if ( id !== 'none' ) {
            scrollToID( id );
        }
    }

//
// ─── SCROLL TO ID ───────────────────────────────────────────────────────────────
//

    function scrollToID ( id ) {
        let topMargin = ( /^ref-/.test( id ) )? 35 : 100;

        let distance = Math.abs( window.pageYOffset - document.getElementById( id ).offsetTop );
        let time;
        if ( distance < 200 ) {
            time = distance * 4;
        } else if ( distance > 1500 ) {
            time = 1500;
        } else {
            time = distance;
        }

        jump( `#${ id }` , {
            offset: -topMargin,
            duration: time,
        })
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
        let blockRows = section.querySelectorAll('.row');
        for ( let index = 0; index < blockRows.length; index++ ) {
            createHeaderSidebarEntry( blockRows[ index ] );
        }
    }

//
// ─── CREATE HEADER SIDEBAR ENTRY ────────────────────────────────────────────────
//

    /** @param {Element} header */
    function createHeaderSidebarEntry ( blockRow ) {
        try {
            if ( blockRow.id === '' ) return;

            let headerSidebarElement = document.createElement('div');
            headerSidebarElement.className = 'sidebar-header-item';

            headerSidebarElement.innerText = blockRow.querySelector('h2').innerText;

            addFunctionForScrollOnClick( headerSidebarElement, blockRow.id );
            sidebar.appendChild( headerSidebarElement );
        } catch ( error ) {
            console.log( error );
        }
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