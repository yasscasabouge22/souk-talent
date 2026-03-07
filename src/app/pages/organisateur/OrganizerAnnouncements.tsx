import { useNavigate } from "react-router";
import { OrganizerAnnouncementsPage } from "../../components/organizer/OrganizerAnnouncementsPage";

export function OrganizerAnnouncements() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/public");
  };

  return (
    <OrganizerAnnouncementsPage
      onBack={handleBack}
    />
  );
}
