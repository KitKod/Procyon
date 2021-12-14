import { AmeModel } from '@core/store/ame';
import { manufacturersMock } from '@core/mocks/manufacturer-mocks';

export const ameMocks: AmeModel[] = [
    {
        id: 1,
        name: 'Object 168',
        family: 'armored_vehicles',
        type: 'warhfdf hadsfhadha',
        manufacturer: manufacturersMock[0],
        ttc_file_name: 'ttc-object-168.pdf',
    },
    {
        id: 2,
        name: 'helicopter mi-666',
        family: 'armored_vehicles',
        type: 'human',
        manufacturer: manufacturersMock[0],
        ttc_file_name: 'ttc-mi-666.pdf',
    },
    {
        id: 3,
        name: 'Human with wings',
        family: 'armored_vehicles',
        type: 'human',
        manufacturer: manufacturersMock[1],
        ttc_file_name: 'ttc-wings.pdf',
    },
    {
        id: 4,
        name: 'Jetpack v228',
        family: 'armored_vehicles',
        type: 'warhfdf hadsfhadha',
        manufacturer: manufacturersMock[0],
        ttc_file_name: 'ttc-jetpack-v228.pdf',
    },
    {
        id: 5,
        name: 'Fort PM',
        family: 'armored_vehicles',
        type: 'warhfdf hadsfhadha',
        manufacturer: manufacturersMock[0],
        ttc_file_name: 'ttc-fort-pm.pdf',
    },
];

export const ttcFileBlob: Blob = new Blob(['Test TTC Blob Mock']);
