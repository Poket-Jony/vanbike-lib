import aesJs from 'https://cdn.skypack.dev/aes-js@^3.1.2'

export default class {
    _key
    _passcode
    _userKeyId
    _aes

    constructor(encryptionKey, passcodeLength, userKeyId) {
        this._key = new Uint8Array(aesJs.utils.hex.toBytes(encryptionKey))
        if (this._key.length === 17) {
            this._key = this._key.subarray(1, this._key.length)
        } else if (this._key.length < 16) {
            const key = new Uint8Array(16)
            key.set(this._key, 16 - this._key.length)
            this._key = key
        }
        this._passcode = this._key.subarray(0, passcodeLength)
        this._userKeyId = new Uint8Array([userKeyId]);
        this._aes = new aesJs.ModeOfOperation.ecb(this._key)
    }

    encrypt(bytes) {
        return this._aes.encrypt(this.padAfter(bytes, 16))
    }

    decrypt(bytes) {
        return this._aes.decrypt(bytes)
    }

    getKey() {
        return this._key
    }

    getPasscode() {
        return this._passcode
    }

    getUserKeyId() {
        return this._userKeyId
    }

    getUtils() {
        return aesJs.utils
    }

    padBefore(bytes, size) {
        if(bytes.length < size) {
            let padBytes = new Uint8Array(size);
            padBytes.set(bytes, size - bytes.length);
            return padBytes;
        }
        return bytes;
    }

    padAfter(bytes, size) {
        if(bytes.length < size) {
            let padBytes = new Uint8Array(size);
            padBytes.set(bytes);
            return padBytes;
        }
        return bytes;
    }
}
