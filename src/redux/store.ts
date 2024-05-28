import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import authReducer from './features/authSlice';
import { apiSliceDoc } from './services/apiSliceDoc';
import { apiSliceDeck } from './services/apiSliceDeck';
import { apiSliceFlash } from './services/apiSliceFlash';
import { apiSliceTranslate } from './services/apiSliceTranslate';
import { apiSliceNote } from './services/apiSliceNote';
import { apiSlicePost } from './services/apiSlicePost';
import { apiSliceGrammar } from './services/apiSliceGrammar';
import { apiSliceExamples } from './services/apiSliceExamples';
import { apiSliceEvaluate } from './services/apiSliceEvaluate';
import { apiSliceStripe } from './services/apiSliceStripe';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[apiSliceDoc.reducerPath]: apiSliceDoc.reducer,
		[apiSliceDeck.reducerPath]: apiSliceDeck.reducer,
		[apiSliceFlash.reducerPath]: apiSliceFlash.reducer,
		[apiSliceTranslate.reducerPath]: apiSliceTranslate.reducer,
		[apiSliceNote.reducerPath]: apiSliceNote.reducer,
		[apiSlicePost.reducerPath]: apiSlicePost.reducer,
		[apiSliceGrammar.reducerPath]: apiSliceGrammar.reducer,
		[apiSliceExamples.reducerPath]: apiSliceExamples.reducer,
		[apiSliceEvaluate.reducerPath]: apiSliceEvaluate.reducer,
		[apiSliceStripe.reducerPath]: apiSliceStripe.reducer,
		auth: authReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware, apiSliceDoc.middleware, apiSliceDeck.middleware, apiSliceFlash.middleware, apiSliceTranslate.middleware, apiSliceNote.middleware, apiSliceExamples.middleware, apiSliceEvaluate.middleware, apiSlicePost.middleware, apiSliceGrammar.middleware,apiSliceStripe.middleware),
	devTools: process.env.NODE_ENV !== 'production',
});



export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];

