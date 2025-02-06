export default function Register() {
  function createUser(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("password_confirmation");
    console.log(email, password, confirmPassword);
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