
declare function initMonacoEditor ( );

declare function renderWorkspaceIntoSVG ( ): string;

declare class Notification {
    constructor ( title: string, options: Object );
    onclick: Function;
}