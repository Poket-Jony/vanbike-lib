import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    COMMAND = new Uint8Array([5]);
    STATE_AUTO = new Uint8Array([0]);
    STATE_ALWAYS_ON = new Uint8Array([1]);
    STATE_OFF = new Uint8Array([2]);
    STATE_REAR_FLASH = new Uint8Array([3]);
    STATE_REAR_FLASH_STOPPED = new Uint8Array([4]);
};
