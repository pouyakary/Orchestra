
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
        document.getElementById( 'ribbon-console-regexp' ).innerHTML = html
    }

//
// ─── UPDATE CONSOLE TITLE ───────────────────────────────────────────────────────
//

    function updateConsoleTitle ( ) {
        let title = getFileName( )
        let dirtStatus = ( getFileDirtStatus( ) )? ' &bullet; Not Saved' : ''
        document.title = title
        setConsoleTitle(`${ title }${ dirtStatus }`)
        OrchestraWindow.setRepresentedFilename( title )
    }

//
// ─── SET CONSOLE TITLE ──────────────────────────────────────────────────────────
//

    function setConsoleTitle ( title ) {
        document.getElementById( 'ribbon-console-title' ).innerHTML = title
    }

// ────────────────────────────────────────────────────────────────────────────────
