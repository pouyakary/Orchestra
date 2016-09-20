
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
// ─── ON CLOSE ───────────────────────────────────────────────────────────────────
//

    function fireWindowCloseRequest ( ) {
        OrchestraWindow.close( );
    }

//
// ─── ON MINIMIZE ────────────────────────────────────────────────────────────────
//

    function fireWindowMinimizeRequest ( ) {
        OrchestraWindow.minimize( );
    }

//
// ─── ON MAXIMIZE ────────────────────────────────────────────────────────────────
//

    function fireWindowMaximizeRequest ( ) {
        if ( OrchestraWindow.isMaximized( ) ) {
            OrchestraWindow.unmaximize( );
        } else {
            OrchestraWindow.maximize( );
        }
    }

//
// ─── RESIZE ─────────────────────────────────────────────────────────────────────
//

    window.onresize = ( ) => {
        if ( playgroundEditor !== undefined )
            playgroundEditor.layout( );
    }

// ────────────────────────────────────────────────────────────────────────────────
