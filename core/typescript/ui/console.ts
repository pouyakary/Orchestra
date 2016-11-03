
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.consoleView {

    //
    // ─── SET CONSOLE REGEX ──────────────────────────────────────────────────────────
    //

        export function setConsoleRegEx ( html: string ) {
            document.getElementById( 'ribbon-console-regexp' ).innerHTML = html;
        }

    //
    // ─── UPDATE CONSOLE TITLE ───────────────────────────────────────────────────────
    //

        export function updateConsoleTitle ( ) {
            let title = filesystem.getFileName( );
            let dirtStatus = ( filesystem.getFileDirtStatus( ) )?
                ' &bullet; Not Saved' : '';
            document.title = title;
            setConsoleTitle(`${ title }${ dirtStatus }`);
            externals.orchestraWindow.setRepresentedFilename( title );
        }

    //
    // ─── SET CONSOLE TITLE ──────────────────────────────────────────────────────────
    //

        export function setConsoleTitle ( title: string ) {
            document.getElementById( 'ribbon-console-title' ).innerHTML = title;
        }

    // ────────────────────────────────────────────────────────────────────────────────

}