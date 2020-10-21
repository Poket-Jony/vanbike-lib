export default class {
    _bikeProfile;
    _bluetoothDriver;
    _cryptService;
    _device;
    _gattServer;
    _config;
    _servicesAndCharacteristics = {};
    _subscribers = [];
    _started = false;

    constructor(bikeProfile, bluetoothDriver, crypt) {
        this._bikeProfile = bikeProfile;
        this._bluetoothDriver = bluetoothDriver;
        this._cryptService = crypt;
        this._config = bikeProfile.createBluetoothConfigEntity();
    }

    async connect() {
        if(!(await this._bluetoothDriver.isAvailable())) {
            throw new Error('Bluetooth driver not available');
        }
        this._device = await this._bluetoothDriver.getDevice(
            Object.keys(this._config.getPrimaryServicesAndCharacteristics()),
            Object.keys(this._config.getOptionalServicesAndCharacteristics())
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
            this._servicesAndCharacteristics = {};
            for (const serviceUuid of Object.keys(this._config.getAllServicesAndCharacteristics())) {
                const characteristicUuids = this._config.getAllServicesAndCharacteristics()[serviceUuid];
                try {
                    const service = await this._bluetoothDriver.getService(this._gattServer, serviceUuid);
                    const characteristics = {};
                    for(const characteristicUuid of characteristicUuids) {
                        try {
                            characteristics[characteristicUuid] = await this._bluetoothDriver.getCharacteristic(service, characteristicUuid);
                        } catch (e) {}
                    }
                    this._servicesAndCharacteristics[serviceUuid] = {
                        service: service,
                        characteristics: characteristics,
                    };
                } catch (e) {}
            }

            for (const subscriberEntity of this._subscribers) {
                const characteristic = this.getCharacteristic(subscriberEntity.getServiceUuid(), subscriberEntity.getCharacteristicUuid());
                if(characteristic) {
                    await this._bluetoothDriver.subscribeCharacteristic(characteristic, (buffer) => {
                        if(subscriberEntity.isEncryptionNeeded()) {
                            subscriberEntity.getCallback()(this._cryptService.decrypt(buffer));
                        } else {
                            subscriberEntity.getCallback()(buffer);
                        }
                    });
                }
            }
        }
    }

    getService(serviceUuid) {
        return this._servicesAndCharacteristics[serviceUuid] ? this._servicesAndCharacteristics[serviceUuid].service : undefined;
    }

    getCharacteristic(serviceUuid, characteristicUuid) {
        return this._servicesAndCharacteristics[serviceUuid] ? this._servicesAndCharacteristics[serviceUuid].characteristics[characteristicUuid] : undefined;
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

    subscribe(bluetoothSubscriber) {
        return this._subscribers.push(bluetoothSubscriber);
    }

    unsubscribe(handleIndex) {
        this._subscribers.splice(handleIndex, 1);
    }

    async read(bluetoothCommand) {
        const characteristic = this.getCharacteristic(bluetoothCommand.getServiceUuid(), bluetoothCommand.getCharacteristicUuid());
        if(!characteristic) {
            throw new Error('Characteristic "' + bluetoothCommand.getCharacteristicUuid() + '" not found');
        }

        let data = this._bluetoothDriver.readValue(characteristic);
        if(bluetoothCommand.isEncryptionNeeded()) {
            data = this._cryptService.decrypt(data);
        }
        return data;
    }

    async write(bluetoothCommand) {
        const characteristic = this.getCharacteristic(bluetoothCommand.getServiceUuid(), bluetoothCommand.getCharacteristicUuid());
        if(!characteristic) {
            throw new Error('Characteristic "' + bluetoothCommand.getCharacteristicUuid() + '" not found');
        }

        let data = new Uint8Array(16);
        if(bluetoothCommand.isChallengeCodeNeeded()) {
            data.set(await this.getChallengeCode(), 0);
            data.set(bluetoothCommand.getCommand(), 2);
            if(bluetoothCommand.getData()) {
                data.set(bluetoothCommand.getData(), 3);
            }
        } else if(bluetoothCommand.getData()) {
            data.set(bluetoothCommand.getData(), 0);
        }
        if(bluetoothCommand.isEncryptionNeeded()) {
            data = this._cryptService.encrypt(data);
        }
        return this._bluetoothDriver.writeValue(characteristic, data);
    }

    async getChallengeCode() {
        const command = this._bikeProfile.createChallengeCodeCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this.read(command);
    }
};
