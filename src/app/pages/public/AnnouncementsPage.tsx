import { useNavigate } from "react-router";
import { PublicAnnouncements } from "../../components/PublicAnnouncements";

export function AnnouncementsPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/public");
  };

  return <PublicAnnouncements onBack={handleBack} />;
}
