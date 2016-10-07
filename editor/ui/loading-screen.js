
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── SMOOTHLY CANCELS THE LOADING SCREEN WHEN LOADED ────────────────────────────
//

    function CancelLoadingScreenAfterCompleteLoad ( ) {
        setTimeout(( ) => {
            // doing stuff that we have to do after a full load:
            loadFileIfNeeded( );

            // fading animations.
            setTimeout(( ) => {
                let loadingView = document.getElementById('loading-view');
                loadingView.className = 'dead-loading-view';
                setTimeout(( ) => {
                    loadingView.remove( );
                }, 1000);
            });
        });
    }

//
// ─── LOAD FILE IF NEEDED ────────────────────────────────────────────────────────
//

    function loadFileIfNeeded ( ) {
        try {
            const fileAddress = decodeURI( window.location.search.substring( 1 ) );
            if ( fileAddress !== '' ) {
                openFileWithPath( fileAddress );
            }
        } catch ( error ) {
            alert( error );
        }
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