import { useState } from "react";
import { AlertTriangle, Eye, Filter, CheckCircle, XCircle, Ban, AlertCircle, MessageSquare, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useNavigate } from "react-router";
import {
  mockReports,
  mockDisputes,
  mockWatchedAccounts,
  mockMessagerieStats,
  Report,
  Dispute,
  WatchedAccount,
} from "../../data/adminMessagerieData";
import { toast } from "sonner";

type TabType = "signalements" | "litiges" | "surveilles" | "historique";

export function AdminMessagerieSignalements() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("signalements");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsDrawerOpen(true);
  };

  const handleCloseReport = (reportId: string) => {
    toast.success("Signalement clôturé");
    setIsDrawerOpen(false);
  };

  const handleSendWarning = () => {
    toast.warning("Avertissement officiel envoyé");
  };

  const handleSuspend = () => {
    toast.warning("Compte suspendu temporairement");
  };

  const handleBan = () => {
    toast.error("Compte banni définitivement");
  };

  const handleSaveNote = () => {
    toast.success("Note interne enregistrée");
    setAdminNote("");
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      new: {
        label: "Nouveau",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      },
      in_progress: {
        label: "En cours",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      },
      resolved: {
        label: "Résolu",
        className: "bg-green-100 text-green-700 border-green-200",
      },
      rejected: {
        label: "Rejeté",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      },
    };
    return configs[status as keyof typeof configs] || configs.new;
  };

  const getDisputeStatusConfig = (status: string) => {
    const configs = {
      pending: {
        label: "En attente",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      },
      negotiating: {
        label: "Négociation",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      },
      resolved: {
        label: "Résolu",
        className: "bg-green-100 text-green-700 border-green-200",
      },
      escalated: {
        label: "Escaladé",
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getRiskConfig = (level: string) => {
    const configs = {
      low: {
        label: "Faible",
        className: "bg-green-100 text-green-700 border-green-200",
      },
      medium: {
        label: "Moyen",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      },
      high: {
        label: "Élevé",
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };
    return configs[level as keyof typeof configs] || configs.low;
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const activeReports = mockReports.filter(r => r.status === "new" || r.status === "in_progress");
  const historicalReports = mockReports.filter(r => r.status === "resolved" || r.status === "rejected");

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <Card className="bg-gray-50 border-gray-200 rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Messagerie & Signalements
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Supervision des échanges et litiges
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                {mockMessagerieStats.activeReports} signalement
                {mockMessagerieStats.activeReports > 1 ? "s" : ""} actif
                {mockMessagerieStats.activeReports > 1 ? "s" : ""}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="size-4" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("signalements")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "signalements"
                ? "border-[#1DB954] text-[#1DB954]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Signalements
          </button>
          <button
            onClick={() => setActiveTab("litiges")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "litiges"
                ? "border-[#1DB954] text-[#1DB954]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Litiges actifs
          </button>
          <button
            onClick={() => setActiveTab("surveilles")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "surveilles"
                ? "border-[#1DB954] text-[#1DB954]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Comptes surveillés
          </button>
          <button
            onClick={() => setActiveTab("historique")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "historique"
                ? "border-[#1DB954] text-[#1DB954]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Historique
          </button>
        </div>
      </div>

      {/* Layout avec tableau et stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {/* Tab: Signalements */}
          {activeTab === "signalements" && (
            <Card className="rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Signalé par</TableHead>
                    <TableHead>Concerné</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Booking lié</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeReports.map((report) => {
                    const statusConfig = getStatusConfig(report.status);
                    return (
                      <TableRow key={report.id}>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(report.date)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-medium">
                          {report.reporterName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-medium">
                          {report.concernedName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {report.reason}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {report.bookingReference || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCloseReport(report.id)}
                            >
                              Clôturer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Tab: Litiges actifs */}
          {activeTab === "litiges" && (
            <Card className="rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Artiste</TableHead>
                    <TableHead>Organisateur</TableHead>
                    <TableHead>Problème</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDisputes.map((dispute) => {
                    const statusConfig = getDisputeStatusConfig(dispute.status);
                    return (
                      <TableRow key={dispute.id}>
                        <TableCell className="text-sm text-gray-900 font-medium">
                          {dispute.bookingReference}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {dispute.artistName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {dispute.organizerName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {dispute.problem}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/admin/booking-requests/detail/${dispute.bookingId}`
                              )
                            }
                          >
                            <Eye className="size-4 mr-2" />
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Tab: Comptes surveillés */}
          {activeTab === "surveilles" && (
            <Card className="rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom utilisateur</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Signalements</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Niveau de risque</TableHead>
                    <TableHead>Dernier signalement</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWatchedAccounts.map((account) => {
                    const riskConfig = getRiskConfig(account.riskLevel);
                    return (
                      <TableRow key={account.id}>
                        <TableCell className="text-sm text-gray-900 font-medium">
                          {account.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {account.type === "artist" ? "Artiste" : "Organisateur"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {account.reportsCount}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {account.bookingsCount}
                        </TableCell>
                        <TableCell>
                          <Badge className={riskConfig.className}>
                            {riskConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(account.lastReportDate)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const route =
                                account.type === "artist"
                                  ? `/admin/artistes/review/${account.id}`
                                  : `/admin/organisateurs/detail/${account.id}`;
                              navigate(route);
                            }}
                          >
                            <Eye className="size-4 mr-2" />
                            Voir profil
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Tab: Historique */}
          {activeTab === "historique" && (
            <Card className="rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Signalé par</TableHead>
                    <TableHead>Concerné</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalReports.map((report) => {
                    const statusConfig = getStatusConfig(report.status);
                    return (
                      <TableRow key={report.id}>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(report.date)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-medium">
                          {report.reporterName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 font-medium">
                          {report.concernedName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {report.reason}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>

        {/* Bloc statistiques */}
        <div className="lg:col-span-1">
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-base">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Signalements actifs
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockMessagerieStats.activeReports}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Résolus ce mois
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockMessagerieStats.resolvedThisMonth}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Taux de résolution
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockMessagerieStats.resolvedPercentage}%
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Comptes surveillés
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockMessagerieStats.watchedAccounts}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drawer de détail */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              Détail du signalement
            </SheetTitle>
            <SheetDescription>
              Informations complètes et actions de modération.
            </SheetDescription>
          </SheetHeader>

          {selectedReport && (
            <div className="space-y-6 mt-6">
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">
                        Signalé par
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedReport.reporterName}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {selectedReport.reportedBy === "artist"
                          ? "Artiste"
                          : "Organisateur"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Concerné</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedReport.concernedName}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {selectedReport.concernedType === "artist"
                          ? "Artiste"
                          : "Organisateur"}
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Date du signalement
                    </p>
                    <p className="text-sm text-gray-900">
                      {formatDateTime(selectedReport.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Motif</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedReport.reason}
                    </p>
                  </div>
                  {selectedReport.bookingReference && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">
                        Booking lié
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-[#1DB954]"
                        onClick={() => {
                          if (selectedReport.bookingId) {
                            navigate(
                              `/admin/booking-requests/detail/${selectedReport.bookingId}`
                            );
                            setIsDrawerOpen(false);
                          }
                        }}
                      >
                        {selectedReport.bookingReference}
                      </Button>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      Commentaire
                    </p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedReport.comment}
                    </p>
                  </div>
                  {selectedReport.adminNotes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-900 font-medium mb-1">
                        Note admin existante
                      </p>
                      <p className="text-sm text-yellow-800">
                        {selectedReport.adminNotes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Conversation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="size-5 text-gray-600" />
                    Conversation complète
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedReport.conversation.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.sender === "artist" ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            {message.senderName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`flex-1 ${
                            message.sender === "artist" ? "" : "text-right"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-medium text-gray-900">
                              {message.senderName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDateTime(message.timestamp)}
                            </p>
                          </div>
                          <div
                            className={`inline-block p-3 rounded-lg max-w-[80%] ${
                              message.sender === "artist"
                                ? "bg-gray-100 text-gray-900"
                                : "bg-blue-50 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions admin */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Actions admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleSendWarning}
                  >
                    <AlertCircle className="size-4" />
                    Envoyer avertissement officiel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={handleSuspend}
                  >
                    <Ban className="size-4" />
                    Suspension temporaire
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 border-red-200 text-red-700 hover:bg-red-50"
                    onClick={handleBan}
                  >
                    <XCircle className="size-4" />
                    Bannissement définitif
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => handleCloseReport(selectedReport.id)}
                  >
                    <CheckCircle className="size-4" />
                    Clôturer le dossier
                  </Button>
                </CardContent>
              </Card>

              {/* Note interne */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ajouter une note interne</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="admin-note" className="text-xs text-gray-500">
                      Note (visible uniquement admin)
                    </Label>
                    <Textarea
                      id="admin-note"
                      placeholder="Ajouter une note de modération..."
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
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}