'use client';

import { useVerifyMutation } from 'app/redux/features/authApiSlice';
import { finishInitialLoad, setAuth } from 'app/redux/features/authSlice';
import { useAppDispatch } from 'app/redux/hooks';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import toast from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, []);

	return <ToastContainer position="bottom-left" theme="colored"/>;
}