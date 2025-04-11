import { api } from './api';

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

type IResponseGetAnimals = IAnimal[];

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

export const animalsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaginationInfo: builder.query<IResponsePaginationInfo, string>({
            query: (type) => ({
                url: `animals/pagination-info?Type=${type}`,
                method: 'GET',
            }),
        }),
        getAnimals: builder.query<IResponseGetAnimals, IRequestGetAnimals>({
            query: (data) => ({
                url: `animals?Type=${data.type}&page=${data.page}`,
                method: 'GET',
            }),
        }),
        updateAnimals: builder.mutation<any, IChangedAnimal[]>({
            query: (data) => ({
                url: `animals`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAnimalGroups: builder.query<any, void>({
            query: () => ({
                url: `animals/groups`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLazyGetAnimalsQuery,
    useUpdateAnimalsMutation,
    useGetAnimalGroupsQuery,
    useLazyGetPaginationInfoQuery,
} = animalsApi;
