import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { ArtistRegister } from "../../components/artist/ArtistRegister";
import { ArtistVerifyPhone } from "../../components/artist/ArtistVerifyPhone";
import { ArtistVerifyEmail } from "../../components/artist/ArtistVerifyEmail";

type DemoScreen = "register" | "verify-phone" | "verify-email";

/**
 * Page de démonstration du flow d'inscription artiste
 * Permet de naviguer entre tous les écrans pour tester le design
 */
export function ArtistRegistrationDemo() {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>("register");

  const mockData = {
    phone: "+212 612345678",
    email: "artiste@example.com",
  };

  const screens: { value: DemoScreen; label: string }[] = [
    { value: "register", label: "1. Inscription" },
    { value: "verify-phone", label: "2. Vérif Téléphone" },
    { value: "verify-email", label: "3. Vérif Email" },
  ];

  return (
    <div className="min-h-screen bg-[#191414]">
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-[#282828] border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-white">
              🎨 Démo Flow Inscription Artiste (Simplifié)
            </h1>
            <a
              href="/artiste/register"
              className="text-sm text-[#1DB954] hover:underline"
            >
              Tester le flow complet →
            </a>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {screens.map((screen) => (
              <Button
                key={screen.value}
                onClick={() => setCurrentScreen(screen.value)}
                variant={currentScreen === screen.value ? "default" : "outline"}
                size="sm"
                className={
                  currentScreen === screen.value
                    ? "bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold"
                    : "border-gray-700 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
                }
              >
                {screen.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Display */}
      <div className="container mx-auto">
        {currentScreen === "register" && (
          <ArtistRegister
            onRegisterSuccess={() => setCurrentScreen("verify-phone")}
            onNavigateToLogin={() => alert("Navigation vers login")}
          />
        )}

        {currentScreen === "verify-phone" && (
          <ArtistVerifyPhone
            phone={mockData.phone}
            onVerifySuccess={() => setCurrentScreen("verify-email")}
            onBack={() => setCurrentScreen("register")}
          />
        )}

        {currentScreen === "verify-email" && (
          <ArtistVerifyEmail
            email={mockData.email}
            onVerifySuccess={() => alert("✅ Inscription terminée ! Redirection vers /artiste/profil pour compléter votre profil...")}
            onBack={() => setCurrentScreen("verify-phone")}
          />
        )}
      </div>

      {/* Info Footer */}
      <div className="fixed bottom-4 right-4 max-w-sm">
        <Card className="bg-[#282828] border-[#1DB954]/20 p-4 shadow-2xl">
          <p className="text-xs text-gray-400 mb-2">
            <strong className="text-white">Codes de test :</strong>
          </p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• OTP : <code className="text-[#1DB954] font-mono">123456</code></li>
            <li>• Email : Validation aléatoire (50%)</li>
            <li>• Flow simplifié : 3 étapes uniquement</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}