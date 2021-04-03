import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_AUTO = new Uint8Array([0]);
    STATE_ALWAYS_ON = new Uint8Array([1]);
    STATE_OFF = new Uint8Array([2]);
    STATE_REAR_FLASH = new Uint8Array([3]);
    STATE_REAR_FLASH_STOPPED = new Uint8Array([4]);
};
