import CryptService from './CryptService';
import BluetoothService from './BluetoothService';
import BluetoothWriteCommandEntity from '../Entity/Bluetooth/BluetoothWriteCommandEntity';

export default class {
    _cryptService;
    _bluetoothService;

    constructor(encryptionKey) {
        this._cryptService = new CryptService(encryptionKey);
        this._bluetoothService = new BluetoothService(this._cryptService);
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
        const command = new BluetoothWriteCommandEntity(new Uint8Array([1]), this._cryptService.getPasscode());
        return this._bluetoothService.sendFunction(command);
    }

    async setModuleState(moduleState) {
        const command = new BluetoothWriteCommandEntity(moduleState.COMMAND, moduleState.getState());
        return this._bluetoothService.sendFunction(command);
    }

    async setLockState(lockState) {
        const command = new BluetoothWriteCommandEntity(lockState.COMMAND, lockState.getState());
        return this._bluetoothService.sendFunction(command);
    }

    async setLightningState(lightningState) {
        const data = new Uint8Array([lightningState.getState(), 0]);
        const command = new BluetoothWriteCommandEntity(lightningState.COMMAND, data);
        return this._bluetoothService.sendFunction(command);
    }

    async setPowerLevelState(powerLevelState, regionState) {
        const data = new Uint8Array([powerLevelState.getState(), regionState.getState()]);
        const command = new BluetoothWriteCommandEntity(powerLevelState.COMMAND, data);
        return this._bluetoothService.sendFunction(command);
    }

    async setUnitState(unitState) {
        const command = new BluetoothWriteCommandEntity(unitState.COMMAND, unitState.getState());
        return this._bluetoothService.sendFunction(command);
    }

    async showFirmware() {
        const command = new BluetoothWriteCommandEntity(new Uint8Array([8]));
        return this._bluetoothService.sendFunction(command);
    }

    async resetDistance() {
        const command = new BluetoothWriteCommandEntity(new Uint8Array([9]));
        return this._bluetoothService.sendFunction(command);
    }

    async pairRemote() {
        const command = new BluetoothWriteCommandEntity(new Uint8Array([6]));
        return this._bluetoothService.sendFunction(command);
    }
};
