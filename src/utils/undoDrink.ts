'use server';

import { createClient } from "@/utils/supabase/server";

export default async function undoDrink (drinkID : String) {
    const supabase = await createClient();

    const { data: user_data, error: user_error } = await supabase.auth.getUser();
    if(user_error || !user_data?.user) return;

    const { data: latestDrink, error: fetchError } = await supabase
        .from('history')
        .select('id')
        .order('drunk_at', { ascending: false })
        .limit(1)
        .single();
    
    if(fetchError || !latestDrink) return;

    const { error } = await supabase
        .from('history')
        .delete()
        .eq('id', latestDrink.id);
    
    return;
}