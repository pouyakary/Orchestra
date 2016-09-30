
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    function appendTrafficLightEvents ( ) {
        document.getElementById('window-button-close').onmouseover = onTrafficLightsHover;
        document.getElementById('window-button-minimize').onmouseover = onTrafficLightsHover;
        document.getElementById('window-button-maximize').onmouseover = onTrafficLightsHover;

        document.getElementById('window-button-close').onmouseleave = onTrafficLightsLeave;
        document.getElementById('window-button-minimize').onmouseleave = onTrafficLightsLeave;
        document.getElementById('window-button-maximize').onmouseleave = onTrafficLightsLeave;
    }

//
// ─── ON LIGHTS HOVER ────────────────────────────────────────────────────────────
//

    function onTrafficLightsHover ( ) {
        document.getElementById('window-button-close').style.backgroundSize = 'contain';
        document.getElementById('window-button-minimize').style.backgroundSize = 'contain';
        document.getElementById('window-button-maximize').style.backgroundSize = 'contain';
    }

//
// ─── ON LIGHTS LEAVE ────────────────────────────────────────────────────────────
//

    function onTrafficLightsLeave ( ) {
        document.getElementById('window-button-close').style.backgroundSize = '0 0';
        document.getElementById('window-button-minimize').style.backgroundSize = '0 0';
        document.getElementById('window-button-maximize').style.backgroundSize = '0 0';
    }

// ────────────────────────────────────────────────────────────────────────────────
