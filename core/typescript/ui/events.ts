
//
// ─── BLUR EVENT ─────────────────────────────────────────────────────────────────
//

    orchestra.externals.orchestraWindow.addListener( 'blur', ( ) => {
        orchestra.menu.setMenuEnableFactor( false );
        orchestra.makeWindowButtonsBlur( );
        orchestra.externals.orchestraWindow.blurWebView( );
    });

//
// ─── GAIN FOCUS ─────────────────────────────────────────────────────────────────
//

    orchestra.externals.orchestraWindow.addListener( 'focus', ( ) => {
        orchestra.menu.setMenuEnableFactor( true );
        orchestra.makeWindowButtonsActive( );
        orchestra.externals.orchestraWindow.focusOnWebView( );
    });

//
// ─── MORE EVENTS ────────────────────────────────────────────────────────────────
//

    document.addEventListener( 'dragover', event => event.preventDefault( ) );
    document.addEventListener( 'drop', event => event.preventDefault( ) );

//
// ─── WINDOW RESIZE ──────────────────────────────────────────────────────────────
//

    window.onresize = ( ) => {
        if ( orchestra.storage.playgroundEditor !== undefined )
            orchestra.storage.playgroundEditor.layout( );
    }

// ────────────────────────────────────────────────────────────────────────────────
