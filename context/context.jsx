import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { MockSupaClient } from "../mocks/supabase";
import SupaClient from "../utils/supabase";

export const Context = createContext();

function ContextProvider({ mockData, children }) {
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
  }, [client])   ;

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

  const logout = useCallback(async () => {
    setIsLoading(true);
    const { error: signoutError } = await client.supaSignOut();
    if (!signoutError) {
      setUser(null);
    }
    setIsLoading(false);
    return error;
  }, [client, error]);

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
  ]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAppContext = () => useContext(Context);

export default ContextProvider;
