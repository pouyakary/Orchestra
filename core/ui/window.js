
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── INIT WINDOW ────────────────────────────────────────────────────────────────
//

    function initWindow ( ) {
        onNewFile( );
        applyAdditionalStyles( );
        initMainMenu( );
    }

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
