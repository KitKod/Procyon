export interface ApiMetaModel {
    size?: number;
    total?: number;
    errors?: string[];
}

export interface ApiResponseModel<T> {
    resources: T[];
    meta: ApiMetaModel;
}

export interface ApiSingleResponseModel<T> {
    resources: [T];
    meta: ApiMetaModel;
}
