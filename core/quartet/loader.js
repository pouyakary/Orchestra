
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── LOAD NEW WORKSPACE ─────────────────────────────────────────────────────────
//

    function updateWorkspaceWithNewXML ( xml ) {
        loadXMLtoWorkspace( xml );
        setupComposeBlock( );
        setupEventListeners( );
        applyAdditionalStyles( );
    }

//
// ─── XML LOADER ─────────────────────────────────────────────────────────────────
//

    function loadXMLtoWorkspace ( xml ) {
        let blockyDOM = Blockly.Xml.textToDom( xml );
        Blockly.mainWorkspace.clear( );
        Blockly.Xml.domToWorkspace( Blockly.mainWorkspace , blockyDOM );
    }

// ────────────────────────────────────────────────────────────────────────────────
