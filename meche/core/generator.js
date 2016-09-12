
let MecheGenerator = new Blockly.Generator('Meche');

MecheGenerator.init = function ( workspace ) {

}

MecheGenerator.finish = function ( code ) {
    return code.trim( );
};

MecheGenerator.scrubNakedValue = function ( line ) {
    return line.trim( );
};

MecheGenerator.quote_ = function ( text ) {
    return text.trim( );
};

MecheGenerator.scrub_ = function ( block, code ) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = MecheGenerator.blockToCode( nextBlock );
    return code.trim( ) + nextCode.trim( );
};