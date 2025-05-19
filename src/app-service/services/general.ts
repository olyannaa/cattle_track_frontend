import { api } from './api';

export type IdentificationFieldName = {
    id: string;
    name: string;
};

export type IAnimalGroup = {
    id: string;
    name: string;
};

export const generalApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getIdentificationFields: builder.query<IdentificationFieldName[], void>({
            query: () => ({
                url: 'groups/identification',
                method: 'GET',
            }),
        }),
        getGroups: builder.query<IAnimalGroup[], void>({
            query: () => ({
                url: 'groups',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetIdentificationFieldsQuery, useGetGroupsQuery } = generalApi;
