import { useNavigate } from "react-router";
import { HomePage } from "../../components/HomePage";

export function Home() {
  const navigate = useNavigate();

  const handleNavigate = (page: string, filters?: { category?: string; region?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.set("category", filters.category);
    if (filters?.region) params.set("region", filters.region);
    
    const queryString = params.toString();
    
    if (page === "artists") {
      navigate(queryString ? `/public/artists?${queryString}` : "/public/artists");
    } else {
      navigate(`/public/${page}`);
    }
  };

  return <HomePage onNavigate={handleNavigate} />;
}