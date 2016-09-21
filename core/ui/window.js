
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
        if ( currentFile.dirty ) {
            alert(`Don't you wanna save your file before quitting?`);
        }
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

//
// ─── BLUR ───────────────────────────────────────────────────────────────────────
//

    OrchestraWindow.addListener( 'blur', ( ) => {
        document.getElementById('window-button-close').className = 'window-buttons-blur-mode';
        document.getElementById('window-button-minimize').className = 'window-buttons-blur-mode';
        document.getElementById('window-button-maximize').className = 'window-buttons-blur-mode';
    });

//
// ─── GAIN FOCUS ─────────────────────────────────────────────────────────────────
//

    OrchestraWindow.addListener( 'focus', ( ) => {
        document.getElementById('window-button-close').className = 'window-button-close-active';
        document.getElementById('window-button-minimize').className = 'window-button-minimize-active';
        document.getElementById('window-button-maximize').className = 'window-button-maximize-active';
    });

// ────────────────────────────────────────────────────────────────────────────────
