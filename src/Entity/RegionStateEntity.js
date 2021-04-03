import AbstractStateEntity from './AbstractStateEntity.js';

export default class extends AbstractStateEntity {
    STATE_UNSUPPORTED = new Uint8Array([255]);
    STATE_EU = new Uint8Array([0]);
    STATE_US = new Uint8Array([1]);
    STATE_OFFROAD = new Uint8Array([2]);
    STATE_JAPAN = new Uint8Array([3]);
};
