import { AmeFamily } from '@core/store/ame';
import { TestStatus, TestType } from '@core/store/test';
import { TestDocumentGovernment, TestDocumentStatus, TestDocumentType } from '@core/store/test/document';

export function getTestTypeLocalization(type: TestType): string {
    switch (type) {
        case 'defining':
            return 'Визначальні';
        case 'departmental':
            return 'Відомчі';
        case 'state':
            return 'Державні';
        case 'research':
            return 'Дослідницькі';
        case 'control':
            return 'Контрольні';
        case 'interdepartmental':
            return 'Міжвідомчі';
        case 'preliminary':
            return 'Попередні';
        case 'special':
            return 'Спеціальні';
    }
}

export function getTestStatusLocalization(status: TestStatus): string {
    switch (status) {
        case 'preparation':
            return 'Підготовка';
        case 'testing':
            return 'Проведення';
        case 'paused':
            return 'Призупинено';
        case 'continued':
            return 'Продовжено';
        case 'finished':
            return 'Закінчено';
    }
}

export function getAmeFamilyLocalization(family: AmeFamily): string {
    switch (family) {
        case 'aircraft':
            return 'Літальні апарати';
        case 'aeroelastic_systems':
            return 'Аеропружні системи';
        case 'armored_vehicles':
            return 'Бронетанкова техніка';
        case 'automotive_vehicles':
            return 'Автомобільна техніка';
        case 'artillery_armament':
            return 'Артилерійське озброєння';
        case 'small_arms':
            return 'Стрілецьке озброєння';
        case 'ships':
            return 'Кораблі';
        case 'radar_systems':
            return 'Радіолокаційні системи';
        case 'intelligence_tools':
            return 'Засоби розвідки';
        case 'means_REB':
            return 'Засоби РЕБ';
        case 'means_of_communication':
            return 'Засоби звязку';
        case 'special_vehicles':
            return 'Спеціальна техніка';
        case 'anti_aircraft_missile_systems':
            return 'Зенітні ракетні комплекси';
    }
}

export function getDocumentTypeLocalization(type: TestDocumentType): string {
    switch (type) {
        case 'joint_decision':
            return 'Спільне рішення';
        case 'separate_order':
            return 'Окреме доручення';
        case 'order':
            return 'Наказ';
        case 'program':
            return 'Програма';
        case 'method':
            return 'Методика';
        default:
            return 'Невідомо';
    }
}

export function getDocumentStatusLocalization(status: TestDocumentStatus): string {
    switch (status) {
        case 'developing':
            return 'Розробляється';
        case 'approving':
            return 'Погоджується';
        case 'approved':
            return 'Затверджено';
    }
}

export function getGovernmentLocalization(government: TestDocumentGovernment): string {
    switch (government) {
        case 'Ministry_of_Defence':
            return 'Міністр оборони';
        case 'ZMO':
            return 'ЗМО';
        case 'NGSH':
            return 'НГШ';
        case 'ZNGSH':
            return 'ЗНГШ';
        case 'Director_of_DVTP_ROVT':
            return 'Директор ДВТП РОВТ';
        case 'Chief_of_DNDІ_VS_OVT':
            return 'Начальник ДНДІ ВС ОВТ';
    }
}
