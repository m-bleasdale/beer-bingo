'use server';

import { createClient } from "@/utils/supabase/server";

export default async function countDrink (drinkID : String) {
    const supabase = await createClient();

    const { data: user_data, error: user_error } = await supabase.auth.getUser();
    if(user_error || !user_data?.user) return;

    const { error } = await supabase
        .from('history')
        .insert({ drink_id: drinkID, user_id: user_data.user.id })

    return;
}