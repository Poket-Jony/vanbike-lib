import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_SCROLLING_TONE = new Uint8Array([1]);
    STATE_BEEP_NEGATIVE = new Uint8Array([2]);
    STATE_BEEP_POSITIVE = new Uint8Array([3]);
    STATE_DISARM_COUNTDOWN_LONG = new Uint8Array([4]);
    STATE_DISARM_COUNTDOWN_SHORT = new Uint8Array([5]);
    STATE_ENTER_DISARM_MODE = new Uint8Array([6]);
    STATE_HORN = new Uint8Array(7);
    STATE_HORN_LONG = new Uint8Array([8]);
    STATE_ALARM_ARM = new Uint8Array([9]);
    STATE_ALARM_DISARM = new Uint8Array([10]);
    STATE_ALARM_STAGE_ONE = new Uint8Array([11]);
    STATE_ALARM_STAGE_TWO = new Uint8Array([12]);
    STATE_SYSTEM_STARTUP = new Uint8Array([13]);
    STATE_SYSTEM_SHUTDOWN = new Uint8Array([14]);
};
