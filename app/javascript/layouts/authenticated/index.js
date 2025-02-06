import { useEffect } from "react";
import { useNavigate, Outlet } from 'react-router';

export default function AuthenticatedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("apiToken")) {
      navigate("/login");
    }
  }, []);

  return (
    localStorage.getItem("apiToken") ? <Outlet /> : (<div></div>)
  );
}