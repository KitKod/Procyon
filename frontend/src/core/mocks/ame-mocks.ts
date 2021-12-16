import { manufacturersMock } from '@core/mocks/manufacturer-mocks';
import { AmeModel } from '@core/store/ame';

export const ameMocks: AmeModel[] = [
    {
        id: 1,
        name: 'Фільтрувальної станції "Джерело 2000"',
        family: 'special_vehicles',
        type: 'Фільтрувальні пристрої',
        manufacturer: manufacturersMock[1],
        ttc_file_name: 'ттх-фс-джерело-2000.pdf',
    },
    {
        id: 2,
        name: 'Модульна кухня КМ-500',
        family: 'special_vehicles',
        type: 'Техніка тилу',
        manufacturer: manufacturersMock[0],
        ttc_file_name: 'ttc-mi-666.pdf',
    },
    {
        id: 3,
        name: 'Танк Т-72 АМТ',
        family: 'armored_vehicles',
        type: 'Танки',
        manufacturer: manufacturersMock[1],
        ttc_file_name: 'ttc-wings.pdf',
    },
    {
        id: 4,
        name: 'БПЛА Atlas',
        family: 'aircraft',
        type: 'БПЛА ближньої дії',
        manufacturer: manufacturersMock[2],
        ttc_file_name: 'ttc-jetpack-v228.pdf',
    },
    {
        id: 5,
        name: 'Машини штабна МШР-КПО',
        family: 'special_vehicles',
        type: 'Командно-штабні машини',
        manufacturer: manufacturersMock[0],
        ttc_file_name: 'ttc-fort-pm.pdf',
    },
    {
        id: 6,
        name: 'Вогнемет РПВ-16',
        family: 'small_arms',
        type: 'Вогнемет',
        manufacturer: manufacturersMock[2],
        ttc_file_name: 'ttc-fort-pm.pdf',
    },
];

export const ttcFileBlob: Blob = new Blob(['Test TTC Blob Mock']);
