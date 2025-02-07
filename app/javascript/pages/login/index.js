import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function Login() {
  const { token } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (token) {
      const response = fetch(
        `${process.env.API_URL}/email_confirmations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      )

      if (response.ok) {
        setConfirmed(true);
      }
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};