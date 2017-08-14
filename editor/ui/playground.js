
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── FETCH MATCHES ──────────────────────────────────────────────────────────────
//

    function playgroundFetchLatestMatches ( ) {
        let matches = [ ]
        let counter = 1
        const regX = new RegExp( playgroundCompiledRegX, 'mg' )
        while ( true ) {
            const match = regX.exec( playgroundEditor.getValue( ) )
            
            if ( match === null )
                return matches

            matches.push({
                text:       match[ 0 ],
                startIndex: match.index,
                endIndex:   match[ 0 ].length + match.index,
                no:         counter++,
                groups:     match.slice( 1 )
            })
        }
    }

//
// ─── TEST COMPILED REGEXP ───────────────────────────────────────────────────────
//

    function testCompiledRegExp ( ) {
        try {
            // test if compiled regexp is empty
            if ( playgroundCompiledRegX === '' || playgroundCompiledRegX === undefined )          return false

            // see if regexp is only about boundaries
            if ( detectAllBoundaryRegExp.text( playgroundCompiledRegX ) )
                return false

            // test if RegExp is working good
            new RegExp( playgroundCompiledRegX, 'mg' )

            // we are okay
            return true
        } catch ( e ) {
            return false
        }
    }

//
// ─── MATCH PROVIDER ─────────────────────────────────────────────────────────────
//

    function pushDecorationsToTheModel ( ) {
        if ( ! testCompiledRegExp( ) ) return;

        playgroundLatestMatches = playgroundFetchLatestMatches( )

        const decorations = playgroundLatestMatches.map( match => {
            const startPosition =
                playgroundEditor.model.getPositionAt( match.startIndex )
            const endPosition   =
                playgroundEditor.model.getPositionAt( match.endIndex )

            return {
                range: new monaco.Range(
                    startPosition.lineNumber,
                    startPosition.column,
                      endPosition.lineNumber,
                      endPosition.column
                ),
                options: {
                    className:      "match-token",
                    hoverMessage:   createHoverMessage( match ),
                }
            }
        })

        playgroundOldDecorations =
            playgroundEditor.deltaDecorations( playgroundOldDecorations , decorations )
    }

//
// ─── REMOVE DECORATIONS ─────────────────────────────────────────────────────────
//

    function removeDecorationsFromPlayground ( ) {
        playgroundOldDecorations =
            playgroundEditor.deltaDecorations( playgroundOldDecorations, [{
                range: new monaco.Range( 1, 1, 1, 1 ),
                options : { }
            }])
    }

//
// ─── CREATING HOVER MESSAGE ─────────────────────────────────────────────────────
//

    function createHoverMessage ( match ) {
        let groupCounter = 1
        const groups = match.groups.map( group => {
            let groupValue
            if ( group === undefined )
                groupValue = '_Empty_' 
            else
                groupValue = "`" + group + "`"

            return `Group ${ groupCounter++ }: ${ groupValue }`
        })

        return(
            `__Match No. ${ match.no }__\n\n` +
            `Range: ${ match.startIndex } &mdash; ${ match.endIndex - 1 }\n\n` +
            `*****\n\n` +
            `\`\`\`\n${ match.text }\n\`\`\`\n\n` +
            (( groupCounter === 1 )? '' : '\n\n*****\n\n' ) +
            groups.join('\n\n')
        )
    }

//
// ─── INIT MONACO EDITOR ─────────────────────────────────────────────────────────
//

    function initMonacoEditor ( ) {
        // constants
        playgroundCompiledRegX = fetchLatestCompiledRegExp( )
        playgroundFontSize = 14
        playgroundOldDecorations = [ ]

        let lastValue = ''
        if ( playgroundEditor !== null && playgroundEditor !== undefined ) {
            lastValue = playgroundEditor.getValue( )
            playgroundEditor = undefined
            document.getElementById(playgroundEditorID).innerHTML = ''
        }

        function uriFromPath ( _path ) {
            const pathName = path.resolve( _path ).replace( /\\/g, '/' )
            if ( pathName.length > 0 && pathName.charAt( 0 ) !== '/' )
                pathName = '/' + pathName
            return encodeURI( 'file://' + pathName )
        }

        require.config({
            baseUrl: uriFromPath(
                path.join( __dirname, 'node_modules', 'monaco-editor', 'min' ))
        })

        // workaround monaco-css not understanding the environment
        self.module = undefined

        // workaround monaco-typescript not understanding the environment
        self.process.browser = true

        require([ 'vs/editor/editor.main' ], function ( ) {

            const MatchLanguageName = 'CurrentMatchLanguage'
            monaco.languages.register({ id: MatchLanguageName })

            setupPlaygroundMonacoThemes( monaco )

            playgroundEditor = monaco.editor.create(
                document.getElementById( playgroundEditorID ), {
                    value: lastValue,
                    language: MatchLanguageName,
                    fontFamily: 'GraphSourceCodePro',
                    fontSize: playgroundFontSize,
                    lineHeight: getPlaygroundLineHeight( ),
                    suggestOnTriggerCharacters: false,
                    renderWhitespace: true,
                    insertSpaces: false,
                    mouseWheelZoom: false,
                    quickSuggestions: false,
                    minimap: false,
                    theme: WindowTheme
                }
            )

            // decoration handlers
            setupPlaygroundChangeContentEvent( )
            pushDecorationsToTheModel( )
        })
    }

