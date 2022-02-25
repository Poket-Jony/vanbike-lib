import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_UNLOCKED = new Uint8Array([0]);
    STATE_LOCKED = new Uint8Array([1]);
    ACTION_UNLOCK = new Uint8Array([2]);
};
