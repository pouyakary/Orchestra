
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const openExternal = require( 'electron' ).shell.openExternal;
    const fs = require('fs');
    const appName = require( 'electron' ).remote.app.getName( )

//
// ─── WINDOW DRAG FIX ────────────────────────────────────────────────────────────
//

    document.addEventListener( 'dragover', event => event.preventDefault( ) )
    document.addEventListener( 'drop', event => event.preventDefault( ) )

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    window.onload = applyOnLoadSettings;

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const orchestraVersionSpanId = 'orchestra-version';
    const orchestraBuildSpanId = 'orchestra-build';
    const quartetVersionSpanId = 'quartet-version';

//
// ─── GET WINDOW OPTIONS ─────────────────────────────────────────────────────────
//

    function getWindowOptions ( ) {
        return JSON.parse( window.location.search.substring( 1 ) );
    }

//
// ─── ON LOAD SCRIPT ─────────────────────────────────────────────────────────────
//

    function applyOnLoadSettings ( ) {
        document.getElementById( 'app-name' ).innerText = appName;
        document.getElementById( orchestraVersionSpanId ).innerText = getParameterByName('ov');
        document.getElementById( quartetVersionSpanId ).innerText = getParameterByName('qv');

        if ( appName === 'Orchestra Nightly' ) {
            document.getElementById( 'icon' ).style.backgroundImage = 'url("./icon-nightly.png")';
        }

        try {
            fs.readFile( `${ __dirname }/commit-count.txt`, 'utf8', ( error, data ) => {
                if ( error ) alert( error );
                document.getElementById( orchestraBuildSpanId ).innerText = data.trim( );
            });
        } catch ( e ) { alert( e )};
    }

//
// ─── GET PARAM ──────────────────────────────────────────────────────────────────
//

    function getParameterByName ( name ) {
        let url = window.location.href;
        name = name.replace( /[\[\]]/g, "\\$&" );
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

// ────────────────────────────────────────────────────────────────────────────────
