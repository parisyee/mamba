import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const baseUrl = process.env.API_URL;

  useEffect(() => {
    async function checkAccessToken() {
      if (localStorage.getItem("accessToken")) {
        const response = await fetch(`${baseUrl}/oauth/token/info`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        if (response.ok) {
          // should actually tell them they're already logged in and give them a way to log out
          navigate("/");
        }
      }
    }

    checkAccessToken();
  }, []);

  async function getAccessToken(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${baseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
        grant_type: "password",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }),
    });

    if (response.ok) {
      const { access_token } = await response.json();
      localStorage.setItem("accessToken", access_token);
      // We also want to make a request to /me to get the user's information and make sure they're confirmed. If they're not confirmed, we should log them out and tell them to confirm their email.
      navigate("/");
    } else {
      alert(response.statusText);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form action={getAccessToken}>
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