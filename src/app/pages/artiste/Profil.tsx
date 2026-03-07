import { useNavigate } from "react-router";
import { ArtistProfileEditor } from "../../components/artist/ArtistProfileEditor";

export function Profil() {
  const navigate = useNavigate();

  const handleViewPublicProfile = () => {
    // TODO: Utiliser l'ID réel de l'artiste depuis le contexte
    navigate("/public/artist/1");
  };

  return <ArtistProfileEditor onViewPublicProfile={handleViewPublicProfile} />;
}