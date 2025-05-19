import { api } from '../../../app-service/services/api';

type IRequestGetDailyActions = {
    type: string;
    page: number;
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

export const getUrlFilterAnimals = (
    filters: FiltersAnimalsType,
    sorters: SortersAnimalsType = {
        column: '',
        descending: false,
        page: 0,
    }
) => {
    let url = 'DailyActions/animals?';
    Object.keys(filters).forEach((filter) => {
        if (filter === 'isActive') {
            url += `Filter.IsActive=${filters[filter] || false}&`;
        }
        if (filters[filter]) {
            if (filter === 'identificationFieldId' && filters.identificationFieldValue) {
                url += `Filter.IdentificationField.Id=${filters[filter]}&`;
            } else if (filter === 'identificationFieldValue') {
                url += `Filter.IdentificationField.Value=${filters[filter]}&`;
            } else if (filter === 'groupId') {
                url += `Filter.GroupId=${filters[filter]}&`;
            } else if (filter === 'type') {
                url += `Filter.Type=${filters[filter]}&`;
            } else if (filter === 'tagNumber') {
                url += `Filter.TagNumber=${filters[filter]}&`;
            }
        }
    });

    Object.keys(sorters).forEach((sorter) => {
        if (sorter === 'column') {
            url += `SortInfo.Column=${sorters[sorter] || 'TagNumber'}&`;
        }
        if (sorter === 'descending') {
            url += `SortInfo.Descending=${sorters[sorter] || false}&`;
        }
        if (sorter === 'page' && sorters[sorter]) {
            url += `SortInfo.Descending=${sorters[sorter]}&`;
        }
    });

    return url;
};

const getUrlIdentificationValues = (data: IRequestGetIdentificationValues) => {
    let url = 'groups/identification/values?';
    Object.keys(data).forEach((key) => {
        if (key === 'isActive') {
            url += `Filter.IsActive=${data[key] || false}&`;
        }
        if (key === 'identificationId') {
            url += `IdentificationId=${data[key]}&`;
        }
        if (data[key]) {
            if (key === 'groupId') {
                url += `Filter.GroupId=${data[key]}&`;
            } else if (key === 'type') {
                url += `Filter.Type=${data[key]}&`;
            }
        }
    });
    return url;
};

const getUrlPaginationInfoFilterAnimals = (filters: FiltersAnimalsType) => {
    let url = 'DailyActions/animals/pagination-info?';
    Object.keys(filters).forEach((filter) => {
        if (filter === 'isActive') {
            url += `IsActive=${filters[filter] || false}&`;
        }
        if (filters[filter]) {
            if (filter === 'groupId') {
                url += `GroupId=${filters[filter]}&`;
            } else if (filter === 'type') {
                url += `Type=${filters[filter]}&`;
            }
        }
    });
    return url;
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
                url: `DailyActions?type=${data.type}&page=${data.page}`,
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
} = dailyActionsApi;
