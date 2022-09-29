/**
 * Inner object with null values for compiler input
 * @typedef {HorizontalObjectIn} - Object
 */
export type HorizontalObjectIn = { [name: string]: null };
/**
 * Inner object with hexadecimal string values for compiler output
 * @typedef {HorizontalObjectOut} - Object
 */
export type HorizontalObjectOut = { [name: string]: string };
/**
 * Inner object for TableOut
 * @typedef {HorizontalTableOut} - Object
 * @see TableOut
 */
export type HorizontalTableOut = { [name: string]: boolean };
/**
 * User defined permissions model
 * @typedef {ModelIn} - Object
 */
export type ModelIn = { [name: string]: HorizontalObjectIn };
/**
 * Compiler generated permissions model
 * @typedef {ModelOut} - Object
 */
export type ModelOut = { [name: string]: HorizontalObjectOut };
/**
 * Human readable permissions table
 * @typedef {TableOut} - Object
 */
export type TableOut = { [name: string]: HorizontalTableOut };
