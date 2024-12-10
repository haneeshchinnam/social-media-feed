import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { constants, supabase } from "../utils";
import { Button } from "../components";
import google from '../assests/google.svg';
import VideoList from "./Video";
import VideoUpload from "../components/VideoUpload";

const Login = () => {
  
  const handleGoogleSignIn = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("data", data);
    
    if (error) console.error("Error during Google sign-in:", error.message);
  };

  return (
    <div>
      <VideoUpload />
      <VideoList />
      <Button text={constants.CONTINUE_WITH_GOOGLE} leftIcon={google} onClick={handleGoogleSignIn} />
    </div>
  );
};

export default Login;
