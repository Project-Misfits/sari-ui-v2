import { PASSWORD_REGEX } from '$lib/regex';
import { z } from 'zod';

export const signInSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().regex(PASSWORD_REGEX, { message: 'Invalid Password' })
});

export type FormSchema = typeof signInSchema;
