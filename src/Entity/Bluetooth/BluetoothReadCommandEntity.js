import AbstractBluetoothCommandEntity from './AbstractBluetoothCommandEntity.js'

export default class extends AbstractBluetoothCommandEntity {
  _useEncryption

  constructor(useEncryption = true) {
    super()
    this._useEncryption = useEncryption
  }

  isEncryptionNeeded() {
    return this._useEncryption;
  }
}
