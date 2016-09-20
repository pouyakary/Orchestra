
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── MENU ───────────────────────────────────────────────────────────────────────
//

    var MainMenu = [

        //
        // ─── FILE ────────────────────────────────────────────────────────
        //

            {
                label: 'File',
                submenu: [
                    {
                        label: 'New File',
                        accelerator: 'CmdOrCtrl+N',
                        click: onNewFile
                    },
                    {
                        label: 'New Window',
                        accelerator: 'Shift+CmdOrCtrl+N',
                        click: ( ) => { }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Open...',
                        accelerator: 'CmdOrCtrl+O',
                        click: onOpenFile
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Save',
                        accelerator: 'CmdOrCtrl+S',
                        click: ( ) => onSaveFile( )
                    },
                    {
                        label: 'Save As',
                        accelerator: 'Shift+CmdOrCtrl+S',
                        click: onSaveFileAs
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Export to Image',
                        click: ( ) => { }
                    },
                ]
            },

        //
        // ─── EDIT MENU ───────────────────────────────────────────────────
        //

            {
                label: 'Edit',
                submenu: [
                    {
                        label: 'Undo',
                        accelerator: 'CmdOrCtrl+Z',
                        role: 'undo'
                    },
                    {
                        label: 'Redo',
                        accelerator: 'Shift+CmdOrCtrl+Z',
                        role: 'redo'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Cut',
                        accelerator: 'CmdOrCtrl+X',
                        role: 'cut'
                    },
                    {
                        label: 'Copy',
                        accelerator: 'CmdOrCtrl+C',
                        role: 'copy'
                    },
                    {
                        label: 'Paste',
                        accelerator: 'CmdOrCtrl+V',
                        role: 'paste'
                    },
                    {
                        label: 'Select All',
                        accelerator: 'CmdOrCtrl+A',
                        role: 'selectall'
                    }
                ]
            },

        //
        // ─── WINDOW MENU ────────────────────────────────────────────────────────────────
        //

            {
                label: 'Window',
                role: 'window',
                submenu: [
                    {
                        label: 'Minimize',
                        accelerator: 'CmdOrCtrl+M',
                        role: 'minimize'
                    },
                    {
                        label: 'Close',
                        accelerator: 'CmdOrCtrl+W',
                        role: 'close'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: "Open Developer Tools",
                        click: OrchestraWindow.openDevTools
                    }
                ]
            },

        //
        // ─── HELP MENU ──────────────────────────────────────────────────────────────────
        //

            {
                label: 'Help',
                role: 'help',
                submenu: [
                    {
                        label: "Kary Foundtation's Website",
                        click: ( ) => openExternal('https://www.karyfoundation.org/')
                    },
                    {
                        label: "Report an issue...",
                        click: ( ) => openExternal('https://github.com/karyfoundation/orchestra/issues')
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: "RegExp on Mozilla Developer Network",
                        click: ( ) => openExternal('https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp')
                    },
                ]
            },

        // ────────────────────────────────────────────────────────────────────────────────

    ];

//
// ─── OS SPECIFIC MENUS ──────────────────────────────────────────────────────────
//

    var AboutPageButton = {
        role: 'about'
    }

    if ( process.platform == 'darwin' ) {
        var name = require( 'electron' ).remote.app.getName( );
        var menuIndex = MainMenu.length - 1;
        MainMenu.unshift(
            {
                label: name,
                submenu: [
                    AboutPageButton,
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Services',
                        role: 'services',
                        submenu: [ ]
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Hide ' + name,
                        accelerator: 'Command+H',
                        role: 'hide'
                    },
                    {
                        label: 'Hide Others',
                        accelerator: 'Command+Alt+H',
                        role: 'hideothers'
                    },
                    {
                        label: 'Show All',
                        role: 'unhide'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'Command+Q',
                        click: ( ) => fireWindowCloseRequest( )
                    },
                ]
            }
        );
    } else {
        MainMenu[ menuIndex ].submenu.push( AboutPageButton );
    }

//
// ─── INIT MENU ──────────────────────────────────────────────────────────────────
//

    function initMainMenu ( ) {
        const remote = require('electron').remote;
        const Menu = remote.Menu;
        const MenuItem = remote.MenuItem;

        var menu = new Menu();

        /*window.addEventListener( 'contextmenu' , function ( e ) {
            e.preventDefault( );
            menu.popup( remote.getCurrentWindow() );
        }, false);*/

        var menu = Menu.buildFromTemplate( MainMenu );
        Menu.setApplicationMenu( menu );
    }


// ────────────────────────────────────────────────────────────────────────────────
