import { ManufacturerModel } from '@core/store/manufacturer';

export const manufacturersMock: ManufacturerModel[] = [
    {
        id: 1,
        name: 'ТОВ "Південьавтобуд"',
        address: 'м. Одеса, вул. Грецька 15',
        chief: 'Петренко Петро Петрович',
        contact: '+380123456789',
    },
    {
        id: 2,
        name: 'Київський бронетанковий завод',
        address: 'м. Київ, проспект Перемоги 27',
        chief: 'Василенко Василь Васильович',
        contact: '+380123456789',
    },
    {
        id: 3,
        name: 'Науково-вирбниче підприємство Адрон',
        address: 'м. Київ, проспект Перемоги 15',
        chief: 'Степаненко Степан Степанович',
        contact: '+380123456789',
    },
];
