import { api } from '../../../app-service/services/api';

type IRequestGetDailyActivities = {
    type: string;
    page: number;
};

export const dailyActivitiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaginationInfoDailyActivities: builder.query<any, string>({
            query: (type) => ({
                url: `DailyActions/pagination-info?type=${type}`,
                method: 'GET',
            }),
        }),
        getDailyActivities: builder.query<any, IRequestGetDailyActivities>({
            query: (data) => ({
                url: `DailyActions?type=${data.type}&page=${data.page}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetPaginationInfoDailyActivitiesQuery, useGetDailyActivitiesQuery } =
    dailyActivitiesApi;
