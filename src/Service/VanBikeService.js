import aesJs from 'https://cdn.skypack.dev/aes-js@^3.1.2'
import CryptService from './CryptService.js'
import BluetoothService from './BluetoothService.js'
import WebBluetoothDriver from '../Driver/WebBluetoothDriver.js'
import ElectrifiedSX3Profile from "../Profile/ElectrifiedSX3Profile.js";

export default class {
    _bikeProfile
    _cryptService
    _bluetoothService

    constructor(bikeProfile, encryptionKey, userKeyId = 1, bluetoothDriver = undefined) {
        this._bikeProfile = bikeProfile
        this._cryptService = new CryptService(
            encryptionKey,
            bikeProfile.PASSCODE_LENGTH,
            userKeyId
        )
        this._bluetoothService = new BluetoothService(
            bikeProfile,
            bluetoothDriver ? bluetoothDriver : new WebBluetoothDriver(),
            this._cryptService
        )
    }

    async connect() {
        await this._bluetoothService.connect()
    }

    disconnect() {
        this._bluetoothService.disconnect()
    }

    isConnected() {
        return this._bluetoothService.isConnected()
    }

    subscribe(bluetoothSubscriberEntity) {
        return this._bluetoothService.subscribe(bluetoothSubscriberEntity)
    }

    unsubscribe(handleIndex) {
        return this._bluetoothService.unsubscribe(handleIndex)
    }

    _checkBluetoothCommand(bluetoothCommand) {
        if (!bluetoothCommand) {
            throw Error('Bluetooth command not available')
        }
        return bluetoothCommand
    }

    async authenticate() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createAuthenticateCommandEntity(
                this._bikeProfile instanceof ElectrifiedSX3Profile ? this._cryptService.getUserKeyId() : this._cryptService.getPasscode()
            )
        )
        return this._bluetoothService.write(command)
    }

    async getParameters() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createParametersCommandEntity()
        )
        return this._bikeProfile.createParametersEntity(
            await this._bluetoothService.read(command)
        )
    }

    async getFirmwareRevision() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createFirmwareRevisionCommandEntity()
        )
        return this._cryptService
            .getUtils()
            .utf8.fromBytes(await this._bluetoothService.read(command))
    }

    async getHardwareRevision() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createHardwareRevisionCommandEntity()
        )
        return this._cryptService
            .getUtils()
            .utf8.fromBytes(await this._bluetoothService.read(command))
    }

    async getSoftwareRevision() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSoftwareRevisionCommandEntity()
        )
        return this._cryptService
            .getUtils()
            .utf8.fromBytes(await this._bluetoothService.read(command))
    }

    async getModelNumber() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createModelNumberCommandEntity()
        )
        return this._cryptService
            .getUtils()
            .utf8.fromBytes(await this._bluetoothService.read(command))
    }

    async getSerialNumber() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSerialNumberCommandEntity()
        )
        return this._cryptService
            .getUtils()
            .utf8.fromBytes(await this._bluetoothService.read(command))
    }

    async setModuleState(moduleState) {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetModuleStateCommandEntity(
                moduleState.getState()
            )
        )
        return this._bluetoothService.write(command)
    }

    async getLockState() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createGetLockStateCommandEntity()
        )
        return this._cryptService
            .getUtils()
            .utf8.fromBytes(await this._bluetoothService.read(command))
    }

    async setLockState(lockState) {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetLockStateCommandEntity(lockState.getState())
        )
        return this._bluetoothService.write(command)
    }

    async setLightningState(lightningState) {
        const data = new Uint8Array([lightningState.getState(), 0])
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetLightningStateCommandEntity(data)
        )
        return this._bluetoothService.write(command)
    }

    async setPowerLevelState(powerLevelState, regionState) {
        const data = new Uint8Array([
            powerLevelState.getState(),
            regionState.getState()
        ])
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetPowerLevelStateCommandEntity(data)
        )
        return this._bluetoothService.write(command)
    }

    async setUnitState(unitState) {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetUnitStateCommandEntity(unitState.getState())
        )
        return this._bluetoothService.write(command)
    }

    async showFirmware() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createShowFirmwareCommandEntity()
        )
        return this._bluetoothService.write(command)
    }

    async resetDistance() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createResetDistanceCommandEntity()
        )
        return this._bluetoothService.write(command)
    }

    async pairRemote() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createPairRemoteCommandEntity()
        )
        return this._bluetoothService.write(command)
    }

    async enableErrors() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createEnableErrorsCommandEntity()
        )
        return this._bluetoothService.write(command)
    }

    async disableErrors() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createDisableErrorsCommandEntity()
        )
        return this._bluetoothService.write(command)
    }

    async setOffroadMode() {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetOffroadModeCommandEntity()
        )
        return this._bluetoothService.write(command)
    }

    async startFirmwareUpdate(firmwareFile) {
        //@todo
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createFirmwareUpdateCommandEntity(new Uint8Array([1]))
        )
        return this._bluetoothService.write(command)
    }

    async stopFirmwareUpdate() {
        //@todo
    }

    async setEncryptionKey(encryptionKey) {
        const key = new Uint8Array(aesJs.utils.hex.toBytes(encryptionKey))
        if (key.length !== 16) {
            throw Error('Encryption key must be 16 bytes long')
        }
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetEncryptionKeyCommandEntity(key)
        )
        return this._bluetoothService.write(command)
    }

    async setDistributionKey(distributionKey) {
        const key = new Uint8Array(aesJs.utils.hex.toBytes(distributionKey))
        if (key.length !== 16) {
            throw Error('Distribution key must be 16 bytes long')
        }
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetDistributionKeyCommandEntity(key)
        )
        return this._bluetoothService.write(command)
    }

    async setAlarmModeState(alarmModeState) {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetAlarmModeCommandEntity(
                alarmModeState.getState()
            )
        )
        return this._bluetoothService.write(command)
    }

    async setAlarmState(alarmState) {
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetAlarmStateCommandEntity(alarmState.getState())
        )
        return this._bluetoothService.write(command)
    }

    async setBackupCode(backupCode) {
        const code = new Uint8Array([backupCode])
        if (code.length !== 3) {
            throw Error('Backup code must be 3 bytes long')
        }
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createSetBackupCodeCommandEntity(code)
        )
        return this._bluetoothService.write(command)
    }

    async playSound(soundState, playCount) {
        const data = new Uint8Array([0, playCount])
        data.set(soundState.getState(), 0)
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createPlaySoundCommandEntity(data)
        )
        return this._bluetoothService.write(command)
    }

    async setMuteSoundState(muteSoundState) {
        const data = new Uint8Array([0, 0])
        data.set(muteSoundState.getState(), 1)
        const command = this._checkBluetoothCommand(
            this._bikeProfile.createPlaySoundCommandEntity(data)
        )
        return this._bluetoothService.write(command)
    }
}
