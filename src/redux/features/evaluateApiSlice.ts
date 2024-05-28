import { apiSliceEvaluate } from "../services/apiSliceEvaluate";

const authApiSliceEvaluate = apiSliceEvaluate.injectEndpoints({
	endpoints: builder => ({
		evaluatePron: builder.mutation({
			query: ({ target_sentence, audio_file_base64 }) => ({
				url: '/',
				method: 'POST',
				body: {target_sentence, audio_file_base64}
			}),
		}),
	}),
});

export const {
	useEvaluatePronMutation,
} = authApiSliceEvaluate;