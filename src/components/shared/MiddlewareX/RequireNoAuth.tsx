'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from 'app/redux/hooks';
import { Loader } from '../Loader';
import { useCurrentUser } from 'app/hooks/use-current-user';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
	const user = useCurrentUser();

	if (user != null && user != undefined) {
		// console.log('Redirecting to login');
		redirect('/logged');
	}

	return <>{children}</>;
}