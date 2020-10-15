import ParametersEntity from '../Entity/ParametersEntity';
import ModuleStateEntity from '../Entity/ModuleStateEntity';
import BatteryStateEntity from '../Entity/BatteryStateEntity';
import ErrorCodeStateEntity from '../Entity/ErrorCodeStateEntity';
import LightningStateEntity from '../Entity/LightningStateEntity';
import PowerLevelStateEntity from '../Entity/PowerLevelStateEntity';
import RegionStateEntity from '../Entity/RegionStateEntity';
import UnitStateEntity from '../Entity/UnitStateEntity';
import RunModeStateEntity from '../Entity/RunModeStateEntity';

export default class {
    SERVICE_BIKE = '8e7f1a50-087a-44c9-b292-a2c628fdd9aa';
    CHARACTERISTIC_CHALLENGE = '8e7f1a51-087a-44c9-b292-a2c628fdd9aa';
    CHARACTERISTIC_NEW_PRIVATE_KEY = '8e7f1a52-087a-44c9-b292-a2c628fdd9aa';
    CHARACTERISTIC_FUNCTIONS = '8e7f1a53-087a-44c9-b292-a2c628fdd9aa';
    CHARACTERISTIC_PARAMETERS = '8e7f1a54-087a-44c9-b292-a2c628fdd9aa';

    SERVICE_DEVICE_INFORMATION = '0000180a-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_CLIENT_CONFIG = '00002902-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_FIRMWARE_REVISION = '00002a26-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_HARDWARE_REVISION = '00002a27-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_SOFTWARE_REVISION = '00002a28-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_MODEL_NUMBER = '00002a24-0000-1000-8000-00805f9b34fb';
    CHARACTERISTIC_SERIAL_NUMBER = '00002a25-0000-1000-8000-00805f9b34fb';

    SERVICE_OAD = 'f000ffc0-0451-4000-b000-000000000000';
    CHARACTERISTIC_IMAGE_BLOCK = 'f000ffc2-0451-4000-b000-000000000000';
    CHARACTERISTIC_IMAGE_COUNT = 'f000ffc3-0451-4000-b000-000000000000';
    CHARACTERISTIC_IMAGE_IDENTIFY = 'f000ffc1-0451-4000-b000-000000000000';
    CHARACTERISTIC_IMAGE_STATUS = 'f000ffc4-0451-4000-b000-000000000000';

    COMMAND_SET_PASSCODE = new Uint8Array([1]);
    COMMAND_SET_MODULE_STATE = new Uint8Array([2]);
    COMMAND_SET_LOCK_STATE = new Uint8Array([3]);
    COMMAND_SET_POWER_LEVEL_STATE = new Uint8Array([4]);
    COMMAND_SET_LIGHTNING_STATE = new Uint8Array([5]);
    COMMAND_PAIR_REMOTE = new Uint8Array([6]);
    COMMAND_SET_UNIT_STATE = new Uint8Array([7]);
    COMMAND_SHOW_FIRMWARE = new Uint8Array([8]);
    COMMAND_RESET_DISTANCE = new Uint8Array([9]);
    COMMAND_ENABLE_ERRORS = new Uint8Array([10]);
    COMMAND_DISABLE_ERRORS = new Uint8Array([11]);
    COMMAND_SET_OFFROAD_MODE = new Uint8Array([12]);
    COMMAND_FIRMWARE_UPDATE = new Uint8Array([13]);

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
};
