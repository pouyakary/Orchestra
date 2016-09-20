
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── ON NEW FILE ────────────────────────────────────────────────────────────────
//

    function onNewFile ( ) {
        // reset the file
        currentFile = DefaultFileObject;
        setFileDirty( true );
        alert('new file!');
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

    function onSaveFile ( ) {
        // nothing to be saved
        if ( !currentFile.dirty ) return;

        // getting the path
        checkPathAndAskForPathIfNeeded( );

        // saving
        saveFileWithInfo( );
    }

//
// ─── ON SAVE FILE AS ────────────────────────────────────────────────────────────
//

    function onSaveFileAs ( ) {
        // nothing to be saved
        if ( !currentFile.dirty ) return;

        // getting the path
        checkPathAndAskForPathIfNeeded( false );

        // saving
        saveFileWithInfo( );
    }

//
// ─── SAVE FILE ──────────────────────────────────────────────────────────────────
//

    function saveFileWithInfo ( ) {
        // Going with the file path
        let workspaceXML = serializeWorkspaceIntoXML( );

        // save the file
        fs.writeFile( currentFile.path, workspaceXML, err => {
            if ( err ) {
                alert(`Could not save your file at "${ currentFile.path }"`);
            }
        });

        // show that we're done
        setFileDirty( false );
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

//
// ─── WORKSPACE TO XML ───────────────────────────────────────────────────────────
//

    function serializeWorkspaceIntoXML ( ) {
        return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom( workspace ) );
    }

//
// ─── LOAD XML ───────────────────────────────────────────────────────────────────
//

    function loadXMLIntoWorkspace ( ) {

    }

// ────────────────────────────────────────────────────────────────────────────────
