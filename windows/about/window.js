
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

    const openExternal = require( 'electron' ).shell.openExternal
    const fs = require('fs')
    const appName = require( 'electron' ).remote.app.getName( )
    const { ipcRenderer } = require( 'electron' )

//
// ─── WINDOW DRAG FIX ────────────────────────────────────────────────────────────
//

    document.addEventListener( 'dragover', event => event.preventDefault( ) )
    document.addEventListener( 'drop', event => event.preventDefault( ) )

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    window.onload = applyOnLoadSettings

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const orchestraVersionSpanId = 'orchestra-version'
    const orchestraBuildSpanId = 'orchestra-build'
    const quartetVersionSpanId = 'quartet-version'

//
// ─── ON LOAD SCRIPT ─────────────────────────────────────────────────────────────
//

    function applyOnLoadSettings ( ) {
        let windowOptions = JSON.parse( decodeURI( window.location.search.substring( 1 ) ) )

        document.getElementById( 'app-name' ).innerText = appName
        document.getElementById( orchestraVersionSpanId ).innerText = windowOptions.orchestraVersion
        document.getElementById( quartetVersionSpanId ).innerText = windowOptions.quartetVersion

        document.body.className = windowOptions.theme

        if ( appName === 'Orchestra Nightly' ) {
            document.getElementById( 'icon' ).style.backgroundImage = 'url("./icon-nightly.png")'
        }

        /*try {
            fs.readFile( `${ __dirname }/commit-count.txt`, 'utf8', ( error, data ) => {
                if ( error ) alert( error )
                document.getElementById( orchestraBuildSpanId ).innerText = data.trim( )
            })
        } catch ( e ) { alert( e )}*/
    }

//
// ─── ON THEME CHANGES ───────────────────────────────────────────────────────────
//

    ipcRenderer.on( 'change-theme-to', ( event, mode ) => {
        document.body.className = mode
    })

// ────────────────────────────────────────────────────────────────────────────────
