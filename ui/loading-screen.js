
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SMOOTHLY CANCELS THE LOADING SCREEN WHEN LOADED ────────────────────────────
//

    function CancelLoadingScreenAfterCompleteLoad ( ) {
        setTimeout(( ) => {
            setTimeout(( ) => {
                let loadingView = document.getElementById('loading-view');
                loadingView.className = 'dead-loading-view';
                setTimeout(( ) => {
                    loadingView.remove( );
                }, 2000);
            }, 1300 );
        });
    }

// ────────────────────────────────────────────────────────────────────────────────