//
// ─── ON CHANGE EVENTS ───────────────────────────────────────────────────────────
//

    function setupPlaygroundChangeContentEvent ( ) {
        const delay = 100;
        clearTimeout( playgroundDecorationDelayerTimeout )

        playgroundEditor.getModel( ).onDidChangeContent( e => {
            clearTimeout( playgroundDecorationDelayerTimeout )
            removeDecorationsFromPlayground( )
            playgroundDecorationDelayerTimeout =
                setTimeout( pushDecorationsToTheModel, delay )
        })
    }

//
// ─── OPEN FILE ON PLAYGROUND ────────────────────────────────────────────────────
//

    function onOpenFileOnPlayground ( ) {
        // get file path
        let filePath = dialog.showOpenDialog( getWindowForDialogSheets( ), {
            properties: [ 'openFile' ]
        })

        if ( filePath === undefined || filePath.length === 0 ) return;

        fs.readFile( filePath[ 0 ].toString( ) , ( err, fileData ) => {
            if ( err === true ) {
                return;
            }
            playgroundEditor.setValue( fileData.toString( ) )
        })
    }

//
// ─── ON RUN TEST DRIVE ──────────────────────────────────────────────────────────
//

    function onPerformTestDrive ( ) {
        onChangeWindowToPlayground( )
    }

//
// ─── SET PLAYGROUND COLOR ───────────────────────────────────────────────────────
//

    function changePlaygroundThemeTo ( mode ) {
        if ( playgroundEditor ) {
            monaco.editor.setTheme( WindowTheme )
            playgroundEditor.updateOptions({
                theme: WindowTheme
            })
        }
    }

//
// ─── MAKE FONT SIZE BIGGER ──────────────────────────────────────────────────────
//

    function playgroundMakeFontSizeBigger ( ) {
        playgroundFontSize++
        updatePlaygroundFontSize( )
    }

    function playgroundMakeFontSizeSmaller ( ) {
        playgroundFontSize--
        updatePlaygroundFontSize( )
    }

    function updatePlaygroundFontSize ( ) {
        if ( playgroundEditor )
            playgroundEditor.updateOptions({
                fontSize: playgroundFontSize,
                lineHeight: getPlaygroundLineHeight( )
            })
    }

//
// ─── GET LINE HEIGHT BASED ON FONT SIZE ─────────────────────────────────────────
//

    function getPlaygroundLineHeight ( ) {
        return Math.floor( playgroundFontSize * 1.8 )
    }

//
// ─── DARK THEME ─────────────────────────────────────────────────────────────────
//

    function setupPlaygroundMonacoThemes ( monaco ) {
        // light
        monaco.editor.defineTheme( 'light', {
            base: 'vs',
            inherit: true,
            rules: [{ background: 'F7F7F7' }],
            colors: {
                'editor.foreground':                    '#141414',
                'editor.background':                    '#F7F7F7',
                'editorCursor.foreground':              '#00BBEC',
                'editor.lineHighlightBackground':       '#F7F7F7',
                'editorLineNumber.foreground':          '#2A75C0',
                'editor.selectionBackground':           '#C2E8F4',
                'editor.inactiveSelectionBackground':   '#88000015'
            }
        })

        // dark
        monaco.editor.defineTheme( 'dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [{ background: '1E1E1E' }],
            colors: {
                'editor.foreground':                    '#C1C1C1',
                'editor.background':                    '#1E1E1E',
                'editorCursor.foreground':              '#7DA76F',
                'editor.lineHighlightBackground':       '#1E1E1E',
                'editorLineNumber.foreground':          '#668BB7',
                'editor.selectionBackground':           '#E0DEFF',
                'editor.inactiveSelectionBackground':   '#88000015'
            }
        })
    }

// ────────────────────────────────────────────────────────────────────────────────