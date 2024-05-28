import { apiSliceNote } from "../services/apiSliceNote";

const authApiSliceNote = apiSliceNote.injectEndpoints({
	endpoints: builder => ({
		bringNotes: builder.mutation({
			query: () => ({
				url: '/users/',
				method: 'GET',
			}),
		}),
		createNote: builder.mutation({
			query: ({documento, cita,contenido,highlight_areas}) => ({
				url: '/users/',
				method: 'POST',
				body: {documento,cita , contenido,highlight_areas},
			}),
		}),
		editNote: builder.mutation({
			query: ({documento, cita,contenido,highlight_areas, id}) => ({
				url: `/users/${id}/`,
				method: 'PUT',
				body: {documento, cita,contenido,highlight_areas},
			}),
		}),
		bringOneNote: builder.mutation({
			query: ({id}) => ({
				url: `/Notes/${id}/`,
				method: 'GET',
			}),
		}),
		deleteNote: builder.mutation({
			query: ({id}) => ({
				url: `/users/${id}/`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useBringNotesMutation,
	useCreateNoteMutation,
	useEditNoteMutation,
	useBringOneNoteMutation,
	useDeleteNoteMutation,
} = authApiSliceNote;