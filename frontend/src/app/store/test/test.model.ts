export enum TestStatus {
    Preparation = 'preparation',
    Testing = 'testing',
    Paused = 'paused',
    Continued = 'continued',
    Finished = 'finished',
}
export enum TestType {
    Preliminary = 'preliminary',
    State = 'state',
    Interdepartmental = 'interdepartmental',
    Defining = 'defining',
    Departmental = 'departmental',
    Research = 'research',
    Control = 'control',
    Special = 'special',
}

export interface TestModel {
    id: number;
    name: string;
    ame: string;
    type: TestType;
    location: string;
    date: string;
    status: TestStatus; // TODO Add status type
}
