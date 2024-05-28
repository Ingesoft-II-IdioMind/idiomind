import { apiSliceTranslate } from "../services/apiSliceTranslate";

const authApiSliceTranslate = apiSliceTranslate.injectEndpoints({
	endpoints: builder => ({
		translateText: builder.mutation({
			query: ({ word, language, sentence }) => ({
				url: '/',
				method: 'POST',
				body: {word, language, sentence}
			}),
		}),
	}),
});

export const {
	useTranslateTextMutation,
} = authApiSliceTranslate;