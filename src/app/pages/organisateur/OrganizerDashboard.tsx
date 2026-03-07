import { useNavigate } from "react-router";
import { OrganizerDashboardPage } from "../../components/organizer/OrganizerDashboardPage";

export function OrganizerDashboard() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/public");
  };

  return (
    <OrganizerDashboardPage
      onBack={handleBack}
    />
  );
}
