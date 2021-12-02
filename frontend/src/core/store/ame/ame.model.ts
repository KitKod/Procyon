import { ManufacturerModel } from '../manufacturer/manufacturer.model';
import { WithoutId, OnlyId } from '@core/utility-types';

export enum AmeFamily {
    Aircraft = 'aircraft',
    AeroelasticSystems = 'aeroelastic_systems',
    ArmoredVehicles = 'armored_vehicles',
    AutomotiveVehicles = 'automotive_vehicles',
    ArtilleryArmament = 'artillery_armament',
    SmallArms = 'small_arms',
    Ships = 'ships',
    RadarSystems = 'radar_systems',
    IntelligenceTools = 'intelligence_tools',
    MeansREB = 'means_REB',
    MeansOfCommunication = 'means_of_communication',
    SpecialVehicles = 'special_vehicles',
    AntiAircraftMissileSystems = 'anti_aircraft_missile_systems',
}

export interface AmeModel {
    /**
     * AME database id
     */
    id: number;
    /**
     * Name of AME, e.g. object 168
     */
    name: string;
    /**
     * AME family e.g aircraft, ships, small arms etc.
     */
    family: AmeFamily;
    /**
     * Type of AME e.g. tank, plane etc.
     */
    type: string;
    /**
     * Id of file that relates to TTC
     */
    ttc_id: number;
    // /**
    //  * Manufacturer structure
    //  */
    // manufacturer?: ManufacturerModel;
}

export interface AmeCreateModel extends Omit<WithoutId<AmeModel>, 'ttc_id'> {
    manufacturer?: WithoutId<ManufacturerModel> | OnlyId<ManufacturerModel>;
    ttc_file: File;
}
