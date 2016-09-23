
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── ON NEW FILE ────────────────────────────────────────────────────────────────
//

    function onNewFile ( force = false ) {
        if ( !( checkForSavingChanges( ) || force ) ) return;
        currentFile = defaultFileObject;
        updateWorkspaceWithNewXML( defaultFileXML );
    }

//
// ─── ON OPEN FILE ───────────────────────────────────────────────────────────────
//

    function onOpenFile ( ) {
        if ( !checkForSavingChanges( ) ) return;

        // get file path
        let filePath = dialog.showOpenDialog( getWindowForDialogSheets( ), {
            properties: [ 'openFile' ],
            filters: [{
                name: 'Quartet Language',
                extensions: [ 'quartet' ]
            }]
        });
        if ( filePath === undefined ) return;

        // done let's load.
        openFileWithPath( filePath[ 0 ] );
    }

//
// ─── ON SAVE FILE ───────────────────────────────────────────────────────────────
//

    function onSaveFile ( force = false ) {
        if ( checkPathAndAskForPathIfNeeded( force ) ) {
            saveFileWithInfo( );
        }
    }

//
// ─── ON SAVE FILE AS ────────────────────────────────────────────────────────────
//

    function onSaveFileAs ( ) {
        onSaveFile( true );
    }

//
// ─── ON EXPORT SVG FILE ─────────────────────────────────────────────────────────
//

    function onExportWorkspaceToSVG ( ) {
        if ( workspace.getTopBlocks( ).length === 1 ) {
            let filePath = dialog.showSaveDialog( getWindowForDialogSheets( ), {
                filters: [{
                    name: 'SVG',
                    extensions: [ 'svg' ],
                }]
            });

            if ( filePath !== undefined ) {
                exportSVGImageTo( filePath );
            }
        } else {
            alert("Your workspace contains blocks in top level other than Quartet Compose Block. Please clean up your workspace and try again.");
        }
    }

//
// ─── GET WINDOW FOR DIALOG SHEETS ───────────────────────────────────────────────
//

    function getWindowForDialogSheets ( ) {
        return ( OrchestraWindow.isMaximized( ) )? OrchestraWindow : null;
    }

//
// ─── CHECK AND ASK FOR FILE PATH ────────────────────────────────────────────────
//

    function checkPathAndAskForPathIfNeeded ( forceAsk = false ) {
        if ( currentFile.path === defaultEmptyPath || forceAsk ) {
            const newPath = dialog.showSaveDialog( getWindowForDialogSheets( ), {
                filters: [{
                    name: 'Quartet',
                    extensions: [ 'quartet' ],
                }]
            });

            if ( newPath !== undefined ) {
                currentFile.path = newPath;
                return true;
            } else {
                currentFile = defaultFileObject;
                return false;
            }
        }
        return true;
    }

//
// ─── SAVE BEFORE FILE CHANGE ────────────────────────────────────────────────────
//

    function checkForSavingChanges ( ) {
        if ( getFileDirtStatus( ) ) {
            const ans = dialog.showMessageBox( getWindowForDialogSheets( ), {
                buttons: [ "Save", "Cancel", "Don't Save" ],
                title: "Orchestra",
                message: `Do you want to save your changes to '${ getFileName( ) }'?`,
                detail: "Your changes will be lost if you don't save right now."
            });
            if ( ans === 0 ) {
                onSaveFile( );
            } else if ( ans === 1 ) {
                return false;
            }
        }
        return true;
    }

// ────────────────────────────────────────────────────────────────────────────────
