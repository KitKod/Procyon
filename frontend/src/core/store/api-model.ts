export interface ApiMetaModel {
    size?: number;
    total?: number;
    errors?: string[];
}

export interface ApiResponseModel<T> {
    resource: T[];
    meta: ApiMetaModel;
}

export interface ApiSingleResponseModel<T> {
    resource: [T];
    meta: ApiMetaModel;
}
