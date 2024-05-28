import { apiSliceStripe } from "../services/apiSliceStripe";

const authApiSliceStripe = apiSliceStripe.injectEndpoints({
	endpoints: builder => ({
		stripeAnnual: builder.mutation({
			query: () => ({
				url: '/annual',
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useStripeAnnualMutation,
} = authApiSliceStripe;