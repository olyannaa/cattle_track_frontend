/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
    });

const baseQueryWithRefresh: BaseQueryFn<any, unknown, unknown> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        window.location.href = '/';
        localStorage.removeItem('user');
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRefresh,
    endpoints: () => ({}),
});
