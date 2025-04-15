import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserOrgId } from '../../utils/userInfo';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        headers: {
            organizationId: getUserOrgId(),
        },
    });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    tagTypes: ['Groups', 'TypesGroups', 'IdentificationFields'],
    endpoints: () => ({}),
});
