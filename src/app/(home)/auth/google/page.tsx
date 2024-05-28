'use client';

import { useSocialAuthenticateMutation } from 'app/redux/features/authApiSlice';
import { Loader } from 'app/components/shared/Loader';
import { useSocialAuth } from 'app/hooks';

export default function Page() {
	const [googleAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(googleAuthenticate, 'google-oauth2');

	return (
		<div className='my-8'>
			<Loader color="orange" />
		</div>
	);
}