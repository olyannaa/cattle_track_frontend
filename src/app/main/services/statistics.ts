import { api } from '../../../app-service/services/api';

export const statApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCommonStat: builder.query<Record<string, number>, void>({
            query: () => ({
                url: `animals/main-info`,
            }),
        }),
    }),
});

export const { useGetCommonStatQuery } = statApi;
