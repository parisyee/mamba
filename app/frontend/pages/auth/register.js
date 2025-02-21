import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();

  async function createUser(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password_confirmation");

    const baseUrl = process.env.API_URL;

    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      alert(response.statusText);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form action={createUser}>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="password_confirmation" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};