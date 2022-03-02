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

export const Context = createContext();

function ContextProvider({ mockData, children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [client] = useState(() =>
    process.env.NODE_ENV === "test" ? new MockSupaClient() : new SupaClient()
  );
  const [user, setUser] = useState(client.supaCurrentUser());

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      const sessionUser = client.supaCurrentUser();

      if (sessionUser) {
        const { data: userData } = await client.supaGetUserData(sessionUser.id);

        setUser({
          ...sessionUser,
          ...userData,
        });
      }
      setIsLoading(false);
    };

    getUserProfile();
  }, [client]);

  const setToInactive = useCallback(
    async (email, intable) => {
      client.supaSetToInactive(email, intable);
    },
    [client]
  );

  const sendResetPassEmail = useCallback(
    async (email) => {
      client.supaSendResetPassEmail(email);
    },
    [client]
  );

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      const authData = await client.supaSignIn(email, password);
      const { error: loginError } = authData;
      if (loginError) {
        setError(loginError);
        setIsLoading(false);
        return loginError;
      }
      const sessionUser = authData.user;
      if (sessionUser) {
        const userData = await client.supaGetUserData(sessionUser.id);
        setUser({
          ...sessionUser,
          ...userData.data,
        });
      }
      setIsLoading(false);
    },
    [client]
  );

  const update = useCallback(
    async (email, newfirstname, newlastname) => {
      await client.supaUpdate(email, newfirstname, newlastname);
    },
    [client]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    router.push("/");

    const { error: signoutError } = await client.supaSignOut();
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
  }, [client, router]);

  const refreshData = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      const userData = await client.supaGetUserData(user.id);
      setUser((prevState) => ({ ...prevState, ...userData }));
      setIsLoading(false);
    }
  }, [client, user]);

  const exposed = useMemo(() => {
    if (mockData) return mockData;
    const ctxExposed = {
      user,
      client,
      isLoading,
      error,
      login,
      logout,
      setError,
      setIsLoading,
      refreshData,
      setToInactive,
      update,
      sendResetPassEmail,
    };
    return ctxExposed;
  }, [
    mockData,
    user,
    client,
    isLoading,
    error,
    login,
    logout,
    setError,
    setIsLoading,
    refreshData,
    setToInactive,
    update,
    sendResetPassEmail,
  ]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAppContext = () => useContext(Context);

export default ContextProvider;
