import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, Circle, Image, FileText, Camera, ArrowRight, Loader2 } from "lucide-react";


interface ArtistOnboardingProps {
  onComplete: () => void;
}

export function ArtistOnboarding({ onComplete }: ArtistOnboardingProps) {
  const [checklist, setChecklist] = useState({
    phoneVerified: true,
    emailVerified: true,
    profilePhoto: false,
    medias: false,
    bio: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const checklistItems = [
    {
      id: "phoneVerified",
      label: "Téléphone vérifié",
      icon: CheckCircle,
      completed: checklist.phoneVerified,
      locked: false,
    },
    {
      id: "emailVerified",
      label: "Email vérifié",
      icon: CheckCircle,
      completed: checklist.emailVerified,
      locked: false,
    },
    {
      id: "profilePhoto",
      label: "Ajouter photo de profil",
      icon: Camera,
      completed: checklist.profilePhoto,
      locked: false,
    },
    {
      id: "medias",
      label: "Ajouter 2 médias minimum",
      icon: Image,
      completed: checklist.medias,
      locked: false,
    },
    {
      id: "bio",
      label: "Ajouter une bio",
      icon: FileText,
      completed: checklist.bio,
      locked: false,
    },
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const progressPercentage = (completedCount / totalCount) * 100;
  const isComplete = completedCount === totalCount;

  const handleCompleteProfile = () => {
    setIsLoading(true);
    // Simulation - rediriger vers la page de profil
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1000);
  };

  const handleChecklistItemClick = (itemId: string) => {
    // Pour la démo, toggle l'item (sauf phone et email qui sont déjà vérifiés)
    if (itemId !== "phoneVerified" && itemId !== "emailVerified") {
      setChecklist({
        ...checklist,
        [itemId]: !checklist[itemId as keyof typeof checklist],
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logo} alt="Souk Talent" className="h-16 w-16 object-contain" />
            <h1 className="font-bold text-[#1DB954] text-2xl">Souk Talent</h1>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl text-white">
                  Votre compte est presque prêt
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Complétez les étapes ci-dessous pour activer votre profil artiste
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className={`${
                  isComplete
                    ? "bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30"
                    : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                } whitespace-nowrap`}
              >
                {isComplete ? "Prêt à soumettre" : "En cours de finalisation"}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progression</span>
                <span className="text-white font-medium">
                  {completedCount}/{totalCount} complété
                </span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ED760] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Checklist */}
            <div className="space-y-2">
              {checklistItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleChecklistItemClick(item.id)}
                    disabled={item.locked || item.completed}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all group ${
                      item.completed
                        ? "bg-[#1DB954]/10 border-[#1DB954]/30 cursor-default"
                        : item.locked
                        ? "bg-[#1a1a1a]/50 border-gray-800 cursor-not-allowed opacity-50"
                        : "bg-[#1a1a1a] border-gray-700 hover:border-[#1DB954]/50 hover:bg-[#1a1a1a]/80 cursor-pointer"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        item.completed
                          ? "bg-[#1DB954]/20 text-[#1DB954]"
                          : "bg-gray-700/50 text-gray-400 group-hover:bg-[#1DB954]/10 group-hover:text-[#1DB954]"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>

                    <div className="flex-1 flex items-center gap-3 text-left">
                      <Icon
                        className={`h-5 w-5 ${
                          item.completed ? "text-[#1DB954]" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          item.completed ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {item.completed && (
                      <Badge className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30">
                        Complété
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="pt-4">
              {isComplete ? (
                <Button
                  onClick={handleCompleteProfile}
                  disabled={isLoading}
                  className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Soumettre mon profil
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteProfile}
                  disabled={isLoading}
                  className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      Compléter mon profil
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Info Box */}
            {!isComplete && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-400 leading-relaxed">
                  <strong className="text-blue-300">Important :</strong> Vous devez compléter toutes
                  les étapes avant de pouvoir soumettre votre profil pour validation.
                </p>
              </div>
            )}

            {isComplete && (
              <div className="bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-xl p-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-[#1DB954] leading-relaxed">
                  <strong className="text-white">Félicitations !</strong> Votre profil est complet.
                  Cliquez sur "Compléter mon profil" pour accéder à l'édition complète avant soumission.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-400">
            Besoin d'aide pour compléter votre profil ?
          </p>
          <button className="text-sm text-[#1DB954] hover:underline font-medium">
            Voir le guide de démarrage
          </button>
        </div>
      </div>
    </div>
  );
}