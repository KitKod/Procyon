import { WithoutId, OnlyId } from '@core/utility-types';

export interface ManufacturerModel {
    id: number;
    name: string;
    address: string;
    chief: string;
    contact: string;
}
export type ManufacturerAddModel = WithoutId<ManufacturerModel>;
export type ManufacturerUpdateModel = OnlyId<ManufacturerModel> & Partial<ManufacturerModel>;
export type ManufacturerDeleteModel = OnlyId<ManufacturerModel>;
