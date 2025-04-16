import { api } from '../../../app-service/services/api';
import {
    IChangedAnimal,
    IRequestGetAnimals,
    IResponseGetAnimals,
    IResponsePaginationInfo,
} from '../data/types/animal';

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
