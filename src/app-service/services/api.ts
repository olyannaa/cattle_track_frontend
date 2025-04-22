/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../utils/userType';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (user) {
                headers.set('organizationid', user.organizationId);
            }
            return headers;
        },
    });

const baseQueryWithRefresh: BaseQueryFn<any, unknown, unknown> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);

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
