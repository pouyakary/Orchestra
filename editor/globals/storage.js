
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── FILE SYSTEM ────────────────────────────────────────────────────────────────
//

    var currentFile = Object.assign({ }, defaultFileObject )

//
// ─── WINDOW STATUS ──────────────────────────────────────────────────────────────
//

    var WindowTheme = 'light'

//
// ─── APP MENU ───────────────────────────────────────────────────────────────────
//

    var OrchestraAppMenu
    var ViewMenuThemeMode

//
// ─── TAB MANAGER ────────────────────────────────────────────────────────────────
//

    var CurrentActiveView = 'editor'

//
// ─── EDITOR ─────────────────────────────────────────────────────────────────────
//

    var QuartetGenerator
    var quartetActiveBlockId = ''
    var workspace
    var ComposeBlock

//
// ─── PLAYGROUND ─────────────────────────────────────────────────────────────────
//

    var playgroundEditor

// ────────────────────────────────────────────────────────────────────────────────
