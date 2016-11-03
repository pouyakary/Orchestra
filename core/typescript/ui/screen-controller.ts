
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra {

    //
    // ─── CHANGE TO EDITOR ───────────────────────────────────────────────────────────
    //

        export function onChangeWindowToEditor ( ) {
            storage.CurrentActiveView = 'editor';
            document.getElementById( constants.EditorWindowScreenElement ).hidden = false;
            document.getElementById( constants.PlaygroundWindowScreenElement ).hidden = true;
            document.getElementById( constants.TabsPlaceholder ).className = 'editor-tab';

            Blockly.fireUiEvent( window, 'resize' );
        }

    //
    // ─── CHANGE TO PLAYGROUND ───────────────────────────────────────────────────────
    //

        export function onChangeWindowToPlayground ( ) {
            storage.CurrentActiveView = 'playground';
            document.getElementById( constants.EditorWindowScreenElement ).hidden = true;
            document.getElementById( constants.PlaygroundWindowScreenElement ).hidden = false;
            document.getElementById( constants.TabsPlaceholder ).className = 'playground-tab';

            initMonacoEditor( );
            storage.playgroundEditor.layout( );
        }

    // ────────────────────────────────────────────────────────────────────────────────

}