import { createClient } from "@supabase/supabase-js";

export class SupaClient {
  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  async supaSignIn(email, password) {
    return await this.client.auth.signIn({
      email,
      password,
    });
  }

  async supaGetUserData(id) {
    return await this.client.from("users").select("*").eq("id", id).single();
  }

  async supaSignOut() {
    return await this.client.auth.signOut();
  }

  supaCurrentUser() {
    return this.client.auth.user();
  }

  async supaSignUp({ email, password, firstname, lastname }) {
    let error;
    const {
      user,
      error: createAuthError
    } = await this.client.auth.signUp({
      email,
      password,
    });
    if (createAuthError) {
      error = createAuthError;
      return error;
    }
    const { error: createUserError } = await this.client
      .from("users")
      .insert([{ firstname, lastname, id: user.id }]);
      if (createUserError) {
      error = createAuthError;
      return error;
    }
  }
}
