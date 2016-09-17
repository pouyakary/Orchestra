
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── CHANGE TO EDITOR ───────────────────────────────────────────────────────────
//

    function onChangeWindowToEditor ( ) {
        CurrentActiveView = 'editor';
        document.getElementById( EditorWindowScreenElement ).hidden = false;
        document.getElementById( PlaygroundWindowScreenElement ).hidden = true;
        document.getElementById( TabsPlaceholder ).className = 'editor-tab';

        Blockly.fireUiEvent( window, 'resize' );
    }

//
// ─── CHANGE TO PLAYGROUND ───────────────────────────────────────────────────────
//

    function onChangeWindowToPlayground ( ) {
        CurrentActiveView = 'playground';
        document.getElementById( EditorWindowScreenElement ).hidden = true;
        document.getElementById( PlaygroundWindowScreenElement ).hidden = false;
        document.getElementById( TabsPlaceholder ).className = 'playground-tab';

        initMonacoEditor( );
        playgroundEditor.layout( );
    }

// ────────────────────────────────────────────────────────────────────────────────
