import BluetoothReadCommandEntity from '../Entity/Bluetooth/BluetoothReadCommandEntity.js';
import BluetoothWriteCommandEntity from '../Entity/Bluetooth/BluetoothWriteCommandEntity.js';
import BluetoothConfigEntity from '../Entity/Bluetooth/BluetoothConfigEntity.js';
import BluetoothSubscriberEntity from '../Entity/Bluetooth/BluetoothSubscriberEntity.js';
import ParametersEntity from '../Entity/ParametersEntity.js';
import ModuleStateEntity from '../Entity/ModuleStateEntity.js';
import BatteryStateEntity from '../Entity/BatteryStateEntity.js';
import ErrorCodeStateEntity from '../Entity/ErrorCodeStateEntity.js';
import LightningStateEntity from '../Entity/LightningStateEntity.js';
import PowerLevelStateEntity from '../Entity/PowerLevelStateEntity.js';
import RegionStateEntity from '../Entity/RegionStateEntity.js';
import UnitStateEntity from '../Entity/UnitStateEntity.js';
import RunModeStateEntity from '../Entity/RunModeStateEntity.js';

export default class {
    PASSCODE_LENGTH = 12;

    SERVICE_BIKE = 'F0005500-0451-4000-B000-000000000000';

    SERVICE_SECURITY = '6ACB5520-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_CHALLENGE = '6ACB5522-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_PASSCODE = '6ACB5523-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_ENCRYPTION_KEY = '6ACB5524-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_DISTRIBUTION_KEY = '6ACB5525-E631-4069-944D-B8CA7598AD50';

    SERVICE_COMMAND = '6ACB5500-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_LOCK_STATE = '6ACB5501-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_DISTANCE = '6ACB5502-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_SPEED = '6ACB5503-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_G_SENSOR = '6ACB5504-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_SOUNDS = '6ACB5505-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_TRANSFER = '6ACB5506-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_MODULE_STATE = '6ACB5507-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_ERROR_CODE = '6ACB5508-E631-4069-944D-B8CA7598AD50';

    SERVICE_SETTINGS = '6ACB5510-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_LIGHT_SETTING = '6ACB5511-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_ALARM_SETTING = '6ACB5512-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_WHEEL_SIZE = '6ACB5513-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_LIGHT_SENSOR = '6ACB5514-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_BACKUP_CODE = '6ACB5515-E631-4069-944D-B8CA7598AD50';

    SERVICE_STANDARD = '00008a0e-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_BATTERY_LEVEL = '00002a19-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_BATTERY_STATE = '00002a1a-0000-1000-8000-00805f9b34fb';

    SERVICE_UPLOAD = '6ACB5530-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_METADATA = '6ACB5531-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_FIRMWARE_UPLOAD = '6ACB5532-E631-4069-944D-B8CA7598AD50';
    CHARACTERISTIC_SOUND_UPLOAD = '6ACB5533-E631-4069-944D-B8CA7598AD50';

    createBluetoothConfigEntity() {
        const primaryServicesAndCharacteristics = {};
        primaryServicesAndCharacteristics[this.SERVICE_BIKE] = [];
        primaryServicesAndCharacteristics[this.SERVICE_SECURITY] = [
            this.CHARACTERISTIC_CHALLENGE,
            this.CHARACTERISTIC_PASSCODE,
            this.CHARACTERISTIC_ENCRYPTION_KEY,
            this.CHARACTERISTIC_DISTRIBUTION_KEY,
        ];
        primaryServicesAndCharacteristics[this.SERVICE_COMMAND] = [
            this.CHARACTERISTIC_LOCK_STATE,
            this.CHARACTERISTIC_DISTANCE,
            this.CHARACTERISTIC_SPEED,
            this.CHARACTERISTIC_G_SENSOR,
            this.CHARACTERISTIC_SOUNDS,
            this.CHARACTERISTIC_TRANSFER,
            this.CHARACTERISTIC_MODULE_STATE,
            this.CHARACTERISTIC_ERROR_CODE,
        ];
        primaryServicesAndCharacteristics[this.SERVICE_SETTINGS] = [
            this.CHARACTERISTIC_LIGHT_SETTING,
            this.CHARACTERISTIC_ALARM_SETTING,
            this.CHARACTERISTIC_WHEEL_SIZE,
            this.CHARACTERISTIC_LIGHT_SENSOR,
            this.CHARACTERISTIC_BACKUP_CODE,
        ];
        primaryServicesAndCharacteristics[this.SERVICE_STANDARD] = [
            this.CHARACTERISTIC_BATTERY_LEVEL,
            this.CHARACTERISTIC_BATTERY_STATE,
        ];

        const optionalServicesAndCharacteristics = {};
        optionalServicesAndCharacteristics[this.SERVICE_UPLOAD] = [
            this.CHARACTERISTIC_METADATA,
            this.CHARACTERISTIC_FIRMWARE_UPLOAD,
            this.CHARACTERISTIC_SOUND_UPLOAD,
        ];
        return new BluetoothConfigEntity(primaryServicesAndCharacteristics, optionalServicesAndCharacteristics);
    }

