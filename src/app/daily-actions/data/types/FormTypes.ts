export type FormTypeInspection = {
    dateInspection: string | undefined;
    dateNextInspection: string | undefined;
    name: string | undefined;
    note: string | undefined;
    resultInspection: string | undefined;
    typeInspection: string | undefined;
};

export type FormTypeVaccination = {
    date: string | undefined;
    dateNext: string | undefined;
    name: string | undefined;
    note: string | undefined;
    type: string | undefined;
    dose: string | undefined;
    preparation: string | undefined;
};

export type FormTypeTreatment = {
    dateNextInspection: string | undefined;
    dateStartTreatment: string | undefined;
    diagnosis: string | undefined;
    dose: string | undefined;
    name: string | undefined;
    note: string | undefined;
    preparation: string | undefined;
};

export type FormTypeTransfer = {
    dateTransfer: string | undefined;
    group: string | undefined;
    name: string | undefined;
    note: string | undefined;
};

export type FormTypeAssigmentNumber = {
    date: string | undefined;
    name: string | undefined;
    type: string | undefined;
    value: string | undefined;
};

export type FormTypeDisposal = {
    dateCulling: string | undefined;
    name: string | undefined;
    reason: string | undefined;
};

export type FormTypeResearch = {
    date: string | undefined;
    performedBy: string | undefined;
    researchName: string | undefined;
    notes: string | undefined;
    result: { target: { checked: boolean } } | undefined;
    materialType: string | undefined;
};

export type FormTypeChangeAgeGenderGroup = {
    date: string | undefined;
    name: string | undefined;
    notes: string | undefined;
};
