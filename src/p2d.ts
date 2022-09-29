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
}

export { Permission2D };
