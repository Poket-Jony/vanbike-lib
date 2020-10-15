import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    STATE_UNLOCKED = new Uint8Array([0]);
    STATE_LOCKED = new Uint8Array([1]);
};
