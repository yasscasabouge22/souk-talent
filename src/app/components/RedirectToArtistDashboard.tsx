import { useEffect } from "react";
import { useNavigate } from "react-router";

export function RedirectToArtistDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/artiste/dashboard", { replace: true });
  }, [navigate]);

  return null;
}
