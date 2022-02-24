import { createClient } from "@supabase/supabase-js";

export default class SupaClient {
  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  async supaSetToInactive(email, intable) {
    return this.client
      .from(intable)
      .update({ inactive: true })
      .match({ email });
  }

  async supaSendRestToEmail(email) {
    return this.client.auth.api.resetPasswordForEmail(email);
  }

  async supaSignIn(email, password) {
    return this.client.auth.signIn({
      email,
      password,
    });
  }

  async supaGetUserData(id) {
    return this.client.from("users").select("*").eq("id", id).single();
  }

  async supaSignOut() {
    return this.client.auth.signOut();
  }

  supaCurrentUser() {
    return this.client.auth.user();
  }

  async supaSignUp({ email, password, firstname, lastname, business }) {
    let error;
    const { user, error: createAuthError } = await this.client.auth.signUp({
      email,
      password,
    });
    if (createAuthError) {
      return createAuthError;
    }
    const { error: createUserError } = await this.client
      .from("users")
      .insert([{ firstname, lastname, email, id: user.id }]);
    if (createUserError) {
      return createAuthError;
    }
    if (business) {
      const { error: insertionError } = await this.client
        .from("businesses")
        .insert([{ owner_id: user.id }]);

      if (insertionError) {
        return insertionError;
      }
    }

    return error;
  }

  async supaUpdate(email, newfirstname, newlastname) {
    const data = this.client
      .from("users")
      .update({
        firstname: newfirstname,
        lastname: newlastname,
      })
      .match({ email });
    return data;
  }

  /* async supaGetAllUsers() {
    const obj = await {
      users: this.client.from("users").select("*"),
      administrators: this.client.from("administrators").select("*"),
      healthOfficials: this.client.from("health_officials").select("*"),
      immigrationOfficers: this.client.from("immigration_officers").select("*"),
      businesses: this.client.from("businesses").select("*"),
      medicalDoctors: this.client.from("medical_doctors").select("*"),
      patients: this.client.from("patients").select("*"),
    };
    return obj;
  } */

  async supaGetUsers() {
    return this.client.from("users").select("*");
  }

  async supaGetAdministrators() {
    // ?
    return this.client
      .from("administrators", "users")
      .select("*")
      .eq("administrators.id", "users.id");
  }

  async supaGetHealthOfficials() {
    return this.client.from("health_officials").select("*");
  }

  async supaGetImmigrationOfficers() {
    return this.client.from("immigration_officers").select("*");
  }

  async supaGetBusinesses() {
    return this.client.from("businesses").select("*");
  }

  async supaGetMedicalDoctors() {
    return this.client.from("medical_doctors").select("*");
  }

  async supaGetPatients() {
    return this.client.from("patients").select("*");
  }

  async supaGetDoctorsPatients() {
    const testing = this.client.from("doctor_patient").select("*");
    return testing;
  }

  async supaSetUserInfo(id, attr, val) {
    const obj = {};
    obj[attr] = val;
    return this.client.from("users").update(obj).match({ id });
  }

  async supaAddUser(type, firstname, middlename, lastname, email, password) {
    const { user, error } = await this.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      return error;
    }

    await this.client
      .from("users")
      .insert([{ firstname, middlename, lastname, email, id: user.id }]);

    switch (type) {
      case "administrator":
        await this.client.from("administrators").insert([{ id: user.id }]);
        break;
      case "health_official":
        await this.client.from("health_officials").insert([{ id: user.id }]);
        break;
      case "immigration_officer":
        await this.client
          .from("immigration_officers")
          .insert([{ id: user.id }]);
        break;
      case "business":
        await this.client.from("businesses").insert([{ id: user.id }]);
        break;
      case "medical_doctor":
        await this.client.from("medical_doctors").insert([{ id: user.id }]);
        break;
      case "patient":
        await this.client.from("patients").insert([{ id: user.id }]);
        break;
      default:
        return new Error("Invalid user type.");
    }

    return error;
  }

  /*
  async supaDeleteUser(id) {
    await this.client.from("administrators").delete().match([{ id }]);
    await this.client.from("health_officials").delete().match([{ id }]);
    await this.client.from("immigration_officers").delete().match([{ id }]);
    await this.client.from("businesses").delete().match([{ id }]);
    await this.client.from("medical_doctors").delete().match([{ id }]);
    await this.client.from("patients").delete().match([{ id }]);
    await this.client.from("users").delete().match([{ id }]);
    const { error } = await this.client.auth.api.deleteUser(
      id,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2NDIzNjMzMzMsImV4cCI6MTk1NzkzOTMzM30.Z_cyBnzAp5ygBB0_jU2AkRSPc64mi3J3U3oq5dR2OR0"
    );
    return error;
  }
  */
}
