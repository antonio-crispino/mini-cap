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

  /**
   * Updates a passed table based on a given criteria
   * @param {String} table name of the table to be updated
   * @param {Object} payload object containing fields to update
   * @param {Object} criteria object containing fields to match row/s in the bd
   * @returns the supabase response object
   */
  async updateTableBy(table, payload, criteria) {
    const targetFields = { ...payload };
    delete targetFields.id;
    const { data, error } = await this.client
      .from(table)
      .update({
        ...targetFields,
      })
      .match({ ...criteria });
    if (error) {
      return { error };
    }

    return { data };
  }

  /**
   *
   * @param {String} table name of the table to fetch data from
   * @param {Object} criteria object that contain the criteria which to select data by
   * @returns the data object based on the inputs or error object in case of error
   */
  async fetchTableBy(table, criteria) {
    const { data, error } = await this.client
      .from(table)
      .select("*")
      .match({ ...criteria });
    if (error) {
      return { error };
    }

    return { data };
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
    return this.client
      .from("businesses")
      .select("*, userInfo: users!businesses_ownerId_fkey(*)");
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

  async supaGetDoctorPatients(doctorId) {
    const thing = await this.client
      .from("patients")
      .select(`*, userInfo: users!patients_id_fkey (*)`)
      .match({ doctorId });
    return thing;
  }

  async supaGetDoctorPatientsStatuses(doctorId) {
    const thing = await this.client
      .from("patient_updates")
      .select("*")
      .match({ doctorId });
    return thing;
  }

  async supaGetPatientsStatuses() {
    return this.client.from("patient_updates").select("*");
  }

  async supaSetUserInfo(id, attr, val) {
    const obj = {};
    obj[attr] = val;
    return this.client.from("users").update(obj).match({ id });
  }

  async supaGetPatientTraces(patientId) {
    return this.client
      .from("scanned_qrcodes")
      .select("*")
      .match({ id_patient: patientId });
  }

  async supaGetTracedPatients(businessId) {
    return this.client
      .from("scanned_qrcodes")
      .select("*")
      .match({ id_business: businessId });
  }

  async supaRequestPatientUpdate(
    id,
    doctorId,
    requestedUpdatesList,
    isPriority
  ) {
    let { error } = await this.client
      .from("patients")
      .update({
        updatesRequested: true,
        requestedUpdatesList,
        updatesRequestEnd: calculateEndDate(),
        isPriority,
      })
      .match({ id });
    if (error) return error;
    error = await this.supaAddNotification(
      id,
      doctorId,
      "Your doctor has requested updates about your state for the next 14 days",
      isPriority
    );
    return error;
  }

  async supaAddNotification(userId, subjectId, message, isPriority) {
    const { error } = await this.client.from("notifications").insert({
      userId,
      subjectId,
      info: message,
      isPriority,
    });
    return error;
  }

  async supaSendMessage(conversationId, senderId, text) {
    const { error } = await this.client.from("messages").insert({
      conversationId,
      senderId,
      text,
    });
    return error;
  }

  async supaReadMessage(messageId) {
    const { error } = await this.client
      .from("messages")
      .update({ read: true })
      .match({ id: messageId });
    return error;
  }

  async supaCreateNewConversation(patientId, doctorId) {
    const { error } = await this.client.from("conversations").insert({
      patientId,
      doctorId,
    });
    return error;
  }

  async supaGetNotifications(userId) {
    return this.client.from("notifications").select("*").eq("userId", userId);
  }

  async insertPatientStatus(fields, notification) {
    const notifyMessage = `Patient ${notification.patientName} has just submitted a status update for date ${notification.date}`;
    const { data, error } = await this.client
      .from("patient_updates")
      .insert([fields]);
    if (error) {
      return { error };
    }
    const notificationErr = await this.supaAddNotification(
      notification.doctorId,
      notification.id,
      notifyMessage,
      notification.priority
    );
    if (notificationErr) {
      return { notificationErr };
    }

    return { response: data };
  }

  /**
   *
   * @param {uuid} id id of the entity needed
   * @param {String} table table name as a string
   */
  async getResourceById(id, table) {
    const { data, error } = await this.client
      .from(table)
      .select("*")
      .match({ id });
    if (error) {
      return { error };
    }
    return { data };
  }

  async scheduleAppointment(appointmentDetails) {
    const { data, error } = await this.client
      .from("appointments")
      .insert([appointmentDetails]);
    if (error) {
      return { error };
    }
    return { data };
  }

  async getAppointments(userId, userType) {
    const { data, error } = await this.client
      .from("appointments")
      .select("*")
      .match(
        userType === "doctor" ? { doctorId: userId } : { patientId: userId }
      );
    if (error) {
      return { error };
    }
    return { data };
  }

  async setAppointmentStatus(id, value) {
    const { data, error } = await this.client
      .from("appointments")
      .update({ status: value })
      .match({ id });
    if (error) {
      return { error };
    }
    return { data };
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

  async getBusinessID(businessUserID) {
    const business = await this.client
      .from("businesses")
      .select("*")
      .eq("ownerId", businessUserID);

    const obj = business.data[0];
    return obj.id;
  }

  async addQRCodeEntry(businessUserID, patientID) {
    const businessID = await this.getBusinessID(businessUserID);
    const error = await this.client.from("scanned_qrcodes").insert([
      {
        id_business: businessID,
        id_patient: patientID,
      },
    ]);

    return error;
  }

  async updateQRCodeEntry(businessUserID, patientID) {
    const businessID = await this.getBusinessID(businessUserID);

    const exitedAt = {
      exited_at: new Date().toISOString().toLocaleString("zh-TW"),
    };
    const matchData = {
      id_business: businessID,
      id_patient: patientID,
    };

    const { data, error } = await this.client
      .from("scanned_qrcodes")
      .update({
        ...exitedAt,
      })
      .match({ ...matchData })
      .is("exited_at", null);
    if (error) {
      return { error };
    }

    return { data };
  }

  async getFlagStatus(chatID) {
    const chatArray = await this.client
      .from("conversations")
      .select("*")
      .eq("id", chatID);

    if (chatID === -1) {
      return null;
    }
    const chat = chatArray.data[0];

    return chat.doctorFlagged;
  }

  async updateChatFlag(chatID, requiredFlag, val) {
    let flag;

    if (requiredFlag === "doctor") {
      flag = {
        doctorFlagged: val,
      };
    }

    if (requiredFlag === "patient") {
      flag = {
        patientFlagged: val,
      };
    }

    const matchData = {
      id: chatID,
    };

    const { data, error } = await this.client
      .from("conversations")
      .update({
        ...flag,
      })
      .match({ ...matchData });
    if (error) {
      return { error };
    }

    return { data };
  }
}
