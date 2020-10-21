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
        return this._bluetoothService.subscribe(this._bikeProfile.SERVICE_BIKE, this._bikeProfile.CHARACTERISTIC_PARAMETERS, (buffer) => {
            callback(this._bikeProfile.createParametersEntity(this._cryptService.decrypt(buffer)));
        });
    }

    unsubscribe(handleIndex) {
        return this._bluetoothService.unsubscribe(handleIndex);
    }

    async authenticate() {
        const command = this._bikeProfile.createAuthenticateCommandEntity(this._cryptService.getPasscode());
        return this._bluetoothService.write(command);
    }

    async getParameters() {
        const command = this._bikeProfile.createParametersCommandEntity();
        return this._bikeProfile.createParametersEntity(await this._bluetoothService.read(command));
    }

    async getFirmwareRevision() {
        const command = this._bikeProfile.createFirmwareRevisionCommandEntity();
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getHardwareRevision() {
        const command = this._bikeProfile.createHardwareRevisionCommandEntity();
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getSoftwareRevision() {
        const command = this._bikeProfile.createSoftwareRevisionCommandEntity();
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getModelNumber() {
        const command = this._bikeProfile.createModelNumberCommandEntity();
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async getSerialNumber() {
        const command = this._bikeProfile.createSerialNumberCommandEntity();
        return this._cryptService.getUtils().utf8.fromBytes(await this._bluetoothService.read(command));
    }

    async setModuleState(moduleState) {
        const command = this._bikeProfile.createSetModuleStateCommandEntity(moduleState.getState());
        return this._bluetoothService.write(command);
    }

    async setLockState(lockState) {
        const command = this._bikeProfile.createSetLockStateCommandEntity(lockState.getState());
        return this._bluetoothService.write(command);
    }

    async setLightningState(lightningState) {
        const data = new Uint8Array([lightningState.getState(), 0]);
        const command = this._bikeProfile.createSetLightningStateCommandEntity(data);
        return this._bluetoothService.write(command);
    }

    async setPowerLevelState(powerLevelState, regionState) {
        const data = new Uint8Array([powerLevelState.getState(), regionState.getState()]);
        const command = this._bikeProfile.createSetPowerLevelStateCommandEntity(data);
        return this._bluetoothService.write(command);
    }

    async setUnitState(unitState) {
        const command = this._bikeProfile.createSetUnitStateCommandEntity(unitState.getState());
        return this._bluetoothService.write(command);
    }

    async showFirmware() {
        const command = this._bikeProfile.createShowFirmwareCommandEntity();
        return this._bluetoothService.write(command);
    }

    async resetDistance() {
        const command = this._bikeProfile.createResetDistanceCommandEntity();
        return this._bluetoothService.write(command);
    }

    async pairRemote() {
        const command = this._bikeProfile.createPairRemoteCommandEntity();
        return this._bluetoothService.write(command);
    }

    async enableErrors() {
        const command = this._bikeProfile.createEnableErrorsCommandEntity();
        return this._bluetoothService.write(command);
    }

    async disableErrors() {
        const command = this._bikeProfile.createDisableErrorsCommandEntity();
        return this._bluetoothService.write(command);
    }

    async setOffroadMode() {
        const command = this._bikeProfile.createSetOffroadModeCommandEntity();
        return this._bluetoothService.write(command);
    }

    async startFirmwareUpdate(firmwareFile) {
        //@todo
        const command = this._bikeProfile.createFirmwareUpdateCommandEntity(new Uint8Array([1]));
        return this._bluetoothService.write(command);
    }

    async stopFirmwareUpdate() {
        //@todo
    }
};
