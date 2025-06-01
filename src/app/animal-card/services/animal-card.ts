import { api } from '../../../app-service/services/api';
import { AnimalAction } from '../data/interfaces/animal-actions';
import { AnimalHistoryData } from '../data/interfaces/animal-chart';
import { AnimalDetail } from '../data/interfaces/animal-details';

export const animalCardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnimalDetail: builder.query<AnimalDetail, string>({
            query: (animalId: string) => ({
                url: `animalCard/animal/detail`,
                method: 'GET',
                params: { animalId },
            }),
        }),
        getAnimalActions: builder.query<AnimalAction, string>({
            query: (animalId: string) => ({
                url: `animalCard/animal/actions`,
                method: 'GET',
                params: { animalId },
            }),
        }),
        getChartInfo: builder.query<AnimalHistoryData, string>({
            query: (animalId: string) => ({
                url: `animalCard/animal/chart/action`,
                method: 'GET',
                params: { animalId },
            }),
        }),
        getWeightInfo: builder.query<AnimalHistoryData, string>({
            query: (animalId: string) => ({
                url: `animalCard/animal/chart/weight`,
                method: 'GET',
                params: { animalId },
            }),
        }),
    }),
});

export const { useLazyGetAnimalActionsQuery, useLazyGetAnimalDetailQuery, useLazyGetChartInfoQuery } = animalCardApi;
