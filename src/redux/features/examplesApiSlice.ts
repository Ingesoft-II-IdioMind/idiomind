import { apiSliceExamples } from "../services/apiSliceExamples";

const authApiSliceExamples = apiSliceExamples.injectEndpoints({
	endpoints: builder => ({
		createExamples: builder.mutation({
			query: ({ content }) => ({
				url: '/',
				method: 'POST',
				body: {content}
			}),
		}),
	}),
});

export const {
	useCreateExamplesMutation,
} = authApiSliceExamples;