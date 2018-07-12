
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const { ipcRenderer, webFrame } = require( 'electron' )

//
// ─── DISABLING ZOOM ─────────────────────────────────────────────────────────────
//

    webFrame.setZoomLevelLimits( 1, 1 )

//
// ─── WINDOW DRAG FIX ────────────────────────────────────────────────────────────
//

    document.addEventListener( 'dragover', event => event.preventDefault( ) )
    document.addEventListener( 'drop', event => event.preventDefault( ) )

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    ipcRenderer.on ( 'help-window-open-ref', ( event, arg ) => {
        scrollToID( arg )
    })

    window.onload = onLoad

//
// ─── ON LOAD FUNCTION ───────────────────────────────────────────────────────────
//

    function onLoad ( ) {
        createTableOfContents( )
        moveToReferenceAtLoad( )
    }

//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

    /** @type {Element} */
    var sidebar

//
// ─── PARSE URL AT RUN TIME ──────────────────────────────────────────────────────
//

    function moveToReferenceAtLoad ( ) {
        let id = window.location.search.substring( 1 )
        if ( id !== 'none' )
            scrollToID( id, true )
    }

//
// ─── SCROLL TO ID ───────────────────────────────────────────────────────────────
//

    function scrollToID ( id , noAnimation = false ) {
        const topMargin =
            (( /^ref-/.test( id ) )? 35 : 100 )

        document.getElementById( 'content' ).scrollTop =
            document.getElementById( id ).offsetTop - topMargin
    }

//
// ─── CREATE TABLE CONTENTS ──────────────────────────────────────────────────────
//

    function createTableOfContents ( ) {
        let contents        = document.getElementById( 'content' )
            sidebar         = document.getElementById( 'sidebar' )

        for ( let section of contents.children ) {
            createTableOfContentForSection( section )
            addSeparator( )
        }
    }

//
// ─── CREATE TABLE OF CONTENT ENTRY FOR CONTENT ──────────────────────────────────
//

    /** @param {Element} section */
    function createTableOfContentForSection ( section ) {
        // Header setup
        let sectionSidebarElement = document.createElement( 'div' )
        sectionSidebarElement.className = 'sidebar-section-item'
        addFunctionForScrollOnClick( sectionSidebarElement, section.id )
        sectionSidebarElement.innerText = section.querySelector( 'h1' ).innerText
        sidebar.appendChild( sectionSidebarElement )

        // Children setup
        let blockRows = section.querySelectorAll( '.row' )
        for ( let index = 0; index < blockRows.length; index++ )
            createHeaderSidebarEntry( blockRows[ index ] )
    }

//
// ─── CREATE HEADER SIDEBAR ENTRY ────────────────────────────────────────────────
//

    /** @param {Element} header */
    function createHeaderSidebarEntry ( blockRow ) {
        try {
            if ( blockRow.id === '' )
                 return

            let headerSidebarElement = document.createElement( 'div' )
            headerSidebarElement.className = 'sidebar-header-item'

            headerSidebarElement.innerHTML = '&bullet; ' + blockRow.querySelector( 'h2' ).innerText

            addFunctionForScrollOnClick( headerSidebarElement, blockRow.id )
            sidebar.appendChild( headerSidebarElement )

        } catch ( error ) {
            console.error( error )
        }
    }

//
// ─── ADD SCROLL EVENT ───────────────────────────────────────────────────────────
//

    function addFunctionForScrollOnClick ( element, destId ) {
        element.onclick = ( ) => scrollToID( destId )
    }

//
// ─── ADD SEPARATOR ──────────────────────────────────────────────────────────────
//

    function addSeparator ( ) {
        let separator = document.createElement('div')
        separator.className = 'sidebar-separator-item'
        sidebar.appendChild( separator )
    }

// ────────────────────────────────────────────────────────────────────────────────
