import { useNavigate } from "react-router";
import { ArtistDashboard } from "../../components/artist/ArtistDashboard";

export function Dashboard() {
  const navigate = useNavigate();

  // TODO: Récupérer le nom de l'artiste depuis le contexte d'authentification
  const artistName = "Artiste Démo";

  const handleNavigate = (section: string) => {
    // Mapper les sections vers les routes
    const sectionMap: Record<string, string> = {
      dashboard: "/artiste/dashboard",
      profile: "/artiste/profil",
      requests: "/artiste/demandes",
      announcements: "/artiste/annonces",
      calendar: "/artiste/calendrier",
      reviews: "/artiste/commentaires",
      settings: "/artiste/parametres",
    };
    
    const route = sectionMap[section];
    if (route) {
      navigate(route);
    }
  };

  const handleViewRequest = (requestId: string) => {
    // Naviguer vers les demandes avec l'ID en query param
    navigate(`/artiste/demandes?id=${requestId}`);
  };

  return (
    <ArtistDashboard 
      artistName={artistName}
      onNavigate={handleNavigate}
      onViewRequest={handleViewRequest}
    />
  );
}