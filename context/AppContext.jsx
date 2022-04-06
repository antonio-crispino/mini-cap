import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MockSupaClient } from "../mocks/supabase";
import SupaClient from "../utils/supabase";
import { DEFAULT_VIEW } from "../utils/types";

export const AppContext = createContext();

function AppContextProvider({ mockData, children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [supabase] = useState(() =>
    process.env.NODE_ENV === "test" ? new MockSupaClient() : new SupaClient()
  );
  const [user, setUser] = useState(supabase.supaCurrentUser());
  const [componentInView, setComponentInView] = useState(DEFAULT_VIEW);
  const [expandedCard, setExpandedCard] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [patient, setPatient] = useState({});
  const [tracedPatients, setTracedPatients] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      const sessionUser = supabase.supaCurrentUser();

      if (sessionUser) {
        const { data: userData } = await supabase.supaGetUserData(
          sessionUser.id
        );

        setUser({
          ...sessionUser,
          ...userData,
        });
      }
      setIsLoading(false);
    };

    getUserProfile();
  }, [supabase]);

  useEffect(() => {
    if (user) {
      const subscription = supabase.client
        .from(`user:id=eq.${user.id}`)
        .on("UPDATE", (payload) => {
          setUser({ ...user, ...payload.new });
        })
        .subscribe();

      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [user, supabase]);

  const setToInactive = useCallback(
    async (email, intable) => {
      supabase.supaSetToInactive(email, intable);
    },
    [supabase]
  );

  useEffect(() => {
    const getNotifications = async () => {
      if (user) {
        const { data: fetchedNotifications, error: notificationFetchError } =
          await supabase.supaGetNotifications(user.id);
        if (notificationFetchError) {
          setError(notificationFetchError);
          return;
        }
        setNotifications([...fetchedNotifications]);
      }
    };
    getNotifications();
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      const subscription = supabase.client
        .from(`notifications:userId=eq.${user.id}`)
        .on("INSERT", (payload) => {
          setNotifications([...notifications, payload.new]);
        })
        .subscribe();
      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [user?.id, notifications, supabase.client]);

  const sendResetPassEmail = useCallback(
    async (email) => {
      supabase.supaSendResetPassEmail(email);
    },
    [supabase]
  );

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      const authData = await supabase.supaSignIn(email, password);
      const { error: loginError } = authData;
      if (loginError) {
        setError(loginError);
        setIsLoading(false);
        return loginError;
      }
      const sessionUser = authData.user;
      if (sessionUser) {
        const userData = await supabase.supaGetUserData(sessionUser.id);
        setUser({
          ...sessionUser,
          ...userData.data,
        });
      }
      setIsLoading(false);
    },
    [supabase]
  );

  const update = useCallback(
    async (email, newfirstname, newlastname) => {
      await supabase.supaUpdate(email, newfirstname, newlastname);
    },
    [supabase]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    router.push("/");
    setComponentInView(DEFAULT_VIEW);

    const { error: signoutError } = await supabase.supaSignOut();
    if (signoutError) {
      setError(signoutError);
      setIsLoading(false);
      return;
    }
    setUser(null);
    setIsLoading(false);
    const toast = createStandaloneToast();
    toast({
      title: "logout successful.",
      description: "redirecting you to home page",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  }, [supabase, router]);

  const exposed = useMemo(() => {
    if (mockData) return mockData;
    const ctxExposed = {
      user,
      supabase,
      isLoading,
      error,
      componentInView,
      expandedCard,
      notifications,
      patient,
      tracedPatients,
      setExpandedCard,
      setNotifications,
      setComponentInView,
      setPatient,
      setTracedPatients,
      login,
      logout,
      setError,
      setIsLoading,
      setToInactive,
      update,
      sendResetPassEmail,
    };
    return ctxExposed;
  }, [
    mockData,
    user,
    supabase,
    isLoading,
    error,
    componentInView,
    expandedCard,
    notifications,
    patient,
    tracedPatients,
    setExpandedCard,
    setNotifications,
    setComponentInView,
    setPatient,
    setTracedPatients,
    login,
    logout,
    setError,
    setIsLoading,
    setToInactive,
    update,
    sendResetPassEmail,
  ]);

  return <AppContext.Provider value={exposed}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
