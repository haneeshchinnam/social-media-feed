import { constants, supabase } from "../utils";
import { Button, ReusableInput } from "../components";
import google from "../assests/google.svg";
import { useState } from "react";
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

const Login = () => {
  const [gmail, setGmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/posts`,
        },
      });
      if (error) {
        console.error("Error during Google sign-in:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: gmail,
      password: password,
    });
    if (!error) {
      dispatch(setUser({ id: data.user?.id ?? "" }));
      navigate("/posts");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
        <button
          type="submit"
          className="w-full bg-charcoalBlack text-white p-2 rounded mt-4 transition"
        >
          Submit
        </button>
        <p className="cursor-pointer" onClick={() => navigate("/signup")}>
          new user? sign up
        </p>
      </form>
      <p className="flex justify-center pt-4">OR</p>
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

export default Login;
