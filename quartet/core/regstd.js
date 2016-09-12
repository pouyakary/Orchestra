

//
// ─── WHITESPACE CHARACTER ───────────────────────────────────────────────────────
//

    var __SPACE_UNICODE_STRING__ = "\\u0020";

//
// ─── TO UNICODE ─────────────────────────────────────────────────────────────────
//

    function quartetUnicodify ( text ) {
        let result = [ ];
        for ( let character of text ) {
            result.push( getUnicodeCharacter( character ) );
        }
        return result.join('');
    }

//
// ─── GET UNICODE CHARACTER ──────────────────────────────────────────────────────
//

    function getUnicodeCharacter ( character ) {
        let num = character.charCodeAt( 0 ).toString( 16 ).toUpperCase( );
        let size = 4 - num.length;
        for ( let index = 0; index < size; index++ ) {
            num = '0' + num;
        }
        return '\\u' + num;
    }

//
// ─── SEQUENCE MAKER ─────────────────────────────────────────────────────────────
//

    function quartetSequence ( code ) {
        return ( code.length <= 1 )? code : '(?:' + code + ')';
    }

//
// ─── ENCODE TEXT ────────────────────────────────────────────────────────────────
//

    function quartetEncodeText ( code ) {
        var result = [ ];
        for ( var character of code ) {
            switch ( character ) {
                case '.':
                case '\\':
                case '+':
                case '*':
                case '?':
                case '[':
                case '^':
                case ']':
                case '$':
                case '(':
                case ')':
                case '{':
                case '}':
                case '=':
                case '!':
                case '<':
                case '>':
                case '|':
                case ':':
                case '-':
                    result.push( `\\${ character }` );
                    break;
                default:
                    result.push( character );
            }
        }
        return result.join('');
    }

//
// ─── SPACE ENCODE ───────────────────────────────────────────────────────────────
//

    function quartetSpaceEncode ( text ) {
        let result = '';
        for ( let character of code ) {
            switch ( character ) {
                case ' ':
                    result += __SPACE_UNICODE_STRING__;
                    return;
                default:
                    result += character;
            }
        }
        return result;
    }

//
// ─── SPACE DECODE ───────────────────────────────────────────────────────────────
//

    function quartetSpaceDecode ( text ) {
        return text.replace( /\\u0020/g, ' ' );
    }

//
// ─── MAKE ALPHABET ──────────────────────────────────────────────────────────────
//

    function quartetAlphabet ( text ) {
        return ( text.length === 1 )? text : '[' + text.join('') + ']';
    }

// ────────────────────────────────────────────────────────────────────────────────
