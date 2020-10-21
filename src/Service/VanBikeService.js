import CryptService from './CryptService';
import BluetoothService from './BluetoothService';
import WebBluetoothDriver from '../Driver/WebBluetoothDriver';

export default class {
    _bikeProfile;
    _cryptService;
    _bluetoothService;

    constructor(bikeProfile, encryptionKey, bluetoothDriver = undefined) {
        this._bikeProfile = bikeProfile;
        this._cryptService = new CryptService(encryptionKey);
        this._bluetoothService = new BluetoothService(
            bikeProfile,
            bluetoothDriver ? bluetoothDriver : new WebBluetoothDriver(),
            this._cryptService
        );
    }

    async connect() {
        await this._bluetoothService.connect();
    }

    disconnect() {
        this._bluetoothService.disconnect();
    }

    isConnected() {
        return this._bluetoothService.isConnected();
    }

    subscribe(callback) {
        return this._bluetoothService.subscribe(this._bikeProfile.createBluetoothSubscriberEntity(callback));
    }

    unsubscribe(handleIndex) {
        return this._bluetoothService.unsubscribe(handleIndex);
    }

    async authenticate() {
        const command = this._bikeProfile.createAuthenticateCommandEntity(this._cryptService.getPasscode());
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async getParameters() {
        const command = this._bikeProfile.createParametersCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bikeProfile.createParametersEntity(await this._bluetoothService.read(command));
    }

    async getFirmwareRevision() {
        const command = this._bikeProfile.createFirmwareRevisionCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getHardwareRevision() {
        const command = this._bikeProfile.createHardwareRevisionCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getSoftwareRevision() {
        const command = this._bikeProfile.createSoftwareRevisionCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getModelNumber() {
        const command = this._bikeProfile.createModelNumberCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getSerialNumber() {
        const command = this._bikeProfile.createSerialNumberCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async setModuleState(moduleState) {
        const command = this._bikeProfile.createSetModuleStateCommandEntity(moduleState.getState());
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async setLockState(lockState) {
        const command = this._bikeProfile.createSetLockStateCommandEntity(lockState.getState());
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async setLightningState(lightningState) {
        const data = new Uint8Array([lightningState.getState(), 0]);
        const command = this._bikeProfile.createSetLightningStateCommandEntity(data);
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async setPowerLevelState(powerLevelState, regionState) {
        const data = new Uint8Array([powerLevelState.getState(), regionState.getState()]);
        const command = this._bikeProfile.createSetPowerLevelStateCommandEntity(data);
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async setUnitState(unitState) {
        const command = this._bikeProfile.createSetUnitStateCommandEntity(unitState.getState());
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async showFirmware() {
        const command = this._bikeProfile.createShowFirmwareCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async resetDistance() {
        const command = this._bikeProfile.createResetDistanceCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async pairRemote() {
        const command = this._bikeProfile.createPairRemoteCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async enableErrors() {
        const command = this._bikeProfile.createEnableErrorsCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async disableErrors() {
        const command = this._bikeProfile.createDisableErrorsCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async setOffroadMode() {
        const command = this._bikeProfile.createSetOffroadModeCommandEntity();
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async startFirmwareUpdate(firmwareFile) {
        //@todo
        const command = this._bikeProfile.createFirmwareUpdateCommandEntity(new Uint8Array([1]));
        if(!command) {
            throw Error('Command not found');
        }
        return this._bluetoothService.write(command);
    }

    async stopFirmwareUpdate() {
        //@todo
    }
};
