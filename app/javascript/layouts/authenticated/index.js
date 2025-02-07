import { useEffect } from "react";
import { useNavigate, Outlet } from 'react-router';

export default function AuthenticatedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  return (
    localStorage.getItem("accessToken") ? <Outlet /> : (<div></div>)
  );
}