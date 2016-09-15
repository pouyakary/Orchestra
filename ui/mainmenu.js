//
// Comment IV
//    Copyright 2016 Kary Foundation, Inc.
//    Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const openExternal = require('electron').shell.openExternal;

//
// ─── MENU ───────────────────────────────────────────────────────────────────────
//

    var MainMenu = [

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
                        click: function ( item , focusedWindow ) {
                            if ( focusedWindow ) {
                                UI.OnCommandA( );
                            }
                        }
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
                        label: "Kary Foundation Style Comment Toturials",
                        click: function( ) {
                            require('electron').shell.openExternal('https://github.com/karyfoundation/comment/wiki')
                        }
                    },
                    {
                        label: "Kary Foundtation's Website",
                        click: function( ) {
                            require('electron').shell.openExternal('https://www.karyfoundation.org/')
                        }
                    },
                    {
                        label: "Comment IV on GitHub",
                        click: function( ) {
                            require('electron').shell.openExternal('https://github.com/karyfoundation/comment')
                        }
                    }
                ]
            },

        // ────────────────────────────────────────────────────────────────────────────────

    ];

//
// ─── OS SPECIFIC MENUS ──────────────────────────────────────────────────────────
//

    var AboutPageButton = {
        label: 'About Orchestra',
        click: ( ) => {
            UI.OpenAboutPage( );
        }
    }

    if ( process.platform == 'darwin' ) {
        var name = require( 'electron' ).remote.app.getName( );
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
                        click: ( ) => {
                            app.quit( )
                        }
                    },
                ]
            }
        );

        // Window menu.
        MainMenu[ 5 ].submenu.push(
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        );
    } else {
        MainMenu[ 5 ].submenu.push( AboutPageButton );
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
