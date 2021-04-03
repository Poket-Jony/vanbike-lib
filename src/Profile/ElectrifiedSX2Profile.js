import ElectrifiedSX1Profile from './ElectrifiedSX1Profile.js';
import TrackingStateEntity from '../Entity/TrackingStateEntity.js';
import SleepStateEntity from '../Entity/SleepStateEntity.js';
import AlarmStateEntity from '../Entity/AlarmStateEntity.js';
import LightningStateEntity from '../Entity/LightningStateEntity.js';
import UnitStateEntity from '../Entity/UnitStateEntity.js';
import RegionStateEntity from '../Entity/RegionStateEntity.js';
import ModuleStateEntity from '../Entity/ModuleStateEntity.js';

export default class extends ElectrifiedSX1Profile {
    PASSCODE_LENGTH = 12;

    createParametersEntity(parametersData) {
        const moduleState = new ModuleStateEntity();
        const trackingState = new TrackingStateEntity((parametersData[2] & 16) >> 4);
        const sleepingState = new SleepStateEntity((parametersData[2] & 32) >> 5);
        if((parametersData[2] & 1) === 1) {
            moduleState.setState(moduleState.STATE_ON);
        } else if(trackingState.getState() === trackingState.STATE_ON) {
            moduleState.setState(moduleState.STATE_TRACKING);
        } else if(sleepingState.getState() === sleepingState.STATE_ON) {
            moduleState.setState(moduleState.STATE_SLEEPING);
        } else {
            moduleState.setState(moduleState.STATE_STANDBY);
        }

        return super.createParametersEntity(parametersData)
            .setModuleState(moduleState)
            .setLightning(new LightningStateEntity(parametersData[7] & 3))
            .setUnit(new UnitStateEntity((parametersData[7] & 4) >> 2))
            .setRegion(new RegionStateEntity(parametersData[8] & 3))
            .setTrackingState(trackingState)
            .setSleepState(sleepingState)
            .setAlarmState(new AlarmStateEntity((parametersData[2] & 14) >> 1))
        ;
    }
};
