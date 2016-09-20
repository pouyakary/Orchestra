
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── ON NEW FILE ────────────────────────────────────────────────────────────────
//

    function onNewFile ( ) {
        // reset the file
        currentFile = defaultFileObject;
        setupWorkspaceWithNewFile( );
    }

//
// ─── ON OPEN FILE ───────────────────────────────────────────────────────────────
//

    function onOpenFile ( ) {
        alert('open file!');
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
// ─── CHECK AND ASK FOR FILE PATH ────────────────────────────────────────────────
//

    function checkPathAndAskForPathIfNeeded ( forceAsk = false ) {
        if ( currentFile.path === defaultEmptyPath || forceAsk ) {
            let newPath = dialog.showSaveDialog( OrchestraWindow, {
                title: "Choose a path for your file",
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

// ────────────────────────────────────────────────────────────────────────────────
