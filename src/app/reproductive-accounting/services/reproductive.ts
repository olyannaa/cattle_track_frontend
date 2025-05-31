import { api } from '../../../app-service/services/api';

export type RequestInsemination = {
    cowId: string;
    date: string;
    inseminationType: string;
    spermBatch?: string;
    spermManufacturer?: string;
    bullId?: string;
    embryoId?: string;
    embryoManufacturer?: string;
    technician?: string;
    notes?: string;
};

export type RequestPregnancy = {
    cowId: string;
    date: string;
    status: string;
    pregnancyId: string;
    expectedCalvingDate?: string;
};

export type RequestCalving = {
    cowId: string;
    bullId?: string;
    cowTagNumber?: string;
    date: string;
    veterinar?: string;
    treatments?: string;
    /** Тип отёла */
    complication: string;
    type: string;
    pathology?: string;
    calfTagNumber?: string;
    method?: string;
    weight?: number;
    inseminationId: string;
};

export type Animal = {
    id: string;
    animalId: string;
    organizationId: string;
    tagNumber: string;
    type: string;
    birthDate: Date;
    status: string;
    name: string;
    pregnancyId: string;
};

export type FullPregnancyInfo = {
    id: string;
    organizationId: string;
    cowId: string;
    cowTagNumber?: string;
    status: string;
    inseminationType: string;
    inseminationDate: Date;
    bullId: string;
    bullTagNumber?: string;
    name: string;
    pregnancyId: string;
    inseminationId: string;
};

export const reproductiveApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCows: builder.query<Animal[], void>({
            query: () => ({
                url: `reproductive/cow`,
                method: 'GET',
            }),
        }),
        getBulls: builder.query<Animal[], void>({
            query: () => ({
                url: `reproductive/bull`,
                method: 'GET',
            }),
        }),
        getInseminationAnimals: builder.query<Animal[], void>({
            query: () => ({
                url: `reproductive/insemination/animals`,
                method: 'GET',
            }),
        }),
        registrationInsemination: builder.mutation<void, RequestInsemination>({
            query: (body) => ({
                url: 'reproductive/insemination',
                method: 'POST',
                body: body,
            }),
        }),
        getPregnancies: builder.query<FullPregnancyInfo[], void>({
            query: () => ({
                url: `reproductive/pregnancy`,
                method: 'GET',
            }),
        }),
        registerPregnancy: builder.mutation<void, RequestPregnancy>({
            query: (body) => ({
                url: 'reproductive/pregnancy',
                method: 'POST',
                body: body,
            }),
        }),
        getCalving: builder.query<FullPregnancyInfo[], void>({
            query: () => ({
                url: `reproductive/calving`,
                method: 'GET',
            }),
        }),
        registerCalving: builder.mutation<void, RequestCalving>({
            query: (body) => ({
                url: 'reproductive/calving',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {
    useGetBullsQuery,
    useGetCowsQuery,
    useGetCalvingQuery,
    useRegistrationInseminationMutation,
    useGetPregnanciesQuery,
    useRegisterCalvingMutation,
    useRegisterPregnancyMutation,
    useGetInseminationAnimalsQuery,
} = reproductiveApi;
