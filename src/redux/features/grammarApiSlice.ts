import { apiSliceGrammar } from "../services/apiSliceGrammar";

const authApiSliceGrammar = apiSliceGrammar.injectEndpoints({
	endpoints: builder => ({
		createExercise: builder.mutation({
			query: ({issue, idiom }) => ({
				url: '/',
				method: 'POST',
				body: {issue, idiom}
			}),
		}),
	}),
});

export const {
	useCreateExerciseMutation,
} = authApiSliceGrammar;