export default class {
    primaryServicesAndCharacteristics;
    optionalServicesAndCharacteristics;

    constructor(primaryServicesAndCharacteristics = {}, optionalServicesAndCharacteristics = {}) {
        this.primaryServicesAndCharacteristics = primaryServicesAndCharacteristics;
        this.optionalServicesAndCharacteristics = optionalServicesAndCharacteristics;
    }

    getPrimaryServicesAndCharacteristics() {
        return this.primaryServicesAndCharacteristics;
    }

    getOptionalServicesAndCharacteristics() {
        return this.optionalServicesAndCharacteristics;
    }

    getAllServicesAndCharacteristics() {
        return {
            ...this.primaryServicesAndCharacteristics,
            ...this.optionalServicesAndCharacteristics,
        };
    }
};
