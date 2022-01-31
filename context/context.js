import { createContext, useState, useEffect, useContext } from "react";
import { supaCurrentUser, supaSignIn, supaGetUserData, supaSignOut } from "../utils/supabase";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(supaCurrentUser());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true)
      const sessionUser = supaCurrentUser()

      if (sessionUser) {
        const { data: user } = await supaGetUserData(sessionUser.id)

        setUser({
          ...sessionUser,
          ...user,
        });

      }
      setIsLoading(false);
    };

    getUserProfile();

  }, []);


  const login = async (email, password) => {
    setIsLoading(true);
    const authData = await supaSignIn(email, password)
    const { error } = authData
    if (error) {
      setError(error)
      setIsLoading(false);
      return error
    }
    const sessionUser = authData.user

    if (sessionUser) {
      const userData = await supaGetUserData(sessionUser.id)
      setUser({
        ...sessionUser,
        ...userData.data,
      });

    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true)
    const { error } = await supaSignOut()
    if (!error) {
      setUser(null);
    }
    setIsLoading(false);
    return error
  };

  const refreshData = async () => {

    if (user) {
      setIsLoading(true)
      const userData = await supaGetUserData(user.id)
      setState(prevState => {
        return { ...prevState, ...userData };
      });
      setIsLoading(false)
    }
  }

  const exposed = {
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