import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    COMMAND = new Uint8Array([4]);
    STATE_EU = new Uint8Array([0]);
    STATE_US = new Uint8Array([1]);
    STATE_UNLOCKED = new Uint8Array([2]);
};
