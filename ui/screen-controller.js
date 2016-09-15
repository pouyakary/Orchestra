
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── DEFS ───────────────────────────────────────────────────────────────────────
//

    const EditorWindowScreenElement = 'EditorView';
    const PlaygroundWindowScreenElement = 'PlaygroundView';
    const TabsPlaceholder = 'header-tabs';

    var CurrentActiveView = 'editor';

//
// ─── CHANGE TO EDITOR ───────────────────────────────────────────────────────────
//

    function onChangeWindowToEditor ( ) {
        CurrentActiveView = 'editor';
        document.getElementById( EditorWindowScreenElement ).hidden = false;
        document.getElementById( PlaygroundWindowScreenElement ).hidden = true;
        document.getElementById( TabsPlaceholder ).className = 'editor-tab';
    }

//
// ─── CHANGE TO PLAYGROUND ───────────────────────────────────────────────────────
//

    function onChangeWindowToPlayground ( ) {
        CurrentActiveView = 'playground';
        document.getElementById( EditorWindowScreenElement ).hidden = true;
        document.getElementById( PlaygroundWindowScreenElement ).hidden = false;
        document.getElementById( TabsPlaceholder ).className = 'playground-tab';
    }

// ────────────────────────────────────────────────────────────────────────────────
