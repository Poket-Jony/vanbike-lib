import BatteryStateEntity from './BatteryStateEntity';
import ErrorCodeStateEntity from './ErrorCodeStateEntity';
import LightningStateEntity from './LightningStateEntity';
import PowerLevelStateEntity from './PowerLevelStateEntity';
import RegionStateEntity from './RegionStateEntity';
import UnitStateEntity from './UnitStateEntity';
import RunModeStateEntity from './RunModeStateEntity';

export default class {
    moduleOn;
    unlockRequest;
    speed;
    bikeBatteryLevel;
    moduleBatteryLevel;
    lightning;
    powerLevel;
    region;
    unit;
    distance;
    errorCode;
    runMode;

    constructor(parametersData) {
        this.moduleOn = parametersData[2] === 1;
        this.unlockRequest = parametersData[3] === 1;
        this.speed = parametersData[4];
        this.bikeBatteryLevel = new BatteryStateEntity(parametersData[5]);
        this.moduleBatteryLevel = new BatteryStateEntity(parametersData[6]);
        this.lightning = new LightningStateEntity(parametersData[7]);
        this.powerLevel = new PowerLevelStateEntity(parametersData[8]);
        this.region = new RegionStateEntity(parametersData[9]);
        this.unit = new UnitStateEntity(parametersData[10]);
        this.distance = (parametersData[11] + (parametersData[12] << 8)) + (parametersData[13] << 16) + (parametersData[14] << 24);
        this.errorCode = new ErrorCodeStateEntity((parametersData[15] & 248) >> 3);
        this.runMode = new RunModeStateEntity(parametersData[15] & 7);
    }
};
