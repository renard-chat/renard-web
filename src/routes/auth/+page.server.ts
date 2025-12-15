import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sdk } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');

	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, { message: 'Missing email or password' });
		}

		try {
			const { sessionToken } = await sdk.api.users.auth.login({
				email,
				password
			});

			cookies.set('session', sessionToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
		} catch (error: any) {
			return fail(500, { message: error.response?.data ?? error.message });
		}

		return { success: true };
	},

	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const username = data.get('username') as string;
		const confirmPassword = data.get('confirmPassword');

		if (!email || !password || !confirmPassword) {
			return fail(400, { message: 'Missing required fields' });
		}

		if (password !== confirmPassword) {
			return fail(400, { message: 'Passwords do not match' });
		}

		try {
			const { sessionToken } = await sdk.api.users.auth.register({
				email,
				password,
				username
			});

			cookies.set('session', sessionToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});

			return { success: true };
		} catch (error: any) {
			return fail(500, { message: error.message ?? 'Registration failed' });
		}
	}
};
