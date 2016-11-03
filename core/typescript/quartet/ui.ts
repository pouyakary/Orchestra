
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.quartet {

    //
    // ─── UPDATE CODE ON CHANGE ──────────────────────────────────────────────────────
    //

        export function quartetOnUIChange ( event ) {

            switch ( event.type ) {
                case Blockly.Events.MOVE:
                    return;
                case Blockly.Events.UI:
                    storage.currentFile.emptyNewFile = false;
                    break;
                default:
                    ui.filesystem.setFileDirty( true );
                }

            if ( event.type === Blockly.Events.UI && event.element === 'selected' )
                storage.quartetActiveBlockId = event.newValue || event.blockId;

            let compiledRegex = storage.quartetGenerator.blockToCode( storage.ComposeBlock );

            ui.consoleView.setConsoleRegEx( `/${ compiledRegex }/` );
        }

    //
    // ─── FETCH LATEST COMPILED REGEX ────────────────────────────────────────────────
    //

        export function fetchLatestCompiledRegExp ( ) {
            let latestCompiledRegEx = getCurrentRegExpFromConsole( );
            if ( latestCompiledRegEx.length < 3 ) return '';
            return latestCompiledRegEx.substring( 1, latestCompiledRegEx.length - 1 );
        }

    //
    // ─── GET CURRENT REGEX ──────────────────────────────────────────────────────────
    //

        export function getCurrentRegExpFromConsole ( ) {
            return document.getElementById('ribbon-console-regexp')
                .innerText
                .replace(/\u00A0/g, ' ');
        }

    //
    // ─── ON REGEXP COPY ─────────────────────────────────────────────────────────────
    //

        export function onCopyRegExp ( ) {
            externals.electron.clipboard.writeText( getCurrentRegExpFromConsole( ) );
        }

    // ────────────────────────────────────────────────────────────────────────────────

}