import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Clock,
  Eye,
  UserX,
  Key,
  FileText,
  MessageSquare,
  MessageSquareReply,
  CalendarClock,
  CheckCircle,
  XCircle,
  UserCog,
  FileSignature,
  Activity,
  AlertTriangle,
  TrendingUp,
  Lock,
  Unlock,
  LogOut,
  ShieldX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { mockAgentsDetails, AgentPermission } from "../../data/agentsData";

export function AdminAgentDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const agentId = params.agentId || "1";
  const agent = mockAgentsDetails[agentId];

  const [filterArtist, setFilterArtist] = useState<string>("all");
  const [filterActionType, setFilterActionType] = useState<string>("all");

  if (!agent) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Agent introuvable</p>
          <Button
            onClick={() => navigate("/admin/agents")}
            className="bg-[#1DB954] hover:bg-[#1ED760] text-white"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour aux agents
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    if (agent.status === "active") {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle className="size-3 mr-1" />
          Actif
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200">
        <XCircle className="size-3 mr-1" />
        Suspendu
      </Badge>
    );
  };

  const getActivityBadge = () => {
    const config = {
      normal: {
        icon: ShieldCheck,
        label: "Activité normale",
        className: "bg-green-100 text-green-700 border-green-200",
      },
      monitor: {
        icon: ShieldAlert,
        label: "Activité à surveiller",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      },
      critical: {
        icon: ShieldX,
        label: "Activité critique",
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };

    const status = config[agent.activityStatus];
    const Icon = status.icon;
    return (
      <Badge className={status.className}>
        <Icon className="size-3 mr-1" />
        {status.label}
      </Badge>
    );
  };

  const getPermissionBadges = (permissions: AgentPermission) => {
    const permissionsList = [
      { key: "read_messages", icon: MessageSquare, label: "Lire messages" },
      { key: "reply_messages", icon: MessageSquareReply, label: "Répondre messages" },
      { key: "manage_availability", icon: CalendarClock, label: "Gérer disponibilités" },
      {
        key: "accept_refuse_requests",
        icon: CheckCircle,
        label: "Accepter / Refuser demandes",
      },
      { key: "edit_profile", icon: UserCog, label: "Modifier profil" },
      { key: "manage_contracts", icon: FileSignature, label: "Gérer contrats" },
    ];

    return permissionsList
      .filter((p) => permissions[p.key as keyof AgentPermission])
      .map((p) => (
        <Badge
          key={p.key}
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 text-xs"
        >
          <p.icon className="size-3 mr-1" />
          {p.label}
        </Badge>
      ));
  };

  const getActionIcon = (type: string) => {
    const icons = {
      message: MessageSquare,
      booking: CheckCircle,
      availability: CalendarClock,
      profile: UserCog,
      contract: FileSignature,
    };
    const Icon = icons[type as keyof typeof icons] || Activity;
    return <Icon className="size-4 text-gray-600" />;
  };

  const filteredActivity = agent.recentActivity.filter((act) => {
    const artistMatch = filterArtist === "all" || act.artistName === filterArtist;
    const typeMatch = filterActionType === "all" || act.type === filterActionType;
    return artistMatch && typeMatch;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Header Navigation */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/agents")}
          className="gap-2 -ml-2 mb-4"
        >
          <ArrowLeft className="size-4" />
          Retour
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Détail agent : {agent.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestion des accès et surveillance de l'activité
          </p>
        </div>
      </div>

      {/* Header Agent */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="size-20 border-2 border-gray-200">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="bg-gray-100 text-gray-600 text-lg">
                  {agent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{agent.name}</h2>
                  {getStatusBadge()}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-gray-400" />
                    {agent.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-gray-400" />
                    {agent.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-gray-400" />
                    Membre depuis {agent.memberSince}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gray-400" />
                    Dernière connexion : {agent.lastLogin}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {agent.status === "active" ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <UserX className="size-4 mr-2" />
                  Suspendre agent
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="size-4 mr-2" />
                  Réactiver
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
              >
                <Key className="size-4 mr-2" />
                Réinitialiser mot de passe
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <FileText className="size-4 mr-2" />
                Voir logs complets
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche - 65% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Accès artistes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Comptes artistes accessibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {agent.artistAccess.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun accès artiste</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artiste</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>Date invitation</TableHead>
                        <TableHead>Accordé par</TableHead>
                        <TableHead>Dernière action</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agent.artistAccess.map((access) => (
                        <TableRow key={access.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-10">
                                <AvatarImage src={access.artistAvatar} />
                                <AvatarFallback className="bg-gray-100 text-gray-600">
                                  {access.artistName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-gray-900 font-medium">
                                {access.artistName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {access.artistStatus === "approved" ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                Approuvé
                              </Badge>
                            ) : access.artistStatus === "pending" ? (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                En attente
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-700 border-red-200">
                                Refusé
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {getPermissionBadges(access.permissions)}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {access.invitationDate}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {access.grantedBy}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-gray-900 text-sm">{access.lastAction}</p>
                              <p className="text-gray-500 text-xs">
                                {access.lastActionDate}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <Eye className="size-4 mr-1" />
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section Activité récente */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Activité récente</CardTitle>
                <div className="flex gap-2">
                  <select
                    value={filterArtist}
                    onChange={(e) => setFilterArtist(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tous les artistes</option>
                    {Array.from(
                      new Set(
                        agent.recentActivity
                          .map((a) => a.artistName)
                          .filter(Boolean)
                      )
                    ).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterActionType}
                    onChange={(e) => setFilterActionType(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tous les types</option>
                    <option value="message">Messages</option>
                    <option value="booking">Bookings</option>
                    <option value="availability">Disponibilités</option>
                    <option value="profile">Profil</option>
                    <option value="contract">Contrats</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivity.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Aucune activité trouvée
                  </p>
                ) : (
                  filteredActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0">
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getActionIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">
                              {activity.action}
                            </p>
                            {activity.artistName && (
                              <p className="text-sm text-gray-600 mt-0.5">
                                Pour {activity.artistName}
                              </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                              {activity.details}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section Indicateurs globaux */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="size-5 text-gray-600" />
                Indicateurs globaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    {agent.stats.activeAccess}
                  </p>
                  <p className="text-sm text-gray-600">Accès actifs</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-red-600 mb-1">
                    {agent.stats.revokedAccess}
                  </p>
                  <p className="text-sm text-gray-600">Accès révoqués</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {agent.stats.requestsManaged}
                  </p>
                  <p className="text-sm text-gray-600">Demandes gérées</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {agent.stats.acceptanceRate}%
                  </p>
                  <p className="text-sm text-gray-600">Taux d'acceptation</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {agent.stats.relatedReports}
                  </p>
                  <p className="text-sm text-gray-600">Signalements liés</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
                  {getActivityBadge()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Alertes & Sécurité */}
          {agent.alerts.length > 0 && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="size-5 text-orange-600" />
                  Alertes & Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agent.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${
                        alert.severity === "critical"
                          ? "bg-red-50 border-red-200"
                          : "bg-orange-50 border-orange-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            alert.severity === "critical"
                              ? "bg-red-100"
                              : "bg-orange-100"
                          }`}
                        >
                          <ShieldAlert
                            className={`size-4 ${
                              alert.severity === "critical"
                                ? "text-red-600"
                                : "text-orange-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              alert.severity === "critical"
                                ? "text-red-700"
                                : "text-orange-700"
                            }`}
                          >
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Colonne droite - 35% - Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Carte Résumé agent */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Résumé agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Email vérifié</span>
                  {agent.emailVerified ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <XCircle className="size-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Téléphone vérifié</span>
                  {agent.phoneVerified ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <XCircle className="size-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">2FA activée</span>
                  {agent.twoFactorEnabled ? (
                    <ShieldCheck className="size-5 text-green-600" />
                  ) : (
                    <ShieldX className="size-5 text-gray-400" />
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-600 mb-1">Dernière activité</p>
                  <p className="text-gray-900 font-medium">{agent.lastLogin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total actions</p>
                  <p className="text-gray-900 font-medium">
                    {agent.recentActivity.length} actions récentes
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Carte Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Lock className="size-4 mr-2" />
                  Suspendre tous les accès
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <Unlock className="size-4 mr-2" />
                  Révoquer accès spécifique
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <LogOut className="size-4 mr-2" />
                  Forcer déconnexion
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <ShieldX className="size-4 mr-2" />
                  Désactiver permissions sensibles
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
