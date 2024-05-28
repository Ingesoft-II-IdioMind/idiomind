import { toast } from 'react-toastify';

export default async function continueWithSocialAuth(
	provider: string,
	redirect: string
) {
	try {
		const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
		const newRedirectUrl = redirectUrl ? redirectUrl.slice(0, -1) : '';
		const url = `${
			process.env.NEXT_PUBLIC_HOST
		}/api/o/${provider}/?redirect_uri=${
			process.env.NODE_ENV === 'production'
				? newRedirectUrl + "/auth/google"
				: 'http://localhost:3000'
		}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
			credentials: 'include',
		});
		const data = await res.json();

		if (res.status === 200 && typeof window !== 'undefined') {
			window.location.replace(data.authorization_url);
		} else {
			toast.error('Something went wrong');
		}
	} catch (err) {
		toast.error('Something went wrong');
	}
}