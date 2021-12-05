import { TestStatus, TestType } from '@core/store/test';

export const TEST_STATUSES: readonly TestStatus[] = [
    'preparation',
    'testing',
    'paused',
    'continued',
    'finished',
] as const;

export const TEST_TYPES: readonly TestType[] = [
    'preliminary',
    'state',
    'interdepartmental',
    'defining',
    'departmental',
    'research',
    'control',
    'special',
] as const;
