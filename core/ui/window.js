
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

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
        if ( playgroundEditor !== undefined )
            playgroundEditor.layout( );
    }

// ────────────────────────────────────────────────────────────────────────────────
