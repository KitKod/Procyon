import { ManufacturerModel, ManufacturerAddModel } from '../manufacturer/manufacturer.model';
import { WithoutId, OnlyId } from '@core/utility-types';

export type AmeFamily =
    | 'aircraft'
    | 'aeroelastic_systems'
    | 'armored_vehicles'
    | 'automotive_vehicles'
    | 'artillery_armament'
    | 'small_arms'
    | 'ships'
    | 'radar_systems'
    | 'intelligence_tools'
    | 'means_REB'
    | 'means_of_communication'
    | 'special_vehicles'
    | 'anti_aircraft_missile_systems';

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
     * Manufacturer structure
     */
    manufacturer: ManufacturerModel;
}

export type AmeAddModel = WithoutId<AmeModel, 'manufacturer'> & {
    manufacturer: OnlyId<ManufacturerModel> | ManufacturerAddModel;
    ttc_file: File;
};

export type AmeUpdateModel = OnlyId<AmeModel> & Partial<AmeAddModel>;
export type AmeDeleteModel = OnlyId<AmeModel>;
