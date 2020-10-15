import ElectrifiedSX1Profile from './ElectrifiedSX1Profile';
import TrackingStateEntity from '../Entity/TrackingStateEntity';
import SleepStateEntity from '../Entity/SleepStateEntity';
import AlarmStateEntity from '../Entity/AlarmStateEntity';
import LightningStateEntity from '../Entity/LightningStateEntity';
import UnitStateEntity from '../Entity/UnitStateEntity';
import RegionStateEntity from '../Entity/RegionStateEntity';
import ModuleStateEntity from '../Entity/ModuleStateEntity';

export default class extends ElectrifiedSX1Profile {
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
