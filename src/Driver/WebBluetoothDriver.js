export default class {
    _lastCharacteristicData = {};

    async isAvailable() {
        return (navigator && navigator.bluetooth && await navigator.bluetooth.getAvailability());
    }

    async getDevice(serviceUuids, optionalServiceUuids = []) {
        return navigator.bluetooth.requestDevice({
            filters: [{services: serviceUuids}],
            optionalServices: optionalServiceUuids,
        });
    }

    getGattServer(device) {
        return device.gatt;
    }

    async subscribeDeviceDisconnect(device, callback) {
        device.addEventListener('gattserverdisconnected', callback);
    }

    async unsubscribeDeviceDisconnect(device, callback) {
        device.removeEventListener(callback);
    }

    async subscribeCharacteristic(characteristic, callback) {
        characteristic.addEventListener('characteristicvaluechanged', (event) => {
            const data = new Uint8Array(event.target.value.buffer);
            if(this._lastCharacteristicData[characteristic.uuid] !== data) {
                this._lastCharacteristicData[characteristic.uuid] = data;
                callback(data);
            }
        });
        await characteristic.startNotifications();
        await characteristic.readValue();
    }

    async unsubscribeCharacteristic(characteristic, callback) {
        characteristic.removeEventListener(callback);
        await characteristic.stopNotifications();
    }

    isConnected(gattServer) {
        return gattServer.connected;
    }

    async connect(gattServer) {
        return gattServer.connect();
    }

    async disconnect(gattServer) {
        return gattServer.disconnect();
    }

    async getService(gattServer, serviceUuid) {
        return gattServer.getPrimaryService(serviceUuid);
    }

    async getCharacteristic(service, characteristicUuid) {
        return service.getCharacteristic(characteristicUuid);
    }

    async readValue(characteristic) {
        return new Uint8Array((await characteristic.readValue()).buffer);
    }

    async writeValue(characteristic, data) {
        return characteristic.writeValue(data);
    }
}