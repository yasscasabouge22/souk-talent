import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, Send, Loader2, AlertCircle, Clock, Info } from "lucide-react";
import { toast } from "sonner";


interface ArtistProfileSubmitProps {
  onSubmitSuccess: () => void;
  onBack: () => void;
}

export function ArtistProfileSubmit({ onSubmitSuccess, onBack }: ArtistProfileSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const profileChecklist = [
    { label: "Téléphone vérifié", completed: true },
    { label: "Email vérifié", completed: true },
    { label: "Photo de profil", completed: true },
    { label: "Médias ajoutés (2 minimum)", completed: true },
    { label: "Bio complétée", completed: true },
    { label: "Catégorie artistique", completed: true },
    { label: "Tarifs renseignés", completed: true },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulation d'envoi à l'API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Profil soumis avec succès !");
      
      // Redirection après 3 secondes
      setTimeout(() => {
        onSubmitSuccess();
      }, 3000);
    }, 2000);
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
            <div className="flex justify-center">
              <div className={`h-20 w-20 rounded-full flex items-center justify-center transition-all ${
                isSubmitted 
                  ? "bg-[#1DB954]/20 animate-in zoom-in-50 duration-300" 
                  : "bg-blue-500/20"
              }`}>
                {isSubmitted ? (
                  <CheckCircle className="h-10 w-10 text-[#1DB954]" />
                ) : (
                  <Send className="h-10 w-10 text-blue-400" />
                )}
              </div>
            </div>

            <div className="text-center space-y-2">
              <CardTitle className="text-2xl text-white">
                {isSubmitted ? "Profil soumis avec succès !" : "Votre profil est prêt à être analysé"}
              </CardTitle>
              <CardDescription className="text-gray-400 max-w-md mx-auto">
                {isSubmitted 
                  ? "Votre profil a été envoyé à notre équipe. Nous vous contacterons sous 48h."
                  : "Notre équipe vérifiera vos informations avant publication sur la plateforme."
                }
              </CardDescription>
            </div>

            {!isSubmitted && (
              <Badge
                variant="outline"
                className="bg-orange-500/20 text-orange-400 border-orange-500/30 mx-auto"
              >
                <Clock className="h-3 w-3 mr-1" />
                Validation sous 48h
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <>
                {/* Profile Summary */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Récapitulatif de votre profil
                  </h3>
                  <div className="space-y-2">
                    {profileChecklist.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-gray-700 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-[#1DB954] flex-shrink-0" />
                        <span className="text-sm text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm text-blue-300 font-medium">
                        Processus de validation
                      </p>
                      <ul className="text-sm text-blue-400/90 space-y-1 list-disc list-inside">
                        <li>Vérification de vos informations</li>
                        <li>Validation de vos médias (qualité, authenticité)</li>
                        <li>Approbation de votre profil artistique</li>
                        <li>Activation sur la plateforme publique</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-400 leading-relaxed">
                      <strong className="text-orange-300">Important :</strong> Une fois soumis, vous ne
                      pourrez plus modifier votre profil jusqu'à validation. Assurez-vous que toutes vos
                      informations sont correctes.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Soumission en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Soumettre pour validation
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="w-full border-gray-700 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
                  >
                    Retour au profil
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-xl p-6 space-y-3 text-center">
                    <CheckCircle className="h-12 w-12 text-[#1DB954] mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-white mb-1">
                        Profil envoyé avec succès !
                      </p>
                      <p className="text-sm text-gray-400">
                        Nous avons bien reçu votre profil artiste
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 space-y-3">
                    <h4 className="text-sm font-semibold text-white">Prochaines étapes :</h4>
                    <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                      <li>Notre équipe analyse votre profil (24-48h)</li>
                      <li>Vous recevrez un email de confirmation</li>
                      <li>Votre profil sera publié sur la plateforme</li>
                      <li>Vous pourrez commencer à recevoir des demandes</li>
                    </ol>
                  </div>

                  <Button
                    onClick={onSubmitSuccess}
                    className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
                  >
                    Accéder à mon espace artiste
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-400">
            Des questions sur le processus ?
          </p>
          <button className="text-sm text-[#1DB954] hover:underline font-medium">
            Contactez notre équipe
          </button>
        </div>
      </div>
    </div>
  );
}
