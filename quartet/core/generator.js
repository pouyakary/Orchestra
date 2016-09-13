
let QuartetGenerator = new Blockly.Generator('Quartet');

QuartetGenerator.init = function ( workspace ) {

}

QuartetGenerator.finish = function ( code ) {
    return code.trim( );
};

QuartetGenerator.scrubNakedValue = function ( line ) {
    return line.trim( );
};

QuartetGenerator.quote_ = function ( text ) {
    return text.trim( );
};

QuartetGenerator.scrub_ = function ( block, code ) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = QuartetGenerator.blockToCode( nextBlock );
    return code.trim( ) + nextCode.trim( );
};