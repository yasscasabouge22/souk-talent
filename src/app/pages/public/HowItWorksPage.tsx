import { useNavigate } from "react-router";
import { HowItWorks } from "../../components/HowItWorks";

export function HowItWorksPage() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(`/public/${page}`);
  };

  return <HowItWorks onNavigate={handleNavigate} />;
}
