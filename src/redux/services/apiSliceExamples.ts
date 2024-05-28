import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQueryExamples = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/fonetic/api/`, //Revisar
	credentials: 'include',
});
const baseQueryWithReauthExamples: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQueryExamples(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQueryExamples(
					{
						url: '/jwt/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());

					result = await baseQueryExamples(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQueryExamples(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSliceExamples = createApi({
	reducerPath: '/fonetic/api/', //Revisar
	baseQuery: baseQueryWithReauthExamples,
	endpoints: builder => ({}),
});