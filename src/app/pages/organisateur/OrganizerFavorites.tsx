import { useNavigate } from "react-router";
import { useState } from "react";
import { OrganizerFavoritesPage } from "../../components/organizer/OrganizerFavoritesPage";

export function OrganizerFavorites() {
  const navigate = useNavigate();
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>(["1", "2", "3"]);

  const handleBack = () => {
    navigate("/public");
  };

  const handleRemoveFavorite = (artistId: string) => {
    setFavoriteArtists((prev) => prev.filter((id) => id !== artistId));
  };

  return (
    <OrganizerFavoritesPage
      onBack={handleBack}
      favoriteArtistIds={favoriteArtists}
      onRemoveFavorite={handleRemoveFavorite}
    />
  );
}
