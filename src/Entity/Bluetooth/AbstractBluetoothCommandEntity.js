export default class {
    service;
    characteristic;
    useEncryption;

    getService() {
        return this.service;
    }

    setService(service) {
        this.service = service;
        return this;
    }

    getCharacteristic() {
        return this.characteristic;
    }

    setCharacteristic(characteristic) {
        this.characteristic = characteristic;
        return this;
    }

    isEncryptionNeeded() {
        return this.useEncryption;
    }
};
