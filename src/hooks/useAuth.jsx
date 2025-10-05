import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
      setLoading(false);
    };

    getSession();

    
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
