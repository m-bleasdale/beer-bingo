'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type FormState = {
    error: string | null;
    success: boolean;
}

export async function addDrink(prevState: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient()

    const drink = formData.get('drink');
    const type = formData.get('type');

    if (typeof drink !== 'string') return { error: 'Invalid drink name', success: false };
    if (typeof type !== 'string') return { error: 'Invalid type', success: false };
    if(!type || type === '') return { error: 'Drink type is required', success: false };

    const { error } = await supabase
        .from('drinks')
        .insert({ name: drink, type: type, user_added: true })

    if(error?.code === '23505') return { error: `That drink already exists`, success: false };
    else if(error) return { error: `Something went wrong: ${error?.message}`, success: false };

    //Reloading the page here is not ideal at all but it is hard to refresh drinks list otherwise
    //I plan on fixing this
	revalidatePath('/', 'layout');
    redirect('/');

}