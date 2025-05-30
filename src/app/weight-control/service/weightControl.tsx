import { api } from '../../../app-service/services/api';
import {
    getUrlFilterAnimals,
    getUrlIdentificationValues,
} from '../../../functions/getUrl';
import { AnimalFilters } from '../../../utils/animals';
import { FiltersAnimalsType } from '../../../utils/filtersAnimals';
import { IRequestGetIdentificationValues } from '../../../utils/requestType';
import { SortersAnimalsType } from '../../../utils/sortersAnimals';

export type IRequestGetFilterAnimals = {
    filters: FiltersAnimalsType;
    sorters?: SortersAnimalsType;
};

export type newWeight = {
    animalId: string;
    date: string;
    weight: number;
    method: string;
    notes: string | undefined;
};

export type IResponsePaginationInfo = {
    count: number;
    entriesPerPage: number;
};

export type weightInfo = {
    id: string;
    date: string;
    age: number;
    weight: number;
    sup: number | null;
};

export type IRequestGetWeightsAnimal = {
    id: string;
    sorters: SortersAnimalsType;
};

export const weightControlApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFilterAnimals: builder.query<AnimalFilters[], IRequestGetFilterAnimals>({
            query: (data) => ({
                url: getUrlFilterAnimals(data.filters, data.sorters),
                method: 'GET',
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

        getWeightsPaginationInfo: builder.query<IResponsePaginationInfo, string>({
            query: (id) => ({
                url: `weights/${id}/pagination-info`,
                method: 'GET',
            }),
        }),

        getWeightsAnimal: builder.query<weightInfo[], IRequestGetWeightsAnimal>({
            query: (data) => ({
                url: `weights/${data.id}?Page=${data.sorters.page}&sortInfo.Column=${
                    data.sorters.column
                        ? data.sorters.column === 'Sup'
                            ? 'SUP'
                            : data.sorters.column
                        : 'Date'
                }&sortInfo.Descending=${data.sorters.descending}`,
                method: 'GET',
            }),
        }),

        getWeightsStatisticsAnimal: builder.query<any, string>({
            query: (id) => ({
                url: `weights/${id}/statistics`,
                method: 'GET',
            }),
        }),

        createWeight: builder.mutation<any, newWeight>({
            query: (data) => ({
                url: 'weights',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useLazyGetFilterAnimalsQuery,
    useLazyGetIdentificationValuesQuery,
    useCreateWeightMutation,
    useLazyGetWeightsAnimalQuery,
    useLazyGetWeightsPaginationInfoQuery,
} = weightControlApi;
