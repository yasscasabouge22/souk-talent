import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Ban,
  AlertTriangle,
  Building2,
  User,
  CheckCircle,
  Eye,
  Shield,
  ShieldCheck,
  TrendingUp,
  Activity,
  UserX,
  Star,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  XCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import { toast } from "sonner";

export function AdminOrganizerDetail() {
  const { organizerId } = useParams();
  const navigate = useNavigate();
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [showRestrictDialog, setShowRestrictDialog] = useState(false);
  const [showVIPDialog, setShowVIPDialog] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [restrictReason, setRestrictReason] = useState("");
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);

  // Mock data - En production, fetch depuis l'API
  const organizer = {
    id: organizerId,
    name: "Events Maroc",
    type: "Entreprise",
    email: "contact@eventsmaroc.com",
    phone: "+212 5XX XXX XXX",
    phoneVerified: true,
    city: "Casablanca",
    address: "123 Boulevard Mohammed V, Casablanca",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    createdAt: "2024-12-15T10:30:00",
    lastLogin: "2025-02-24T09:15:00",
    
    // Informations entreprise
    companyInfo: {
      legalName: "Events Maroc SARL",
      registrationNumber: "RC 123456",
      taxId: "IF 78901234",
      website: "https://eventsmaroc.com",
    },
    
    // Contact principal
    contactPerson: {
      name: "Mohammed Alami",
      position: "Directeur Événementiel",
      email: "m.alami@eventsmaroc.com",
      phone: "+212 6XX XXX XXX",
    },
    
    // Statistiques
    stats: {
      totalRequests: 23,
      acceptedRequests: 18,
      rejectedRequests: 3,
      pendingRequests: 2,
      cancelledRequests: 1,
      totalSpent: "340,000 MAD",
      averageRequestValue: "14,783 MAD",
      requestsLast30Days: 5,
      acceptanceRate: 78,
      rejectionRate: 13,
      cancellationRate: 4,
    },
    
    // Score fiabilité
    trustScore: {
      score: 82,
      level: "low_risk", // "low_risk" | "medium_risk" | "high_risk"
      validatedRequests: 23,
      activeDisputes: 0,
      pastReports: 1,
      budgetConsistency: true,
    },
    
    // Comportement récent
    recentBehavior: {
      requestsLast7Days: 2,
      requestsLast30Days: 5,
      uniqueArtistsContacted: 8,
      unusualActivity: false,
    },
    
    // Historique demandes (avec données enrichies)
    recentRequests: [
      {
        id: "BR-1001",
        artist: "DJ Mehdi",
        event: "Mariage",
        date: "2025-03-15",
        budget: "15,000 MAD",
        status: "accepted",
        createdAt: "2025-02-20",
        cancelled: false,
        dispute: false,
        withAgent: false,
      },
      {
        id: "BR-0987",
        artist: "Orchestre Andalous",
        event: "Événement corporatif",
        date: "2025-04-01",
        budget: "35,000 MAD",
        status: "accepted",
        createdAt: "2025-02-15",
        cancelled: false,
        dispute: false,
        withAgent: true,
      },
      {
        id: "BR-0945",
        artist: "Sara Vocals",
        event: "Soirée privée",
        date: "2025-03-25",
        budget: "20,000 MAD",
        status: "pending",
        createdAt: "2025-02-22",
        cancelled: false,
        dispute: false,
        withAgent: false,
      },
      {
        id: "BR-0876",
        artist: "DJ Karim",
        event: "Anniversaire",
        date: "2025-02-10",
        budget: "12,000 MAD",
        status: "accepted",
        createdAt: "2025-01-20",
        cancelled: true,
        dispute: true,
        withAgent: false,
      },
    ],
    
    // Signalements (avec historique)
    reports: [
      {
        id: 1,
        type: "late_payment",
        reporter: "DJ Karim",
        date: "2025-01-15",
        status: "resolved",
        description: "Retard de paiement de 15 jours",
      },
    ],
    totalReports: 1,
    activeReports: 0,
    
    // Historique activité
    activityLog: [
      { date: "2025-02-24", action: "Connexion", details: "Casablanca, MA" },
      { date: "2025-02-23", action: "Demande envoyée", details: "À Sara Vocals" },
      { date: "2025-02-20", action: "Demande acceptée", details: "DJ Mehdi" },
    ],
  };

  // Handlers
  const handleSuspend = () => {
    if (!suspendReason.trim()) {
      toast.error("Veuillez indiquer une raison de suspension");
      return;
    }
    toast.warning("Organisateur suspendu", {
      description: "Un email de notification a été envoyé",
    });
    setShowSuspendDialog(false);
    setSuspendReason("");
    navigate("/admin/organisateurs");
  };

  const handleSendWarning = () => {
    if (!warningMessage.trim()) {
      toast.error("Veuillez saisir un message d'avertissement");
      return;
    }
    toast.success("Avertissement envoyé", {
      description: "L'organisateur a reçu un email d'avertissement",
    });
    setShowWarningDialog(false);
    setWarningMessage("");
  };

  const handleRestrict = () => {
    if (!restrictReason.trim()) {
      toast.error("Veuillez indiquer une raison");
      return;
    }
    toast.info("Restrictions appliquées", {
      description: "L'organisateur ne peut envoyer que 3 demandes par mois",
    });
    setShowRestrictDialog(false);
    setRestrictReason("");
  };

  const handleMarkVIP = () => {
    toast.success("Organisateur marqué VIP", {
      description: "Accès prioritaire et avantages activés",
    });
    setShowVIPDialog(false);
  };

  const handleForceVerify = () => {
    toast.info("Vérification forcée", {
      description: "L'organisateur devra vérifier son identité à la prochaine connexion",
    });
    setShowVerifyDialog(false);
  };

  const handleViewPublic = () => {
    window.open(`/public/organisateur/${organizerId}`, "_blank");
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      accepted: { label: "Accepté", className: "bg-green-100 text-green-700 border-green-200" },
      rejected: { label: "Refusé", className: "bg-red-100 text-red-700 border-red-200" },
    };
    return configs[status] || configs.pending;
  };

  // Trust score config
  const getTrustScoreConfig = (level: string) => {
    const configs = {
      low_risk: {
        label: "Faible risque",
        icon: ShieldCheck,
        className: "bg-green-100 text-green-700 border-green-200",
        iconColor: "text-green-600",
        barColor: "bg-green-600",
      },
      medium_risk: {
        label: "Risque modéré",
        icon: ShieldAlert,
        className: "bg-orange-100 text-orange-700 border-orange-200",
        iconColor: "text-orange-600",
        barColor: "bg-orange-600",
      },
      high_risk: {
        label: "Risque élevé",
        icon: Shield,
        className: "bg-red-100 text-red-700 border-red-200",
        iconColor: "text-red-600",
        barColor: "bg-red-600",
      },
    };
    return configs[level as keyof typeof configs] || configs.medium_risk;
  };

  const trustConfig = getTrustScoreConfig(organizer.trustScore.level);
  const TrustIcon = trustConfig.icon;

  return (
    <div className="space-y-6 pb-24">
      {/* En-tête amélioré */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/organisateurs")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{organizer.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-gray-100">
                {organizer.type}
              </Badge>
              <Badge
                variant="outline"
                className={
                  organizer.status === "active"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-gray-200 text-gray-700 border-gray-300"
                }
              >
                {organizer.status === "active" ? "Actif" : "Suspendu"}
              </Badge>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleViewPublic}
        >
          <Eye className="h-4 w-4" />
          Voir profil côté client
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale (60%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={organizer.avatar} alt={organizer.name} />
                  <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{organizer.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID: {organizerId}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{organizer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{organizer.phone}</p>
                      {organizer.phoneVerified && (
                        <CheckCircle className="h-4 w-4 text-green-600" title="Vérifié" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Ville</p>
                    <p className="text-sm font-medium text-gray-900">{organizer.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Membre depuis</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(organizer.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>

              {organizer.type === "Entreprise" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Informations entreprise
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                      <div>
                        <p className="text-xs text-gray-500">Raison sociale</p>
                        <p className="text-sm text-gray-900">{organizer.companyInfo.legalName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">RC</p>
                        <p className="text-sm text-gray-900">{organizer.companyInfo.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">IF</p>
                        <p className="text-sm text-gray-900">{organizer.companyInfo.taxId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Site web</p>
                        <a
                          href={organizer.companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#1DB954] hover:underline"
                        >
                          {organizer.companyInfo.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Contact principal
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                      <div>
                        <p className="text-xs text-gray-500">Nom</p>
                        <p className="text-sm text-gray-900">{organizer.contactPerson.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fonction</p>
                        <p className="text-sm text-gray-900">{organizer.contactPerson.position}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{organizer.contactPerson.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Téléphone</p>
                        <p className="text-sm text-gray-900">{organizer.contactPerson.phone}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Historique des demandes (amélioré) */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des demandes</CardTitle>
              <CardDescription>Demandes de booking envoyées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Artiste</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-center">Annulée</TableHead>
                      <TableHead className="text-center">Litige</TableHead>
                      <TableHead className="text-center">Agent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organizer.recentRequests.map((request) => {
                      const statusConfig = getStatusBadge(request.status);
                      const hasIssue = request.cancelled || request.dispute;
                      return (
                        <TableRow 
                          key={request.id}
                          className={hasIssue && request.dispute ? "bg-red-50/30" : ""}
                        >
                          <TableCell className="font-medium text-gray-900">{request.id}</TableCell>
                          <TableCell className="text-gray-600">{request.artist}</TableCell>
                          <TableCell className="text-gray-600">{request.event}</TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(request.date).toLocaleDateString("fr-FR")}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{request.budget}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusConfig.className}>
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {request.cancelled ? (
                              <CheckCircle className="h-4 w-4 text-orange-600 mx-auto" />
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {request.dispute ? (
                              <AlertTriangle className="h-4 w-4 text-red-600 mx-auto" />
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {request.withAgent ? (
                              <CheckCircle className="h-4 w-4 text-blue-600 mx-auto" />
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Signalements (amélioré) */}
          {organizer.totalReports > 0 && (
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-orange-900">
                      Signalements
                      <Badge variant="outline" className="ml-3 bg-orange-100 border-orange-300">
                        {organizer.totalReports} total
                      </Badge>
                    </CardTitle>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      organizer.activeReports === 0
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }
                  >
                    {organizer.activeReports === 0 ? "Tous résolus" : `${organizer.activeReports} en cours`}
                  </Badge>
                </div>
                <CardDescription>Plaintes ou problèmes signalés</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Signalements actifs */}
                {organizer.reports.filter(r => r.status !== "resolved").map((report) => (
                  <div key={report.id} className="p-3 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{report.type.replace(/_/g, " ")}</p>
                        <p className="text-sm text-gray-600">Par {report.reporter}</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        En cours
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(report.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))}

                {/* Accordéon pour signalements passés */}
                {organizer.reports.filter(r => r.status === "resolved").length > 0 && (
                  <Collapsible open={isReportsExpanded} onOpenChange={setIsReportsExpanded}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-sm text-gray-600 hover:bg-orange-100/50"
                      >
                        <span>Signalements résolus ({organizer.reports.filter(r => r.status === "resolved").length})</span>
                        {isReportsExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {organizer.reports.filter(r => r.status === "resolved").map((report) => (
                        <div key={report.id} className="p-3 bg-white rounded-lg border border-green-200">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{report.type.replace(/_/g, " ")}</p>
                              <p className="text-sm text-gray-600">Par {report.reporter}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              Résolu
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{report.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(report.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Colonne latérale sticky (40%) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="lg:sticky lg:top-6 space-y-4">
            {/* 1. Score de fiabilité (NOUVEAU) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Analyse du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Score fiabilité</span>
                    <span className="text-2xl font-bold text-gray-900">{organizer.trustScore.score}%</span>
                  </div>
                  <Progress 
                    value={organizer.trustScore.score} 
                    className={`h-2 ${trustConfig.barColor}`}
                  />
                </div>

                <Badge variant="outline" className={`w-full justify-center py-2 ${trustConfig.className}`}>
                  <TrustIcon className={`h-4 w-4 mr-2 ${trustConfig.iconColor}`} />
                  {trustConfig.label}
                </Badge>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{organizer.trustScore.validatedRequests} demandes validées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {organizer.trustScore.activeDisputes === 0 ? (
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    )}
                    <span className={organizer.trustScore.activeDisputes === 0 ? "text-gray-700" : "text-red-600"}>
                      {organizer.trustScore.activeDisputes === 0 ? "Aucun litige actif" : `${organizer.trustScore.activeDisputes} litige(s) actif(s)`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {organizer.trustScore.pastReports === 0 ? (
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    )}
                    <span className={organizer.trustScore.pastReports === 0 ? "text-gray-700" : "text-orange-600"}>
                      {organizer.trustScore.pastReports === 0 ? "Aucun signalement" : `${organizer.trustScore.pastReports} signalement passé`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {organizer.trustScore.budgetConsistency ? (
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    )}
                    <span className={organizer.trustScore.budgetConsistency ? "text-gray-700" : "text-orange-600"}>
                      {organizer.trustScore.budgetConsistency ? "Budget cohérent" : "Budget incohérent"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Statistiques (amélioré) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Total demandes</p>
                  <p className="text-2xl font-bold text-gray-900">{organizer.stats.totalRequests}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Acceptées</p>
                    <p className="text-lg font-bold text-green-600">{organizer.stats.acceptedRequests}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Refusées</p>
                    <p className="text-lg font-bold text-red-600">{organizer.stats.rejectedRequests}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">En cours</p>
                    <p className="text-lg font-bold text-yellow-600">{organizer.stats.pendingRequests}</p>
                  </div>
                </div>

                <Separator />

                {/* Taux (NOUVEAU) */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Taux d'acceptation</span>
                      <span className="text-sm font-semibold text-green-600">{organizer.stats.acceptanceRate}%</span>
                    </div>
                    <Progress value={organizer.stats.acceptanceRate} className="h-1.5 bg-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Taux de refus</span>
                      <span className="text-sm font-semibold text-red-600">{organizer.stats.rejectionRate}%</span>
                    </div>
                    <Progress value={organizer.stats.rejectionRate} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Taux d'annulation</span>
                      <span className="text-sm font-semibold text-orange-600">{organizer.stats.cancellationRate}%</span>
                    </div>
                    <Progress value={organizer.stats.cancellationRate} className="h-1.5" />
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-gray-500">Total dépensé</p>
                  <p className="text-xl font-bold text-gray-900">{organizer.stats.totalSpent}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Montant moyen/demande</p>
                  <p className="text-lg font-medium text-gray-900">{organizer.stats.averageRequestValue}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Demandes 30 derniers jours</p>
                  <p className="text-lg font-semibold text-gray-900">{organizer.stats.requestsLast30Days}</p>
                </div>

                <Separator />

                {/* Indicateur comportement (NOUVEAU) */}
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Comportement stable</span>
                </div>
              </CardContent>
            </Card>

            {/* 3. Comportement récent (NOUVEAU) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Comportement récent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">7 derniers jours</p>
                    <p className="text-2xl font-bold text-gray-900">{organizer.recentBehavior.requestsLast7Days}</p>
                    <p className="text-xs text-gray-500">demandes</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">30 derniers jours</p>
                    <p className="text-2xl font-bold text-gray-900">{organizer.recentBehavior.requestsLast30Days}</p>
                    <p className="text-xs text-gray-500">demandes</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-gray-500 mb-1">Artistes contactés différents</p>
                  <p className="text-lg font-bold text-gray-900">{organizer.recentBehavior.uniqueArtistsContacted}</p>
                </div>

                <Separator />

                <div className={`flex items-center gap-2 p-2 rounded-lg border ${
                  organizer.recentBehavior.unusualActivity 
                    ? "bg-red-50 border-red-200" 
                    : "bg-green-50 border-green-200"
                }`}>
                  {organizer.recentBehavior.unusualActivity ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700 font-medium">Activité inhabituelle détectée</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">Activité normale</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 4. Activité récente */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {organizer.activityLog.map((activity, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.date).toLocaleDateString("fr-FR")}
                      </p>
                      {index < organizer.activityLog.length - 1 && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Actions (amélioré et sticky) */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Actions administrateur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => setShowWarningDialog(true)}
                >
                  <Mail className="h-4 w-4" />
                  Envoyer avertissement
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => setShowRestrictDialog(true)}
                >
                  <UserX className="h-4 w-4" />
                  Restreindre demandes
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setShowSuspendDialog(true)}
                  disabled={organizer.status === "suspended"}
                >
                  <Ban className="h-4 w-4" />
                  Suspendre compte
                </Button>

                <Separator />

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-[#1DB954] border-[#1DB954]/30 hover:bg-[#1DB954]/10"
                  onClick={() => setShowVIPDialog(true)}
                >
                  <Star className="h-4 w-4" />
                  Marquer VIP
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                  onClick={() => setShowVerifyDialog(true)}
                >
                  <Shield className="h-4 w-4" />
                  Forcer vérification identité
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modales */}
      
      {/* Dialog Suspension */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspendre l'organisateur</DialogTitle>
            <DialogDescription>
              Cette action suspendra le compte. L'organisateur ne pourra plus accéder à la plateforme.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="suspend-reason">Raison de la suspension *</Label>
            <Textarea
              id="suspend-reason"
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="Ex: Comportement abusif, non-respect des CGU, fraude..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleSuspend}
              disabled={!suspendReason.trim()}
            >
              Confirmer la suspension
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Avertissement */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un avertissement</DialogTitle>
            <DialogDescription>
              Un email d'avertissement sera envoyé à {organizer.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="warning-message">Message d'avertissement *</Label>
            <Textarea
              id="warning-message"
              value={warningMessage}
              onChange={(e) => setWarningMessage(e.target.value)}
              placeholder="Décrivez le problème et les actions correctives attendues..."
              rows={6}
            />
            <p className="text-xs text-gray-500">
              L'email sera envoyé à : {organizer.email}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarningDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleSendWarning}
              disabled={!warningMessage.trim()}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Envoyer l'avertissement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Restreindre */}
      <Dialog open={showRestrictDialog} onOpenChange={setShowRestrictDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restreindre les demandes</DialogTitle>
            <DialogDescription>
              L'organisateur sera limité à 3 demandes par mois
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="restrict-reason">Raison de la restriction *</Label>
            <Textarea
              id="restrict-reason"
              value={restrictReason}
              onChange={(e) => setRestrictReason(e.target.value)}
              placeholder="Ex: Trop de demandes annulées, spam..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestrictDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleRestrict}
              disabled={!restrictReason.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Appliquer les restrictions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog VIP */}
      <Dialog open={showVIPDialog} onOpenChange={setShowVIPDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marquer comme VIP</DialogTitle>
            <DialogDescription>
              L'organisateur recevra des avantages premium et un accès prioritaire
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Star className="h-5 w-5 text-[#1DB954]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  Avantages VIP
                </p>
                <ul className="text-xs text-green-700 mt-2 space-y-1">
                  <li>• Accès prioritaire aux artistes populaires</li>
                  <li>• Support client dédié</li>
                  <li>• Badge VIP sur le profil</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVIPDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleMarkVIP}
              className="bg-[#1DB954] hover:bg-[#1DB954]/90"
            >
              Confirmer statut VIP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Vérification */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forcer la vérification d'identité</DialogTitle>
            <DialogDescription>
              L'organisateur devra vérifier son identité à la prochaine connexion
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  Documents requis
                </p>
                <ul className="text-xs text-blue-700 mt-2 space-y-1">
                  <li>• Carte d'identité ou passeport</li>
                  <li>• Justificatif d'entreprise (si applicable)</li>
                  <li>• Vérification par selfie</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleForceVerify}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Forcer la vérification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
