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
import { ALL_USERS_TABLE } from "../utils/types";

export const AppContext = createContext();

function AppContextProvider({ mockData, children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [supabase] = useState(() =>
    process.env.NODE_ENV === "test" ? new MockSupaClient() : new SupaClient()
  );
  const [user, setUser] = useState(supabase.supaCurrentUser());
  const [componentInView, setComponentInView] = useState(ALL_USERS_TABLE);
  const [expandedCard, setExpandedCard] = useState({});

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
      setExpandedCard,
      setComponentInView,
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
    setExpandedCard,
    setComponentInView,
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
