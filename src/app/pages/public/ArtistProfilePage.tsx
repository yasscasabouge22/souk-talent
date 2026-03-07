import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { ArtistProfile } from "../../components/ArtistProfile";
import { AuthModal } from "../../components/AuthModal";

interface OrganizerInfo {
  email: string;
  name: string;
}

export function ArtistProfilePage() {
  const navigate = useNavigate();
  const { artistId } = useParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [organizer, setOrganizer] = useState<OrganizerInfo | null>(null);
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>(["1", "2", "3"]);

  const handleBack = () => {
    navigate("/public/artists");
  };

  const handleLogin = (organizerInfo: OrganizerInfo) => {
    setOrganizer(organizerInfo);
    setShowAuthModal(false);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteArtists((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  if (!artistId) {
    navigate("/public/artists");
    return null;
  }

  return (
    <>
      <ArtistProfile 
        artistId={artistId}
        onBack={handleBack}
        organizer={organizer}
        onLoginRequest={() => setShowAuthModal(true)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={favoriteArtists.includes(artistId)}
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
