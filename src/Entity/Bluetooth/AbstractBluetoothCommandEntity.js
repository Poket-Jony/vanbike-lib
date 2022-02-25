export default class {
    _serviceUuid;
    _characteristicUuid;

    getServiceUuid() {
        return this._serviceUuid;
    }

    setServiceUuid(serviceUuid) {
        this._serviceUuid = serviceUuid;
        return this;
    }

    getCharacteristicUuid() {
        return this._characteristicUuid;
    }

    setCharacteristicUuid(characteristicUuid) {
        this._characteristicUuid = characteristicUuid;
        return this;
    }
};
