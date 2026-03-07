import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Download,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Ban,
  Flag,
  AlertCircle,
  MessageSquare,
  User,
  Building2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { toast } from "sonner";
import { mockBookingRequests } from "../../data/bookingRequestsData";

export function AdminBookingRequestDetail() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [adminNote, setAdminNote] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showForceStatusDialog, setShowForceStatusDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const request = mockBookingRequests[requestId || "1"];

  if (!request) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Demande introuvable</p>
          <Button
            onClick={() => navigate("/admin/booking-requests")}
            className="bg-[#1DB954] hover:bg-[#1ED760] text-white"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour aux demandes
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    const configs = {
      pending: {
        label: "En attente",
        className: "bg-orange-100 text-orange-700 border-orange-200",
        icon: Clock,
      },
      accepted: {
        label: "Acceptée",
        className: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      confirmed: {
        label: "Confirmée",
        className: "bg-blue-100 text-blue-700 border-blue-200",
        icon: CheckCircle,
      },
      refused: {
        label: "Refusée",
        className: "bg-red-100 text-red-700 border-red-200",
        icon: XCircle,
      },
      cancelled: {
        label: "Annulée",
        className: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Ban,
      },
    };
    const config = configs[request.status];
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="size-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getRiskConfig = () => {
    const configs = {
      normal: {
        label: "Normal",
        icon: ShieldCheck,
        className: "bg-green-100 text-green-700 border-green-200",
        iconColor: "text-green-600",
      },
      warning: {
        label: "À surveiller",
        icon: ShieldAlert,
        className: "bg-orange-100 text-orange-700 border-orange-200",
        iconColor: "text-orange-600",
      },
      danger: {
        label: "Risque élevé",
        icon: ShieldX,
        className: "bg-red-100 text-red-700 border-red-200",
        iconColor: "text-red-600",
      },
    };
    return configs[request.risk.level];
  };

  const riskConfig = getRiskConfig();
  const RiskIcon = riskConfig.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSaveNote = () => {
    toast.success("Note interne enregistrée");
    setAdminNote("");
  };

  const handleCancelRequest = () => {
    toast.warning("Demande annulée par admin");
    setShowCancelDialog(false);
    navigate("/admin/booking-requests");
  };

  const handleForceStatus = () => {
    if (!selectedStatus) {
      toast.error("Veuillez sélectionner un statut");
      return;
    }
    toast.success(`Statut forcé à : ${selectedStatus}`);
    setShowForceStatusDialog(false);
  };

  const handleBlockInteraction = () => {
    toast.warning("Interaction bloquée entre artiste et organisateur");
    setShowBlockDialog(false);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          onClick={() => navigate("/admin")}
          className="hover:text-gray-700"
        >
          Admin
        </button>
        <span>/</span>
        <button
          onClick={() => navigate("/admin/booking-requests")}
          className="hover:text-gray-700"
        >
          Booking Requests
        </button>
        <span>/</span>
        <span className="text-gray-900">Detail</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{request.requestNumber}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/booking-requests")}
              className="gap-2 -ml-2"
            >
              <ArrowLeft className="size-4" />
              Retour
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Request – {request.requestNumber}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analyse et suivi de la demande
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {getStatusBadge()}
          {request.isDisputed && (
            <Badge className="bg-red-100 text-red-700 border-red-200">
              <Flag className="size-3 mr-1" />
              Litigieuse
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/artistes/review/${request.artist.id}`)}
          >
            <Eye className="size-4 mr-2" />
            Voir profil artiste
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/organisateurs/detail/${request.organizer.id}`)}
          >
            <Eye className="size-4 mr-2" />
            Voir profil organisateur
          </Button>
        </div>
      </div>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - 65% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carte Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations principales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne 1 */}
                <div className="space-y-4">
                  {/* Artiste */}
                  <div>
                    <Label className="text-xs text-gray-500 uppercase mb-2">
                      Artiste
                    </Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar className="size-12">
                        <AvatarImage src={request.artist.avatar} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {request.artist.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.artist.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {request.artist.category}
                          </Badge>
                          {request.artist.status === "approved" && (
                            <CheckCircle className="size-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Type événement */}
                  <div>
                    <Label className="text-xs text-gray-500 uppercase">
                      Type d'événement
                    </Label>
                    <p className="text-gray-900 font-medium mt-1">
                      {request.event.type}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="size-4 text-gray-400" />
                      <Label className="text-xs text-gray-500 uppercase">Date</Label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {formatDate(request.event.date)}
                    </p>
                  </div>

                  {/* Heure */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="size-4 text-gray-400" />
                      <Label className="text-xs text-gray-500 uppercase">Heure</Label>
                    </div>
                    <p className="text-gray-900 font-medium">{request.event.time}</p>
                  </div>

                  {/* Durée */}
                  {request.event.duration && (
                    <div>
                      <Label className="text-xs text-gray-500 uppercase">
                        Durée
                      </Label>
                      <p className="text-gray-900 font-medium mt-1">
                        {request.event.duration}
                      </p>
                    </div>
                  )}
                </div>

                {/* Colonne 2 */}
                <div className="space-y-4">
                  {/* Organisateur */}
                  <div>
                    <Label className="text-xs text-gray-500 uppercase mb-2">
                      Organisateur
                    </Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar className="size-12">
                        <AvatarImage src={request.organizer.avatar} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {request.organizer.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.organizer.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {request.organizer.type === "company"
                              ? "Entreprise"
                              : "Particulier"}
                          </Badge>
                          {request.organizer.status === "verified" && (
                            <ShieldCheck className="size-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Ville */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="size-4 text-gray-400" />
                      <Label className="text-xs text-gray-500 uppercase">Ville</Label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {request.event.city}
                    </p>
                  </div>

                  {/* Lieu */}
                  {request.event.venue && (
                    <div>
                      <Label className="text-xs text-gray-500 uppercase">Lieu</Label>
                      <p className="text-gray-900 font-medium mt-1">
                        {request.event.venue}
                      </p>
                    </div>
                  )}

                  {/* Budget */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="size-4 text-gray-400" />
                      <Label className="text-xs text-gray-500 uppercase">
                        Budget proposé
                      </Label>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {request.budget.proposed.toLocaleString()} {request.budget.currency}
                    </p>
                    {request.budget.artistRate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Tarif artiste : {request.budget.artistRate.toLocaleString()}{" "}
                        {request.budget.currency}
                      </p>
                    )}
                  </div>

                  {/* Date création */}
                  <div>
                    <Label className="text-xs text-gray-500 uppercase">
                      Date création demande
                    </Label>
                    <p className="text-gray-900 font-medium mt-1">
                      {formatDateTime(request.systemInfo.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte Message initial */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="size-5 text-gray-600" />
                  Message de l'organisateur
                </CardTitle>
                <span className="text-xs text-gray-500">
                  {formatDateTime(request.initialMessage.timestamp)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {request.initialMessage.content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Carte Historique des échanges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historique des échanges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {request.timeline.map((event, index) => {
                  const isLast = index === request.timeline.length - 1;
                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`size-8 rounded-full flex items-center justify-center ${
                            event.type === "created"
                              ? "bg-blue-100"
                              : event.type === "accepted" || event.type === "confirmed"
                              ? "bg-green-100"
                              : event.type === "refused" || event.type === "cancelled"
                              ? "bg-red-100"
                              : "bg-gray-100"
                          }`}
                        >
                          {event.type === "created" && (
                            <Clock className="size-4 text-blue-600" />
                          )}
                          {(event.type === "accepted" || event.type === "confirmed") && (
                            <CheckCircle className="size-4 text-green-600" />
                          )}
                          {(event.type === "refused" || event.type === "cancelled") && (
                            <XCircle className="size-4 text-red-600" />
                          )}
                          {event.type === "response" && (
                            <MessageSquare className="size-4 text-gray-600" />
                          )}
                        </div>
                        {!isLast && (
                          <div className="w-0.5 h-full min-h-[40px] bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {event.description}
                            </p>
                            {event.actorName && (
                              <p className="text-xs text-gray-500 mt-1">
                                Par {event.actorName}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {formatDateTime(event.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Carte Pièces jointes */}
          {request.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="size-5 text-gray-600" />
                  Pièces jointes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {request.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded bg-gray-200 flex items-center justify-center">
                          <FileText className="size-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Uploadé par{" "}
                            {attachment.uploadedBy === "artist"
                              ? "l'artiste"
                              : "l'organisateur"}{" "}
                            · {formatDateTime(attachment.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section Signalements */}
          {request.reports && request.reports.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Flag className="size-5 text-red-600" />
                  Signalements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {request.reports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-red-900">
                            Signalé par {report.reporterName}
                          </p>
                          <p className="text-sm text-red-700 mt-1">
                            {report.reason}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-red-600">
                            <span>{formatDateTime(report.date)}</span>
                            <Badge
                              className={
                                report.status === "pending"
                                  ? "bg-orange-100 text-orange-700 border-orange-200"
                                  : report.status === "resolved"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                              }
                            >
                              {report.status === "pending"
                                ? "En attente"
                                : report.status === "resolved"
                                ? "Résolu"
                                : "Rejeté"}
                            </Badge>
                          </div>
                          {report.moderationNotes && (
                            <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded">
                              Note admin : {report.moderationNotes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Colonne droite - 35% */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Carte Résumé Système */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Résumé Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Date création</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(request.systemInfo.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">IP organisateur</span>
                  <span className="text-gray-900 font-mono text-xs">
                    {request.systemInfo.organizerIP}
                  </span>
                </div>
                {request.systemInfo.artistIP && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">IP artiste</span>
                    <span className="text-gray-900 font-mono text-xs">
                      {request.systemInfo.artistIP}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Demandes précédentes</span>
                  <span className="text-gray-900 font-medium">
                    {request.systemInfo.previousRequestsBetween}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total organisateur</span>
                  <span className="text-gray-900 font-medium">
                    {request.systemInfo.totalOrganizerRequests}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Total artiste</span>
                  <span className="text-gray-900 font-medium">
                    {request.systemInfo.totalArtistRequests}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Carte Risk Indicator */}
            <Card className={`border-2 ${riskConfig.className.split(" ")[0].replace("bg-", "border-")}`}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className={`size-5 ${riskConfig.iconColor}`} />
                  Risk Indicator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Niveau de risque</span>
                  <Badge className={riskConfig.className}>
                    <RiskIcon className="size-3 mr-1" />
                    {riskConfig.label}
                  </Badge>
                </div>

                {request.risk.flags.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Alertes détectées
                      </p>
                      <ul className="space-y-2">
                        {request.risk.flags.map((flag, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-xs text-gray-700"
                          >
                            <AlertCircle className="size-4 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Organisateur signalé</span>
                    <span
                      className={`font-medium ${
                        request.risk.organizerReports > 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {request.risk.organizerReports} fois
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Artiste signalé</span>
                    <span
                      className={`font-medium ${
                        request.risk.artistReports > 0 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {request.risk.artistReports} fois
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte Actions Admin */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <Ban className="size-4 mr-2" />
                  Annuler la demande
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowForceStatusDialog(true)}
                >
                  <AlertCircle className="size-4 mr-2" />
                  Forcer statut
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-orange-200 text-orange-700 hover:bg-orange-50"
                  onClick={() => setShowBlockDialog(true)}
                >
                  <ShieldX className="size-4 mr-2" />
                  Bloquer interaction
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50"
                >
                  <User className="size-4 mr-2" />
                  Suspendre artiste
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Building2 className="size-4 mr-2" />
                  Suspendre organisateur
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Flag className="size-4 mr-2" />
                  Marquer comme litigieuse
                </Button>
              </CardContent>
            </Card>

            {/* Carte Notes internes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes internes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {request.adminNotes && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-3">
                    <p className="text-sm text-yellow-900 whitespace-pre-wrap">
                      {request.adminNotes}
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor="admin-note" className="text-xs text-gray-500">
                    Note interne (visible uniquement admin)
                  </Label>
                  <Textarea
                    id="admin-note"
                    placeholder="Ajouter une note..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={handleSaveNote}
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white"
                  disabled={!adminNote.trim()}
                >
                  Enregistrer note
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler la demande</DialogTitle>
            <DialogDescription>
              Cette action annulera la demande de booking. Les deux parties seront
              notifiées.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleCancelRequest}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showForceStatusDialog} onOpenChange={setShowForceStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forcer le statut</DialogTitle>
            <DialogDescription>
              Modifier manuellement le statut de cette demande
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="status-select" className="mb-2">
              Nouveau statut
            </Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="status-select">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="accepted">Acceptée</SelectItem>
                <SelectItem value="confirmed">Confirmée</SelectItem>
                <SelectItem value="refused">Refusée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowForceStatusDialog(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleForceStatus}
              className="bg-[#1DB954] hover:bg-[#1ED760] text-white"
            >
              Forcer le statut
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquer l'interaction</DialogTitle>
            <DialogDescription>
              Empêcher toute future interaction entre cet artiste et cet organisateur
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleBlockInteraction}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Bloquer l'interaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
