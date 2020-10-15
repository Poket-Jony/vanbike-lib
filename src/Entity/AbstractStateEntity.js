export default class {
    state;

    constructor(state = undefined) {
        this.setState(state);
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
        if(state !== undefined && state !== null && !Array.isArray(state)) {
            this.state = new Uint8Array([state]);
        }
        return this;
    }
};
