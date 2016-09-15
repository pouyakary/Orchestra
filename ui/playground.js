
//
// ─── STORAGE ────────────────────────────────────────────────────────────────────
//

    var EditorInstance;

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const PlaygroundEditorID = 'playground-editor';

//
// ─── INIT CODE MIRROR ───────────────────────────────────────────────────────────
//

    function initPlaygroundCodeMirror ( ) {
        EditorInstance = ace.edit( 'playground-editor' );
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
        var editor = document.getElementById('playground-editor');
        var text = editor.innerText;
        console.log( text );
        var regX = new RegExp( CompiledRegEx , 'gm' );
        var highlightedText = text.replace( regX, match => {
            return `<span class="playground-match">${ match }</span>`;
        });
        editor.innerHTML = highlightedText;
    }

// ────────────────────────────────────────────────────────────────────────────────
