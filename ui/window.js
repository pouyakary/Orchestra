
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const { ipcRenderer } = require( 'electron' );
    const OrchestraWindow = require( 'electron' ).remote.getCurrentWindow( );

//
// ─── MESSAGES ───────────────────────────────────────────────────────────────────
//

    function fireWindowCloseRequest ( ) {
        ipcRenderer.send( 'window-status', 'close' );
    }

//
// ─── RESIZE ─────────────────────────────────────────────────────────────────────
//

    window.onresize = ( ) => {
        playgroundEditor.layout( );
    }

// ────────────────────────────────────────────────────────────────────────────────
