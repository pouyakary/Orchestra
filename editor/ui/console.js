
//
// Copyright © 2016-present Pouya Kary. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── UPDATE CONSOLE TITLE ───────────────────────────────────────────────────────
//

    function updateConsoleTitle ( ) {
        let title = getFileName( )
        let dirtStatus = ( getFileDirtStatus( ) )? ' &bullet; Not Saved' : ''
        document.title = title
        setConsoleTitle(`${ title }${ dirtStatus }`)
        OrchestraWindow.setRepresentedFilename( title )
    }

//
// ─── SET CONSOLE TITLE ──────────────────────────────────────────────────────────
//

    function setConsoleTitle ( title ) {
        document.getElementById( 'ribbon-console-title' ).innerHTML = title
    }

//
// ─── LOG OBJECT ─────────────────────────────────────────────────────────────────
//

    class Log {

        //
        // ─── INIT ────────────────────────────────────────────────────────
        //

            constructor ( message ) {
                (( ) => new Promise( resolve => {
                    if ( currentDisplayLog )
                        currentDisplayLog.terminate( ).then( resolve )
                    else
                        resolve( )
                }))( ).then(( ) => {
                    this.display( message )
                    currentDisplayLog = this
                })
            }

        //
        // ─── TERMINATE ───────────────────────────────────────────────────
        //

            terminate ( ) {
                return new Promise ( ( resolve ) => {
                    let index = document.getElementById( logConsoleId ).innerText.length - 1
                    this.terminateInterval = setInterval( ( ) => {
                        if ( index > 1 )
                            document.getElementById( logConsoleId ).innerText =
                                document.getElementById( logConsoleId ).innerText.substring( 0, index-- )
                        else {
                            document.getElementById( logConsoleId ).innerHTML = emptyLogConsoleValue
                            clearInterval( this.terminateInterval )
                            clearInterval( this.writerInterval )
                            clearTimeout( this.timeout )
                            clearTimeout( this.writeTimeout )
                            resolve( )
                        }
                    }, 30 )
                })
            }

        //
        // ─── CHANGES THE DISPLAY TEXT ────────────────────────────────────
        //

            display ( message ) {
                const delay = this.writeToConsole( message )

                this.writeTimeout = setTimeout( ( ) => {
                    this.timeout = setTimeout( this.terminate, message.split(' ').length * 400 + 2000 )
                }, delay )
            }

        //
        // ─── DISPLAY ─────────────────────────────────────────────────────
        //

            writeToConsole ( message ) {
                document.getElementById( logConsoleId ).innerHTML = ''

                let index = 0
                const delay = 30

                this.writerInterval = setInterval( ( ) => {
                    if ( index < message.length )
                        document.getElementById( logConsoleId ).innerHTML += message[ index++ ]
                    else
                        clearInterval( this.writerInterval )
                }, delay )

                return delay * message.length
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
