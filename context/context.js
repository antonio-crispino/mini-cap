import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabaseClient";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...user,
        });

        setIsLoading(false);
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);


  useEffect(() => {
    if (user) {
      const subscription = supabase
        .from(`users:id=eq.${user.id}`)
        .on("UPDATE", (payload) => {
          setUser({ ...user, ...payload.new });
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(subscription);
      };
    }
  }, [user]);


  const login = async (email, password) => {
    const { sessionUser: user, error } = await supabase.auth.signIn({
      email,
      password
    });

    if (error) {
      setError(error)
      return error
    }

    if (user) {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("id", sessionUser.id)
        .single();

      setUser({
        ...sessionUser,
        ...user,
      });

      setIsLoading(false);
    }

  };

  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
    return error
  };

  const exposed = {
    user,
    isLoading,
    error,
    login,
    logout,
    setError,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useAppContext = () => useContext(Context);

export default ContextProvider;