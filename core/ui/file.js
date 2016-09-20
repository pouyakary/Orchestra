
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SET DIRTY ──────────────────────────────────────────────────────────────────
//

    function setFileDirty ( dirt ) {
        currentFile.dirty = dirt;
        updateConsoleTitle( );
    }

// ────────────────────────────────────────────────────────────────────────────────

