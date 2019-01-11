
//
// Copyright © 2016-presentPouya Kary. All Rights Reserved
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
        document.getElementById( 'orchestra-console-view-content' ).innerHTML = specialHTML
        // console.log( specialHTML )
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
        const sideConsole =
            document.getElementById( editorContainerId )
        const toggleConsoleClassIcon =
            document.getElementById( ribbonToggleConsoleIconId )

        if ( sideConsole.className === "" ) {
            sideConsole.className = hideShowSideConsoleClassName
            toggleConsoleClassIcon.classList.add( activeRibbonIconClass )
        } else {
            sideConsole.className = ""
            toggleConsoleClassIcon.classList.remove( activeRibbonIconClass )
        }

        let resizer = setInterval( ( ) => {
            Blockly.svgResize( workspace )
        }, 15 )

        setTimeout( ( ) => {
            clearInterval( resizer )
        }, 400 )
    }

//
// ─── RENDER COMPILER OPTIONS VIEW ───────────────────────────────────────────────
//

    function renderCompilerOptionsView ( ) {
        activateTargetButton( )
        activateFormatButton( )
    }

//
// ─── REFRESH ACTIVATED FLAGS VIEW ───────────────────────────────────────────────
//

    function refreshActivatedFlagConsoleView ( ) {
        const flagsViewHTML =
            Object.keys( activatedFlags )
                .map( key =>
                    `<div class="sidebar-flags${ activatedFlags[ key ]? ' active' : '' }">${ key }</div>` )

        document.getElementById('orchestra-console-view-flags').innerHTML =
            flagsViewHTML.join('')
    }

//
// ─── SET ECMASCRIPT TARGET ──────────────────────────────────────────────────────
//

    function onSetTargetECMAScript ( target ) {
        currentFile.compilerECMAScriptTarget = target
        activateTargetButton( )
    }

    function activateTargetButton ( ) {
        if ( currentFile.compilerECMAScriptTarget === 'es6' ) {
            setConsoleOptionActivation( 'console-target-option-es6', true )
            setConsoleOptionActivation( 'console-target-option-es5', false )
        } else {
            setConsoleOptionActivation( 'console-target-option-es6', false )
            setConsoleOptionActivation( 'console-target-option-es5', true )
        }
    }

//
// ─── SET COMPILER FORMAT ────────────────────────────────────────────────────────
//

    function onSetCopyOutputFormat ( format ) {
        currentFile.compilerOutputFormat = format
        activateFormatButton( )
    }

    function activateFormatButton ( ) {
        if ( currentFile.compilerOutputFormat === 'regexp' ) {
            setConsoleOptionActivation( 'console-output-format-regexp', true )
            setConsoleOptionActivation( 'console-output-format-string', false )
        } else {
            setConsoleOptionActivation( 'console-output-format-regexp', false )
            setConsoleOptionActivation( 'console-output-format-string', true )
        }
    }

//
// ─── GENERAL CONSOLE OPTION ─────────────────────────────────────────────────────
//

    function setConsoleOptionActivation ( id, activation ) {
        if ( activation )
            document.getElementById( id ).classList.add('active')
        else
            document.getElementById( id ).classList.remove('active')
    }

// ────────────────────────────────────────────────────────────────────────────────
