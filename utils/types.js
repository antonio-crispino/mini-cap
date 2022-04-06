export const ALL_USERS_TABLE = "ALL_USERS_TABLE";

export const PATIENTS_TABLE = "PATIENTS_TABLE";

export const STATUSES_TABLE = "STATUSES_TABLE";

export const TRACING_TABLE = "TRACING_TABLE";

export const PATIENTS_TRACING_TABLE = "PATIENTS_TRACING_TABLE";

export const DOCTORS_TABLE = "DOCTORS_TABLE";

export const HEALTH_OFFICIALS_TABLE = "HEALTH_OFFICIALS_TABLE";

export const IMMIGRATION_OFFICERS_TABLE = "IMMIGRATION_OFFICERS_TABLE";

export const ADMINS_TABLE = "ADMINS_TABLE";

export const CARD_DETAILS = "CARD_DETAILS";

export const BUSINESSES_TABLE = "BUSINESSES_TABLE";

export const SEE_MY_PATIENTS_TABLE = "SEE_MY_PATIENTS_TABLE";

export const PATIENT_UPDATE_INFO = "PATIENT_UPDATE_INFO";

export const PATIENTS_STATUS = "PATIENTS_STATUS";

export const DEFAULT_VIEW = "DEFAULT_VIEW";

export const NOTIFICATION = "NOTIFICATION";

export const APPOINTMENT = "APPOINTMENT";

export const calculateEndDate = () => {
  const someDate = new Date();
  const numberOfDaysToAdd = 14;
  const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  const d = new Date(result);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
};
