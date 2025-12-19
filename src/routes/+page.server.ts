import { sdk } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionToken = cookies.get('session');
	const sessionValid = await sdk.api.users.auth.checkSession({ sessionToken });
	if (!sessionValid) {
		cookies.delete('session', { path: '/' });
		redirect(307, '/auth');
	}

	const user = await sdk.api.users.accounts.me({ sessionToken });
	if (!user) {
		cookies.delete('session', { path: '/' });
		redirect(307, '/auth');
	}

	return { user };
};
