
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
// ─── CHOOSE RANDOMLY FROM ARRAY ─────────────────────────────────────────────────
//

    function chooseRandom ( arr ) {
        return arr[ Math.floor( Math.random( ) * arr.length ) ];
    }

//
// ─── ON CLOSE ───────────────────────────────────────────────────────────────────
//

    function fireWindowCloseRequest ( ) {
        if ( currentFile.dirty ) {
            const ans = dialog.showMessageBox( getWindowForDialogSheets( ), {
                buttons: [ "Let's Save", "Just Quit", "Oh! Don't Close!" ],
                title: "Orchestra",
                message: `You have changes that are not saved. Should we do something or pretend this conversation never happened?`
            });
            if ( ans === 0 ) {
                onSaveFile( );
            } else if ( ans === 2 ) {
                return;
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
