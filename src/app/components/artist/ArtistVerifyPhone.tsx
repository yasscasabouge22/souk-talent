import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Smartphone, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";


interface ArtistVerifyPhoneProps {
  phone: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export function ArtistVerifyPhone({ phone, onVerifySuccess, onBack }: ArtistVerifyPhoneProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "expired">("idle");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when complete
    if (index === 5 && value) {
      const code = [...newOtp.slice(0, 5), value].join("");
      handleVerify(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    // Auto verify if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code: string) => {
    if (isBlocked) {
      toast.error("Trop de tentatives. Veuillez réessayer plus tard.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");

    // Simulation API
    setTimeout(() => {
      setIsLoading(false);

      // Simuler succès avec code 123456
      if (code === "123456") {
        setStatus("success");
        toast.success("Téléphone vérifié avec succès !");
        setTimeout(() => {
          onVerifySuccess();
        }, 1500);
      } else {
        setStatus("error");
        setAttempts(attempts + 1);
        
        if (attempts + 1 >= 3) {
          setIsBlocked(true);
          toast.error("Trop de tentatives incorrectes. Compte bloqué temporairement.");
        } else {
          toast.error("Code incorrect. Veuillez réessayer.");
        }
        
        // Reset OTP
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;

    toast.success("Un nouveau code a été envoyé");
    setCountdown(45);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setAttempts(0);
    setIsBlocked(false);
    setStatus("idle");
    inputRefs.current[0]?.focus();
  };

  const maskPhone = (phone: string) => {
    const cleaned = phone.replace(/\s/g, "");
    if (cleaned.startsWith("+212")) {
      return `+212 ${cleaned[4]}XX XXX ${cleaned.slice(-3)}`;
    }
    return phone;
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
              <div className="h-16 w-16 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-[#1DB954]" />
              </div>
            </div>

            <CardTitle className="text-2xl text-white">Vérifiez votre numéro</CardTitle>
            <CardDescription className="text-gray-400">
              Un code à 6 chiffres a été envoyé au{" "}
              <span className="text-white font-medium">{maskPhone(phone)}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isLoading || isBlocked}
                  className={`w-12 h-14 text-center text-xl font-semibold bg-[#1a1a1a] border-2 text-white transition-all ${
                    status === "success"
                      ? "border-[#1DB954] bg-[#1DB954]/10"
                      : status === "error"
                      ? "border-red-500 bg-red-500/10 animate-shake"
                      : digit
                      ? "border-[#1DB954]/50"
                      : "border-gray-700"
                  } focus:border-[#1DB954] focus:ring-[#1DB954]/20`}
                />
              ))}
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center justify-center gap-2 text-[#1DB954] animate-in fade-in slide-in-from-top-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Code validé avec succès !</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center justify-center gap-2 text-red-400 animate-in fade-in slide-in-from-top-2">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Code incorrect ({3 - attempts} tentatives restantes)</span>
              </div>
            )}

            {isBlocked && (
              <div className="flex items-center justify-center gap-2 text-orange-400 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Trop de tentatives. Compte temporairement bloqué.</span>
              </div>
            )}

            {/* Verify Button */}
            <Button
              onClick={() => handleVerify(otp.join(""))}
              disabled={otp.some((d) => !d) || isLoading || isBlocked}
              className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Vérification...
                </>
              ) : (
                "Valider le code"
              )}
            </Button>

            {/* Resend Code */}
            <div className="text-center space-y-2">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-sm text-[#1DB954] hover:underline font-medium"
                >
                  Renvoyer le code
                </button>
              ) : (
                <p className="text-sm text-gray-400">
                  Renvoyer le code dans{" "}
                  <span className="text-white font-medium tabular-nums">
                    00:{countdown.toString().padStart(2, "0")}
                  </span>
                </p>
              )}

              <button
                onClick={onBack}
                className="text-sm text-gray-400 hover:text-white transition-colors block mx-auto"
              >
                Modifier le numéro
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Code de test : <span className="text-[#1DB954] font-mono">123456</span>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
