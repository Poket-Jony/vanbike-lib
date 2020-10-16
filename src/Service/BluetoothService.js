import ParametersEntity from '../Entity/ParametersEntity';
import BluetoothReadCommandEntity from '../Entity/Bluetooth/BluetoothReadCommandEntity';

export default class {
    _bikeProfile;
    _bluetoothDriver;
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
    _subscribers = [];
    _started = false;

    constructor(bikeProfile, bluetoothDriver, crypt) {
        this._bikeProfile = bikeProfile;
        this._bluetoothDriver = bluetoothDriver;
        this._cryptService = crypt;
    }

    async connect() {
        if(!(await this._bluetoothDriver.isAvailable())) {
            throw new Error('Bluetooth driver not available');
        }
        this._device = await this._bluetoothDriver.getDevice(
            [this._bikeProfile.SERVICE_BIKE],
            [this._bikeProfile.SERVICE_DEVICE_INFORMATION]
        );
        await this._bluetoothDriver.subscribeDeviceDisconnect(this._device, async () => {
            if(this._started) {
                await this.reconnect();
            }
        });
        this._gattServer = this._bluetoothDriver.getGattServer(this._device);
        await this._bluetoothDriver.connect(this._gattServer);
        this._started = true;
        await this._discoverServicesAndCharacteristics();
    }

    async _discoverServicesAndCharacteristics() {
        if(this.isConnected()) {
            this._bikeService = await this._bluetoothDriver.getService(this._gattServer, this._bikeProfile.SERVICE_BIKE);

            this._challengeCharacteristic = await this._bluetoothDriver.getCharacteristic(this._bikeService, this._bikeProfile.CHARACTERISTIC_CHALLENGE);
            this._parameterCharacteristic = await this._bluetoothDriver.getCharacteristic(this._bikeService, this._bikeProfile.CHARACTERISTIC_PARAMETERS);
            this._functionsCharacteristic = await this._bluetoothDriver.getCharacteristic(this._bikeService, this._bikeProfile.CHARACTERISTIC_FUNCTIONS);
            this._newPrivateKeyCharacteristic = await this._bluetoothDriver.getCharacteristic(this._bikeService, this._bikeProfile.CHARACTERISTIC_NEW_PRIVATE_KEY);

            try {
                this._deviceInfoService = await this._bluetoothDriver.getService(this._gattServer, this._bikeProfile.SERVICE_DEVICE_INFORMATION);

                this._firmwareRevisionCharacteristic = await this._bluetoothDriver.getCharacteristic(this._deviceInfoService, this._bikeProfile.CHARACTERISTIC_FIRMWARE_REVISION);
                this._hardwareRevisionCharacteristic = await this._bluetoothDriver.getCharacteristic(this._deviceInfoService, this._bikeProfile.CHARACTERISTIC_HARDWARE_REVISION);
                this._softwareRevisionCharacteristic = await this._bluetoothDriver.getCharacteristic(this._deviceInfoService, this._bikeProfile.CHARACTERISTIC_SOFTWARE_REVISION);

                this._clientConfigCharacteristic = await this._bluetoothDriver.getCharacteristic(this._deviceInfoService, this._bikeProfile.CHARACTERISTIC_CLIENT_CONFIG);
                this._modelNumberCharacteristic = await this._bluetoothDriver.getCharacteristic(this._deviceInfoService, this._bikeProfile.CHARACTERISTIC_MODEL_NUMBER);
                this._serialNumberCharacteristic = await this._bluetoothDriver.getCharacteristic(this._deviceInfoService, this._bikeProfile.CHARACTERISTIC_SERIAL_NUMBER);
            } catch (e) {}

            await this._bluetoothDriver.subscribeCharacteristic(this._parameterCharacteristic, (buffer) => {
                this._subscribers.forEach((callback) => {
                    callback(this._bikeProfile.createParametersEntity(this._cryptService.decrypt(buffer)));
                });
            });
        }
    }

    async reconnect() {
        if(!this.isConnected()) {
            await this._bluetoothDriver.connect(this._gattServer);
            await this._discoverServicesAndCharacteristics();
        }
    }

    disconnect() {
        if(this._gattServer) {
            this._started = false;
            this._bluetoothDriver.disconnect(this._gattServer);
        }
    }

    isConnected() {
        return (this._gattServer && this._bluetoothDriver.isConnected(this._gattServer));
    }

    subscribe(callback) {
        return this._subscribers.push(callback);
    }

    unsubscribe(handleIndex) {
        this._subscribers.splice(handleIndex, 1);
    }

    async _read(bluetoothCommand) {
        let data = this._bluetoothDriver.readValue(bluetoothCommand.getCharacteristic());
        if(bluetoothCommand.isEncryptionNeeded()) {
            data = this._cryptService.decrypt(data);
        }
        return data;
    }

    async _write(bluetoothCommand) {
        let data = new Uint8Array(16);
        if(bluetoothCommand.isChallengeCodeNeeded()) {
            data.set(await this.getChallengeCode(), 0);
        }
        data.set(bluetoothCommand.getCommand(), 2);
        if(bluetoothCommand.getData()) {
            data.set(bluetoothCommand.getData(), 3);
        }
        if(bluetoothCommand.isEncryptionNeeded()) {
            data = this._cryptService.encrypt(data);
        }
        return this._bluetoothDriver.writeValue(bluetoothCommand.getCharacteristic(), data);
    }

    async getChallengeCode() {
        const command = (new BluetoothReadCommandEntity(false)).setService(this._bikeService).setCharacteristic(this._challengeCharacteristic);
        return this._read(command);
    }

    async getParameters() {
        const command = (new BluetoothReadCommandEntity()).setService(this._bikeService).setCharacteristic(this._parameterCharacteristic);
        return this._bikeProfile.createParametersEntity(await this._read(command));
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
