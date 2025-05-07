import { IdentificationFields } from "../../../infrastructure/components/identification-fields/IdentificationFields";

export type IRequestGetAnimals = {
    page: number;
    type: string;
    active: boolean;
    column: string | null;
    descending: boolean;
};

export type IRequestGetPaginationInfo = {
    type: string;
    active: boolean;
};

export type IAnimal = {
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
    identificationFields: IdentificationField[]
    [key: string]: string | IdentificationField[];
};

export type IdentificationField = {
    dentificationFieldName: string,
    identificationValue: string | null
}

export type IResponseGetAnimals = IAnimal[];

export type IResponsePaginationInfo = {
    animalCount: number;
    entriesPerPage: number;
};

export type IChangedAnimal = {
    id: string;
    tagNumber: string | null,
    birthDate: string | null,
    breed: string | null,
    groupID: string | null,
    status: string | null,
    origin: string | null,
    originLocation: string | null,
    motherTagNumber: string | null,
    fatherTagNumber: string | null
    [key: string]: string | null;
};

export type IdentificationFieldName = {
    id: string,
    name: string
}

export type dataIndexTypes = 'tagNumber' | 'groupName' | 'birthDate' | 'status' |'breed' | 'origin' | 'originLocation' | 'motherTagNumber' | 'fatherTagNumber' | 'groupID'
