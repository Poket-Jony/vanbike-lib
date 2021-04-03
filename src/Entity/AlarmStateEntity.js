import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_UNSUPPORTED = new Uint8Array([255]);
    STATE_OFF = new Uint8Array([0]);
    STATE_MANUAL = new Uint8Array([1]);
    STATE_AUTO = new Uint8Array([2]);
};
