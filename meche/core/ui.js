
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

     const clipboard = require('electron').clipboard;

//
// ─── UPDATE CODE ON CHANGE ──────────────────────────────────────────────────────
//

    function mecheOnUIChange ( event ) {
        if ( event.type == Blockly.Events.MOVE ) { return };
        var compiledRegex = MecheGenerator.workspaceToCode( workspace );
        if ( !/^\/.*\/$/.test( compiledRegex ) )  { return };
        document.getElementById( 'ribbon-console-regexp' ).innerText = compiledRegex;
        mecheOnResize( );
    }

//
// ─── ON REGEXP COPY ─────────────────────────────────────────────────────────────
//

    function onCopyRegExp ( ) {
        clipboard.writeText( document.getElementById( 'ribbon-console-regexp' ).innerText );
    }

//
// ─── ON RESIZE ──────────────────────────────────────────────────────────────────
//

    window.onresize = function ( ) {
        mecheOnResize( );
    }

    function mecheOnResize ( ) {
        /*
        setTimeout( function ( ) {
            document.getElementsByClassName('blocklyFlyoutBackground')[ 0 ].setAttribute(
                'd', 'M 0 0 H 350 V ' + ( innerHeight - 150 ) + ' H 0 z'
            );
        });*/
    }

// ────────────────────────────────────────────────────────────────────────────────
