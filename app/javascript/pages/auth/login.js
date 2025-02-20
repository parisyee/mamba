import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getTokenInfo } from "@/utils/api-clients/auth";
import { createAccessToken } from "../../utils/api-clients/auth";
import { LoginForm } from "@/components/login-form"

export default function Login() {
  const navigate = useNavigate();
  const baseUrl = process.env.API_URL;

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
    }

    verifyAccessToken()
  }, []);

  async function submitLoginForm(formData) {
    debugger
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={submitLoginForm} />
      </div>
    </div>
  )
};