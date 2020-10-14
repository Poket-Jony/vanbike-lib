import AbstractBluetoothCommandEntity from "./AbstractBluetoothCommandEntity";

export default class extends AbstractBluetoothCommandEntity {
    command;
    data;
    useChallengeCode;

    constructor(
        command = undefined,
        data = undefined,
        useEncryption = true,
        useChallengeCode = true
    ) {
        super();
        this.command = command;
        this.data = data;
        this.useEncryption = useEncryption;
        this.useChallengeCode = useChallengeCode;
    }

    getCommand() {
        return this.command;
    }

    getData() {
        return this.data;
    }

    isChallengeCodeNeeded() {
        return this.useChallengeCode;
    }
};
