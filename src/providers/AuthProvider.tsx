import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils";

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  // console.log("s url", process.env.REACT_APP_SUPABASE_URL);
  

  useEffect(() => {
    // Check session on component mount
    // const checkSession = async () => {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();

    //   if (session) {
    //     navigate("/success"); // User is logged in
    //   } else {
    //     navigate("/"); // User is logged out
    //   }
    // };

    // checkSession();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session !== null) {
          navigate("/success");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return <div>{children}</div>;
};

export default AuthProvider;
