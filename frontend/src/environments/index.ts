import { USE_MOCKS } from './without-mocks';
import { environment as baseEnvironment } from './environment';
import { DEFAULT_LOCALE } from '@core/constants/ui';

export const environment = {
    ...baseEnvironment,
    useMocks: USE_MOCKS,
    locale: DEFAULT_LOCALE,
};
