import { apiSlicePost } from "../services/apiSlicePost";

const authApiSlicePost = apiSlicePost.injectEndpoints({
	endpoints: builder => ({
		bringPosts: builder.mutation({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
		}),
		bringOnePost: builder.mutation({
			query: ({id}) => ({
				url: `/${id}/`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useBringPostsMutation,
	useBringOnePostMutation,
} = authApiSlicePost;