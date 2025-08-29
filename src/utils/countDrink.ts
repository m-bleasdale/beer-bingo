'use server';

import { createClient } from "@/utils/supabase/server";

const timeout = 10; //seconds

function lastDrinkInTimeout (lastDrink : String) {
    if(!lastDrink) return false;
    const date = new Date(lastDrink.replace(/\.(\d{3})\d+/, '.$1'));
    const now = new Date(); 
    const timeOutStart = new Date(now.getTime() - timeout);
    return date >= timeOutStart;
}

export default async function countDrink (drinkID : String) {
    const supabase = await createClient();

    const { data: user_data, error: user_error } = await supabase.auth.getUser();
    if(user_error || !user_data?.user) return;

    const { data: last_drink} = await supabase
        .from('history')
        .select('drunk_at')
        .eq('drink_id', drinkID)
        .eq('user_id', user_data.user.id)
        .order('drunk_at', { ascending: false })
        .limit(1)
        .single();

    if(lastDrinkInTimeout(last_drink?.drunk_at) === true) return;

    const { error } = await supabase
        .from('history')
        .insert({ drink_id: drinkID, user_id: user_data.user.id })

    return;
}