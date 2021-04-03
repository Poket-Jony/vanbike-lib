import ElectrifiedSX2Profile from './ElectrifiedSX2Profile.js';
import BluetoothConfigEntity from '../Entity/Bluetooth/BluetoothConfigEntity.js';
import BluetoothSubscriberEntity from '../Entity/Bluetooth/BluetoothSubscriberEntity.js';
import BluetoothReadCommandEntity from '../Entity/Bluetooth/BluetoothReadCommandEntity.js';
import BluetoothWriteCommandEntity from '../Entity/Bluetooth/BluetoothWriteCommandEntity.js';

export default class extends ElectrifiedSX2Profile {
    PASSCODE_LENGTH = 12;

    SERVICE_SECURITY = '6acc5500-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_CHALLENGE = '6acc5501-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_KEY_INDEX = '6acc5502-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_BACKUP_CODE = '6acc5503-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_BIKE_MESSAGE = '6acc5505-e631-4069-944d-b8ca7598ad50';

    SERVICE_FIRMWARE = '6acc5510-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_FIRMWARE_METADATA = '6acc5511-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_FIRMWARE_BLOCK = '6acc5512-e631-4069-944d-b8ca7598ad50';

    SERVICE_DEFENCE = '6acc5520-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_LOCK_STATE = '6acc5521-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_UNLOCK_REQUEST = '6acc5522-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_ALARM_STATE = '6acc5523-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_ALARM_MODE = '6acc5524-e631-4069-944d-b8ca7598ad50';

    SERVICE_MOVEMENT = '6acc5530-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_DISTANCE = '6acc5531-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_SPEED = '6acc5532-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_UNIT_SYSTEM = '6acc5533-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_POWER_LEVEL = '6acc5534-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_SPEED_LIMIT = '6acc5535-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_E_SHIFTER_GEAR = '6acc5536-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_E_SHIFTIG_POINTS = '6acc5537-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_E_SHIFTER_MODE = '6acc5538-e631-4069-944d-b8ca7598ad50';

    SERVICE_BIKE_INFO = '6acc5540-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_MOTOR_BATTERY_LEVEL = '6acc5541-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_MOTOR_BATTERY_STATE = '6acc5542-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_MODULE_BATTERY_LEVEL = '6acc5543-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_MODULE_BATTERY_STATE = '6acc5544-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_BIKE_FIRMWARE_VERSION = '6acc554a-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_BLE_CHIP_FIRMWARE_VERSION = '6acc554b-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_CONTROLLER_FIRMWARE_VERSION = '6acc554c-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_PCBA_HARDWARE_VERSION = '6acc554d-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_GSM_FIRMWARE_VERSION = '6acc554e-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_E_SHIFTER_FIRMWARE_VERSION = '6acc554f-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_BATTERY_FIRMWARE_VERSION = '6acc5550-e631-4069-944d-b8ca7598ad50';

    SERVICE_BIKE_STATE = '6acc5560-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_MODULE_MODE = '6acc5561-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_MODULE_STATE = '6acc5562-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_ERRORS = '6acc5563-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_WHEEL_SIZE = '6acc5564-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_CLOCK = '6acc5567-e631-4069-944d-b8ca7598ad50';

    SERVICE_SOUND = '6acc5570-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_PLAY_SOUND = '6acc5571-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_SOUND_VOLUME = '6acc5572-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_BELL_SOUND = '6acc5574-e631-4069-944d-b8ca7598ad50';

    SERVICE_LIGHT = '6acc5580-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_LIGHT_MODE = '6acc5581-e631-4069-944d-b8ca7598ad50';

    SERVICE_MAINTENANCE = '6acc55c0-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_LOG_MODE = '6acc55c1-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_LOG_SIZE = '6acc55c2-e631-4069-944d-b8ca7598ad50';
    CHARACTERISTIC_LOG_BLOCK = '6acc55c3-e631-4069-944d-b8ca7598ad50';

