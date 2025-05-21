import { api } from '../../../app-service/services/api';
import {
    getUrlFilterAnimals,
    getUrlIdentificationValues,
    getUrlPaginationInfoFilterAnimals,
} from '../functions/getUrl';

export type IRequestGetDailyActions = {
    type: string;
    page: number;
    column: string;
    descending: boolean;
};

export type FiltersAnimalsType = {
    groupId?: string;
    type?: string;
    tagNumber?: string;
    isActive?: boolean;
    identificationFieldId?: string;
    identificationFieldValue?: string;
    [key: string]: string | undefined | boolean;
};

export type SortersAnimalsType = {
    column: string;
    descending: boolean;
    page: number;
    [key: string]: string | undefined | boolean | number;
};

export type IRequestGetIdentificationValues = {
    groupId?: string;
    type?: string;
    isActive?: boolean;
    identificationId: string;
    [key: string]: string | undefined | boolean;
};
export type newDailyAction = {
    animalId: string;
    type: string;
    subtype?: string;
    performedBy?: string;
    result?: string;
    medicine?: string;
    dose?: string;
    notes?: string;
    oldGroupId?: string;
    newGroupId?: string;
    date?: string;
    nextDate?: string;
    researchName?: string;
    materialType?: string;
    identificationValue?: string;
};

export interface IDailyAction {
    id: string;
    animalId: string;
    actionType: string;
    actionSubtype: string;
    actor: string;
    result: string;
    medicine: string | null;
    dose: string | null;
    notes: string | null;
    oldGroupId: string | null;
    oldGroupName: string | null;
    newGroupId: string | null;
    newGroupName: string | null;
    date: string;
    nextDate: string;
    createdAt: string;
    organizationId: string;
    name: string;
    materialType: string;
    collectionDate: string;
    collectedBy: string;
}

export type IResponsePaginationInfoDailyActions = {
    count: number;
    entriesPerPage: number;
};

export type IRequestGetFilterAnimals = {
    filters: FiltersAnimalsType;
    sorters?: SortersAnimalsType;
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
    identificationFields: IdentificationField[];
    type: string;
    [key: string]: string | IdentificationField[];
};

export type IdentificationField = {
    name: string;
    value: string | null;
};

export const dailyActionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaginationInfoDailyActions: builder.query<
            IResponsePaginationInfoDailyActions,
            string
        >({
            query: (type) => ({
                url: `DailyActions/pagination-info?type=${type}`,
                method: 'GET',
            }),
        }),
        getDailyActions: builder.query<IDailyAction[], IRequestGetDailyActions>({
            query: (data) => ({
                url: `DailyActions?type=${data.type}&page=${data.page}&SortInfo.Column=${
                    data.column || 'TagNumber'
                }&SortInfo.Descending=${data.descending}`,
                method: 'GET',
            }),
        }),
        getFilterAnimals: builder.query<any, IRequestGetFilterAnimals>({
            query: (data) => ({
                url: getUrlFilterAnimals(data.filters, data.sorters),
                method: 'GET',
            }),
        }),
        getPaginationInfoFilterAnimals: builder.query<
            IResponsePaginationInfoDailyActions,
            FiltersAnimalsType
        >({
            query: (data) => ({
                url: getUrlPaginationInfoFilterAnimals(data),
                method: 'GET',
            }),
        }),
        createDailyActions: builder.mutation<any, newDailyAction[]>({
            query: (data) => ({
                url: 'DailyActions',
                method: 'POST',
                body: data,
            }),
        }),
        createDailyActionsWithoutResetFilters: builder.mutation<any, newDailyAction[]>({
            query: (data) => ({
                url: 'DailyActions',
                method: 'POST',
                body: data,
            }),
        }),
        deleteDailyActions: builder.mutation<any, string[]>({
            query: (data) => ({
                url: 'DailyActions',
                method: 'DELETE',
                body: data,
            }),
        }),
        deleteDailyActionsResearch: builder.mutation<any, string[]>({
            query: (data) => ({
                url: 'DailyActions/researches',
                method: 'DELETE',
                body: data,
            }),
        }),
        getIdentificationValues: builder.query<string[], IRequestGetIdentificationValues>(
            {
                query: (data) => ({
                    url: getUrlIdentificationValues(data),
                    method: 'GET',
                }),
            }
        ),
        getAnimalById: builder.query<IAnimal, string>({
            query: (data) => ({
                url: `animals/${data}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLazyGetPaginationInfoDailyActionsQuery,
    useLazyGetDailyActionsQuery,
    useLazyGetFilterAnimalsQuery,
    useGetFilterAnimalsQuery,
    useCreateDailyActionsMutation,
    useDeleteDailyActionsMutation,
    useLazyGetIdentificationValuesQuery,
    useLazyGetPaginationInfoFilterAnimalsQuery,
    useDeleteDailyActionsResearchMutation,
    useLazyGetAnimalByIdQuery,
    useCreateDailyActionsWithoutResetFiltersMutation,
} = dailyActionsApi;
