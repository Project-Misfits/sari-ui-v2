import { fail, json, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signUpSchema } from './schema';
import type { Actions, PageServerLoad } from './$types';
import { makeRequest } from '$lib/server/api';
import { HttpRequest } from '$lib/utils/util';

export const load = (async ({ locals }) => {
	//   if (locals.userId) redirect(302, '/');

	return {
		form: await superValidate(zod(signUpSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	signUp: async ({ request }) => {
		const form = await superValidate(request, zod(signUpSchema));

		if (!form.valid) {
			console.log('Form Error: Invalid data');
		}

		await makeRequest({
			method: HttpRequest.POST,
			path: '/user/register/',
			body: JSON.stringify(form.data)
		});

		redirect(302, '/auth/sign-in');
	}
};
