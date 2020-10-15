import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    STATE_LEVEL_OFF = new Uint8Array([0]);
    STATE_LEVEL_1 = new Uint8Array([1]);
    STATE_LEVEL_2 = new Uint8Array([2]);
    STATE_LEVEL_3 = new Uint8Array([3]);
    STATE_LEVEL_4 = new Uint8Array([4]);
};
