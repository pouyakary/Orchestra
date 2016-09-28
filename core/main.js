
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

'use strict';

//
// ─── DEFS ───────────────────────────────────────────────────────────────────────
//

    const electron = require( 'electron' );
    const { ipcMain, BrowserWindow, app } = require( 'electron' );

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const uniqueWindowIdKey = 'orchestra-unique-window-id';

//
// ─── STORAGE ────────────────────────────────────────────────────────────────────
//

    let windowCount = 0;
    let isHelpWindowOpen = false;
    let helpWindow;

//
// ─── GENERATE MAIN WINDOW ───────────────────────────────────────────────────────
//

    function createWindow ( ) {
        let editorWindow;

        const window_width = 1100;
        const window_height = 640;
        editorWindow = new BrowserWindow({
            show: false,
            width:  window_width,   minWidth: window_width - 150,
            height: window_height,  minHeight: window_height - 100,
            backgroundColor: '#F7F7F7',
            frame: false,
            //titleBarStyle: 'hidden-inset',
            fullscreen: false
        });

        editorWindow.maximize( );
        windowCount++;

        editorWindow.loadURL( `file://${ __dirname }/index.html` );


        editorWindow.once('ready-to-show', ( ) => {
            editorWindow.show( );
        });

        //editorWindow.openDevTools( );

        editorWindow.on( 'closed' , ( ) => {
            windowCount--;
        });
    }

//
// ─── OPEN HELP WINDOW ───────────────────────────────────────────────────────────
//

    function openHelpWindow ( arg = '' ) {
        if ( isHelpWindowOpen ) return;
        isHelpWindowOpen = true;

        helpWindow = new BrowserWindow({
            title: "Quartet's Block Reference",
            width:  1050, minWidth: 1050, maxWidth: 1050,
            height: 600, minHeight: 200,
            backgroundColor: 'white',
        });

        if ( arg === '' ) {
            helpWindow.loadURL( `file://${ __dirname }/help/index.html` );
        } else {
            helpWindow.loadURL( `file://${ __dirname }/help/index.html?ref=${ arg }` );
        }

        helpWindow.on( 'closed' , ( ) => {
            isHelpWindowOpen = false;
            helpWindow = null;
        });
    }

//
// ─── ON READY ───────────────────────────────────────────────────────────────────
//

    app.on( 'ready' , createWindow );

//
// ─── ON OPEN HELP WINDOW ────────────────────────────────────────────────────────
//

    ipcMain.on ( 'open-help-page', ( event, arg ) => openHelpWindow ( ));

//
// ─── OPEN HELP FOR REFERENCE ────────────────────────────────────────────────────
//

    ipcMain.on ( 'open-help-for-ref', ( event, arg ) => {
        if ( isHelpWindowOpen ) {
            helpWindow.focus( );
            helpWindow.webContents.send( 'help-window-open-ref', `ref-${ arg }` );
        } else {
            openHelpWindow( arg );
        }
    })

//
// ─── ON WINDOW ASKS ─────────────────────────────────────────────────────────────
//

    ipcMain.on( 'open-new-window', ( event, arg ) => createWindow( ) );

//
// ─── ON APP QUIT REQUEST ────────────────────────────────────────────────────────
//

    ipcMain.on( 'app-quit', ( event, arg ) => app.quit( ) );

//
// ─── QUIT APP ON WINDOWS CLOSE ──────────────────────────────────────────────────
//

    app.on( 'window-all-closed', ( e, win ) => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if ( process.platform !== 'darwin' ) {
            app.quit( );
        };
    });

//
// ─── ON ACTIVE ──────────────────────────────────────────────────────────────────
//

    app.on( 'activate', ( ) => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if ( windowCount === 0 ) {
            createWindow( );
        }
    });

// ────────────────────────────────────────────────────────────────────────────────
