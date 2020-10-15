export default class {
    moduleState;
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
    trackingState;
    sleepState;
    alarmState;

    setModuleState(moduleState) {
        this.moduleState = moduleState;
        return this;
    }

    setUnlockRequest(unlockRequest) {
        this.unlockRequest = unlockRequest;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setBikeBatteryLevel(bikeBatteryLevel) {
        this.bikeBatteryLevel = bikeBatteryLevel;
        return this;
    }

    setModuleBatteryLevel(moduleBatteryLevel) {
        this.moduleBatteryLevel = moduleBatteryLevel;
        return this;
    }

    setLightning(lightning) {
        this.lightning = lightning;
        return this;
    }

    setPowerLevel(powerLevel) {
        this.powerLevel = powerLevel;
        return this;
    }

    setRegion(region) {
        this.region = region;
        return this;
    }

    setUnit(unit) {
        this.unit = unit;
        return this;
    }

    setDistance(distance) {
        this.distance = distance;
        return this;
    }

    setErrorCode(errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    setRunMode(runMode) {
        this.runMode = runMode;
        return this;
    }

    setTrackingState(trackingState) {
        this.trackingState = trackingState;
        return this;
    }

    setSleepState(sleepState) {
        this.sleepState = sleepState;
        return this;
    }

    setAlarmState(alarmState) {
        this.alarmState = alarmState;
        return this;
    }
};
