import AbstractBluetoothCommandEntity from './AbstractBluetoothCommandEntity.js'

export default class extends AbstractBluetoothCommandEntity {
  _data
  _payload

  constructor(
    data = undefined,
    payload = undefined
  ) {
    super()
    this._data = data
    this._payload = payload
  }

  getData() {
    return this._data
  }

  getPayload() {
    return this._payload
  }
}
