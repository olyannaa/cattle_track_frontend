import { api } from '../../../app-service/services/api';

export type IdentificationOrg = {
    organization_id: string;
};

export type SelectResponseType = {
    id: string;
    name: string;
};

const org_id: string = JSON.parse(
    localStorage.getItem('user') ?? ''
)?.organizationId;

export const registrationAnimalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnimalIdentifications: builder.query<SelectResponseType[], void>({
            query: () => ({
                url: `animal/identifications?orgatization_id=${org_id}`,
                method: 'GET',
            }),
        }),
        getAnimalGroups: builder.query<SelectResponseType[], void>({
            query: () => ({
                url: `animal/groups?orgatization_id=${org_id}`,
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
                url: `animal/registration/import/csv?org_id=${org_id}`,
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
