# VanBike-Library
[![Latest Release](https://img.shields.io/github/release/Poket-Jony/vanbike-lib.svg?style=flat&color=blue)](https://github.com/Poket-Jony/vanbike-lib/releases/latest)
[![GitHub stars](https://img.shields.io/github/stars/Poket-Jony/vanbike-lib?style=flat&color=brightgreen)](https://github.com/Poket-Jony/vanbike-lib/stargazers)
[![Downloads](https://img.shields.io/npm/dt/vanbike-lib?color=brightgreen)](https://github.com/Poket-Jony/vanbike-lib/releases/latest)
[![Open Issues](https://img.shields.io/github/issues-raw/Poket-Jony/vanbike-lib.svg?style=flat&color=yellowgreen)](https://github.com/Poket-Jony/vanbike-lib/issues?q=is%3Aopen+is%3Aissue)
[![Closed Issues](https://img.shields.io/github/issues-closed-raw/Poket-Jony/vanbike-lib.svg?style=flat&color=brightgreen)](https://github.com/Poket-Jony/vanbike-lib/issues?q=is%3Aissue+is%3Aclosed)

> Allows direct access to VanMoof Bikes Bluetooth-API in Javascript using the [Web-Bluetooth-API](https://developer.mozilla.org/docs/Web/API/Web_Bluetooth_API).

## Features
* Retrieve Parameters (Battery, Distance, Settings, ...)
* Retrieve Firmware/Hardware/Software/Model/Serial Number
* Start Bike-Module
* Unlock Bike
* Set Region Settings
* Set Lightning Settings
* Set Power Level
* Set Units
* Show Firmware
* Reset Distance
* Pair Remote
* Error Logging
* Set Offroad Mode
* Update Firmware (not implemented)
* ...

## Compatibility
#### Bikes
* Electrified S/X 1 (2016/2017) - tested
* Smart S/X 1 (2018) - unsupported (work in progress)
* Electrified S/X 2 - untested (some parameters/functions missing)
* Electrified S/X 3 - unsupported (work in progress)

#### Browsers
See [full list](https://developer.mozilla.org/docs/Web/API/Web_Bluetooth_API#Browser_compatibility).
##### Desktop
* Chrome
    * Mac: >56
    * Linux: >56
    * Windows: >70
* Edge: >79
* Firefox: unsupported
* Internet Explorer: unsupported
* Opera
    * Mac: >43
    * Linux: >43
    * Windows: >57
* Safari: unsupported
##### Mobile
* Android webview: unsupported
* Chrome for Android: >56
* Firefox for Android: unsupported
* Internet Explorer: unsupported
* Opera for Android: >43
* Safari on iOS: unsupported
* Samsung Internet: >6.0

## Usage
#### Install
Download from [GitHub-Releases](https://github.com/Poket-Jony/vanbike-lib/releases/latest) or add via NPM.

```shell script
# Yarn
yarn add vanbike-lib

# NPM
npm i vanbike-lib
```

#### ES6
```javascript
import { VanBikeService, ElectrifiedSX1Profile, ModuleStateEntity, LockStateEntity } from 'vanbike-lib';
const bikeProfile = new ElectrifiedSX1Profile();
const vanBikeService = new VanBikeService(bikeProfile, 'ENCRYPTION-KEY');
```

#### Browser
```html
<script type="text/javascript" src="/dist/vanbike-lib.js"></script>
```
```javascript
const bikeProfile = new VanBikeLib.ElectrifiedSX1Profile();
const vanBikeService = new VanBikeLib.VanBikeService(bikeProfile, 'ENCRYPTION-KEY');
const ModuleStateEntity = VanBikeLib.ModuleStateEntity;
const LockStateEntity = VanBikeLib.LockStateEntity;
```

## Example
For more examples see `example` folder.
```javascript
// Event listener
vanBikeService.subscribe((parameters) => {
    console.log(parameters);
});

// Connect
await vanBikeService.connect();

// Authenticate
await vanBikeService.authenticate();

// Turn on
const moduleState = new ModuleStateEntity();
moduleState.setState(moduleState.STATE_ON);
await vanBikeService.setModuleState(moduleState);

// Unlock
const lockState = new LockStateEntity();
lockState.setState(lockState.STATE_UNLOCKED);
await vanBikeService.setLockState(lockState);

// Disconnect
vanBikeService.disconnect();
```

## Documentation
#### VanBikeService
* `constructor(encryptionKey : string) : void`
* `async connect() : Promise`
* `disconnect() : void`
* `isConnected() : bool`
* `subscribe(function callback) : Number`
* `unsubscribe(handleIndex) : void`
* `async authenticate() : Promise`
* `async getParameters() : ParametersEntity`
* `async getFirmwareRevision() : string`
* `async getHardwareRevision() : string`
* `async getSoftwareRevision() : string`
* `async getModelNumber() : string`
* `async getSerialNumber() : string`
* `async setModuleState(ModuleStateEntity moduleState) : Promise`
* `async setLockState(LockStateEntity lockState) : Promise`
* `async setLightningState(LightningStateEntity lightningState) : Promise`
* `async setPowerLevelState(PowerStateEntity powerState, RegionStateEntity regionState) : Promise`
* `async setUnitState(UnitStateEntity unitState) : Promise`
* `async showFirmware() : Promise`
* `async resetDistance() : Promise`
* `async pairRemote() : Promise`
* `async enableErrors() : Promise`
* `async disableErrors() : Promise`
* `async setOffroadMode() : Promise`

__Todo:__
* `async startFirmwareUpdate(FirmwareEntity firmware) : Promise`
* `async stopFirmwareUpdate() : Promise`

## Notice
This project is not related to VanMoof.
The guarantee expires with use.

#### CORS Policy
The `WebService` calls the VanMoof API directly.
This is probably not possible in Browsers because of [CORS-Policy](https://developer.mozilla.org/docs/Web/HTTP/CORS).
Use a workaround with the Chrome-Plugin: [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf).
Or use this service from NodeJS. 

## License
MIT