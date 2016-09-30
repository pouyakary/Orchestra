
//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    window.onload = applyOnLoadSettings;

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const orchestraVersionSpanId = 'orchestra-version';
    const orchestraBuildSpanId = 'orchestra-build';
    const quartetVersionSpanId = 'quartet-version';

//
// ─── GET WINDOW OPTIONS ─────────────────────────────────────────────────────────
//

    function getWindowOptions ( ) {
        return JSON.parse( window.location.search.substring( 1 ) );
    }

//
// ─── ON LOAD SCRIPT ─────────────────────────────────────────────────────────────
//

    function applyOnLoadSettings ( ) {
        document.getElementById( orchestraVersionSpanId ).innerText = getParameterByName('ov');
        document.getElementById( orchestraBuildSpanId ).innerText = getParameterByName('ob');
        document.getElementById( quartetVersionSpanId ).innerText = getParameterByName('qv');
    }

//
// ─── GET PARAM ──────────────────────────────────────────────────────────────────
//

    function getParameterByName ( name ) {
        let url = window.location.href;
        name = name.replace( /[\[\]]/g, "\\$&" );
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

// ────────────────────────────────────────────────────────────────────────────────
