// ─── Menu state management ───────────────────────────────────────────────────
// The actual menu is defined in the main process (winserver/main.js).
// This file only handles menu-related state that the renderer needs.

// OrchestraAppMenu is declared in storage.js

// ─── Init menu (no-op since menu is in main process) ─────────────────────────

function initMainMenu() {
    // Menu is now managed by the main process
}

// ─── Menu enable/disable (placeholder) ───────────────────────────────────────

function setMenuEnableFactor(control) {
    // Menu state is managed by main process now
}

// ─── Get view menu items (placeholder) ───────────────────────────────────────

function getViewMenuItems() {
    return null
}

// ─── Set color mode activation ───────────────────────────────────────────────

function setViewColorModeMenuActivation(state) {
    // Menu state is managed by main process now
}

// ─── Set active tab ──────────────────────────────────────────────────────────

function setActiveTabInMenu() {
    // Menu state is managed by main process now
}

// ─── Menu lock button ────────────────────────────────────────────────────────

function getMenuForScreenLock() {
    return { checked: false }
}
