import { useNavigate, Link } from "react-router";
import { revokeAccessToken } from "@/lib/api-clients/auth";

export default function TopNavbar({ authenticated }) {
  return (
    <div className="grid grid-rows-1 grid-flow-col border-b border-gray-200 mb-4 md:mb-8">
      <div className="justify-self-start text-center px-4 py-4 sm:px-8 md:px-16">
        MAMBA
      </div>
      <div className="justify-self-end">
        {authenticated ? LogoutButton() : LoginLink()}
      </div>
    </div>
  );
}

const LoginLink = () => (
  <Link to="/login">
    <div className="w-full text-center px-4 py-4 sm:px-8 md:px-16">
      Login
    </div>
  </Link>
);

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await revokeAccessToken();
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <button
      className="w-full text-center px-4 py-4 sm:px-8 md:px-16 cursor-pointer"
      onClick={handleClick}
    >
      Logout
    </button>
  );
}
