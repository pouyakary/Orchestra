
//
// ─── STORAGE ────────────────────────────────────────────────────────────────────
//

    var EditorInstance;

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const playgroundEditorID = 'playground-editor';
    var   playgroundEditor;

//
// ─── INIT CODE MIRROR ───────────────────────────────────────────────────────────
//

    function initPlaygroundEditor ( ) {
        playgroundEditor = ace.edit( playgroundEditorID );
    }

//
// ─── ON RUN TEST DRIVE ──────────────────────────────────────────────────────────
//

    function onPerformTestDrive ( ) {
        onChangeWindowToPlayground( );
        onPerformMatch( );
    }

//
// ─── ON PERFORM MATCH ───────────────────────────────────────────────────────────
//

    function onPerformMatch ( ) {
        var text = playgroundEditor.getValue( );
        var regX = new RegExp( CompiledRegEx , 'gm' );
        playgroundEditor.findAll( regX );
    }

// ────────────────────────────────────────────────────────────────────────────────
