import { HorizontalObjectOut, ModelOut, TableOut } from "./types.ts";

class Permission2D {
  private _value = 0n;

  constructor(value: string = "0") {
    try {
      this._value = BigInt("0x" + String(value));
    } catch (_e) {
      throw new Error("Invalid value");
    }
  }

  value(): string {
    return this._value.toString(16);
  }

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
