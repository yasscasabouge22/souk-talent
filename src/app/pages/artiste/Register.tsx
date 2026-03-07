import { ArtistRegistrationFlow } from "../../components/artist/ArtistRegistrationFlow";
import { useNavigate } from "react-router";

export function ArtistRegisterPage() {
  const navigate = useNavigate();

  const handleRegistrationComplete = () => {
    // Redirection vers le profil artiste pour compléter les informations
    // (photo, médias, bio, etc.)
    navigate("/artiste/profil");
  };

  const handleNavigateToLogin = () => {
    // Redirection vers la page de connexion artiste
    navigate("/artiste/login");
  };

  const handleNavigateToHome = () => {
    // Redirection vers la page d'accueil publique
    navigate("/public");
  };

  return (
    <ArtistRegistrationFlow
      onComplete={handleRegistrationComplete}
      onNavigateToLogin={handleNavigateToLogin}
      onNavigateToHome={handleNavigateToHome}
    />
  );
}