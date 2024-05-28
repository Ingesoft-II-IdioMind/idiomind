'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from 'app/redux/hooks';
import { Loader } from '../Loader';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

	if (isLoading) {
		return (
			<div className='flex justify-center my-8'>
				<Loader color="naranja" />
			</div>
		);
	}

	if (isAuthenticated) {
		console.log('Redirecting to logged');
		redirect('/logged');
	}

	return <>{children}</>;
}