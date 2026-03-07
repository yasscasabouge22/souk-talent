import { ArtistSettings } from "../../components/artist/ArtistSettings";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Parametres() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est un agent
    const agentStatus = localStorage.getItem("isAgent");
    if (agentStatus && JSON.parse(agentStatus) === true) {
      // Rediriger vers le dashboard si c'est un agent
      navigate("/artiste/dashboard", { replace: true });
    }
  }, [navigate]);

  return <ArtistSettings />;
}