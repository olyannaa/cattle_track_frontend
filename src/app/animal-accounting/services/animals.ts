import { api } from '../../../app-service/services/api';
import {
    IChangedAnimal,
    IRequestGetAnimals,
    IResponseGetAnimals,
    IResponsePaginationInfo,
} from '../data/types/animal';
import { IAnimalGroup } from './animalsSlice';

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
        updateAnimals: builder.mutation<void, IChangedAnimal[]>({
            query: (data) => ({
                url: `animals`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAnimalsGroups: builder.query<IAnimalGroup[], void>({
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
    useGetAnimalsGroupsQuery,
    useLazyGetPaginationInfoQuery,
} = animalsApi;
