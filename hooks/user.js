import { supabase } from '../utils/supabaseClient'

export const useUser = () => {
    return supabase.auth.user()
}