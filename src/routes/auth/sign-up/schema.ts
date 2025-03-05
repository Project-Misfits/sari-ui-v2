import { EMAIL_REGEX, PASSWORD_REGEX } from '$lib/regex';
import { z, ZodIssueCode } from 'zod';

export const signUpSchema = z
	.object({
		username: z.string().min(2).max(50),
		email: z.string().regex(EMAIL_REGEX, { message: 'Invalid email.' }),
		first_name: z.string().min(2).max(50),
		last_name: z.string().min(2).max(50),
		password: z.string().regex(PASSWORD_REGEX, { message: 'Invalid password.' }),
		confirm_password: z.string().regex(PASSWORD_REGEX, { message: 'Invalid password.' })
	})
	.superRefine(({ password, confirm_password }, ctx) => {
		if (password !== confirm_password) {
			ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ['confirmPassword'],
				message: 'Passwords do not match.'
			});
		}
	});

export type FormSchema = typeof signUpSchema;
