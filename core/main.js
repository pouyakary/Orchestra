
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

    let windows = [ ];

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

        editorWindow.once('ready-to-show', () => {
            editorWindow.show()
        });

        let windowId = generateUUID( );
        editorWindow[ uniqueWindowIdKey ] = windowId;
        windows.push( windowId );

        //editorWindow.openDevTools( );

        editorWindow.maximize( );

        editorWindow.loadURL( `file://${ __dirname }/index.html` );

        editorWindow.on( 'closed' , ( ) => {
            removeFromArray( windowId, windows );
            editorWindow = null;
        });
    }

//
// ─── ON READY ───────────────────────────────────────────────────────────────────
//

    app.on( 'ready' , createWindow );

//
// ─── ON WINDOW ASKS ─────────────────────────────────────────────────────────────
//

    ipcMain.on( 'open-new-window', ( event, arg ) => {
        createWindow( );
    });

//
// ─── ON APP QUIT REQUEST ────────────────────────────────────────────────────────
//

    ipcMain.on( 'app-quit', ( event, arg ) => {
        app.quit( );
    });

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
        if ( windows.length === 0 ) {
            createWindow( );
        }
    });

//
// ─── SUPPORTING FUNCTIONS ───────────────────────────────────────────────────────
//

    function removeFromArray ( item, array ) {
        for ( var i = array.length - 1; i >= 0; i-- ) {
            if ( array[ i ] === item ) {
                array.splice( i, 1 );
            }
        }
    }

//
// ─── GENERATE UUID ──────────────────────────────────────────────────────────────
//

    function generateUUID ( ) {
        var d = new Date( ).getTime( );
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, c => {
            var r = ( d + Math.random( ) * 16 ) %16 | 0;
            d = Math.floor( d / 16 );
            return ( c == 'x' ? r : ( r &0x3 | 0x8 ) ).toString( 16 );
        });
        return uuid;
    }

// ────────────────────────────────────────────────────────────────────────────────
