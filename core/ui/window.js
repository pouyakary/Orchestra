
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
        setMenuEnableFactor( true );
    }

//
// ─── CHOOSE RANDOMLY FROM ARRAY ─────────────────────────────────────────────────
//

    function chooseRandom ( arr ) {
        return arr[ Math.floor( Math.random( ) * arr.length ) ];
    }

//
// ─── PUSH ERROR NOTIFICATION ────────────────────────────────────────────────────
//

    function report ( text ) {
        new Notification( 'Orchestra', {
            body: text
        });
    }

//
// ─── ON CLOSE ───────────────────────────────────────────────────────────────────
//

    function fireWindowCloseRequest ( ) {
        if ( onBeforeWindowClose( ) )
            OrchestraWindow.close( );
    }

//
// ─── ON QUIT ────────────────────────────────────────────────────────────────────
//

    function fireAppQuitRequest ( ) {
        if ( onBeforeWindowClose( ) )
            ipcRenderer.send( 'app-quit' );
    }

//
// ─── ON BEFORE WINDOW CLOSE ─────────────────────────────────────────────────────
//

    function onBeforeWindowClose ( ) {
        if ( getFileDirtStatus( ) ) {
            const ans = dialog.showMessageBox( getWindowForDialogSheets( ), {
                buttons: [ "Let's Save", "Just Quit", "Oh! Don't Close!" ],
                title: "Orchestra",
                message: `You have changes that are not saved. Should we do something or pretend this conversation never happened?`
            });
            if ( ans === 0 ) {
                onSaveFile( );
            } else if ( ans === 2 ) {
                return false;
            }
        }
        setMenuEnableFactor( false );
        return true;
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
// ─── OPEN NEW WINDOW ────────────────────────────────────────────────────────────
//

    function openNewWindow ( ) {
        ipcRenderer.send( 'open-new-window' );
    }

//
// ─── BLUR ───────────────────────────────────────────────────────────────────────
//

    OrchestraWindow.addListener( 'blur', ( ) => {
        setMenuEnableFactor( false );
        makeWindowButtonsBlur( );
    });

//
// ─── GAIN FOCUS ─────────────────────────────────────────────────────────────────
//

    OrchestraWindow.addListener( 'focus', ( ) => {
        setMenuEnableFactor( true );
        makeWindowButtonsActive( );
    });

// ────────────────────────────────────────────────────────────────────────────────
