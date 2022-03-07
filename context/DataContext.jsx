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

  /**
 * {
    "schema": "public",
    "table": "patients",
    "commit_timestamp": "2022-03-07T01:02:19.234391+00:00",
    "eventType": "UPDATE",
    "new": {
        "doctorId": null,
        "id": "07ea5931-ac6c-48c8-b640-416b740164b4",
        "medicalCardNum": 53226879,
        "symptoms": true
    },
    "old": {
        "id": "07ea5931-ac6c-48c8-b640-416b740164b4"
    },
    "errors": null
}
 */
  const subscribeHandler = (eventPayload, state) => {
    const { eventType, errors } = eventPayload;
    if (errors) {
      setError(errors);
      return;
    }
    let changeIndex;
    let result;
    const newArray = [...state];

    console.log("current", newArray);
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
        console.log("current AFTER!!", newArray);
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
          setUsers([...users, ...payload.new]);
        })
        .subscribe();
      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, users, supabase.client]);

  useEffect(() => {
    const getAdminstrators = async () => {
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
    getAdminstrators();
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
        const { data: loadedHealthOffcials, error } =
          await supabase.supaGetHealthOfficials();
        if (error) {
          setError(error);
          return;
        }
        setHealthOfficials([...loadedHealthOffcials]);
      }
    };
    getHealthOfficials();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("health_officials")
        .on("*", (payload) => {
          setHealthOfficials([...healthOfficials, ...payload.new]);
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
          setDoctors([...doctors, ...payload.new]);
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [currentUser?.id, doctors, supabase]);

  useEffect(() => {
    const getBussinesses = async () => {
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
    getBussinesses();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      const subscription = supabase.client
        .from("businesses")
        .on("*", (payload) => {
          setBusinesses([...businesses, ...payload.new]);
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
          console.log("thisispayload", payload);
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
