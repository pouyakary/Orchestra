
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.quartet {

    //
    // ─── SUPPORTING FUNCTIONS ───────────────────────────────────────────────────────
    //

        export function getHelpURLbyID ( id ) {
            return `javascript: openHelpWindowForReference("${ id }");`;
        }

    //
    // ─── COMPOSE ────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['compose'] = {
            helpUrl: getHelpURLbyID( 'compose' ),
            init: function() {
                this.appendDummyInput()
                    .appendField("Quartet");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setInputsInline(false);
                this.setColour(120);
                this.setTooltip('');
                this.setHelpUrl( 'compose' );
            }
        };

        storage.quartetGenerator['compose'] = function(block) {
            var statements_children = storage.quartetGenerator.statementToCode( block, 'blocks' ).trim( );
            return statements_children.trim( );
        };

    //
    // ─── ALPHABET ───────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['alphabet'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Alphabet")
                    .appendField("0-9")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "numbers")
                    .appendField("a-z")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "lowercase")
                    .appendField("A-Z")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "uppercase")
                    .appendField("Other")
                    .appendField(new Blockly.FieldTextInput(""), "other");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(260);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['alphabet'] = function(block) {
            var checkbox_numbers = block.getFieldValue('numbers') == 'TRUE';
            var checkbox_lowercase = block.getFieldValue('lowercase') == 'TRUE';
            var checkbox_uppercase = block.getFieldValue('uppercase') == 'TRUE';
            var text_other = block.getFieldValue('other');

            var code = '';
            if ( checkbox_numbers ) { code += '0-9' };
            if ( checkbox_lowercase ) { code += 'a-z' };
            if ( checkbox_uppercase ) { code += 'A-Z' };
            code += regstd.quartetEncodeText( text_other );

            return '[' + code + ']';
        };

    //
    // ─── ENCODE UNICODE ─────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'unicode' ] = {
            init: function ( ) {
                this.appendDummyInput( )
                    .appendField( "Encode Unicode" )
                    .appendField( new Blockly.FieldTextInput( "" ), "text" );
                this.setInputsInline( true );
                this.setPreviousStatement( true, "String" );
                this.setNextStatement( true, "String" );
                this.setColour( 330 );
                this.setTooltip( '' );
                this.setHelpUrl( 'http://www.example.com/' );
            }
        };

        storage.quartetGenerator[ 'unicode' ] = function ( block ) {
            return regstd.quartetUnicodify( block.getFieldValue( 'text' ) );
        };

    //
    // ─── ENCODE ─────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'encode' ] = {
            init: function ( ) {
                this.appendDummyInput( )
                    .appendField( "Plain Text" )
                    .appendField( new Blockly.FieldTextInput( "" ), "text" );
                this.setInputsInline( true );
                this.setPreviousStatement( true, "String" );
                this.setNextStatement( true, "String" );
                this.setColour( 330 );
                this.setTooltip( '' );
                this.setHelpUrl( 'http://www.example.com/' );
            }
        };

        storage.quartetGenerator[ 'encode' ] = function ( block ) {
            return regstd.quartetEncodeText( block.getFieldValue( 'text' ) );
        };

    //
    // ─── FREE FORM REGEX ────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'free_form_regex' ] = {
            init: function ( ) {
                this.appendDummyInput( )
                    .appendField( "Unsafe Wildcard" )
                    .appendField( new Blockly.FieldTextInput( "" ), "regex" );
                this.setInputsInline( true );
                this.setPreviousStatement( true, "String" );
                this.setNextStatement( true, "String" );
                this.setColour( 330 );
                this.setTooltip( '' );
                this.setHelpUrl( 'http://www.example.com/' );
            }
        };

        storage.quartetGenerator[ 'free_form_regex' ] = function ( block ) {
            return regstd.quartetSpaceEncode( block.getFieldValue( 'regex' ) );
        };

    //
    // ─── MORE THAN ONE ──────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'one_or_more' ] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("One or more");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'one_or_more' ] = function ( block ) {
            var statements_regex = storage.quartetGenerator.statementToCode( block, 'blocks' ).trim( );
            return regstd.quartetSequence( statements_regex ) + '+';
        };

    //
    // ─── ANY NUMBER OF ──────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['any_number_of'] = {
            init: function() {
                this.appendDummyInput( )
                    .appendField("Any number of");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['any_number_of'] = function(block) {
            var statements_regex = storage.quartetGenerator.statementToCode( block, 'blocks' ).trim( );
            return regstd.quartetSequence( statements_regex ) + '*';
        };

    //
    // ─── ANY CHARACTER ──────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'any' ] = {
            init: function( ) {
                this.appendDummyInput()
                    .appendField("Any character but new line");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'any' ] = function ( block ) {
            return '.';
        };


    //
    // ─── MAYBE ──────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['maybe'] = {
            init: function() {
                this.appendDummyInput( )
                    .appendField("Maybe");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'maybe' ] = function( block ) {
            var statements_name = storage.quartetGenerator.statementToCode( block, 'blocks' ).trim();
            return regstd.quartetSequence( statements_name ) + '?';
        };


    //
    // ─── ONE OF ─────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['one_of'] = {
            init: function() {
                this.appendDummyInput( )
                    .appendField("One of options");
                this.appendStatementInput("blocks")
                    .setCheck("QuartetOption");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['one_of'] = function(block) {
            function cut ( text, start, end ) {
                return text.substring( 0, start ) + text.substring( end );
            }
            var statements_items = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            if ( statements_items.startsWith('<') ) {
                if ( statements_items.length === 52 ) {
                    return '';
                } else {
                    return regstd.quartetSequence( cut( statements_items, 45, 46 ) );
                }
            } else {
                return regstd.quartetSequence( statements_items.substring( 1 ) );
            }
        };

    //
    // ─── QUARTET OPTION ──────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['option'] = {
            init: function() {
                this.appendStatementInput("blocks")
                    .setCheck(null)
                    .appendField("Option")
                    .setCheck("String");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "QuartetOption");
                this.setNextStatement(true, "QuartetOption");
                this.setColour(160);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['option'] = function ( block ) {
            return '|' + storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
        };

    //
    // ─── START OF THE LINE ──────────────────────────────────────────────────────────
    //

        Blockly.Blocks['line_start'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Start of the Line");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'line_start' ] = function ( block ) {
            return '^';
        };

    //
    // ─── END OF THE LINE ────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'line_end' ] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("End of the Line");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'line_end' ] = function ( block ) {
            return '$';
        };

    //
    // ─── WHITE SPACE ────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'whitespace' ] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Whitespace")
                    .appendField("Space")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "space")
                    .appendField("Tab")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "tab")
                    .appendField("Linefeed (\\n)")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "linefeed");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };


        storage.quartetGenerator['whitespace'] = function(block) {
            var checkbox_space = block.getFieldValue('space') == 'TRUE';
            var checkbox_tab = block.getFieldValue('tab') == 'TRUE';
            var checkbox_linefeed = block.getFieldValue('linefeed') == 'TRUE';

            if ( checkbox_space && checkbox_tab && checkbox_linefeed ) {
                return '\\s';
            } else if ( checkbox_space || checkbox_linefeed || checkbox_tab ) {
                var chars = [ ];
                if ( checkbox_space ) { chars.push( '&#160;' ) };
                if ( checkbox_tab ) { chars.push( '\\t' ) };
                if ( checkbox_linefeed ) { chars.push( '\\n' ) };

                return regstd.quartetAlphabet( chars );
            } else {
                return '';
            }
        };

    //
    // ─── SPECIAL WHITE SPACE ────────────────────────────────────────────────────────
    //

        Blockly.Blocks['special_whitespace'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Special Whitespace");
                this.appendDummyInput()
                    .appendField("Vertical Tab (\\v)")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "vtab")
                    .appendField("NUL (\\0)")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "nul");
                this.appendDummyInput()
                    .appendField("Carriage Return (\\r)")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "carrige");
                this.appendDummyInput()
                    .appendField("Form-feed (\\f)")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "formfeed");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['special_whitespace'] = function(block) {
            var checkbox_vtab = block.getFieldValue('vtab') == 'TRUE';
            var checkbox_nul = block.getFieldValue('nul') == 'TRUE';
            var checkbox_carrige = block.getFieldValue('carrige') == 'TRUE';
            var checkbox_formfeed = block.getFieldValue('formfeed') == 'TRUE';

            var code = [ ];
            if ( checkbox_vtab ) { code.push( '\\v' ) };
            if ( checkbox_nul ) { code.push( '\\0' ) };
            if ( checkbox_carrige ) { code.push( '\\r' ) };
            if ( checkbox_formfeed ) { code.push( '\\f' ) };

            return regstd.quartetAlphabet( code );
        };

    //
    // ─── RANGE ──────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks[ 'range' ] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Range from")
                    .appendField(new Blockly.FieldTextInput("a"), "start")
                    .appendField("to")
                    .appendField(new Blockly.FieldTextInput("z"), "end");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(260);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'range' ] = function ( block ) {
            var text_start = block.getFieldValue('start');
            var text_end = block.getFieldValue('end');
            return '[' + text_start + '-' + text_end + ']';
        };

    //
    // ─── MATCH ──────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['match'] = {
            init: function() {
                this.appendDummyInput( )
                    .appendField("Remember Match");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'match' ] = function ( block ) {
            let statements_match = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            if ( /^\(\?\:.*\)$/.test( statements_match ) )
                return `(${ statements_match.substring( 3 , statements_match.length - 1 ) })`
            else
                return '(' + statements_match + ')';
        };

    //
    // ─── SIGMA ──────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['sigma'] = {
            init: function() {
                this.appendDummyInput( )
                    .appendField("Sigma (Advanced Alphabet)");
                this.appendStatementInput("blocks")
                    .setCheck("SigmaType");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(260);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'sigma' ] = function ( block ) {
            var statements_sequence = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            return '[' + statements_sequence + ']';
        };

    //
    // ─── EXCLUDE SET ────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['exclude'] = {
            init: function() {
                this.appendDummyInput( )
                    .appendField("Exclude Set (Advanced Anything But)");
                this.appendStatementInput("blocks")
                    .setCheck("SigmaType");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(260);
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'exclude' ] = function ( block ) {
            var statements_sequence = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            return '[^' + statements_sequence + ']';
        };

    //
    // ─── SIGMA RANGE ────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['sigma_range'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Sigma Range from")
                    .appendField(new Blockly.FieldTextInput("a"), "start")
                    .appendField("to")
                    .appendField(new Blockly.FieldTextInput("z"), "end");
                this.setPreviousStatement(true, "SigmaType");
                this.setNextStatement(true, "SigmaType");
                this.setColour(230);
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'sigma_range' ] = function ( block ) {
            return block.getFieldValue('start') + '-' + block.getFieldValue('end');
        };

    //
    // ─── SIGMA CHAR INPUT ───────────────────────────────────────────────────────────
    //

        Blockly.Blocks['sigma_chars'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Sigma Characters")
                    .appendField(new Blockly.FieldTextInput(""), "text");
                this.setPreviousStatement(true, "SigmaType");
                this.setNextStatement(true, "SigmaType");
                this.setColour(230);
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'sigma_chars' ] = function ( block ) {
            return regstd.quartetEncodeText( block.getFieldValue( 'text' ) );
        };

    //
    // ─── SIGMA WILDCARD ESCAPES ─────────────────────────────────────────────────────
    //

        Blockly.Blocks['sigma_wildcard'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Sigma Wildcard Escapes")
                    .appendField(new Blockly.FieldTextInput(""), "escapes");
                this.setPreviousStatement(true, "SigmaType");
                this.setNextStatement(true, "SigmaType");
                this.setColour(230);
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'sigma_wildcard' ] = function ( block ) {
            return block.getFieldValue( 'escapes' );
        };

    //
    // ─── ANYTHING BUT ───────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['anything_but'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Anything but ")
                    .appendField("0-9")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "numbers")
                    .appendField("a-z")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "lowercase")
                    .appendField("A-Z")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "uppercase")
                    .appendField("Other")
                    .appendField(new Blockly.FieldTextInput(""), "other");
                this.setInputsInline(true);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(260);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['anything_but'] = function(block) {
            var checkbox_numbers = block.getFieldValue('numbers') == 'TRUE';
            var checkbox_lowercase = block.getFieldValue('lowercase') == 'TRUE';
            var checkbox_uppercase = block.getFieldValue('uppercase') == 'TRUE';
            var text_other = block.getFieldValue('other');

            var code = '';
            if ( checkbox_numbers ) { code += '0-9' };
            if ( checkbox_lowercase ) { code += 'a-z' };
            if ( checkbox_uppercase ) { code += 'A-Z' };
            code += regstd.quartetEncodeText( text_other );

            return '[^' + code + ']';
        };

    //
    // ─── COMMENT ────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['comment'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("#")
                    .appendField(new Blockly.FieldTextInput("Write your comment here"), "comment");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(290);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['comment'] = function ( block ) {
            return '';
        };

    //
    // ─── REPEAT ─────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['repeat'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Repeat")
                    .appendField(new Blockly.FieldTextInput(""), "count")
                    .appendField("times");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['repeat'] = function ( block ) {
            var text_count = block.getFieldValue('count');
            var statements_code = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            return regstd.quartetSequence( statements_code ) + '{' + text_count + '}';
        }

    //
    // ─── REPEAT AT LEAST ────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['repeat_at_least'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Repeat at least")
                    .appendField(new Blockly.FieldTextInput(""), "count")
                    .appendField("times");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['repeat_at_least'] = function ( block ) {
            var text_count = block.getFieldValue('count');
            var statements_code = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            return regstd.quartetSequence( statements_code ) + '{' + text_count + ',}';
        }

    //
    // ─── REPEAT IN RANGE ────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['repeat_in_range'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Repeat in range of")
                    .appendField(new Blockly.FieldTextInput(""), "start")
                    .appendField("to")
                    .appendField(new Blockly.FieldTextInput(""), "end");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['repeat_in_range'] = function ( block ) {
            var text_start = block.getFieldValue('start');
            var text_end = block.getFieldValue('end');
            var statements_code = storage.quartetGenerator.statementToCode(block, 'code').trim( );

            return regstd.quartetSequence( statements_code ) + '{' + text_start + ',' + text_end + '}';
        }

    //
    // ─── LOOKAHEAD ──────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['lookahead'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Accept ");
                this.appendStatementInput("blocks")
                    .setCheck("String");
                this.appendDummyInput()
                    .appendField("If it was")
                    .appendField(new Blockly.FieldDropdown([
                        [ "followed", "positive" ],
                        [ "not followed", "negative" ]
                    ]), "status")
                    .appendField("by");
                this.appendStatementInput("lookahead")
                    .setCheck("String");
                this.setInputsInline(false);
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(210);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator['lookahead'] = function(block) {
            var status = block.getFieldValue('status') === 'negative';
            var statements_match = storage.quartetGenerator.statementToCode(block, 'blocks').trim( );
            var statements_lookahead = storage.quartetGenerator.statementToCode(block, 'lookahead').trim( );

            var reverseSign = (status)? '!': '=';

            if ( status )
                block.setColour( 0 )
            else
                block.setColour

            return regstd.quartetSequence( statements_match ) + '(?' + reverseSign + statements_lookahead + ')';
        };

    //
    // ─── WORD CHAR ──────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['word'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Word");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'word' ] = function ( block ) {
            return '\\w';
        };

    //
    // ─── ANYTHING BUT WORD ──────────────────────────────────────────────────────────
    //

        Blockly.Blocks['anything_but_word'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Anything but Word");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'anything_but_word' ] = function ( block ) {
            return '\\W';
        };

    //
    // ─── ANYTHING BUT SPACE ─────────────────────────────────────────────────────────
    //

        Blockly.Blocks['anything_but_whitespace'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Anything but Whitespace");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'anything_but_whitespace' ] = function ( block ) {
            return '\\S';
        };

    //
    // ─── DIGIT ──────────────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['digit'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Digit");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'digit' ] = function ( block ) {
            return '\\d';
        };

    //
    // ─── ANYTHING BUT DIGIT ─────────────────────────────────────────────────────────
    //

        Blockly.Blocks['anything_but_digit'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Anything but Digit");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'anything_but_digit' ] = function ( block ) {
            return '\\D';
        };

    //
    // ─── WORD BOUNDARY ──────────────────────────────────────────────────────────────
    //

        Blockly.Blocks['boundary'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Word Boundary");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'boundary' ] = function ( block ) {
            return '\\b';
        };

    //
    // ─── ANYTHING BUT WORD BOUNDARY ─────────────────────────────────────────────────
    //

        Blockly.Blocks['anything_but_boundary'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Anything but Word Boundary");
                this.setPreviousStatement(true, "String");
                this.setNextStatement(true, "String");
                this.setColour(20);
                this.setTooltip('');
                this.setHelpUrl('http://www.example.com/');
            }
        };

        storage.quartetGenerator[ 'anything_but_boundary' ] = function ( block ) {
            return '\\B';
        };

    // ────────────────────────────────────────────────────────────────────────────────

}