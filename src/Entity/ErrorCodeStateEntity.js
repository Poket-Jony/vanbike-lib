import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    STATE_NO_ERROR = new Uint8Array([0]);
    STATE_MOTOR_STALLED = new Uint8Array([1]);
    STATE_OVER_VOLTAGE = new Uint8Array([2]);
    STATE_UNDER_VOLTAGE = new Uint8Array([3]);
    STATE_MOTOR_FAST = new Uint8Array([5]);
    STATE_OVER_CURRENT = new Uint8Array([6]);
    STATE_TORQUE_ABNORMAL = new Uint8Array([7]);
    STATE_TORQUE_INITIAL_ABNORMAL = new Uint8Array([8]);
    STATE_OVER_TEMPERATURE = new Uint8Array([9]);
    STATE_HALL_ARRANGEMENT_MISMATCH = new Uint8Array([16]);
    STATE_I2C_BUS_ERROR = new Uint8Array([25]);
    STATE_GSM_UART_TIMEOUT = new Uint8Array([26]);
    STATE_CONTROLLER_UART_TIMEOUT = new Uint8Array([27]);
    STATE_GSM_REGISTRATION_FAILURE = new Uint8Array([28]);
    STATE_NO_BATTERY_OUTPUT = new Uint8Array([29]);
};
