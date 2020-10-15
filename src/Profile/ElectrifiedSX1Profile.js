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
    COMMAND_FIRMWARE_UPDATE = new Uint8Array([13]);
};
