import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_IGNORE = new Uint8Array([0]);
    STATE_INITIAL = new Uint8Array([1]);
    STATE_NORMAL_RUN = new Uint8Array([2]);
    STATE_SMART = new Uint8Array([3]);
    STATE_ERROR = new Uint8Array([7]);
};
