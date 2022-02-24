import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_UNMUTED = new Uint8Array([0]);
    STATE_MUTED = new Uint8Array([1]);
};
