import ParametersEntity from '../Entity/ParametersEntity';
import BluetoothReadCommandEntity from '../Entity/Bluetooth/BluetoothReadCommandEntity';

export default class {
    _bikeProfile;
    _cryptService;
    _device;
    _gattServer;
    _bikeService;
    _deviceInfoService;
    _challengeCharacteristic;
    _parameterCharacteristic;
    _functionsCharacteristic;
    _newPrivateKeyCharacteristic;
    _firmwareRevisionCharacteristic;
    _hardwareRevisionCharacteristic;
    _softwareRevisionCharacteristic;
    _clientConfigCharacteristic;
    _modelNumberCharacteristic;
    _serialNumberCharacteristic;
    _notifier = [];
    _started = false;

    constructor(bikeProfile, crypt) {
        this._bikeProfile = bikeProfile;
        this._cryptService = crypt;
    }

    async connect() {
        this._device = await navigator.bluetooth.requestDevice({
            filters: [{services: [this._bikeProfile.SERVICE_BIKE]}],
            optionalServices: [this._bikeProfile.SERVICE_DEVICE_INFORMATION],
        });
        this._device.addEventListener('gattserverdisconnected', async () => {
            if(this._started) {
                await this.reconnect();
            }
        });
        this._gattServer = await this._device.gatt.connect();
        this._started = true;
        await this._discoverServicesAndCharacteristics();
    }

    async _discoverServicesAndCharacteristics() {
        if(this.isConnected()) {
            this._bikeService = await this._gattServer.getPrimaryService(this._bikeProfile.SERVICE_BIKE);

            this._challengeCharacteristic = await this._bikeService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_CHALLENGE);
            this._parameterCharacteristic = await this._bikeService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_PARAMETERS);
            this._functionsCharacteristic = await this._bikeService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_FUNCTIONS);
            this._newPrivateKeyCharacteristic = await this._bikeService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_NEW_PRIVATE_KEY);

            try {
                this._deviceInfoService = await this._gattServer.getPrimaryService(this._bikeProfile.SERVICE_DEVICE_INFORMATION);

                this._firmwareRevisionCharacteristic = await this._deviceInfoService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_FIRMWARE_REVISION);
                this._hardwareRevisionCharacteristic = await this._deviceInfoService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_HARDWARE_REVISION);
                this._softwareRevisionCharacteristic = await this._deviceInfoService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_SOFTWARE_REVISION);

                this._clientConfigCharacteristic = await this._deviceInfoService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_CLIENT_CONFIG);
                this._modelNumberCharacteristic = await this._deviceInfoService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_MODEL_NUMBER);
                this._serialNumberCharacteristic = await this._deviceInfoService.getCharacteristic(this._bikeProfile.CHARACTERISTIC_SERIAL_NUMBER);
            } catch (e) {}

            this._parameterCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
                this._notifier.forEach((callback) => {
                    callback(new ParametersEntity(this._cryptService.decrypt(new Uint8Array(event.target.value.buffer))));
                });
            });
            await this._parameterCharacteristic.startNotifications();
            await this._parameterCharacteristic.readValue();
        }
    }

    async reconnect() {
        if(!this.isConnected()) {
            await this._gattServer.connect();
            await this._discoverServicesAndCharacteristics();
        }
    }

    disconnect() {
        if(this._gattServer) {
            this._started = false;
            this._gattServer.disconnect();
        }
    }

    isConnected() {
        return (this._gattServer && this._gattServer.connected);
    }

    notify(callback) {
        return this._notifier.push(callback);
    }

    async _read(bluetoothCommand) {
        let data = new Uint8Array((await bluetoothCommand.getCharacteristic().readValue()).buffer);
        if(bluetoothCommand.isEncryptionNeeded()) {
            data = this._cryptService.decrypt(data);
        }
        return data;
    }

    async _write(bluetoothCommand) {
        let sendData = new Uint8Array(16);
        if(bluetoothCommand.isChallengeCodeNeeded()) {
            sendData.set(await this.getChallengeCode(), 0);
        }
        sendData.set(bluetoothCommand.getCommand(), 2);
        if(bluetoothCommand.getData()) {
            sendData.set(bluetoothCommand.getData(), 3);
        }
        if(bluetoothCommand.isEncryptionNeeded()) {
            sendData = this._cryptService.encrypt(sendData);
        }
        return bluetoothCommand.getCharacteristic().writeValue(sendData);
    }

    async getChallengeCode() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._bikeService).setCharacteristic(this._challengeCharacteristic);
        return this._read(command);
    }

    async getParameters() {
        const command = (new BluetoothReadCommandEntity()).setService(this._bikeService).setCharacteristic(this._parameterCharacteristic);
        return new ParametersEntity(await this._read(command));
    }

    async sendFunction(bluetoothCommand) {
        const command = bluetoothCommand.setService(this._bikeService).setCharacteristic(this._functionsCharacteristic);
        return this._write(command);
    }

    async getFirmwareRevision() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._deviceInfoService).setCharacteristic(this._firmwareRevisionCharacteristic);
        return this._cryptService.getUtils().utf8.fromBytes(await this._read(command));
    }

    async getHardwareRevision() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._deviceInfoService).setCharacteristic(this._hardwareRevisionCharacteristic);
        return this._cryptService.getUtils().utf8.fromBytes(await this._read(command));
    }

    async getSoftwareRevision() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._deviceInfoService).setCharacteristic(this._softwareRevisionCharacteristic);
        return this._cryptService.getUtils().utf8.fromBytes(await this._read(command));
    }

    async getModelNumber() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._deviceInfoService).setCharacteristic(this._modelNumberCharacteristic);
        return this._cryptService.getUtils().utf8.fromBytes(await this._read(command));
    }

    async getSerialNumber() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._deviceInfoService).setCharacteristic(this._serialNumberCharacteristic);
        return this._cryptService.getUtils().utf8.fromBytes(await this._read(command));
    }
};
