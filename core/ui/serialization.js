
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

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
