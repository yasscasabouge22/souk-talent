import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  DollarSign,
  Music2,
  MoreVertical,
  User as UserIcon,
  Archive,
  Flag,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { mockBookingRequests, BookingRequest } from "../../data/artistDashboardData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { ReportOrganizerModal } from "../../components/artist/ReportOrganizerModal";

export function DemandeDetail() {
  const { demandeId } = useParams();
  const navigate = useNavigate();
  const [replyMessage, setReplyMessage] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);

  // Trouver la demande correspondante
  const request = mockBookingRequests.find((r) => r.id === demandeId);

  // Si la demande n'existe pas, rediriger
  if (!request) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Demande introuvable</p>
          <Button
            onClick={() => navigate("/artiste/demandes")}
            className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour aux demandes
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: BookingRequest["status"]) => {
    const variants = {
      pending: {
        label: "En attente",
        color: "bg-yellow-500/20 text-yellow-500",
      },
      accepted: {
        label: "Acceptée",
        color: "bg-green-500/20 text-green-500",
      },
      declined: {
        label: "Refusée",
        color: "bg-red-500/20 text-red-500",
      },
      expired: {
        label: "Expirée",
        color: "bg-gray-500/20 text-gray-500",
      },
    };

    return variants[status];
  };

  const handleAccept = () => {
    toast.success("Demande acceptée !", {
      description: "L'organisateur a été notifié.",
    });
    navigate("/artiste/demandes");
  };

  const handleDecline = () => {
    toast.info("Demande refusée", {
      description: "L'organisateur a été notifié.",
    });
    navigate("/artiste/demandes");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;

    toast.success("Message envoyé !");
    setReplyMessage("");
  };

  const badge = getStatusBadge(request.status);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/artiste/demandes")}
          className="text-gray-400 hover:text-white hover:bg-[#282828] -ml-2"
        >
          <ArrowLeft className="size-4 mr-2" />
          Retour aux demandes
        </Button>
      </div>

      {/* Header avec actions */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Demande de {request.organizerName}
            </h1>
            <Badge className={badge.color}>{badge.label}</Badge>
          </div>

          {/* Actions Header - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-[#1DB954]/10 hover:text-[#1DB954] hover:border-[#1DB954]/50 transition-all"
              onClick={() => {
                navigate(`/artiste/demandes/${demandeId}/profil-organisateur`);
              }}
            >
              <UserIcon className="size-4 mr-2" />
              Voir profil
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 active:bg-red-500/20 focus:ring-2 focus:ring-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              onClick={() => {
                setShowReportModal(true);
              }}
            >
              <Flag className="size-4 mr-1.5" />
              Signaler
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-[#282828]"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#282828] border-gray-700 text-white w-48"
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/10 focus:text-white"
                  onClick={() => {
                    toast.success("Conversation archivée");
                    navigate("/artiste/demandes");
                  }}
                >
                  <Archive className="size-4 mr-2" />
                  Archiver conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions Header - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 active:bg-red-500/20 transition-all text-xs px-3"
              onClick={() => {
                setShowReportModal(true);
              }}
            >
              <Flag className="size-3.5 mr-1" />
              Signaler
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-[#282828]"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#282828] border-gray-700 text-white w-48"
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/10 focus:text-white"
                  onClick={() => {
                    navigate(`/artiste/demandes/${demandeId}/profil-organisateur`);
                  }}
                >
                  <UserIcon className="size-4 mr-2" />
                  Voir profil organisateur
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/10 focus:text-white"
                  onClick={() => {
                    toast.success("Conversation archivée");
                    navigate("/artiste/demandes");
                  }}
                >
                  <Archive className="size-4 mr-2" />
                  Archiver conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Organizer Info */}
        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={request.organizerAvatar}
                alt={request.organizerName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-white">
                  {request.organizerName}
                </p>
                <p className="text-sm text-gray-400">{request.eventType}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="size-4 text-gray-400" />
                <a
                  href={`tel:${request.organizerPhone}`}
                  className="text-[#1DB954] hover:underline"
                >
                  {request.organizerPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="size-4 text-gray-400" />
                <a
                  href={`mailto:${request.organizerEmail}`}
                  className="text-[#1DB954] hover:underline"
                >
                  {request.organizerEmail}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="bg-[#282828] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Détails de l'événement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Type d'événement */}
            <div className="flex items-center gap-3">
              <Music2 className="size-5 text-[#1DB954]" />
              <div>
                <p className="text-sm text-gray-400">Type d'événement</p>
                <p className="text-white">{request.eventType}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-[#1DB954]" />
              <div>
                <p className="text-sm text-gray-400">Date et heure</p>
                <p className="text-white">
                  {format(
                    new Date(request.eventDate),
                    "EEEE dd MMMM yyyy",
                    { locale: fr }
                  )}
                  {request.eventTime && ` à ${request.eventTime}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-[#1DB954]" />
              <div>
                <p className="text-sm text-gray-400">Lieu</p>
                <p className="text-white">
                  {request.location}, {request.city}
                </p>
              </div>
            </div>

            {request.budget && (
              <div className="flex items-center gap-3">
                <DollarSign className="size-5 text-[#1DB954]" />
                <div>
                  <p className="text-sm text-gray-400">Budget proposé</p>
                  <p className="text-white">{request.budget}</p>
                </div>
              </div>
            )}

            {request.formula && (
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-[#1DB954]" />
                <div>
                  <p className="text-sm text-gray-400">Formule demandée</p>
                  <p className="text-white">{request.formula}</p>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Message</p>
              <p className="text-white">{request.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Conversation */}
        {request.responses && request.responses.length > 0 && (
          <Card className="bg-[#282828] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <MessageSquare className="size-5" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {request.responses.map((response) => (
                <div
                  key={response.id}
                  className={`p-3 rounded-lg ${
                    response.from === "artist"
                      ? "bg-[#1DB954]/20 ml-8"
                      : "bg-gray-800 mr-8"
                  }`}
                >
                  <p className="text-white text-sm mb-1">{response.message}</p>
                  <p className="text-xs text-gray-500">
                    {response.from === "artist" ? "Vous" : request.organizerName}{" "}
                    • {format(new Date(response.sentAt), "dd MMM à HH:mm", {
                      locale: fr,
                    })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Reply */}
        {(request.status === "pending" || request.status === "accepted") && (
          <Card className="bg-[#282828] border-gray-800">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Écrivez votre réponse..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="bg-[#191414] border-gray-700 text-white min-h-24"
                />
                <Button
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                >
                  <Send className="size-4" />
                  Envoyer le message
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer aide + Signalement (mobile alternative) */}
        <div className="space-y-2">
          {/* Lien signalement discret - Mobile uniquement */}
          <div className="flex md:hidden items-center justify-center pt-2">
            <button
              onClick={() => {
                setShowReportModal(true);
              }}
              className="text-sm text-red-400/70 hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <Flag className="size-3.5" />
              Signaler un problème avec cet organisateur
            </button>
          </div>

          {/* Support */}
          <div className="flex items-center justify-center pt-2 pb-1">
            <button
              onClick={() => {
                toast.info("Fonctionnalité de support à venir");
              }}
              className="text-sm text-gray-500 hover:text-[#1DB954] transition-colors"
            >
              Besoin d'aide ? Contacter le support
            </button>
          </div>
        </div>

        {/* Actions */}
        {request.status === "pending" && (
          <div className="flex gap-3 sticky bottom-4 bg-[#191414]/95 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
            <Button
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-500/20"
              onClick={handleDecline}
            >
              <XCircle className="size-4 mr-2" />
              Refuser
            </Button>
            <Button
              className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
              onClick={handleAccept}
            >
              <CheckCircle className="size-4 mr-2" />
              Accepter
            </Button>
          </div>
        )}
      </div>

      {/* Report Organizer Modal */}
      <ReportOrganizerModal
        open={showReportModal}
        onOpenChange={setShowReportModal}
        organizerName={request.organizerName}
        organizerId={request.id}
      />
    </div>
  );
}