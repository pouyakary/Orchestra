
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.storage {

    //
    // ─── FILE SYSTEM ────────────────────────────────────────────────────────────────
    //

        export var currentFile = orchestra.constants.defaultFileObject

    //
    // ─── APP MENU ───────────────────────────────────────────────────────────────────
    //

        export var OrchestraAppMenu

    //
    // ─── TAB MANAGER ────────────────────────────────────────────────────────────────
    //

        export var CurrentActiveView = 'editor'

    //
    // ─── EDITOR ─────────────────────────────────────────────────────────────────────
    //

        export var quartetGenerator
        export var quartetActiveBlockId = ''
        export var workspace: Blockly.Workspace
        export var ComposeBlock

    //
    // ─── PLAYGROUND ─────────────────────────────────────────────────────────────────
    //

        export var playgroundEditor

    // ────────────────────────────────────────────────────────────────────────────────

}