import { range } from 'lodash-es';
import * as faker from 'faker';
import { TestModel } from '../store/test';
import { TestStatus, TestType } from '../store/test/test.constants';

export const testsMock: TestModel[] = range(1, 11).map(
    (id): TestModel => ({
        id,
        name: `#${id}. ${faker.lorem.word(10)}`,
        type: [
            TestType.Defining,
            TestType.Preliminary,
            TestType.State,
            TestType.Interdepartmental,
            TestType.Departmental,
            TestType.Research,
            TestType.Control,
            TestType.Special,
        ][faker.datatype.number(7)],
        ame: {
            id: faker.datatype.number(9999999),
            name: faker.name.jobArea(),
        },
        date: faker.date.soon().toString(),
        location: faker.address.city(),
        status: [
            TestStatus.Preparation,
            TestStatus.Testing,
            TestStatus.Paused,
            TestStatus.Continued,
            TestStatus.Finished,
        ][faker.datatype.number(4)],
    }),
);
