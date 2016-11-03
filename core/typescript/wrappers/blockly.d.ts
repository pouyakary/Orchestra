

//
// ─── MAIN MODULE ────────────────────────────────────────────────────────────────
//

    declare module Blockly {

        //
        // ─── FUNCTIONS ───────────────────────────────────────────────────
        //

            export function fireUiEvent ( element: HTMLElement | Window, event: string );

        //
        // ─── PROPERTIES ──────────────────────────────────────────────────
        //

            export var mainWorkspace: Workspace;

        //
        // ─── BLOCKS ──────────────────────────────────────────────────────
        //

            export class Blocks {}

        //
        // ─── BLOCK ───────────────────────────────────────────────────────
        //

            export class Block {
                id: string;
                nextConnection: Block;
                targetBlock: ( ) => Block;
                moveBy: ( x: number, y: number ) => void;
            }

        //
        // ─── WORKSPACE ───────────────────────────────────────────────────
        //

            export interface Workspace {
                clear: ( ) => void;
                getAllBlocks: ( ) => Blocks[ ];
                getCanvas: ( ) => SVGAElement;
                addChangeListener: ( funk: ( event: Event ) => void  ) => void;
                getTopBlocks: ( ) => Block[ ];
            }

        //
        // ─── INJECT ──────────────────────────────────────────────────────
        //

            export function inject ( elementId: string , options: injectOptions ): Workspace;

            interface injectOptions {
                collapse: boolean
                toolbox: HTMLElement
                border: boolean
                scrollbars: boolean
                trashcan: boolean
                media: string
            }

        //
        // ─── BLOCKS ──────────────────────────────────────────────────────
        //

            export class FieldTextInput {
                constructor ( input: string )
            }

            export class FieldCheckbox {
                constructor ( input: "FALSE" | "TRUE" )
            }

            export class FieldDropdown {
                constructor ( options: Array<Array<string>> )
            }

        //
        // ─── XML MODULE ──────────────────────────────────────────────────
        //

            export module Xml {
                function textToDom ( text: string ): SVGAElement;
                function domToText ( dom: SVGElement ): string;
                function workspaceToDom ( workspace: Workspace ): SVGAElement;
                function domToWorkspace ( dom: SVGElement, workspace: Workspace ): Workspace;
            }

        //
        // ─── GENERATOR ───────────────────────────────────────────────────
        //

            export class Generator {
                constructor ( id: string );
                public init: ( workspace: Workspace ) => string;
                public finish: ( code: string ) => string;
                public scrubNakedValue: ( line: string ) => string;
                public quote_: ( text: string ) => string;
                public scrub_: ( block: Block, code: string ) => string;
                public blockToCode: ( block: Block ) => string;
            }

        //
        // ─── EVENTS ──────────────────────────────────────────────────────
        //

            export module Events {
                export const MOVE;
                export const UI;
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
