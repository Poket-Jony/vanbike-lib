export default class {
    serviceUuid;
    characteristicUuid;
    callback;

    constructor(serviceUuid, characteristicUuid, callback) {
        this.serviceUuid = serviceUuid;
        this.characteristicUuid = characteristicUuid;
        this.callback = callback;
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
};
