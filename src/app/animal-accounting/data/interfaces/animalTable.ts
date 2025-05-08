export interface IAnimalTable {
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
    identificationFields: [
        {
            identificationFieldName: string;
            identificationValue: string;
        }
    ];
}
