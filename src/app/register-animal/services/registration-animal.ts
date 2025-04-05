import { api } from '../../../app-service/services/api';
import { AnimalForm } from '../data/interfaces/animal-form';

export type IdentificationOrg = {
    organization_id: string;
};

export type SelectResponseType = {
    id: string;
    name: string;
};

export const registrationAnimalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnimalIdentifications: builder.mutation<SelectResponseType, void>({
            query: () => ({
                url: 'animal/identifications',
                method: 'GET',
                body: {
                    organization_id: 'e97a7dbf-7336-44b8-bb3f-407fc59ecf2b',
                },
            }),
        }),
        getAnimalGroups: builder.mutation<SelectResponseType, void>({
            query: () => ({
                url: 'animal/groups',
                method: 'GET',
                body: {
                    organization_id: 'e97a7dbf-7336-44b8-bb3f-407fc59ecf2b',
                },
            }),
        }),
        registrationAnimal: builder.mutation<void, AnimalForm>({
            query: () => ({
                url: 'animal/registration',
                method: 'POST',
                body: {
                    organization_id: 'e97a7dbf-7336-44b8-bb3f-407fc59ecf2b',
                },
            }),
        }),
        registrationAnimalFromCSV: builder.mutation<void, FormData>({
            query: (data) => ({
                url: `animal/registration/import/csv?org_id=e97a7dbf-7336-44b8-bb3f-407fc59ecf2b`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAnimalGroupsMutation,
    useGetAnimalIdentificationsMutation,
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
