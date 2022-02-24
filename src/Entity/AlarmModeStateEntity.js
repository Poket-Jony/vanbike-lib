import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_UNSUPPORTED = new Uint8Array([255]);
    STATE_DISARMED = new Uint8Array([0]);
    STATE_ARMED = new Uint8Array([1]);
    STATE_ALARM_ONE = new Uint8Array([2]);
    STATE_ALARM_TWO = new Uint8Array([3]);
    STATE_ALARM_THREE = new Uint8Array([4]);
};
