import { createClient } from "@supabase/supabase-js";
import { calculateEndDate } from "./types";

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

  async supaSendResetPassEmail(email) {
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
    const { error: createUserError } = await this.client.from("users").insert([
      {
        firstname,
        lastname,
        email,
        id: user.id,
        userType: business ? "business" : "patient",
      },
    ]);
    if (createUserError) {
      return createAuthError;
    }
    if (business) {
      const { error: insertionError } = await this.client
        .from("businesses")
        .insert([{ ownerId: user.id }]);

      if (insertionError) {
        return insertionError;
      }
    } else {
      const { error: insertionError } = await this.client
        .from("patients")
        .insert([{ id: user.id }]);

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

  async updateTableById(table, payload) {
    const { id } = payload;
    const targetFields = { ...payload };
    delete targetFields.id;

    const data = this.client
      .from(table)
      .update({
        ...targetFields,
      })
      .match({ id });
    return data;
  }

  async supaGetUsers() {
    return this.client.from("users").select("*");
  }

  async supaGetAdministrators() {
    return this.client.from("administrators").select("*, userInfo: users(*)");
  }

  async supaGetHealthOfficials() {
    return this.client.from("health_officials").select("*, userInfo: users(*)");
  }

  async supaGetImmigrationOfficers() {
    return this.client
      .from("immigration_officers")
      .select("*, userInfo: users(*)");
  }

  async supaGetBusinesses() {
    return this.client.from("businesses").select("*, userInfo: users(*)");
  }

  async supaGetMedicalDoctors() {
    return this.client.from("medical_doctors").select("*, userInfo: users(*)");
  }

  async supaGetPatients() {
    return this.client.from("patients").select(
      `*, userInfo: users!patients_id_fkey (*), 
       doctorInfo: doctorId (*)`
    );
  }

  async supaSetUserInfo(id, attr, val) {
    const obj = {};
    obj[attr] = val;
    return this.client.from("users").update(obj).match({ id });
  }

  async supaRequestPatientUpdate(id, doctorId, requestedUpdatesList) {
    let { error } = await this.client
      .from("patients")
      .update({
        updatesRequested: true,
        requestedUpdatesList,
        updatesRequestEnd: calculateEndDate(),
      })
      .match({ id });
    if (error) return error;
    error = await this.supaAddNotification(
      id,
      doctorId,
      "Your doctor has requested updates about your state for the next 14 days"
    );
    return error;
  }

  async supaAddNotification(userId, subjectId, message) {
    const { error } = await this.client.from("notifications").insert({
      userId,
      subjectId,
      info: message,
    });
    return error;
  }

  async supaAddUser(type, firstname, middlename, lastname, email, password) {
    const { user, error } = await this.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      return error;
    }

    await this.client.from("users").insert([
      {
        firstname,
        middlename,
        lastname,
        email,
        id: user.id,
        userType: type,
      },
    ]);

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
}
