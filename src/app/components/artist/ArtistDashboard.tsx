import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Inbox,
  Calendar as CalendarIcon,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  mockBookingRequests,
  mockArtistStats,
  mockCalendarEvents,
  BookingRequest,
} from "../../data/artistDashboardData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ArtistDashboardProps {
  artistName: string;
  onNavigate: (section: string) => void;
  onViewRequest: (requestId: string) => void;
}

export function ArtistDashboard({
  artistName,
  onNavigate,
  onViewRequest,
}: ArtistDashboardProps) {
  const stats = mockArtistStats;
  const recentRequests = mockBookingRequests.slice(0, 5);
  const upcomingEvents = mockCalendarEvents
    .filter((event) => event.status === "confirmed" || event.status === "hold")
    .slice(0, 3);

  // Calcul de la progression du profil
  const profileCompletion = {
    photo: true,
    video: true,
    bio: true,
    genres: true,
    pricing: true,
    contact: true,
  };

  const completedItems = Object.values(profileCompletion).filter(Boolean).length;
  const progressPercentage = (completedItems / 6) * 100;

  const getStatusBadge = (status: BookingRequest["status"]) => {
    const variants = {
      pending: { label: "En attente", color: "bg-yellow-500/20 text-yellow-500" },
      accepted: { label: "Acceptée", color: "bg-green-500/20 text-green-500" },
      declined: { label: "Refusée", color: "bg-red-500/20 text-red-500" },
      expired: { label: "Expirée", color: "bg-gray-500/20 text-gray-500" },
    };

    return variants[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Bonjour, {artistName} 👋
        </h1>
        <p className="text-gray-400">
          Voici un aperçu de votre activité récente
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Vues du profil</p>
                <p className="text-2xl font-bold text-white">{stats.profileViews}</p>
                <p className="text-xs text-gray-500 mt-1">7 derniers jours</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <Eye className="size-6 text-[#1DB954]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Nouvelles demandes</p>
                <p className="text-2xl font-bold text-white">{stats.newRequests}</p>
                <p className="text-xs text-gray-500 mt-1">À traiter</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <AlertCircle className="size-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">En attente</p>
                <p className="text-2xl font-bold text-white">{stats.pendingRequests}</p>
                <p className="text-xs text-gray-500 mt-1">Réponses attendues</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="size-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Statut du profil</p>
                <p className="text-lg font-semibold text-white">
                  {stats.isProfessionalized ? "Professionnel" : "Standard"}
                </p>
                {!stats.isProfessionalized && (
                  <Button
                    size="sm"
                    variant="link"
                    className="text-[#1DB954] p-0 h-auto text-xs mt-1"
                    onClick={() => onNavigate("profile")}
                  >
                    Améliorer →
                  </Button>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Award className="size-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dernières demandes */}
        <div className="lg:col-span-2">
          <Card className="bg-[#282828] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Inbox className="size-5" />
                  Dernières demandes
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#1DB954] hover:text-[#1ED760] hover:bg-gray-800"
                  onClick={() => onNavigate("requests")}
                >
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox className="size-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Aucune demande pour le moment</p>
                  <p className="text-sm text-gray-500">
                    Les demandes de réservation apparaîtront ici
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => onViewRequest(request.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={request.organizerAvatar}
                            alt={request.organizerName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-white font-medium">
                              {request.organizerName}
                            </p>
                            <p className="text-sm text-gray-400">
                              {request.eventType} • {request.city}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusBadge(request.status).color}>
                          {getStatusBadge(request.status).label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-3">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-4" />
                          {format(new Date(request.eventDate), "dd MMM yyyy", {
                            locale: fr,
                          })}
                        </span>
                        {request.budget && (
                          <span className="text-[#1DB954]">{request.budget}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Aperçu calendrier */}
          <Card className="bg-[#282828] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CalendarIcon className="size-5" />
                Prochains événements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  Aucun événement prévu
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-[#191414] rounded-lg border-l-4 border-[#1DB954]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-white">
                          {format(new Date(event.date), "dd MMM", { locale: fr })}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            event.status === "confirmed"
                              ? "border-green-500 text-green-500"
                              : "border-yellow-500 text-yellow-500"
                          }
                        >
                          {event.status === "confirmed" ? "Confirmé" : "En attente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{event.eventType}</p>
                      {event.client && (
                        <p className="text-xs text-gray-500 mt-1">{event.client}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => onNavigate("calendar")}
              >
                Gérer mon calendrier
              </Button>
            </CardContent>
          </Card>

          {/* Progression du profil */}
          <Card className="bg-[#282828] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="size-5" />
                Progression du profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Complétion</span>
                  <span className="text-sm font-semibold text-white">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                {[
                  { label: "Photo", checked: profileCompletion.photo },
                  { label: "Vidéo", checked: profileCompletion.video },
                  { label: "Bio", checked: profileCompletion.bio },
                  { label: "Genres", checked: profileCompletion.genres },
                  { label: "Tarifs", checked: profileCompletion.pricing },
                  { label: "Contact", checked: profileCompletion.contact },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.checked ? (
                      <CheckCircle className="size-4 text-[#1DB954]" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-gray-600" />
                    )}
                    <span
                      className={
                        item.checked ? "text-gray-300" : "text-gray-500"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {progressPercentage < 100 && (
                <Button
                  className="w-full mt-4 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                  onClick={() => onNavigate("profile")}
                >
                  Compléter mon profil
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
