
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── FILE SYSTEM ────────────────────────────────────────────────────────────────
//

    var currentFile = defaultFileObject;

//
// ─── APP MENU ───────────────────────────────────────────────────────────────────
//

    var OrchestraAppMenu;

//
// ─── TAB MANAGER ────────────────────────────────────────────────────────────────
//

    var CurrentActiveView = 'editor';

//
// ─── EDITOR ─────────────────────────────────────────────────────────────────────
//

    var QuartetGenerator;
    var quartetActiveBlockId = '';
    var workspace;
    var CompiledRegEx = '';
    var ComposeBlock;

//
// ─── PLAYGROUND ─────────────────────────────────────────────────────────────────
//

    var playgroundEditor;

// ────────────────────────────────────────────────────────────────────────────────
