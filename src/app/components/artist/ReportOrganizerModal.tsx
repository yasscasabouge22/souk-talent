import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Upload, CheckCircle, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

interface ReportOrganizerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizerName: string;
  organizerId: string;
}

type ReportReason =
  | "breach"
  | "offline-payment"
  | "inappropriate"
  | "fraud"
  | "cancellation"
  | "other";

const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: "breach", label: "Non-respect d'un engagement" },
  { value: "offline-payment", label: "Demande de paiement hors plateforme" },
  { value: "inappropriate", label: "Propos inappropriés" },
  { value: "fraud", label: "Suspicion de fraude" },
  { value: "cancellation", label: "Annulation abusive" },
  { value: "other", label: "Autre" },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export function ReportOrganizerModal({
  open,
  onOpenChange,
  organizerName,
  organizerId,
}: ReportOrganizerModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    reason?: string;
    description?: string;
    file?: string;
  }>({});

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset après fermeture
      setTimeout(() => {
        setStep("form");
        setReason(null);
        setDescription("");
        setUploadedFile(null);
        setErrors({});
      }, 300);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!reason) {
      newErrors.reason = "Veuillez sélectionner un motif";
    }

    if (!description.trim()) {
      newErrors.description = "Veuillez décrire la situation";
    } else if (description.trim().length < 20) {
      newErrors.description = "La description doit contenir au moins 20 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (file: File) => {
    setErrors({ ...errors, file: undefined });

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors({
        ...errors,
        file: "Format non supporté. Utilisez JPG, JPEG ou PNG",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors({
        ...errors,
        file: "Le fichier est trop lourd (max 5MB)",
      });
      return;
    }

    setUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi au backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Envoyer à Supabase
      // const reportData = {
      //   organizer_id: organizerId,
      //   reported_by: currentArtistId,
      //   reason,
      //   description,
      //   screenshot: uploadedFile ? await uploadToSupabase(uploadedFile) : null,
      //   created_at: new Date().toISOString(),
      // };

      console.log("Signalement envoyé:", {
        organizerId,
        organizerName,
        reason,
        description,
        hasScreenshot: !!uploadedFile,
      });

      setStep("success");
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description: "Veuillez réessayer dans quelques instants",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#191414] border border-gray-800 text-white max-w-lg shadow-2xl">
        {step === "form" ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <DialogTitle className="text-2xl font-bold text-white">
                    Signaler un organisateur
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Ce signalement est confidentiel et sera examiné par notre équipe.
                  </DialogDescription>
                </div>
                <Badge
                  variant="outline"
                  className="border-[#1DB954]/30 bg-[#1DB954]/10 text-[#1DB954] px-3 py-1"
                >
                  Confidentiel
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Motif */}
              <div className="space-y-3">
                <Label className="text-white font-semibold flex items-center gap-2">
                  Motif du signalement
                  <span className="text-red-400">*</span>
                </Label>
                <RadioGroup
                  value={reason || ""}
                  onValueChange={(value) => {
                    setReason(value as ReportReason);
                    setErrors({ ...errors, reason: undefined });
                  }}
                  className="space-y-2"
                >
                  {REPORT_REASONS.map((item) => (
                    <div
                      key={item.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-[#282828] ${
                        reason === item.value
                          ? "border-[#1DB954] bg-[#1DB954]/5"
                          : "border-gray-800 bg-[#282828]/50"
                      }`}
                      onClick={() => {
                        setReason(item.value);
                        setErrors({ ...errors, reason: undefined });
                      }}
                    >
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className="border-gray-600 text-[#1DB954]"
                      />
                      <Label
                        htmlFor={item.value}
                        className="flex-1 text-gray-300 cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.reason && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.reason}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-white font-semibold flex items-center gap-2">
                  Description de la situation
                  <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors({ ...errors, description: undefined });
                  }}
                  placeholder="Expliquez le problème rencontré..."
                  className="min-h-[120px] bg-[#282828] border-gray-800 text-white placeholder:text-gray-500 resize-none focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                />
                <div className="flex items-center justify-between">
                  {errors.description ? (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {description.length} / 500 caractères
                    </p>
                  )}
                </div>
              </div>

              {/* Upload optionnel */}
              <div className="space-y-3">
                <Label className="text-white font-semibold">
                  Capture d'écran (optionnel)
                </Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                    isDragging
                      ? "border-[#1DB954] bg-[#1DB954]/5"
                      : "border-gray-700 bg-[#282828]/50"
                  } ${uploadedFile ? "border-[#1DB954]" : ""}`}
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#1DB954]/20 flex items-center justify-center">
                          <CheckCircle className="size-5 text-[#1DB954]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                        className="hover:bg-red-500/10 hover:text-red-400"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="size-8 text-gray-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-1">
                        Glissez une image ici ou{" "}
                        <label
                          htmlFor="file-upload"
                          className="text-[#1DB954] hover:underline cursor-pointer"
                        >
                          parcourez
                        </label>
                      </p>
                      <p className="text-xs text-gray-600">
                        JPG, JPEG, PNG · Max 5MB
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                {errors.file && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.file}
                  </p>
                )}
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-700 hover:bg-gray-800 text-white"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le signalement"
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Écran de succès */}
            <div className="py-8 px-4 text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <CheckCircle className="size-10 text-[#1DB954] animate-in zoom-in duration-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Merci. Votre signalement a été transmis à notre équipe.
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Nous examinerons la situation dans les plus brefs délais.
                </p>
              </div>

              <Button
                onClick={handleClose}
                className="bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold px-8"
              >
                Fermer
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
