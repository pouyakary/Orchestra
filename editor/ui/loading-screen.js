
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
        setTimeout( ( ) => {
            setTimeout( ( ) => {
                let loadingView = document.getElementById('loading-view')
                loadingView.className = 'dead-loading-view'
                setTimeout( ( ) => {
                    loadingView.remove( );
                    // console.clear( );
                }, 1000 )})})}

// ────────────────────────────────────────────────────────────────────────────────