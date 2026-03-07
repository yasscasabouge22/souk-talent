import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Mail, CheckCircle, Loader2, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";


interface ArtistVerifyEmailProps {
  email: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export function ArtistVerifyEmail({ email, onVerifySuccess, onBack }: ArtistVerifyEmailProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendCount, setResendCount] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    const maskedName = name.charAt(0) + "*".repeat(Math.max(name.length - 2, 1)) + name.charAt(name.length - 1);
    return `${maskedName}@${domain}`;
  };

  const handleCheckVerification = () => {
    setIsChecking(true);

    // Simulation API - vérifier si l'email a été confirmé
    setTimeout(() => {
      setIsChecking(false);
      // Pour la démo, vérifier après 3 secondes
      const isConfirmed = Math.random() > 0.5; // 50% de chance
      
      if (isConfirmed) {
        setIsVerified(true);
        toast.success("Email vérifié avec succès ! Redirection vers votre profil...");
        setTimeout(() => {
          onVerifySuccess();
        }, 1500);
      } else {
        toast.error("Email non encore vérifié. Veuillez vérifier votre boîte mail.");
      }
    }, 2000);
  };

  const handleResendEmail = () => {
    if (!canResend) return;

    toast.success("Email de confirmation renvoyé");
    setCountdown(60);
    setCanResend(false);
    setResendCount(resendCount + 1);
  };

  return (
    <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logo} alt="Souk Talent" className="h-16 w-16 object-contain" />
            <h1 className="font-bold text-[#1DB954] text-2xl">Souk Talent</h1>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl shadow-2xl">
          <CardHeader className="space-y-3 text-center relative">
            <button
              onClick={onBack}
              className="absolute left-6 top-6 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex justify-center">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                isVerified 
                  ? "bg-[#1DB954]/20 animate-in zoom-in-50 duration-300" 
                  : "bg-blue-500/20"
              }`}>
                {isVerified ? (
                  <CheckCircle className="h-8 w-8 text-[#1DB954]" />
                ) : (
                  <Mail className="h-8 w-8 text-blue-400" />
                )}
              </div>
            </div>

            <CardTitle className="text-2xl text-white">
              {isVerified ? "Email confirmé !" : "Confirmez votre email"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {isVerified ? (
                "Votre adresse email a été vérifiée avec succès"
              ) : (
                <>
                  Nous avons envoyé un lien de confirmation à{" "}
                  <span className="text-white font-medium block mt-2">{maskEmail(email)}</span>
                </>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {!isVerified && (
              <>
                {/* Instructions */}
                <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 space-y-2">
                  <p className="text-sm text-gray-300 font-medium">Instructions :</p>
                  <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Ouvrez votre boîte mail</li>
                    <li>Cherchez l'email de Souk Talent</li>
                    <li>Cliquez sur le lien de confirmation</li>
                    <li>Revenez ici et cliquez sur "J'ai confirmé"</li>
                  </ol>
                </div>

                {/* Check Button */}
                <Button
                  onClick={handleCheckVerification}
                  disabled={isChecking}
                  className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Vérification en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      J'ai confirmé mon email
                    </>
                  )}
                </Button>

                {/* Resend Email */}
                <div className="text-center space-y-3 pt-2">
                  <p className="text-sm text-gray-400">Vous n'avez pas reçu l'email ?</p>
                  
                  {canResend ? (
                    <Button
                      variant="outline"
                      onClick={handleResendEmail}
                      className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renvoyer l'email
                    </Button>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Renvoyer l'email dans{" "}
                      <span className="text-white font-medium tabular-nums">
                        {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                      </span>
                    </p>
                  )}

                  {resendCount > 0 && (
                    <p className="text-xs text-gray-500">
                      Email renvoyé {resendCount} fois
                    </p>
                  )}
                </div>

                {/* Help Text */}
                <div className="bg-gray-700/30 border border-gray-700 rounded-lg p-3 mt-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-gray-300">Astuce :</strong> Vérifiez également vos spams ou
                    courriers indésirables. L'email peut prendre jusqu'à 5 minutes pour arriver.
                  </p>
                </div>
              </>
            )}

            {isVerified && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-xl p-4 text-center space-y-2">
                  <p className="text-[#1DB954] font-medium">
                    ✓ Votre compte est maintenant vérifié
                  </p>
                  <p className="text-sm text-gray-400">
                    Complétez votre profil avec vos photos, médias et bio
                  </p>
                </div>
                
                <Button
                  onClick={onVerifySuccess}
                  className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
                >
                  Accéder à mon profil →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Help */}
        {!isVerified && (
          <div className="text-center mt-6 space-y-2">
            <p className="text-xs text-gray-500">
              Problème avec votre email ?{" "}
              <button className="text-[#1DB954] hover:underline">
                Contactez le support
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}