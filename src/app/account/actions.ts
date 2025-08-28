'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type FormState = {
	error: string | null;
	success: boolean;
}

export async function auth(prevState: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient()

	const email = formData.get('email');
	const password = formData.get('password');

    if (typeof email !== 'string') return { error: 'Invalid email', success: false };
	if (typeof password !== 'string') return { error: 'Invalid password', success: false };

	const { data: signup_data, error: signup_error } = await supabase.auth.signUp({ email, password })

	//Sign up failed and it's not because user already exists
	if (signup_error && signup_error?.code !== "user_already_exists") {
		return { error: signup_error.message, success: false } 
	}

	if(signup_error?.code === "user_already_exists") {
		const { data: login_data, error: login_error } = await supabase.auth.signInWithPassword({ email, password })

		if (login_error) {
			return { error: login_error.message, success: false } 
		}

	}
    
	revalidatePath('/', 'layout');
    redirect('/');

}