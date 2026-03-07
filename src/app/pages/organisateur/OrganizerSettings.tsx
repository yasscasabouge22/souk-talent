import { useNavigate } from "react-router";
import { OrganizerSettingsPage } from "../../components/organizer/OrganizerSettingsPage";

export function OrganizerSettings() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/public");
  };

  return (
    <OrganizerSettingsPage
      onBack={handleBack}
    />
  );
}
