export default class {
    serviceUuid;
    characteristicUuid;
    callback;
    useEncryption;

    constructor(serviceUuid, characteristicUuid, callback, useEncryption = true) {
        this.serviceUuid = serviceUuid;
        this.characteristicUuid = characteristicUuid;
        this.callback = callback;
        this.useEncryption = useEncryption;
    }

    getServiceUuid() {
        return this.serviceUuid;
    }

    getCharacteristicUuid() {
        return this.characteristicUuid;
    }

    getCallback() {
        return this.callback;
    }

    isEncryptionNeeded() {
        return this.useEncryption;
    }
};
