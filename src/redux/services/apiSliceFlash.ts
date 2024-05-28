import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQueryFlash = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/flashcard/api`,
	credentials: 'include',
});
const baseQueryWithReauthFlash: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQueryFlash(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQueryFlash(
					{
						url: '/jwt/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());

					result = await baseQueryFlash(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQueryFlash(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSliceFlash = createApi({
	reducerPath: 'flashcards/api',
	baseQuery: baseQueryWithReauthFlash,
	endpoints: builder => ({}),
});