import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function ConfirmEmail() {
  const { token } = useParams();
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationRequested, setConfirmationRequested] = useState(false);

  useEffect(async () => {
    if (token) {
      const response = await fetch(
        `${process.env.API_URL}/email_confirmations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      )

      setConfirmationRequested(true);

      if (response.ok) {
        setConfirmed(true);
      }
    }
  }, []);

  function sendEmailConfirmation(formData) {
  }

  return (
    <div>
      <h1>Confirm Email</h1>
      {confirmationRequested && confirmed && (
        <>
          <p>Your email has been confirmed.</p>
          <p>
            Click <Link to="/login">here</Link> to log in.
          </p>
        </>
      )}
      {confirmationRequested && !confirmed && (
        <>
          <p>
            There was a problem confirming your email.
            Please request another email confirmation.
          </p>
          <p>
            <form action={sendEmailConfirmation}>
              <input type="email" name="email" placeholder="Email" />
              <button type="submit">Resend Confirmation Email</button>
            </form>
          </p>
        </>
      )}
    </div>
  );
};