import AbstractBluetoothCommandEntity from "./AbstractBluetoothCommandEntity";

export default class extends AbstractBluetoothCommandEntity {
    constructor(
        useEncryption = true,
    ) {
        super();
        this.useEncryption = useEncryption;
    }
};
