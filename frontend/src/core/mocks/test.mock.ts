import { range } from 'lodash-es';
import * as faker from 'faker';
import { TestModel } from '../store/test';

export const testsMock: TestModel[] = range(1, 11).map(
    (id): TestModel => ({
        id,
        name: `#${id}. ${faker.lorem.word(10)}`,
        type: (
            [
                'preliminary',
                'state',
                'interdepartmental',
                'defining',
                'departmental',
                'research',
                'control',
                'special',
            ] as const
        )[faker.datatype.number(7)],
        ame: {
            id: faker.datatype.number(9999999),
            name: faker.name.jobArea(),
        },
        date: faker.date.soon().toString(),
        location: faker.address.city(),
        status: (['preparation', 'testing', 'paused', 'continued', 'finished'] as const)[faker.datatype.number(4)],
    }),
);
