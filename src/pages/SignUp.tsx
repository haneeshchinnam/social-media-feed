import React, { useState } from "react";
import { constants, supabase } from "../utils";
import { Button, ReusableInput } from "../components";
import google from "../assests/google.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../providers/ReduxProvider";
import { setUser } from "../state/globalSlice";

const validateGmail = (value: string): string => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!value) return "Gmail is required.";
  if (!gmailRegex.test(value)) return "Please enter a valid Gmail address.";
  return "";
};

const validatePassword = (value: string): string => {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(value))
    return "Password must include at least one uppercase letter.";
  if (!/[a-z]/.test(value))
    return "Password must include at least one lowercase letter.";
  if (!/[0-9]/.test(value)) return "Password must include at least one number.";
  if (!/[!@#$%^&*]/.test(value))
    return "Password must include at least one special character.";
  return "";
};

const SignUp = () => {
  const [gmail, setGmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleGoogleSignIn = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("data", data);

    if (error) console.error("Error during Google sign-in:", error.message);
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value) return "Please confirm your password.";
    if (value !== password) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: gmail,
      password: password,
      options: {
        emailRedirectTo: "/edit-profile",
        data: {
          confirmation_sent_at: Date.now(),
      },
      },
      
    });
    if(data) {
      console.log("data", data);
      dispatch(setUser({ id: data.user?.id ?? '' }))
      navigate("/edit-profile")
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ReusableInput
          type="email"
          label="Gmail"
          name="gmail"
          placeholder="Enter your Gmail"
          validate={(value) => {
            setGmail(value);
            return validateGmail(value);
          }}
          val={gmail}
        />
        <ReusableInput
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          validate={(value) => {
            setPassword(value);
            return validatePassword(value);
          }}
          val={password}
        />
        <ReusableInput
          type="password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="Enter your password"
          validate={(value) => {
            setConfirmPassword(value);
            return validateConfirmPassword(value);
          }}
          val={confirmPassword}
        />
        <button
          type="submit"
          className="w-full bg-charcoalBlack text-white p-2 rounded mt-4 transition"
        >
          Submit
        </button>
      </form>
      <p className="flex justify-center py-4">OR</p>
      <section className="flex justify-center mt-4">
        <Button
          text={constants.CONTINUE_WITH_GOOGLE}
          leftIcon={google}
          buttonStyle="text-center"
          onClick={handleGoogleSignIn}
        />
      </section>
    </div>
  );
};

export default SignUp;
