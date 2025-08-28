import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Page() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    redirect("/");
}