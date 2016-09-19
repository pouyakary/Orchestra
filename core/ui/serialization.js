
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SET DIRTY ──────────────────────────────────────────────────────────────────
//

    function setFileDirty ( ) {
        currentFile.dirty = true;
    }

//
// ─── SET FILE CLEAN ─────────────────────────────────────────────────────────────
//

    function setFileClean ( ) {
        currentFile.dirty = false;
    }

//
// ─── ON NEW FILE ────────────────────────────────────────────────────────────────
//

    function onNewFile ( ) {
        // reset the file
        currentFile = DefaultFileObject( );
        setFileDirty( );
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
        if ( currentFile.path === undefined ) {
            // Asking the user for file path
            currentFile.path = dialog.showSaveDialog( OrchestraWindow, {
                title: "Save your Quartet File",
                filters: [{
                    name: 'Quartet',
                    extensions: [ 'quartet' ]
                }]
            });
            if ( filePath === undefined ) return;
        }

        // Going with the file path
        let workspaceXML = serializeWorkspaceIntoXML( );

        // save the file
        fs.writeFile( filePath, workspaceXML, err => {
            if ( err ) {
                alert(`Could not save your file at "${ filePath }"`);
            }
        });

        // show that we're done
        setFileClean( );
    }

//
// ─── ON SAVE FILE AS ────────────────────────────────────────────────────────────
//

    function onSaveFileAs ( ) {
        alert('save file as!');
    }

//
// ─── WORKSPACE TO XML ───────────────────────────────────────────────────────────
//

    function serializeWorkspaceIntoXML ( ) {
        Blockly.Xml.domToText( Blockly.Xml.workspaceToDom( workspace ) );
    }

//
// ─── LOAD XML ───────────────────────────────────────────────────────────────────
//

    function loadXMLIntoWorkspace ( ) {

    }

// ────────────────────────────────────────────────────────────────────────────────
