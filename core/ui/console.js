
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SET CONSOLE REGEX ──────────────────────────────────────────────────────────
//

    function setConsoleRegEx ( html ) {
        document.getElementById( 'ribbon-console-regexp' ).innerHTML = html;
    }

//
// ─── UPDATE CONSOLE TITLE ───────────────────────────────────────────────────────
//

    function updateConsoleTitle ( ) {
        let title = getFileName( );
        let dirtStatus = ( getFileDirtStatus( ) )?
            ' &bullet; Not Saved' : '';
        document.title = title;
        setConsoleTitle(`${ title }${ dirtStatus }`);
    }

//
// ─── SET CONSOLE TITLE ──────────────────────────────────────────────────────────
//

    function setConsoleTitle ( title ) {
        document.getElementById( 'ribbon-console-title' ).innerHTML = title;
    }

// ────────────────────────────────────────────────────────────────────────────────
