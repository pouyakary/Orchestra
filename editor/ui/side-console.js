
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── SET CONSOLE REGEX ──────────────────────────────────────────────────────────
//

    function setConsoleRegEx ( html ) {
        const specialHTML = annotateRegExpForSideConsole( html )
        document.querySelector( 'storage' ).innerHTML = html
        document.getElementById( 'quartet-console-view-content' ).innerHTML = specialHTML
        console.log( specialHTML )
    }

//
// ─── ANNOTATE REGEXP FOR THE SIDE CONSOLE ───────────────────────────────────────
//

    function annotateRegExpForSideConsole ( regX ) {
        const wrapInRightSpan = x => `<span style="color: var( --side-console-invisible-char );">&${ x };</span>`
        return regX.replace( /&nbsp;|&#160;|\n|&Tab;|\t/g , match => {
            switch ( match ) {
                case '&nbsp;':
                case '&#160;':
                    return wrapInRightSpan( 'bullet' )
                case '&Tab;':
                case '\t':
                    return wrapInRightSpan( 'rarr' )
                case '\n':
                    return wrapInRightSpan( 'crarr' )
            }
        })
    }

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
