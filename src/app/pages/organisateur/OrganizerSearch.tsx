import { useNavigate } from "react-router";
import { OrganizerAdvancedSearchPage } from "../../components/organizer/OrganizerAdvancedSearchPage";

export function OrganizerSearch() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/public");
  };

  const handleSearch = (filters: any) => {
    console.log("Search with filters:", filters);
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.region) params.set("region", filters.region);
    navigate(`/public/artists?${params.toString()}`);
  };

  return (
    <OrganizerAdvancedSearchPage
      onBack={handleBack}
      onSearch={handleSearch}
    />
  );
}
