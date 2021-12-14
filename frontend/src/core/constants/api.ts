const BASE_API_PREFIX = '/api/procyon';
const API_VERSION_1 = 'v1';
const API_PREFIX = `${BASE_API_PREFIX}/${API_VERSION_1}`;

export const TEST_ENDPOINT = `${API_PREFIX}/tests`;
export const AME_ENDPOINT = `${API_PREFIX}/ames`;
export const MANUFACTURER_ENDPOINT = `${API_PREFIX}/manufacturers`;
export const DOCUMENT_ENDPOINT = (testId: number): string => `${API_PREFIX}/tests/${testId}/documents`;

export const API_DATE_FORMAT = 'yyyy-MM-dd';
