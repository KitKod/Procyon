import { range } from 'lodash-es';
import * as faker from 'faker';
import { TestModel } from '../store/test';
import { TestStatus, TestType } from '../store/test/test.model';

export const testsMock: TestModel[] = range(0, 10).map(
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
        ame: `${faker.datatype.number(9999999)}`,
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
