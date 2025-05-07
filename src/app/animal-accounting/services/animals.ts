import { api } from '../../../app-service/services/api';
import {
    IChangedAnimal,
    IdentificationFieldName,
    IRequestGetAnimals,
    IRequestGetPaginationInfo,
    IResponseGetAnimals,
    IResponsePaginationInfo,
} from '../data/types/animal';
import { IAnimalGroup } from './animalsSlice';

export const animalsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaginationInfo: builder.query<
            IResponsePaginationInfo,
            IRequestGetPaginationInfo
        >({
            query: (data) => ({
                url: `animals/pagination-info?Type=${data.type}&active=${data.active}`,
                method: 'GET',
            }),
        }),
        getAnimals: builder.query<IResponseGetAnimals, IRequestGetAnimals>({
            query: (data) => ({
                url: `animals?Type=${data.type}&page=${data.page}&SortInfo.active=${
                    data.active
                }&SortInfo.column=${data.column || 'TagNumber'}&SortInfo.descending=${
                    data.descending
                }`,
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
        getIndetificationFieldsNames: builder.query<IdentificationFieldName[],void>({
            query: ()=> ({
                url: 'groups/identification',
                method: 'GET'
            })
        })
    }),
});

export const {
    useLazyGetAnimalsQuery,
    useUpdateAnimalsMutation,
    useGetAnimalsGroupsQuery,
    useLazyGetPaginationInfoQuery,
    useGetIndetificationFieldsNamesQuery
} = animalsApi;
