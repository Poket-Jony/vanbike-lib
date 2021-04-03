import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_ON = new Uint8Array([0]);
    STATE_OFF = new Uint8Array([1]);
    STATE_SHIPPING = new Uint8Array([2]);
    STATE_STANDBY = new Uint8Array([3]);
    STATE_ALARM_ONE = new Uint8Array([4]);
    STATE_ALARM_TWO = new Uint8Array([5]);
    STATE_ALARM_THREE = new Uint8Array([6]);
    STATE_SLEEPING = new Uint8Array([7]);
    STATE_TRACKING = new Uint8Array([8]);
};
