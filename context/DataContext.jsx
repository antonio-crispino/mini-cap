import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useAppContext } from "./AppContext";

export const DataContext = createContext();

function DataContextProvider({ mockData, children }) {
  const { user: currentUser, supabase, setError } = useAppContext();
  const [users, setUsers] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [healthOfficials, setHealthOfficials] = useState([]);
  const [immigrationOfficers, setImmigrationOfficers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const subscribeHandler = (eventPayload, state) => {
    // TODO: Implement the subscription handler for INSERT and DELETE
    const { eventType, errors } = eventPayload;
    if (errors) {
      setError(errors);
      return;
    }
    let changeIndex;
    let result;
    const newArray = [...state];
    switch (eventType) {
      case "UPDATE":
        changeIndex = newArray.findIndex(
          (obj) => obj.id === eventPayload.old.id
        );
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(eventPayload.new)) {
          if (key !== "userInfo" || key !== "doctorInfo") {
            newArray[changeIndex][key] = eventPayload.new[key];
          }
        }
        result = newArray;
        break;

      default:
        break;
    }

    return result;
  };

  useEffect(() => {
    const getUsers = async () => {
      if (currentUser) {
        const { data: loadedUsers, error } = await supabase.supaGetUsers();
        if (error) {
          setError(error);
          return;
        }
        setUsers([...loadedUsers]);
      }
    };
    getUsers();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("users")
        .on("*", (payload) => {
          setUsers(subscribeHandler(payload, users));
        })
        .subscribe();
      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, users, supabase.client]);

  useEffect(() => {
    const getAdministrators = async () => {
      if (currentUser) {
        const { data: loadedAdmins, error } =
          await supabase.supaGetAdministrators();
        if (error) {
          setError(error);
          return;
        }
        setAdministrators([...loadedAdmins]);
      }
    };
    getAdministrators();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("adminstrators")
        .on("*", (payload) => {
          setAdministrators([...administrators, ...payload.new]);
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, administrators, supabase.client]);

  useEffect(() => {
    const getHealthOfficials = async () => {
      if (currentUser) {
        const { data: loadedHealthOfficials, error } =
          await supabase.supaGetHealthOfficials();
        if (error) {
          setError(error);
          return;
        }
        setHealthOfficials([...loadedHealthOfficials]);
      }
    };
    getHealthOfficials();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("health_officials")
        .on("*", (payload) => {
          setHealthOfficials(subscribeHandler(payload, healthOfficials));
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, healthOfficials, supabase]);

  useEffect(() => {
    const getDoctors = async () => {
      if (currentUser) {
        const { data: loadedDoctors, error } =
          await supabase.supaGetMedicalDoctors();
        if (error) {
          setError(error);
          return;
        }
        setDoctors([...loadedDoctors]);
      }
    };
    getDoctors();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("medical_doctors")
        .on("*", (payload) => {
          setDoctors(subscribeHandler(payload, doctors));
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, doctors, supabase]);

  useEffect(() => {
    const getBusinesses = async () => {
      if (currentUser) {
        const { data: loadedBusinesses, error } =
          await supabase.supaGetBusinesses();
        if (error) {
          setError(error);
          return;
        }
        setBusinesses([...loadedBusinesses]);
      }
    };
    getBusinesses();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("businesses")
        .on("*", (payload) => {
          setBusinesses(subscribeHandler(payload, businesses));
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, businesses, supabase]);

  useEffect(() => {
    const getPatients = async () => {
      if (currentUser) {
        const { data: loadedPatients, error } =
          await supabase.supaGetPatients();
        if (error) {
          setError(error);
          return;
        }

        setPatients([...loadedPatients]);
      }
    };
    getPatients();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("patients")
        .on("*", (payload) => {
          setPatients(subscribeHandler(payload, patients));
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, patients, supabase]);

  useEffect(() => {
    const getImmigrationOfficers = async () => {
      if (currentUser) {
        const { data: loadedImmigrationOfficers, error } =
          await supabase.supaGetImmigrationOfficers();
        if (error) {
          setError(error);
          return;
        }
        setImmigrationOfficers([...loadedImmigrationOfficers]);
      }
    };
    getImmigrationOfficers();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("immigration_officers")
        .on("*", (payload) => {
          setImmigrationOfficers([...immigrationOfficers, ...payload.new]);
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, immigrationOfficers, supabase.client]);

  const exposed = useMemo(() => {
    if (mockData) return mockData;
    const ctxExposed = {
      users,
      patients,
      doctors,
      healthOfficials,
      immigrationOfficers,
      businesses,
      administrators,
    };
    return ctxExposed;
  }, [
    mockData,
    users,
    patients,
    doctors,
    healthOfficials,
    immigrationOfficers,
    businesses,
    administrators,
  ]);
  return (
    <DataContext.Provider value={exposed}>{children}</DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);

export default DataContextProvider;
