const aesjs = require('aes-js');

export default class {
    _key;
    _passcode;
    _aes;

    constructor(encryptionKey)
    {
        this._key = new Uint8Array(aesjs.utils.hex.toBytes(encryptionKey));
        this._passcode = this._key.subarray(0, 6);
        this._aes = new aesjs.ModeOfOperation.ecb(this._key);
    }

    encrypt(bytes) {
        return this._aes.encrypt(bytes);
    }

    decrypt(bytes) {
        return this._aes.decrypt(bytes);
    }

    getKey() {
        return this._key;
    }

    getPasscode() {
        return this._passcode;
    }

    getUtils() {
        return aesjs.utils;
    }
};
