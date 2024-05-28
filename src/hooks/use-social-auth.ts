import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from 'app/redux/hooks';
import { setAuth } from 'app/redux/features/authSlice';
import { toast } from 'react-toastify';

//http://localhost:3000/auth/google?state=tBlZMuvcPteVZJppuVs1q6qYsdO6yr1o&code=4%2F0AeaYSHABG4zevCrSKVr0NgVmdCtNCSIOJlhCvVFNWYD_1SqTkNg6fzZZHeZifwLVTVYujQ&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent

export default function useSocialAuth(authenticate: any, provider: string) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const effectRan = useRef(false);

	useEffect(() => {
		const state = searchParams.get('state');
		const code = searchParams.get('code');

		if (state && code && !effectRan.current) {
			authenticate({ provider, state, code })
				.unwrap()
				.then(() => {
					dispatch(setAuth());
					toast.success('Logged in');
					router.push('/logged');
				})
				.catch(() => {
					toast.error('Failed to log in');
					router.push('/auth/login');
				});
		}

		return () => {
			effectRan.current = true;
		};
	}, [authenticate, provider]);
}