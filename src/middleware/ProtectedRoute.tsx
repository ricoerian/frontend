import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, "", "/dashboard");
    }

    if (!token && !tokenFromUrl) {
      navigate("/");
    }
  }, [navigate, token]);

  return children;
}