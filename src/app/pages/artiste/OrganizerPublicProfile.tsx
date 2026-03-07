import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  User as UserIcon,
  MapPin,
  Calendar,
  CheckCircle,
  TrendingUp,
  Activity,
  DollarSign,
  Music2,
  AlertCircle,
  Flag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  mockOrganizerProfiles,
  OrganizerProfile,
} from "../../data/organizerProfilesData";
import { ReportOrganizerModal } from "../../components/artist";

export function OrganizerPublicProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);

  // Récupérer le profil de l'organisateur basé sur la demande
  const demandeId = params.demandeId;
  const profile = demandeId
    ? mockOrganizerProfiles[demandeId]
    : undefined;

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Profil organisateur introuvable</p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const getReliabilityColor = (status: OrganizerProfile["reliability"]["status"]) => {
    const colors = {
      excellent: "text-green-400",
      good: "text-[#1DB954]",
      average: "text-yellow-400",
      poor: "text-red-400",
    };
    return colors[status];
  };

  const getReliabilityLabel = (status: OrganizerProfile["reliability"]["status"]) => {
    const labels = {
      excellent: "Organisateur très fiable",
      good: "Organisateur fiable",
      average: "Fiabilité moyenne",
      poor: "Prudence recommandée",
    };
    return labels[status];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/artiste/demandes/${demandeId}`)}
          className="text-gray-400 hover:text-white hover:bg-[#282828] -ml-2"
        >
          <ArrowLeft className="size-4 mr-2" />
          Retour à la demande
        </Button>
      </div>

      {/* Header Profil */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
              {profile.verified && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="size-3 mr-1" />
                  Compte vérifié
                </Badge>
              )}
              <Badge
                className={
                  profile.type === "company"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-gray-500/20 text-gray-400"
                }
              >
                {profile.type === "company" ? (
                  <>
                    <Building2 className="size-3 mr-1" />
                    Entreprise
                  </>
                ) : (
                  <>
                    <UserIcon className="size-3 mr-1" />
                    Particulier
                  </>
                )}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="size-4" />
                {profile.city}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                Membre depuis {profile.memberSince}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - 60% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section À propos */}
          {profile.about && (
            <Card className="bg-[#282828] border-gray-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{profile.about}</p>
              </CardContent>
            </Card>
          )}

          {/* Section Historique */}
          <Card className="bg-[#282828] border-gray-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <TrendingUp className="size-5 text-[#1DB954]" />
                Historique sur la plateforme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#191414] rounded-xl p-4">
                  <p className="text-2xl font-bold text-white mb-1">
                    {profile.stats.totalRequests}
                  </p>
                  <p className="text-sm text-gray-400">Demandes envoyées</p>
                </div>
                <div className="bg-[#191414] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#1DB954] mb-1">
                    {profile.stats.confirmedBookings}
                  </p>
                  <p className="text-sm text-gray-400">Demandes confirmées</p>
                </div>
                <div className="bg-[#191414] rounded-xl p-4">
                  <p className="text-2xl font-bold text-white mb-1">
                    {profile.stats.acceptanceRate}%
                  </p>
                  <p className="text-sm text-gray-400">Taux d'acceptation</p>
                </div>
                <div className="bg-[#191414] rounded-xl p-4">
                  <p className="text-2xl font-bold text-white mb-1">
                    {profile.stats.cancellations}
                  </p>
                  <p className="text-sm text-gray-400">
                    Annulation{profile.stats.cancellations > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="bg-[#191414] rounded-xl p-4 col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="size-4 text-[#1DB954]" />
                    <p className="text-sm font-medium text-white">Activité régulière</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Dernière activité : {profile.stats.lastActivity}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Budget & Comportement */}
          <Card className="bg-[#282828] border-gray-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <DollarSign className="size-5 text-[#1DB954]" />
                Comportement booking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Catégories fréquentes */}
              <div>
                <p className="text-sm text-gray-400 mb-3">
                  Catégories fréquemment bookées
                </p>
                <div className="space-y-2">
                  {profile.budgetInfo.frequentCategories.map((category, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#191414] rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Music2 className="size-4 text-gray-400" />
                        <span className="text-white">{category.name}</span>
                      </div>
                      <Badge variant="outline" className="border-gray-700 text-gray-400">
                        {category.count} booking{category.count > 1 ? "s" : ""}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite - 40% - Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Indice de fiabilité */}
            <Card className="bg-[#282828] border-gray-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Indice de fiabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score */}
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-4xl font-bold text-white">
                      {profile.reliability.score}%
                    </span>
                    <span
                      className={`text-sm font-medium ${getReliabilityColor(
                        profile.reliability.status
                      )}`}
                    >
                      {getReliabilityLabel(profile.reliability.status)}
                    </span>
                  </div>
                  <Progress
                    value={profile.reliability.score}
                    className="h-3 bg-gray-700"
                    indicatorClassName={
                      profile.reliability.score >= 80
                        ? "bg-green-500"
                        : profile.reliability.score >= 60
                        ? "bg-[#1DB954]"
                        : profile.reliability.score >= 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  />
                </div>

                {/* Facteurs */}
                <div className="space-y-2 pt-2">
                  {profile.reliability.factors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      {factor.positive ? (
                        <CheckCircle className="size-4 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="size-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={
                          factor.positive ? "text-gray-300" : "text-gray-400"
                        }
                      >
                        {factor.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section Sécurité */}
            <Card className="bg-[#191414] border-gray-800 rounded-2xl">
              <CardContent className="p-4 text-center space-y-3">
                <p className="text-sm text-gray-400">
                  Vous rencontrez un problème avec cet organisateur ?
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300"
                  onClick={() => setShowReportModal(true)}
                >
                  <Flag className="size-4 mr-2" />
                  Signaler cet organisateur
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportOrganizerModal
        open={showReportModal}
        onOpenChange={setShowReportModal}
        organizerName={profile.name}
        organizerId={profile.id}
      />
    </div>
  );
}