export default class {
    state;

    constructor(state = undefined) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
        return this;
    }
};
