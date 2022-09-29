export type HorizontalObjectIn = { [name: string]: null };
export type HorizontalObjectOut = { [name: string]: string };
export type HorizontalTableOut = { [name: string]: boolean };
export type ModelIn = { [name: string]: HorizontalObjectIn };
export type ModelOut = { [name: string]: HorizontalObjectOut };
export type TableOut = { [name: string]: HorizontalTableOut };
