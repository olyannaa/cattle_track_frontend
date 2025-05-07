import { IAnimal } from '../types/animal';

export interface IAnimalTable{
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
    [key: string]: string
}
