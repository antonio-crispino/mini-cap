import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


export const supaSignIn = async (email, password) => {
    return await supabase.auth.signIn({
        email,
        password
    });
}

export const supaGetUserData = async (id) => {
    return await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
}


export const supaSignOut = async () => {
    return await supabase.auth.signOut();
}

export const supaCurrentUser = () => {
    return supabase.auth.user();
}

export const supaSignUp = async ({ email, password, firstname, lastname }) => {
    let error
    const { user, error: createAuthError } = await supabase.auth.signUp({
        email,
        password
    })
    if (createAuthError) {
        error = createAuthError
        return error 
    }
    const { error: createUserError } = await supabase
        .from('users')
        .insert([
            { firstname, lastname, id: user.id }
        ])

    if (createUserError) {
        error = createAuthError
        return error;
    }
}
