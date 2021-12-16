import { ameMocks } from '@core/mocks/ame-mocks';

import { TestModel } from '../store/test';

export const testMocks: TestModel[] = [
    {
        id: 1,
        name: 'Визначальні відомчі випробування фільтрувальної станції "Джерело 2000"',
        type: 'special',
        location: 'м. Київ',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[0],
    },
    {
        id: 2,
        name: 'Державні випробування модульної кухні КМ-500',
        type: 'special',
        location: 'м. Одеса',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[1],
    },
    {
        id: 3,
        name: 'Визначальні відомчі випробування танка Т-72 АМТ',
        type: 'special',
        location: '332 Загално-військовий полігон',
        status: 'testing',
        date_of_approval: '2021-11-04',
        ame: ameMocks[2],
    },
    {
        id: 4,
        name: 'Функційні випробування БПЛА Atlas',
        type: 'special',
        location: 'аеродром Півці',
        status: 'testing',
        date_of_approval: '2021-04-04',
        ame: ameMocks[3],
    },
    {
        id: 5,
        name: 'Державні випробування машини штабної МШР-КПО',
        type: 'special',
        location: 'м. Одеса',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[4],
    },
    {
        id: 6,
        name: 'Державні випробування реактивного піхотного вогнемету РПВ-16',
        type: 'special',
        location: 'смт Гончарівське',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[5],
    },
];
