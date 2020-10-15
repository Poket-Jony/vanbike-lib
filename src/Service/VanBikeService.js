import CryptService from './CryptService';
import BluetoothService from './BluetoothService';
import BluetoothWriteCommandEntity from '../Entity/Bluetooth/BluetoothWriteCommandEntity';

export default class {
    _bikeProfile;
    _cryptService;
    _bluetoothService;

    constructor(bikeProfile, encryptionKey) {
        this._bikeProfile = bikeProfile;
        this._cryptService = new CryptService(encryptionKey);
        this._bluetoothService = new BluetoothService(bikeProfile, this._cryptService);
    }

    getBluetoothService() {
        return this._bluetoothService;
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

    notify(callback) {
        return this._bluetoothService.notify(callback);
    }

    async authenticate() {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SET_PASSCODE, this._cryptService.getPasscode());
        return this._bluetoothService.sendFunction(command);
    }

    async setModuleState(moduleState) {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SET_MODULE_STATE, moduleState.getState());
        return this._bluetoothService.sendFunction(command);
    }

    async setLockState(lockState) {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SET_LOCK_STATE, lockState.getState());
        return this._bluetoothService.sendFunction(command);
    }

    async setLightningState(lightningState) {
        const data = new Uint8Array([lightningState.getState(), 0]);
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SET_LIGHTNING_STATE, data);
        return this._bluetoothService.sendFunction(command);
    }

    async setPowerLevelState(powerLevelState, regionState) {
        const data = new Uint8Array([powerLevelState.getState(), regionState.getState()]);
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SET_POWER_LEVEL_STATE, data);
        return this._bluetoothService.sendFunction(command);
    }

    async setUnitState(unitState) {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SET_UNIT_STATE, unitState.getState());
        return this._bluetoothService.sendFunction(command);
    }

    async showFirmware() {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_SHOW_FIRMWARE);
        return this._bluetoothService.sendFunction(command);
    }

    async resetDistance() {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_RESET_DISTANCE);
        return this._bluetoothService.sendFunction(command);
    }

    async pairRemote() {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_PAIR_REMOTE);
        return this._bluetoothService.sendFunction(command);
    }

    async enableErrors() {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_ENABLE_ERRORS);
        return this._bluetoothService.sendFunction(command);
    }

    async disableErrors() {
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_DISABLE_ERRORS);
        return this._bluetoothService.sendFunction(command);
    }

    /*async startFirmwareUpdate(firmwareFile) {
        //@todo
        const command = new BluetoothWriteCommandEntity(this._bikeProfile.COMMAND_FIRMWARE_UPDATE, new Uint8Array([1]));
        return this._bluetoothService.sendFunction(command);
    }*/
};
