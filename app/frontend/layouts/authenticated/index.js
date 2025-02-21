import { useEffect, useState } from "react";
import { useNavigate, Outlet } from 'react-router';
import { getTokenInfo } from "@/lib/api-clients/auth";

export default function AuthenticatedLayout() {
  const navigate = useNavigate();
  const [tokenVerificationComplete, setTokenVerificationComplete] = useState(false);

  useEffect(() => {
    async function verifyAccessToken() {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await getTokenInfo(token);

        if (!response.ok) {
          navigate("/login");
        }
      }

      setTokenVerificationComplete(true);
    }

    verifyAccessToken()
  }, []);

  return (
    // This might be a little wonky because if the token is invalid there could
    // be a split second wehre tokenVerificationComplete is true but we haven't
    // navigated yet. We should probably track another variable for the validity
    // of the  token and only show the login form if the token is missing/invalid.
    tokenVerificationComplete ? <Outlet /> : (
      <div></div>
    )
  );
}