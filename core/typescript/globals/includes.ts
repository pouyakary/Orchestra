
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.externals {

    //
    // ─── INCLUDES ───────────────────────────────────────────────────────────────────
    //

        export const electron = require( 'electron' )
        export const orchestraWindow = electron.remote.getCurrentWindow( )
        export const openExternal = electron.shell.openExternal
        export const regulex = require( 'regulex' )

    //
    // ─── NODE LOADS ─────────────────────────────────────────────────────────────────
    //

        export const path = require( 'path' )
        export const fs   = require( 'fs' )

    // ────────────────────────────────────────────────────────────────────────────────

}