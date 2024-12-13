import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils";
import { useAppDispatch } from "./ReduxProvider";
import { setUser } from "../state/globalSlice";

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch= useAppDispatch();
  

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event) => {
      try {
        const session = await supabase.auth.getSession()
        dispatch(setUser({id: session.data.session?.user.id ?? ''}))
      } catch (error) {
        console.error("Auth state change error:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return <div>{children}</div>;
};

export default AuthProvider;
