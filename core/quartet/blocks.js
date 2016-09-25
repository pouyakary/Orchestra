
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── COMPOSE ────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks['compose'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Quartet");
            this.appendStatementInput("children")
                .setCheck("String");
            this.setInputsInline(false);
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['compose'] = function(block) {
        var statements_children = QuartetGenerator.statementToCode(block, 'children').trim( );
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

    QuartetGenerator['alphabet'] = function(block) {
        var checkbox_numbers = block.getFieldValue('numbers') == 'TRUE';
        var checkbox_lowercase = block.getFieldValue('lowercase') == 'TRUE';
        var checkbox_uppercase = block.getFieldValue('uppercase') == 'TRUE';
        var text_other = block.getFieldValue('other');

        var code = '';
        if ( checkbox_numbers ) { code += '0-9' };
        if ( checkbox_lowercase ) { code += 'a-z' };
        if ( checkbox_uppercase ) { code += 'A-Z' };
        code += quartetEncodeText( text_other );

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

    QuartetGenerator[ 'unicode' ] = function ( block ) {
        return quartetUnicodify( block.getFieldValue( 'text' ) );
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

    QuartetGenerator[ 'encode' ] = function ( block ) {
        return quartetEncodeText( block.getFieldValue( 'text' ) );
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

    QuartetGenerator[ 'free_form_regex' ] = function ( block ) {
        return block.getFieldValue( 'regex' );
    };

//
// ─── MORE THAN ONE ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'one_or_more' ] = {
        init: function() {
            this.appendDummyInput()
                .appendField("One or more");
            this.appendStatementInput("regex")
                .setCheck("String");
            this.setInputsInline(true);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator[ 'one_or_more' ] = function ( block ) {
        var statements_regex = QuartetGenerator.statementToCode( block, 'regex' ).trim( );
        return quartetSequence( statements_regex ) + '+';
    };

//
// ─── ANY NUMBER OF ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks['any_number_of'] = {
        init: function() {
            this.appendDummyInput( )
                .appendField("Any number of");
            this.appendStatementInput("regex")
                .setCheck("String");
            this.setInputsInline(true);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['any_number_of'] = function(block) {
        var statements_regex = QuartetGenerator.statementToCode( block, 'regex' ).trim( );
        return quartetSequence( statements_regex ) + '*';
    };

//
// ─── ANY CHARACTER ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'any' ] = {
        init: function( ) {
            this.appendDummyInput()
                .appendField("Any Character!");
            this.setInputsInline(true);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(20);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator[ 'any' ] = function ( block ) {
        return '.';
    };


//
// ─── MAYBE ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks['maybe'] = {
        init: function() {
            this.appendDummyInput( )
                .appendField("Maybe");
            this.appendStatementInput("NAME")
                .setCheck("String");
            this.setInputsInline(true);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator[ 'maybe' ] = function( block ) {
        var statements_name = QuartetGenerator.statementToCode( block, 'NAME' ).trim();
        return quartetSequence( statements_name ) + '?';
    };


//
// ─── ONE OF ─────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks['one_of'] = {
        init: function() {
            this.appendDummyInput( )
                .appendField("One of options");
            this.appendStatementInput("Items")
                .setCheck("QuartetOption");
            this.setInputsInline(true);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['one_of'] = function(block) {
        function cut ( text, start, end ) {
            return text.substring( 0, start ) + text.substring( end );
        }
        var statements_items = QuartetGenerator.statementToCode(block, 'Items').trim( );
        if ( statements_items.startsWith('<') ) {
            if ( statements_items.length === 52 ) {
                return '';
            } else {
                return quartetSequence( cut( statements_items, 45, 46 ) );
            }
        } else {
            return quartetSequence( statements_items.substring( 1 ) );
        }
    };

//
// ─── QUARTET OPTION ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks['option'] = {
        init: function() {
            this.appendStatementInput("NAME")
                .setCheck(null)
                .appendField("Option");
            this.setInputsInline(true);
            this.setPreviousStatement(true, "QuartetOption");
            this.setNextStatement(true, "QuartetOption");
            this.setColour(160);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['option'] = function ( block ) {
        return '|' + QuartetGenerator.statementToCode(block, 'NAME').trim( );
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

    QuartetGenerator[ 'line_start' ] = function ( block ) {
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

    QuartetGenerator[ 'line_end' ] = function ( block ) {
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


    QuartetGenerator['whitespace'] = function(block) {
        var checkbox_space = block.getFieldValue('space') == 'TRUE';
        var checkbox_tab = block.getFieldValue('tab') == 'TRUE';
        var checkbox_linefeed = block.getFieldValue('linefeed') == 'TRUE';

        if ( checkbox_space && checkbox_tab && checkbox_linefeed ) {
            return '\\s';
        } else if ( checkbox_space || checkbox_linefeed || checkbox_tab ) {
            var chars = [ ];
            if ( checkbox_space ) { chars.push( '&nbsp;' ) };
            if ( checkbox_tab ) { chars.push( '\\t' ) };
            if ( checkbox_linefeed ) { chars.push( '\\n' ) };

            return quartetAlphabet( chars );
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

    QuartetGenerator['special_whitespace'] = function(block) {
        var checkbox_vtab = block.getFieldValue('vtab') == 'TRUE';
        var checkbox_nul = block.getFieldValue('nul') == 'TRUE';
        var checkbox_carrige = block.getFieldValue('carrige') == 'TRUE';
        var checkbox_formfeed = block.getFieldValue('formfeed') == 'TRUE';

        var code = [ ];
        if ( checkbox_vtab ) { code.push( '\\v' ) };
        if ( checkbox_nul ) { code.push( '\\0' ) };
        if ( checkbox_carrige ) { code.push( '\\r' ) };
        if ( checkbox_formfeed ) { code.push( '\\f' ) };

        return quartetAlphabet( code );
    };

//
// ─── RANGE ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'range' ] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Range")
                .appendField(new Blockly.FieldTextInput("a"), "start")
                .appendField("-")
                .appendField(new Blockly.FieldTextInput("z"), "end");
            this.setInputsInline(false);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(260);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator[ 'range' ] = function ( block ) {
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
            this.appendStatementInput("match")
                .setCheck("String");
            this.setInputsInline(false);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator[ 'match' ] = function ( block ) {
        var statements_match = QuartetGenerator.statementToCode(block, 'match').trim( );
        return '(' + statements_match + ')';
    };

//
// ─── SEQUENCE ───────────────────────────────────────────────────────────────────
//

    Blockly.Blocks['sigma'] = {
        init: function() {
            this.appendDummyInput( )
                .appendField("Sigma");
            this.appendStatementInput("sigma")
                .setCheck("String");
            this.setInputsInline(false);
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(260);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator[ 'sigma' ] = function ( block ) {
        var statements_sequence = QuartetGenerator.statementToCode(block, 'sigma').trim( );
        return '[' + statements_sequence + ']';
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

    QuartetGenerator['anything_but'] = function(block) {
        var checkbox_numbers = block.getFieldValue('numbers') == 'TRUE';
        var checkbox_lowercase = block.getFieldValue('lowercase') == 'TRUE';
        var checkbox_uppercase = block.getFieldValue('uppercase') == 'TRUE';
        var text_other = block.getFieldValue('other');

        var code = '';
        if ( checkbox_numbers ) { code += '0-9' };
        if ( checkbox_lowercase ) { code += 'a-z' };
        if ( checkbox_uppercase ) { code += 'A-Z' };
        code += quartetEncodeText( text_other );

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

    QuartetGenerator['comment'] = function ( block ) {
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
            this.appendStatementInput("code")
                .setCheck("String");
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['repeat'] = function ( block ) {
        var text_count = block.getFieldValue('count');
        var statements_code = QuartetGenerator.statementToCode(block, 'code').trim( );
        return quartetSequence( statements_code ) + '{' + text_count + '}';
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
            this.appendStatementInput("code")
                .setCheck("String");
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['repeat_at_least'] = function ( block ) {
        var text_count = block.getFieldValue('count');
        var statements_code = QuartetGenerator.statementToCode(block, 'code').trim( );
        return quartetSequence( statements_code ) + '{' + text_count + ',}';
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
            this.appendStatementInput("code")
                .setCheck("String");
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['repeat_in_range'] = function ( block ) {
        var text_start = block.getFieldValue('start');
        var text_end = block.getFieldValue('end');
        var statements_code = QuartetGenerator.statementToCode(block, 'code').trim( );

        return quartetSequence( statements_code ) + '{' + text_start + ',' + text_end + '}';
    }

//
// ─── LOOKAHEAD ──────────────────────────────────────────────────────────────────
//

    Blockly.Blocks['lookahead'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Match ( not be followed by lookahead")
                .appendField(new Blockly.FieldCheckbox("FALSE"), "reverse")
                .appendField(")");
            this.appendStatementInput("match")
                .setCheck("String");
            this.appendDummyInput()
                .appendField("Lookahead ");
            this.appendStatementInput("lookahead")
                .setCheck("String");
            this.setPreviousStatement(true, "String");
            this.setNextStatement(true, "String");
            this.setColour(210);
            this.setTooltip('');
            this.setHelpUrl('http://www.example.com/');
        }
    };

    QuartetGenerator['lookahead'] = function(block) {
        var checkbox_reverse = block.getFieldValue('reverse') == 'TRUE';
        var statements_match = QuartetGenerator.statementToCode(block, 'match').trim( );
        var statements_lookahead = QuartetGenerator.statementToCode(block, 'lookahead').trim( );

        var reverseSign = (checkbox_reverse)? '!': '=';
        return quartetSequence( statements_match ) + '(?' + reverseSign + quartetSequence( statements_lookahead ) + ')';
    };

// ────────────────────────────────────────────────────────────────────────────────