    createBluetoothConfigEntity() {
        const primaryServicesAndCharacteristics = {};
		const optionalServicesAndCharacteristics = {};
		
        optionalServicesAndCharacteristics[this.SERVICE_SECURITY] = [
            this.CHARACTERISTIC_CHALLENGE,
            this.CHARACTERISTIC_KEY_INDEX,
            this.CHARACTERISTIC_BACKUP_CODE,
            this.CHARACTERISTIC_BIKE_MESSAGE,
        ];

        optionalServicesAndCharacteristics[this.SERVICE_DEFENCE] = [
            this.CHARACTERISTIC_LOCK_STATE,
            this.CHARACTERISTIC_UNLOCK_REQUEST,
            this.CHARACTERISTIC_ALARM_STATE,
            this.CHARACTERISTIC_ALARM_MODE,
        ];

        optionalServicesAndCharacteristics[this.SERVICE_MOVEMENT] = [
            this.CHARACTERISTIC_DISTANCE,
            this.CHARACTERISTIC_SPEED,
            this.CHARACTERISTIC_UNIT_SYSTEM,
            this.CHARACTERISTIC_POWER_LEVEL,
            this.CHARACTERISTIC_SPEED_LIMIT,
            this.CHARACTERISTIC_E_SHIFTER_GEAR,
            this.CHARACTERISTIC_E_SHIFTIG_POINTS,
            this.CHARACTERISTIC_E_SHIFTER_MODE,
        ];

        primaryServicesAndCharacteristics[this.SERVICE_BIKE_INFO] = [
            this.CHARACTERISTIC_MOTOR_BATTERY_LEVEL,
            this.CHARACTERISTIC_MOTOR_BATTERY_STATE,
            this.CHARACTERISTIC_MODULE_BATTERY_LEVEL,
            this.CHARACTERISTIC_MODULE_BATTERY_STATE,
            this.CHARACTERISTIC_BIKE_FIRMWARE_VERSION,
            this.CHARACTERISTIC_BLE_CHIP_FIRMWARE_VERSION,
            this.CHARACTERISTIC_CONTROLLER_FIRMWARE_VERSION,
            this.CHARACTERISTIC_PCBA_HARDWARE_VERSION,
            this.CHARACTERISTIC_GSM_FIRMWARE_VERSION,
            this.CHARACTERISTIC_E_SHIFTER_FIRMWARE_VERSION,
            this.CHARACTERISTIC_BATTERY_FIRMWARE_VERSION,
        ];

        optionalServicesAndCharacteristics[this.SERVICE_BIKE_STATE] = [
            this.CHARACTERISTIC_MODULE_MODE,
            this.CHARACTERISTIC_MODULE_STATE,
            this.CHARACTERISTIC_ERRORS,
            this.CHARACTERISTIC_WHEEL_SIZE,
            this.CHARACTERISTIC_CLOCK,
        ];

        optionalServicesAndCharacteristics[this.SERVICE_SOUND] = [
            this.CHARACTERISTIC_PLAY_SOUND,
            this.CHARACTERISTIC_SOUND_VOLUME,
            this.CHARACTERISTIC_BELL_SOUND,
        ];

        optionalServicesAndCharacteristics[this.SERVICE_LIGHT] = [
            this.CHARACTERISTIC_LIGHT_MODE,
        ];

        optionalServicesAndCharacteristics[this.SERVICE_MAINTENANCE] = [
            this.CHARACTERISTIC_LOG_MODE,
            this.CHARACTERISTIC_LOG_SIZE,
            this.CHARACTERISTIC_LOG_BLOCK,
        ];

        
        optionalServicesAndCharacteristics[this.SERVICE_FIRMWARE] = [
            this.CHARACTERISTIC_FIRMWARE_METADATA,
            this.CHARACTERISTIC_FIRMWARE_BLOCK,
        ];
        return new BluetoothConfigEntity(primaryServicesAndCharacteristics, optionalServicesAndCharacteristics);
    }

    createBluetoothSubscriberEntity(callback) {
        //@todo
        return new BluetoothSubscriberEntity('', '', callback);
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
            .setCharacteristicUuid(this.CHARACTERISTIC_KEY_INDEX)
        ;
    }

    createSetModuleStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_BIKE_STATE)
            .setCharacteristicUuid(this.CHARACTERISTIC_MODULE_STATE)
        ;
    }

    createSetLockStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_DEFENCE)
            .setCharacteristicUuid(this.CHARACTERISTIC_LOCK_STATE)
        ;
    }

    createSetLightningStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_LIGHT)
            .setCharacteristicUuid(this.CHARACTERISTIC_LIGHT_MODE)
        ;
    }

    createSetPowerLevelStateCommandEntity(data) {
        return (new BluetoothWriteCommandEntity(undefined, data))
            .setServiceUuid(this.SERVICE_MOVEMENT)
            .setCharacteristicUuid(this.CHARACTERISTIC_POWER_LEVEL)
        ;
    }
};
