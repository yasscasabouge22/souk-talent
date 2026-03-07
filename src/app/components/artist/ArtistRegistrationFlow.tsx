import { useState } from "react";
import { ArtistRegister } from "./ArtistRegister";
import { ArtistVerifyPhone } from "./ArtistVerifyPhone";
import { ArtistVerifyEmail } from "./ArtistVerifyEmail";

type FlowStep = "register" | "verify-phone" | "verify-email" | "complete";

interface RegistrationData {
  phone: string;
  email: string;
}

interface ArtistRegistrationFlowProps {
  onComplete?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToHome?: () => void;
}

export function ArtistRegistrationFlow({ 
  onComplete, 
  onNavigateToLogin,
  onNavigateToHome
}: ArtistRegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("register");
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    phone: "",
    email: "",
  });

  const handleRegisterSuccess = (data: RegistrationData) => {
    setRegistrationData(data);
    setCurrentStep("verify-phone");
  };

  const handlePhoneVerified = () => {
    setCurrentStep("verify-email");
  };

  const handleEmailVerified = () => {
    setCurrentStep("complete");
    // Inscription terminée, rediriger vers le dashboard artiste
    onComplete?.();
  };

  const handleBackFromVerifyPhone = () => {
    setCurrentStep("register");
  };

  const handleBackFromVerifyEmail = () => {
    setCurrentStep("verify-phone");
  };

  const handleNavigateToLogin = () => {
    onNavigateToLogin?.();
  };

  const handleNavigateToHome = () => {
    onNavigateToHome?.();
  };

  // Render current step
  switch (currentStep) {
    case "register":
      return (
        <ArtistRegister
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToHome={handleNavigateToHome}
        />
      );

    case "verify-phone":
      return (
        <ArtistVerifyPhone
          phone={registrationData.phone}
          onVerifySuccess={handlePhoneVerified}
          onBack={handleBackFromVerifyPhone}
        />
      );

    case "verify-email":
      return (
        <ArtistVerifyEmail
          email={registrationData.email}
          onVerifySuccess={handleEmailVerified}
          onBack={handleBackFromVerifyEmail}
        />
      );

    case "complete":
      // This state is handled by parent component (redirect to dashboard)
      return null;

    default:
      return null;
  }
}