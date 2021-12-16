import { DEFAULT_LOCALE } from '@core/constants/ui';

import { environment as baseEnvironment } from './environment';
import { USE_MOCKS } from './without-mocks';

export const environment = {
    ...baseEnvironment,
    useMocks: USE_MOCKS,
    locale: DEFAULT_LOCALE,
};
