export type IRequestGetAnimals = {
    page: number;
    type: string;
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
    [key: string]: string;
};

export type IResponseGetAnimals = IAnimal[];

export type IResponsePaginationInfo = {
    animalCount: number;
    entriesPerPage: number;
};

export type IChangedAnimal = {
    id: string;
    tagNumber: string | null;
    groupID: string | null;
    birthDate: string | null;
    status: string | null;
    [key: string]: string | null;
};
