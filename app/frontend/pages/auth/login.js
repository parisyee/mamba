import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getTokenInfo, createAccessToken } from "@/lib/api-clients/auth";
import { LoginForm } from "@/components/login-form"

export default function Login() {
  const navigate = useNavigate();
  const [tokenVerificationComplete, setTokenVerificationComplete] = useState(false);

  useEffect(() => {
    async function verifyAccessToken() {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await getTokenInfo(token);

        if (response.ok) {
          // should actually tell them they're already logged in and give them
          // a way to log out
          navigate("/");
        }
      }

      setTokenVerificationComplete(true);
    }

    verifyAccessToken()
  }, []);

  async function submitLoginForm(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await createAccessToken(email, password);

    if (response.ok) {
      const { access_token } = await response.json();
      localStorage.setItem("accessToken", access_token);
      // We also want to make a request to /me to get the user's information and
      // make sure they're confirmed. If they're not confirmed, we should log
      // them out and tell them to confirm their email.
      navigate("/");
    } else {
      alert(response.statusText);
    }
  }

  return (
    // This is a little wonky because if the token is invalid there is a split
    // second wehre tokenVerificationComplete is true but we haven't navigated
    // yet. We should probably track another variable for the validity of the
    // token and only show the login form if the token is missing/invalid.
    !tokenVerificationComplete ? (<div></div>) : (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm onSubmit={submitLoginForm} />
        </div>
      </div>
    )
  );
};