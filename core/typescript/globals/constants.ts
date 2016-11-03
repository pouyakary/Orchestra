
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.constants {

    //
    // ─── FILE DEFAULTS ──────────────────────────────────────────────────────────────
    //

        export const defaultFileXML = '<xml><block type="compose" deletable="false"></block></xml>'

        export const defaultEmptyPath = 'Undefined'

        export const defaultFileObject = {
            path: defaultEmptyPath,
            dirty: true,
            emptyNewFile: true,
        }

    //
    // ─── IDS ────────────────────────────────────────────────────────────────────────
    //

        export const EditorWindowScreenElement = 'EditorView'
        export const PlaygroundWindowScreenElement = 'PlaygroundView'
        export const TabsPlaceholder = 'header-tabs'
        export const playgroundEditorID = 'playground-editor'
        export const composeBlockIDforSVGCanvas = 'TheComposeBlockSVGCanvas'

    //
    // ─── SPECIAL CHARS ──────────────────────────────────────────────────────────────
    //

        export const __SPACE_UNICODE_STRING__ = "\\u0020"

    // ────────────────────────────────────────────────────────────────────────────────

}