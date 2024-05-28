import { apiSliceDeck } from "../services/apiSliceDeck";

const authApiSliceDeck = apiSliceDeck.injectEndpoints({
	endpoints: builder => ({
		bringDecks: builder.mutation({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
		}),
		createDeck: builder.mutation({
			query: ({nombre,ultima_Practica}) => ({
				url: '/',
				method: 'POST',
				body: {nombre,ultima_Practica},
			}),
		}),
		bringOneDeck: builder.mutation({
			query: ({id}) => ({
				url: `/${id}/`,
				method: 'GET',
			}),
		}),
		deleteDeck: builder.mutation({
			query: ({id}) => ({
				url: `/${id}/`,
				method: 'DELETE',
			}),
		}),
		editDeck: builder.mutation({
			query: ({id,nombre,ultima_Practica}) => ({
				url: `/${id}/`,
				method: 'PUT',
				body: {nombre,ultima_Practica},
			}),
		}),
	}),
});

export const {
	useBringDecksMutation,
	useCreateDeckMutation,
	useBringOneDeckMutation,
	useDeleteDeckMutation,
	useEditDeckMutation,
} = authApiSliceDeck;