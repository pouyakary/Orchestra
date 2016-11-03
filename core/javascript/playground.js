
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── INIT MONACO EDITOR ─────────────────────────────────────────────────────────
//

    function initMonacoEditor ( ) {
        let lastValue = '';
        if ( orchestra.storage.playgroundEditor !== null &&
                orchestra.storage.playgroundEditor !== undefined ) {

            lastValue = orchestra.storage.playgroundEditor.getValue( );
            orchestra.storage.playgroundEditor = undefined;

            document.getElementById( orchestra.constants.playgroundEditorID ).innerHTML = '';
        }

        function uriFromPath ( _path ) {
            let pathName = orchestra.externals.path.resolve( _path ).replace( /\\/g, '/' );
            if ( pathName.length > 0 && pathName.charAt( 0 ) !== '/' )
                pathName = '/' + pathName;
            return encodeURI( 'file://' + pathName );
        }

        require.config({
            baseUrl: uriFromPath( __dirname )
        })

        // workaround monaco-css not understanding the environment
        self.module = undefined;

        // workaround monaco-typescript not understanding the environment
        self.process.browser = true;

        require([ 'vs/editor/editor.main' ], function ( ) {

            const MatchLanguageName = 'CurrentMatchLanguage';
            monaco.languages.register({ id: MatchLanguageName });

            let tokenizer = { };
            let CompiledRegEx = orchestra.quartet.fetchLatestCompiledRegExp( );

            if ( CompiledRegEx !== '' )
                try {
                    // so if the regX be horrible it would get out of the try
                    tokenizer = { root: [[
                        new RegExp( CompiledRegEx, 'm') , "match" ]]};

                } catch ( error ) {

                };

            monaco.languages.setMonarchTokensProvider( MatchLanguageName, {
                tokenizer: tokenizer
            });

            orchestra.storage.playgroundEditor = monaco.editor.create(
                document.getElementById( orchestra.constants.playgroundEditorID ), {
                    value: lastValue,
                    language: MatchLanguageName,
                    fontFamily: 'GraphSourceCodePro',
                    fontSize: 14,
                    lineHeight: 24,
                    renderWhitespace: true,
                    insertSpaces: false,
                }
            );
        });
    }

// ────────────────────────────────────────────────────────────────────────────────
