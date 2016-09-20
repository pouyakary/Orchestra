
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
// ─── SET CONSOLE TITLE ──────────────────────────────────────────────────────────
//

    function setConsoleTitle ( title ) {
        document.getElementById( 'ribbon-console-title' ).innerHTML = title;
    }

//
// ─── UPDATE CONSOLE TITLE ───────────────────────────────────────────────────────
//

    function updateConsoleTitle ( ) {
        let dirtStatus = ( currentFile.dirty )? ' &bullet; Not Saved' : '';
        setConsoleTitle(`${ path.basename( currentFile.path ) }${ dirtStatus }`);
    }

// ────────────────────────────────────────────────────────────────────────────────
