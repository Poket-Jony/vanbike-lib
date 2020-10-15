import AbstractStateEntity from './AbstractStateEntity';

export default class extends AbstractStateEntity {
    STATE_METRIC = new Uint8Array([0]);
    STATE_IMPERIAL = new Uint8Array([1]);
};
