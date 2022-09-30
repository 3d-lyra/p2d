// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function compile(model) {
    const out = {};
    const verticalKeys = Object.keys(model);
    for(let i = 0; i < verticalKeys.length; i++){
        out[verticalKeys[i]] = {};
        const horizontalKeys = Object.keys(model[verticalKeys[i]]).slice(0, 256);
        for(let j = 0; j < horizontalKeys.length; j++){
            out[verticalKeys[i]][horizontalKeys[j]] = (2n ** (BigInt(i) * 256n + BigInt(j))).toString(2).length.toString(16);
        }
    }
    return out;
}
class Permission2D {
    _value = 0n;
    constructor(value = "0"){
        try {
            this._value = BigInt("0x" + String(value));
        } catch (_e) {
            throw new Error("Invalid value");
        }
    }
    value() {
        return this._value.toString(16);
    }
    has(value) {
        if (typeof value !== "string") {
            const horizontalKeys = Object.keys(value);
            for (const key of horizontalKeys){
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
            return (this._value & BigInt("0b1" + "0".repeat(Number("0x" + value)))) !== 0n;
        } catch (_e) {
            throw new Error("Invalid value");
        }
    }
    allow(value) {
        if (typeof value !== "string") {
            const horizontalKeys = Object.keys(value);
            for (const key of horizontalKeys){
                this.allow(value[key]);
            }
        } else {
            try {
                if (Number.isNaN(Number("0x" + value))) {
                    throw new Error();
                }
                if (!this.has(value)) {
                    this._value |= BigInt("0b1" + "0".repeat(Number("0x" + value)));
                }
            } catch (_e) {
                throw new Error("Invalid value");
            }
        }
        return this;
    }
    disallow(value) {
        if (typeof value !== "string") {
            const horizontalKeys = Object.keys(value);
            for (const key of horizontalKeys){
                this.disallow(value[key]);
            }
        } else {
            try {
                if (Number.isNaN(Number("0x" + value))) {
                    throw new Error();
                }
                if (this.has(value)) {
                    this._value ^= BigInt("0b1" + "0".repeat(Number("0x" + value)));
                }
            } catch (_e) {
                throw new Error("Invalid value");
            }
        }
        return this;
    }
    table(model) {
        const table = {};
        for(const verticalKey in model){
            for(const horizontalKey in model[verticalKey]){
                if (table[verticalKey] === undefined) {
                    table[verticalKey] = {};
                }
                table[verticalKey][horizontalKey] = this.has(model[verticalKey][horizontalKey]);
            }
        }
        return table;
    }
}
export { compile as compile };
export { Permission2D as Permission2D };
