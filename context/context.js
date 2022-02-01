import { createContext, useState, useEffect, useContext } from "react";
import { MockSupaClient } from "../mocks/supabase";
import { SupaClient } from "../utils/supabase";

export const Context = createContext();


const ContextProvider = ({ contextData, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()
  const [client, setClient] = useState(()=>process.env.NODE_ENV=='test'? new MockSupaClient(): new SupaClient())
  const [user, setUser] = useState(client.supaCurrentUser());


  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true)
      const sessionUser = client.supaCurrentUser()

      if (sessionUser) {
        const { data: user } = await client.supaGetUserData(sessionUser.id)

        setUser({
          ...sessionUser,
          ...user,
        });

      }
      setIsLoading(false);
    };

    getUserProfile();

  }, [client]);


  const login = async (email, password) => {
    setIsLoading(true);
    const authData = await client.supaSignIn(email, password)
    const { error } = authData
    if (error) {
      setError(error)
      setIsLoading(false);
      return error
    }
    const sessionUser = authData.user

    if (sessionUser) {
      const userData = await client.supaGetUserData(sessionUser.id)
      setUser({
        ...sessionUser,
        ...userData.data,
      });

    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true)
    const { error } = await client.supaSignOut()
    if (!error) {
      setUser(null);
    }
    setIsLoading(false);
    return error
  };

  const refreshData = async () => {

    if (user) {
      setIsLoading(true)
      const userData = await client.supaGetUserData(user.id)
      setState(prevState => {
        return { ...prevState, ...userData };
      });
      setIsLoading(false)
    }
  }

  const exposed = contextData ? contextData : {
    user,
    isLoading,
    error,
    login,
    logout,
    setError,
    setIsLoading,
    refreshData
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useAppContext = () => useContext(Context);

export default ContextProvider;