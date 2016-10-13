
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── FILE DEFAULTS ──────────────────────────────────────────────────────────────
//

    const defaultFileXML = '<xml><block type="compose" deletable="false"></block></xml>'

    const defaultEmptyPath = 'Undefined'

    const defaultFileObject = {
        path: defaultEmptyPath,
        dirty: true,
        emptyNewFile: true,
    }

//
// ─── ELECTRON LOADS ─────────────────────────────────────────────────────────────
//

    const { ipcRenderer, clipboard } = require( 'electron' )
    const { dialog } = require( 'electron' ).remote
    const OrchestraWindow = require( 'electron' ).remote.getCurrentWindow( )
    const openExternal = require( 'electron' ).shell.openExternal
    const regulex = require('regulex')
//
// ─── NODE LOADS ─────────────────────────────────────────────────────────────────
//

    const path = require( 'path' )
	const fs   = require( 'fs' )

//
// ─── IDS ────────────────────────────────────────────────────────────────────────
//

    const EditorWindowScreenElement = 'EditorView'
    const PlaygroundWindowScreenElement = 'PlaygroundView'
    const TabsPlaceholder = 'header-tabs'
    const playgroundEditorID = 'playground-editor'
    const composeBlockIDforSVGCanvas = 'TheComposeBlockSVGCanvas'

//
// ─── SPECIAL CHARS ──────────────────────────────────────────────────────────────
//

    const __SPACE_UNICODE_STRING__ = "\\u0020"

// ────────────────────────────────────────────────────────────────────────────────
