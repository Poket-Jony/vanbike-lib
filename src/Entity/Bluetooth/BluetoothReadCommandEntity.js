import AbstractBluetoothCommandEntity from './AbstractBluetoothCommandEntity.js'

export default class extends AbstractBluetoothCommandEntity {
  constructor(useEncryption = true) {
    super()
    this.useEncryption = useEncryption
  }
}
