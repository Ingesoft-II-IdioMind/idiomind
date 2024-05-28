import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQueryEvaluate = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/fonetic/feedback/`, //Revisar
	credentials: 'include',
});
const baseQueryWithReauthEvaluate: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQueryEvaluate(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQueryEvaluate(
					{
						url: '/jwt/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());

					result = await baseQueryEvaluate(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQueryEvaluate(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSliceEvaluate = createApi({
	reducerPath: '/fonetic/feedback/', //Revisar
	baseQuery: baseQueryWithReauthEvaluate,
	endpoints: builder => ({}),
});