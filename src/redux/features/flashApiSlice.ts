import { apiSliceFlash } from "../services/apiSliceFlash";

const authApiSliceFlash = apiSliceFlash.injectEndpoints({
	endpoints: builder => ({
		bringFlashcards: builder.mutation({
			query: () => ({
				url: '/users/',
				method: 'GET',
			}),
		}),
		bringDeckFlashcards: builder.mutation({
			query: ({id}) => ({
				url: `/deck/${id}/`,
				method: 'GET',
			}),
		}),
		createFlashcard: builder.mutation({
			query: ({mazo,frente,reverso,proxima_Revision}) => ({
				url: '/users/',
				method: 'POST',
				body: {mazo,frente,reverso,proxima_Revision},
			}),
		}),
		editFlashcard: builder.mutation({
			query: ({mazo,frente,reverso,proxima_Revision,id}) => ({
				url: `/users/${id}/`,
				method: 'PUT',
				body: {mazo,frente,reverso,proxima_Revision},
			}),
		}),
		bringOneFlashcard: builder.mutation({
			query: ({id}) => ({
				url: `/flashcards/${id}/`,
				method: 'GET',
			}),
		}),
		deleteFlashcard: builder.mutation({
			query: ({id}) => ({
				url: `/users/${id}/`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useBringFlashcardsMutation,
	useBringDeckFlashcardsMutation,
	useCreateFlashcardMutation,
	useEditFlashcardMutation,
	useBringOneFlashcardMutation,
	useDeleteFlashcardMutation,
} = authApiSliceFlash;