import { OrganizerMessages } from "./OrganizerMessages";

interface OrganizerDashboardPageProps {
  onBack: () => void;
}

export function OrganizerDashboardPage({ onBack }: OrganizerDashboardPageProps) {
  return <OrganizerMessages />;
}
