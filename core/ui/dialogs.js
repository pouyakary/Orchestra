
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
        // nothing to be saved
        if ( !currentFile.dirty ) return;

        // getting the path
        checkPathAndAskForPathIfNeeded( force );
        if ( !currentFile.dirty ) return;

        // saving
        saveFileWithInfo( );
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
        if ( currentFile.path === undefined || forceAsk ) {
            // Asking the user for file path
             currentFile.path = dialog.showSaveDialog( OrchestraWindow, {
                // title: "Choose a path for your file",
                filters: [{
                    name: 'Quartet',
                    extensions: [ 'quartet' ],
                }]
            });
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
