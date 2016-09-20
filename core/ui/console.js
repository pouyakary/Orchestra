
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
        let title = ( currentFile.path === defaultEmptyPath )?
            'Untitled.quartet' : path.basename( currentFile.path );
        let dirtStatus = ( currentFile.dirty )?
            ' &bullet; Not Saved' : '';
        setConsoleTitle(`${ title }${ dirtStatus }`);
    }

//
// ─── SET CONSOLE TITLE ──────────────────────────────────────────────────────────
//

    function setConsoleTitle ( title ) {
        document.getElementById( 'ribbon-console-title' ).innerHTML = title;
    }

// ────────────────────────────────────────────────────────────────────────────────
