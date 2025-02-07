import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  async function getAccessToken(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const baseUrl = process.env.API_URL;

    const response = await fetch(`${baseUrl}/oauth/tokens`, {
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
      const { token } = await response.json();
      localStorage.setItem("token", token);
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