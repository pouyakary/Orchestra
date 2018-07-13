
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

    const openExternal  = require( 'electron' ).shell.openExternal
    const appName       = require( 'electron' ).remote.app.getName( )
    const AboutWindow   = require( 'electron' ).remote.getCurrentWindow( )
    const { webFrame }  = require( 'electron' )
    const os            = require( 'os' )

//
// ─── DISABLE ZOOM ───────────────────────────────────────────────────────────────
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
    }

//
// ─── EXIT BUTTON ────────────────────────────────────────────────────────────────
//

    if ( os.platform( ) !== "darwin" ) {
        document.getElementById( "close-button" ).hidden = false
    }

//
// ─── ON EXIT ────────────────────────────────────────────────────────────────────
//

    function onExit ( ) {
        AboutWindow.close( )
    }

// ────────────────────────────────────────────────────────────────────────────────
