import { HorizontalObjectOut, ModelOut, TableOut } from "./types.ts";
/**
 * Two-dimensional Permission manager
 *
 * # Example
 *
 * ```ts
 * import { Permission2D } from "../mod.ts"
 *
 * const permissionManager = new Permission2D()
 *
 * permissionManager.allow( "42" )
 * console.log( permissionManager.has( "42" ) ) // true
 *
 * permissionManager.disallow( "42" )
 * console.log( permissionManager.has( "42" ) ) // false
 *
 * console.log( permissionManager.value() ) // hex value of permissions
 * ```
 *
 * Any inner object in compiled model known as "Horizontal Keys"
 *
 * @class
 */
class Permission2D {
  private _value = 0n;
  /**
   * @param {string} value - (Current/Initial) value in Hexadecimal string
   */
  constructor(value: string = "0") {
    try {
      this._value = BigInt("0x" + String(value));
    } catch (_e) {
      throw new Error("Invalid value");
    }
  }

  /**
   * Get the current value (a.k.a Permissions)
   * @returns {string} - Hexadecimal string
   */
  value(): string {
    return this._value.toString(16);
  }

  /**
   * Check permission
   * @param {(string|HorizontalObjectOut)} - Hexadecimal string or Horizontal keys object
   * @returns {boolean} - Allowed or Denied
   */
  has(value: string | HorizontalObjectOut): boolean {
    if (typeof value !== "string") {
      const horizontalKeys = Object.keys(value);
      for (const key of horizontalKeys) {
        if (!this.has(value[key])) {
          return false;
        }
      }
      return true;
    }
    try {
      if (Number.isNaN(Number("0x" + value))) {
        throw new Error();
      }
      return (this._value &
        BigInt("0b1" + ("0".repeat(Number("0x" + value))))) !== 0n;
    } catch (_e) {
      throw new Error("Invalid value");
    }
  }

  /**
   * Allow permission
   * @param {(string|HorizontalObjectOut)} - Hexadecimal string or Horizontal keys object
   * @returns {this} - Permission2D instance
   */
  allow(value: string | HorizontalObjectOut) {
    if (typeof value !== "string") {
      const horizontalKeys = Object.keys(value);
      for (const key of horizontalKeys) {
        this.allow(value[key]);
      }
    } else {
      try {
        if (Number.isNaN(Number("0x" + value))) {
          throw new Error();
        }
        if (!this.has(value)) {
          this._value |= BigInt("0b1" + ("0".repeat(Number("0x" + value))));
        }
      } catch (_e) {
        throw new Error("Invalid value");
      }
    }
    return this;
  }

  /**
   * Revoke permission
   * @param {(string|HorizontalObjectOut)} - Hexadecimal string or Horizontal keys object
   * @returns {this} - Permission2D instance
   */
  disallow(value: string | HorizontalObjectOut) {
    if (typeof value !== "string") {
      const horizontalKeys = Object.keys(value);
      for (const key of horizontalKeys) {
        this.disallow(value[key]);
      }
    } else {
      try {
        if (Number.isNaN(Number("0x" + value))) {
          throw new Error();
        }
        if (this.has(value)) {
          this._value ^= BigInt("0b1" + ("0".repeat(Number("0x" + value))));
        }
      } catch (_e) {
        throw new Error("Invalid value");
      }
    }
    return this;
  }

  /**
   * Generates human readable permissions table
   * @param {ModelOut} - Compiled model
   * @returns {TableOut} - Object with boolean values
   */
  table(model: ModelOut): TableOut {
    const table: TableOut = {};
    for (const verticalKey in model) {
      for (const horizontalKey in model[verticalKey]) {
        if (table[verticalKey] === undefined) {
          table[verticalKey] = {};
        }
        table[verticalKey][horizontalKey] = this.has(
          model[verticalKey][horizontalKey],
        );
      }
    }
    return table;
  }
}

export { Permission2D };
