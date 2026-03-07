import { useNavigate, useSearchParams } from "react-router";
import { ArtistList } from "../../components/ArtistList";

export function Artists() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const category = searchParams.get("category") || undefined;
  const region = searchParams.get("region") || undefined;

  const handleSelectArtist = (artistId: string) => {
    navigate(`/public/artist/${artistId}`);
  };

  return (
    <ArtistList 
      onSelectArtist={handleSelectArtist} 
      initialFilters={{ category, region }} 
    />
  );
}
