'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from 'app/redux/hooks';
import { Loader } from '../Loader';
import { useCurrentUser } from 'app/hooks/use-current-user';


interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const user = useCurrentUser();

	// if (isLoading) {
	// 	return (
	// 		<div className='flex justify-center my-8'>
	// 			<Loader color="naranja" />
	// 		</div>
	// 	);
	// }

	if (user === null || user === undefined) {
		// console.log('Redirecting to login');
		redirect('/auth/login');
	}

	// console.log(user)

	return <>{children}</>;
}