    createBluetoothSubscriberEntity(callback) {
        //@todo
        return new BluetoothSubscriberEntity('', '', callback);
    }

    createParametersEntity(parametersData) {
        const moduleState = new ModuleStateEntity();
        moduleState.setState(parametersData[2] === 1 ? moduleState.STATE_ON : moduleState.STATE_STANDBY);

        return (new ParametersEntity())
            .setModuleState(moduleState)
            .setUnlockRequest(parametersData[3] === 1)
            .setSpeed(parametersData[4])
            .setBikeBatteryLevel(new BatteryStateEntity(parametersData[5]))
            .setModuleBatteryLevel(new BatteryStateEntity(parametersData[6]))
            .setLightning(new LightningStateEntity(parametersData[7]))
            .setPowerLevel(new PowerLevelStateEntity(parametersData[8]))
            .setRegion(new RegionStateEntity(parametersData[9]))
            .setUnit(new UnitStateEntity(parametersData[10]))
            .setDistance(parametersData[11] + (parametersData[12] << 8) + (parametersData[13] << 16) + (parametersData[14] << 24))
            .setErrorCode(new ErrorCodeStateEntity((parametersData[15] & 248) >> 3))
            .setRunMode(new RunModeStateEntity(parametersData[15] & 7))
        ;
    }

    createChallengeCodeCommandEntity() {
        return (new BluetoothReadCommandEntity(false))
            .setServiceUuid(this.SERVICE_SECURITY)
            .setCharacteristicUuid(this.CHARACTERISTIC_CHALLENGE)
        ;
    }

    createAuthenticateCommandEntity(passcode) {
        return (new BluetoothWriteCommandEntity(undefined, passcode))
            .setServiceUuid(this.SERVICE_SECURITY)
            .setCharacteristicUuid(this.CHARACTERISTIC_PASSCODE)
        ;
    }

    createParametersCommandEntity() {
        return null;
    }

    createFirmwareRevisionCommandEntity() {
        return null;
    }

    createHardwareRevisionCommandEntity() {
        return null;
    }

    createSoftwareRevisionCommandEntity() {
        return null;
    }

    createModelNumberCommandEntity() {
        return null;
    }

    createSerialNumberCommandEntity() {
        return null;
    }

    createSetModuleStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_SETTINGS)
            .setCharacteristicUuid(this.CHARACTERISTIC_MODULE_STATE)
        ;
    }

    createSetLockStateCommandEntity(data) {
        return null;
    }

    createSetLightningStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data, true, false))
            .setServiceUuid(this.SERVICE_SETTINGS)
            .setCharacteristicUuid(this.CHARACTERISTIC_LIGHT_SETTING)
        ;
    }

    createSetPowerLevelStateCommandEntity(data) {
        return null;
    }

    createSetUnitStateCommandEntity(data) {
        return null;
    }

    createShowFirmwareCommandEntity() {
        return null;
    }

    createResetDistanceCommandEntity() {
        return null;
    }

    createPairRemoteCommandEntity() {
        return null;
    }

    createEnableErrorsCommandEntity() {
        return null;
    }

    createDisableErrorsCommandEntity() {
        return null;
    }

    createSetOffroadModeCommandEntity() {
        return null;
    }

    createFirmwareUpdateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data, true, false))
            .setServiceUuid(this.SERVICE_UPLOAD)
            .setCharacteristicUuid(this.CHARACTERISTIC_FIRMWARE_UPLOAD)
        ;
    }

    createSetEncryptionKeyCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data, true, false))
            .setServiceUuid(this.SERVICE_SECURITY)
            .setCharacteristicUuid(this.CHARACTERISTIC_ENCRYPTION_KEY)
        ;
    }

    createSetDistributionKeyCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data, true, false))
            .setServiceUuid(this.SERVICE_SECURITY)
            .setCharacteristicUuid(this.CHARACTERISTIC_DISTRIBUTION_KEY)
        ;
    }

    createSetAlarmModeCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_SETTINGS)
            .setCharacteristicUuid(this.CHARACTERISTIC_ALARM_SETTING)
        ;
    }

    createSetAlarmStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_COMMAND)
            .setCharacteristicUuid(this.CHARACTERISTIC_LOCK_STATE)
        ;
    }

    createSetBackupCodeCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_SETTINGS)
            .setCharacteristicUuid(this.CHARACTERISTIC_BACKUP_CODE)
        ;
    }

    createPlaySoundCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_COMMAND)
            .setCharacteristicUuid(this.CHARACTERISTIC_SOUNDS)
        ;
    }
};
