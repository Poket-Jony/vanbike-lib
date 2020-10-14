import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    COMMAND = new Uint8Array([7]);
    STATE_METRIC = new Uint8Array([0]);
    STATE_IMPERIAL = new Uint8Array([1]);
};
