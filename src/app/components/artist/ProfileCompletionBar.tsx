import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";

interface ProfileCompletionBarProps {
  formData: {
    stageName: string;
    bio: string;
    specialties: string[];
    eventTypes: string[];
    priceMin: string;
    priceMax: string;
    phone: string;
    email: string;
  };
  photosCount: number;
  videosCount: number;
}

export function ProfileCompletionBar({ 
  formData, 
  photosCount, 
  videosCount 
}: ProfileCompletionBarProps) {
  // Critères de complétion
  const criteria = [
    {
      label: "Photo de profil",
      completed: photosCount > 0,
      required: true,
    },
    {
      label: "Vidéo",
      completed: videosCount > 0,
      required: true,
    },
    {
      label: "Bio",
      completed: formData.bio.length >= 50,
      required: true,
    },
    {
      label: "Spécialités / Genres",
      completed: formData.specialties.length > 0,
      required: true,
    },
    {
      label: "Types d'événements",
      completed: formData.eventTypes.length > 0,
      required: true,
    },
    {
      label: "Tarifs",
      completed: formData.priceMin && formData.priceMax,
      required: false,
    },
  ];

  const completedCount = criteria.filter(c => c.completed).length;
  const totalCount = criteria.length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  
  const requiredCriteria = criteria.filter(c => c.required);
  const requiredCompletedCount = requiredCriteria.filter(c => c.completed).length;
  const isProfileComplete = requiredCompletedCount === requiredCriteria.length;

  return (
    <Card className="bg-gradient-to-r from-[#1DB954]/10 to-[#1ED760]/5 border-[#1DB954]/30">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isProfileComplete 
                ? "bg-[#1DB954]/20" 
                : "bg-orange-500/20"
            }`}>
              {isProfileComplete ? (
                <CheckCircle className="size-6 text-[#1DB954]" />
              ) : (
                <AlertCircle className="size-6 text-orange-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isProfileComplete ? "Profil complet !" : "Complétez votre profil"}
              </h3>
              <p className="text-sm text-gray-400">
                {isProfileComplete 
                  ? "Votre profil est prêt à recevoir des demandes" 
                  : `${completedCount} sur ${totalCount} critères remplis`
                }
              </p>
            </div>
          </div>
          
          {/* Percentage */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              isProfileComplete ? "text-[#1DB954]" : "text-orange-400"
            }`}>
              {percentage}%
            </div>
            <p className="text-xs text-gray-500">Complétion</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress 
            value={percentage} 
            className="h-3 bg-[#191414]"
          />
          
          {/* Criteria Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            {criteria.map((criterion, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-sm ${
                  criterion.completed ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {criterion.completed ? (
                  <CheckCircle className="size-4 text-[#1DB954] flex-shrink-0" />
                ) : (
                  <Circle className="size-4 text-gray-600 flex-shrink-0" />
                )}
                <span className={criterion.completed ? "line-through" : ""}>
                  {criterion.label}
                  {criterion.required && !criterion.completed && (
                    <span className="text-orange-400 ml-1">*</span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Help Text */}
          {!isProfileComplete && (
            <div className="mt-4 p-3 bg-[#191414] border border-gray-700 rounded-lg">
              <p className="text-xs text-gray-400 flex items-start gap-2">
                <AlertCircle className="size-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  Complétez les critères marqués d'un <span className="text-orange-400">*</span> pour activer votre profil public et commencer à recevoir des demandes de booking.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
