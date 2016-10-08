
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const http  = require('http');

//
// ─── EXTERIOR INTERFACE ─────────────────────────────────────────────────────────
//

    module.exports = {
        run: ( ) => runExtensionServer( ),
    }

//
// ─── SERVER RUNNER ──────────────────────────────────────────────────────────────
//

    function runExtensionServer ( ) {
        http.createServer( ( req, res ) => {
            let path = req.url;
            console.log( path );
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Homepage');
        }).listen(3000);
    }

// ────────────────────────────────────────────────────────────────────────────────
