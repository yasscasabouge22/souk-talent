import { useEffect } from "react";
import { useNavigate } from "react-router";

export function RedirectToPublic() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/public", { replace: true });
  }, [navigate]);

  return null;
}
