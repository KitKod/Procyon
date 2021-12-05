import { USE_MOCKS } from './without-mocks';
import { environment as baseEnvironment } from './environment';

export const environment = {
    ...baseEnvironment,
    useMocks: USE_MOCKS,
};
