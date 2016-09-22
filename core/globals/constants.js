
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── FILE DEFAULTS ──────────────────────────────────────────────────────────────
//

    const defaultFileXML = '<xml><block type="compose" deletable="false"></block></xml>';

    const defaultEmptyPath = 'Undefined';

    const defaultFileObject = {
        path: defaultEmptyPath,
        dirty: true,
    };

//
// ─── ELECTRON LOADS ─────────────────────────────────────────────────────────────
//

    const { ipcRenderer, clipboard } = require( 'electron' );
    const { dialog } = require( 'electron' ).remote;
    const OrchestraWindow = require( 'electron' ).remote.getCurrentWindow( );
    const openExternal = require( 'electron' ).shell.openExternal;

//
// ─── NODE LOADS ─────────────────────────────────────────────────────────────────
//

    const path = require( 'path' );
	const fs   = require( 'fs' );

//
// ─── IDS ────────────────────────────────────────────────────────────────────────
//

    const EditorWindowScreenElement = 'EditorView';
    const PlaygroundWindowScreenElement = 'PlaygroundView';
    const TabsPlaceholder = 'header-tabs';
    const playgroundEditorID = 'playground-editor';
    const composeBlockIDforSVGCanvas = 'TheComposeBlockSVGCanvas';

//
// ─── SPECIAL CHARS ──────────────────────────────────────────────────────────────
//

    const __SPACE_UNICODE_STRING__ = "\\u0020";

// ────────────────────────────────────────────────────────────────────────────────
