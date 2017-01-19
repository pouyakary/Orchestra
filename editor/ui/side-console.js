
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── TOGGLE CONSOLE ─────────────────────────────────────────────────────────────
//

    function onToggleSideConsole ( ) {
        let sideConsole = document.getElementById( editorContainerId )
        let toggleConsoleClassIcon = document.getElementById( ribbonToggleConsoleIconId )

        if ( sideConsole.className === "" ) {
            sideConsole.className = hideShowSideConsoleClassName
            toggleConsoleClassIcon.classList.add( activeRibbonIconClass )
        } else {
            sideConsole.className = ""
            toggleConsoleClassIcon.classList.remove( activeRibbonIconClass )
        }

        let resizer = setInterval( ( ) => { Blockly.svgResize( workspace ) }, 15 )
        setTimeout( ( ) => { clearInterval( resizer ) }, 400 )
    }

// ────────────────────────────────────────────────────────────────────────────────
