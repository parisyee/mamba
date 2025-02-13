import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getTokenInfo } from "@/utils/api-clients/auth";
import { createAccessToken } from "../../utils/api-clients/auth";

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
    <div>
      <h1>Login</h1>
      <form action={submitLoginForm}>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>

      <Link to="/forgot-password">Forgot Password</Link>

      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </div>
  );
};