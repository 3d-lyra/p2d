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

  has(value: string): boolean {
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

  allow(value: string) {
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
    return this;
  }

  disallow(value: string) {
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
    return this;
  }
}

export { Permission2D };
