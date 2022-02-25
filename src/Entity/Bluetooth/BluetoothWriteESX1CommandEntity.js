import AbstractBluetoothCommandEntity from './AbstractBluetoothCommandEntity.js'

export default class extends AbstractBluetoothCommandEntity {
  _command
  _data
  _useEncryption
  _useChallengeCode

  constructor(
    command = undefined,
    data = undefined,
    useEncryption = true,
    useChallengeCode = true
  ) {
    super()
    this._command = command
    this._data = data
    this._useEncryption = useEncryption
    this._useChallengeCode = useChallengeCode
  }

  getCommand() {
    return this._command
  }

  getData() {
    return this._data
  }

  isEncryptionNeeded() {
    return this._useEncryption;
  }

  isChallengeCodeNeeded() {
    return this._useChallengeCode
  }
}
