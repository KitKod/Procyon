import { TestModel } from '../store/test';
import { ameMocks } from '@core/mocks/ame-mocks';

export const testMocks: TestModel[] = [
    {
        id: 1,
        name: 'name',
        type: 'special',
        location: 'New Carolineshire',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[0],
    },
    {
        id: 2,
        name: 'Testing new version of Fort PM',
        type: 'special',
        location: 'Ukaine, Lviv',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[0],
    },
    {
        id: 3,
        name: 'Testing new Jetpack v228',
        type: 'special',
        location: 'Ukaine, Chernihiv',
        status: 'testing',
        date_of_approval: '2021-11-04',
        ame: ameMocks[0],
    },
    {
        id: 4,
        name: 'Reserch ability to fly',
        type: 'special',
        location: 'New Carolineshire',
        status: 'testing',
        date_of_approval: '2021-04-04',
        ame: ameMocks[1],
    },
    {
        id: 5,
        name: 'Testing new helicopter',
        type: 'special',
        location: 'New Carolineshire',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[0],
    },
    {
        id: 6,
        name: 'Testing for object 168',
        type: 'special',
        location: 'New Carolineshire',
        status: 'testing',
        date_of_approval: '2021-12-04',
        ame: ameMocks[0],
    },
];
