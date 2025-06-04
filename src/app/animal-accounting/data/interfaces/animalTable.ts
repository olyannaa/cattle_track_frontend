import { IdentificationField } from '../types/animal';

export interface IAnimalTableBasic {
    key: string;
    birthDate: string;
    breed: string;
    fatherTagNumber: string;
    groupName: string;
    id: string;
    motherTagNumber: string;
    origin: string;
    originLocation: string;
    status: string;
    tagNumber: string;
}

export interface IAnimalTable extends IAnimalTableBasic {
    identificationFields: IdentificationField[];
}
