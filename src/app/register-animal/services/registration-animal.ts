import { api } from '../../../app-service/services/api';

export type IdentificationOrg = {
    organization_id: string;
};

export type SelectResponseType = {
    id: string;
    name: string;
};

export const registrationAnimalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnimalIdentifications: builder.query<SelectResponseType[], void>({
            query: () => ({
                url: `animal/identifications`,
                method: 'GET',
            }),
        }),
        getAnimalGroups: builder.query<SelectResponseType[], void>({
            query: () => ({
                url: `animal/groups`,
                method: 'GET',
            }),
        }),
        registrationAnimal: builder.mutation<void, FormData>({
            query: (body) => ({
                url: 'animal/registration',
                method: 'POST',
                body: body,
            }),
        }),
        registrationAnimalFromCSV: builder.mutation<void, FormData>({
            query: (data) => ({
                url: `animal/registration/import/csv`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAnimalIdentificationsQuery,
    useGetAnimalGroupsQuery,
    useRegistrationAnimalMutation,
    useRegistrationAnimalFromCSVMutation,
} = registrationAnimalApi;
export const {
    endpoints: {
        getAnimalGroups,
        getAnimalIdentifications,
        registrationAnimal,
        registrationAnimalFromCSV,
    },
} = registrationAnimalApi;
