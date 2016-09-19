
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── ON NEW FILE ────────────────────────────────────────────────────────────────
//

    function onNewFile ( ) {
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
        alert('save file!');
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
