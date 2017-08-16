
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── UPDATE CODE ON CHANGE ──────────────────────────────────────────────────────
//

    function quartetOnUIChange ( event ) {
        switch ( event.type ) {
            case Blockly.Events.MOVE:
                return
            case Blockly.Events.UI:
                currentFile.emptyNewFile = false
                break
            default:
                setFileDirty( true )
            }

        if ( event.type === Blockly.Events.UI && event.element === 'selected' )
            quartetActiveBlockId = event.newValue || event.blockId

        const compiledRegex = QuartetGenerator.blockToCode( ComposeBlock )

        setConsoleRegEx( `/${ compiledRegex }/` )

        updateFlagsForLatestBuild( )
        refreshActivatedFlagConsoleView( )
    }

//
// ─── FETCH LATEST COMPILED REGEX ────────────────────────────────────────────────
//

    function fetchLatestCompiledRegExp ( ) {
        const latestCompiledRegEx = getCurrentRegExpFromConsole( )
        if ( latestCompiledRegEx.length < 3 ) return ''
        return latestCompiledRegEx.substring( 1, latestCompiledRegEx.length - 1 )
    }

//
// ─── GET CURRENT REGEX ──────────────────────────────────────────────────────────
//

    function getCurrentRegExpFromConsole ( ) {
        return document.querySelector('storage')
            .innerText
            .replace(/\u00A0/g, ' ')
    }

//
// ─── ON REGEXP COPY ─────────────────────────────────────────────────────────────
//

    function onCopyRegExp ( ) {
        clipboard.writeText( getCurrentRegExpFromConsole( ) )
    }

//
// ─── ON COPY ESCAPED STRING REGEXP ──────────────────────────────────────────────
//

    function onGetEscapedStringRegExp ( ) {
        const source = getCurrentRegExpFromConsole( )
        const regX = new RegExp( source.substring( 1, source.length - 1 ) )
                        .source
                        .replace( /\\/g, '\\\\' )

        clipboard.writeText(`"${ regX }"`)
    }

// ────────────────────────────────────────────────────────────────────────────────
