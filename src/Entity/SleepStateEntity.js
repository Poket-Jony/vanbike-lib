import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    STATE_UNSUPPORTED = new Uint8Array([255]);
    STATE_OFF = new Uint8Array([0]);
    STATE_ON = new Uint8Array([1]);
};
