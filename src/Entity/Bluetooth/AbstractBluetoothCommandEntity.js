export default class {
    serviceUuid;
    characteristicUuid;
    useEncryption;

    getServiceUuid() {
        return this.serviceUuid;
    }

    setServiceUuid(serviceUuid) {
        this.serviceUuid = serviceUuid;
        return this;
    }

    getCharacteristicUuid() {
        return this.characteristicUuid;
    }

    setCharacteristicUuid(characteristicUuid) {
        this.characteristicUuid = characteristicUuid;
        return this;
    }

    isEncryptionNeeded() {
        return this.useEncryption;
    }
};
