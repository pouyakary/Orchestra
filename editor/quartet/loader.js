
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── LOAD NEW WORKSPACE ─────────────────────────────────────────────────────────
//

    function updateWorkspaceWithNewXML ( xml ) {
        loadXMLtoWorkspace( xml )
        setupComposeBlock( )
        setupEventListeners( )
        applyAdditionalStyles( )
    }

//
// ─── XML LOADER ─────────────────────────────────────────────────────────────────
//

    function loadXMLtoWorkspace ( xml ) {
        let blockyDOM = Blockly.Xml.textToDom( xml )
        Blockly.mainWorkspace.clear( )
        Blockly.Xml.domToWorkspace( blockyDOM, Blockly.mainWorkspace )
    }

// ────────────────────────────────────────────────────────────────────────────────
