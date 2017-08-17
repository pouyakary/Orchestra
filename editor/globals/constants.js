
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
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
        compilerECMAScriptTarget: 'es6',
        compilerOutputFormat: 'regexp',
    }

//
// ─── ELECTRON LOADS ─────────────────────────────────────────────────────────────
//

    const { ipcRenderer, clipboard }    = require( 'electron' )
    const { dialog }                    = require( 'electron' ).remote
    const OrchestraWindow               = require( 'electron' ).remote.getCurrentWindow( )
    const openExternal                  = require( 'electron' ).shell.openExternal

//
// ─── NODE MODULES ───────────────────────────────────────────────────────────────
//

    const regulex                       = require('regulex')
    const concerto                      = require('concerto-compiler')
    const regexpu                       = require('regexpu')

//
// ─── NODE LOADS ─────────────────────────────────────────────────────────────────
//

    const path                          = require( 'path' )
	const fs                            = require( 'fs' )

//
// ─── IDS ────────────────────────────────────────────────────────────────────────
//

    const EditorWindowScreenElement     = 'EditorView'
    const PlaygroundWindowScreenElement = 'PlaygroundView'
    const TabsPlaceholder               = 'header-tabs'
    const playgroundEditorID            = 'playground-editor'
    const composeBlockIDforSVGCanvas    = 'TheComposeBlockSVGCanvas'
    const editorContainerId             = 'quartet-editor-container'
    const ribbonToggleConsoleIconId     = 'toggle-console-icon'
    const logConsoleId                  = 'ribbon-console-regexp'

//
// ─── CLASS NAMES ────────────────────────────────────────────────────────────────
//

    const hideShowSideConsoleClassName  = 'show-console-view'
    const activeRibbonIconClass         = 'ribbon-icon-active'

//
// ─── SPECIAL CHARS ──────────────────────────────────────────────────────────────
//

    const __SPACE_UNICODE_STRING__      = "\\u0020"
    const emptyLogConsoleValue          = '&smashp;'

    // the most stupid code someone has ever forced to write in JS. To make a
    // clean timeout object (!) as you can't really make an empty one yourself :|
    const emptyTimeoutObject            = (( ) => {
                                            let x = setTimeout( ( ) => { }, 100 )
                                            clearTimeout( x )
                                            return x
                                        })( )

//
// ─── COMPILER ───────────────────────────────────────────────────────────────────
//

    const defaultActivatedFlagsValue = {
        m: false, g: false, i: false, u: false, y: false
    }

//
// ─── DEVELOPER TOOLS ────────────────────────────────────────────────────────────
//

    const originalDevToolsClearFunction = console.clear
    const originalDevToolsLogFunction   = console.log

//
// ─── PLAYGROUND ─────────────────────────────────────────────────────────────────
//

    const detectAllBoundaryRegExp = /^(?:(?:\\b|\\B|\^|\$))+$/g

//
// ─── FLAGS CHECKER ──────────────────────────────────────────────────────────────
//

    const detectOrchestraWithEOL =
        // ../../orchestras/detect-orchestra-with-eol.orchestra
        /(?:^|[^\\])(\\n|\\r|\\f|\\v|\\u0085|\\u2028|\\u2029|(?:\[(?:[^A-Z\[\]\^])*(?:\\s(?:[^A-Z\[\]])*\\S|\\w(?:[^A-Z\[\]])*\\W|\\W(?:[^A-Z\[\]])*\\w|\\S(?:[^A-Z\[\]])*\\s)(?:[^A-Z\[\]])*\]|\[\^(?:[^A-Z\[\]\^])*\]))/g

    const checkIfEmptyExcludeSet =
        // ../../orchestras/check-if-empty-exclude-set.orchestra
        /^\[\^(?:[^A-Z\[\]\^])*\]$/

// ────────────────────────────────────────────────────────────────────────────────
