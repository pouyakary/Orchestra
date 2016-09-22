
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── INIT WINDOW ────────────────────────────────────────────────────────────────
//

    function initWindow ( ) {
        setupWorkspace( );
        onNewFile( );
        initMainMenu( );
    }

//
// ─── ON CLOSE ───────────────────────────────────────────────────────────────────
//

    function fireWindowCloseRequest ( ) {
        if ( currentFile.dirty ) {
            let ans = dialog.showMessageBox( getWindowForDialogSheets( ), {
                buttons: [ "Okay let's save", "It's fine; I don't need it!" ],
                title: "Orchestra",
                message: "You haven't saved your file! Do you want to save it before you leave?"
            });
            if ( ans === 0 ) {
                onSaveFile( );
            }
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
// ─── WINDOW BUTTONS BLUR ────────────────────────────────────────────────────────
//

    function makeWindowButtonsBlur ( ) {
        document.getElementById('window-button-close').className = 'window-buttons-blur-mode';
        document.getElementById('window-button-minimize').className = 'window-buttons-blur-mode';
        document.getElementById('window-button-maximize').className = 'window-buttons-blur-mode';
    }

//
// ─── MAKE WINDOW BUTTONS ACTIVE ─────────────────────────────────────────────────
//

    function makeWindowButtonsActive ( ) {
        document.getElementById('window-button-close').className = 'window-button-close-active';
        document.getElementById('window-button-minimize').className = 'window-button-minimize-active';
        document.getElementById('window-button-maximize').className = 'window-button-maximize-active';
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
        makeWindowButtonsBlur( );
    });

//
// ─── GAIN FOCUS ─────────────────────────────────────────────────────────────────
//

    OrchestraWindow.addListener( 'focus', ( ) => {
        makeWindowButtonsActive( );
    });

// ────────────────────────────────────────────────────────────────────────────────
