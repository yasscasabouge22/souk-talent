import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  Check, 
  X, 
  AlertCircle, 
  Ban,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Instagram,
  Youtube,
  Music,
  DollarSign,
  Shield,
  ExternalLink,
  CheckCircle,
  Eye,
  Download,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  User,
  Video,
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  TrendingUp
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import { Skeleton } from "../../components/ui/skeleton";

export function AdminArtistReview() {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Modales states
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRequestInfoDialog, setShowRequestInfoDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);

  // Form states
  const [rejectReason, setRejectReason] = useState("");
  const [rejectMessage, setRejectMessage] = useState("");
  const [suspendReason, setSuspendReason] = useState("");
  const [requestInfoChecks, setRequestInfoChecks] = useState({
    videos: false,
    phone: false,
    socials: false,
    pricing: false,
    techSheet: false,
  });
  const [requestInfoMessage, setRequestInfoMessage] = useState("");

  // Mock data - En production, fetch depuis l'API
  const artist = {
    id: artistId,
    stageName: "DJ Mehdi",
    realName: "Mehdi El Alaoui",
    email: "mehdi@example.com",
    emailVerified: true,
    phone: "+212 6XX XXX XXX",
    phoneVerified: false,
    city: "Casablanca",
    category: "DJ",
    hasAgent: false,
    agentName: null,
    
    // Status
    status: "pending",
    visiblePublic: false,
    createdAt: "2025-02-20T10:30:00",
    creationIP: "41.140.XXX.XXX",
    
    // Booking info
    pricing: {
      min: 3500,
      max: 5000,
      currency: "MAD",
    },
    musicGenres: ["House", "Deep House", "Tech House", "Afro House"],
    eventTypes: ["Mariage", "Anniversaire", "Événement corporate", "Soirée privée"],
    availabilityEnabled: true,
    
    // Bio
    bio: "DJ professionnel basé à Casablanca avec 8 ans d'expérience. Spécialisé dans la house et ses dérivés, j'ai mixé dans les plus grands clubs du Maroc et animé plus de 200 événements privés. Mon style musical mélange les sons électroniques modernes avec des touches d'afro house pour créer une ambiance unique et festive.",
    
    // Media
    media: {
      photos: [
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800",
        "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=800",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      ],
      videos: [
        { url: "https://example.com/video1.mp4", thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", hd: true },
      ],
      lastUpdate: "2025-02-21",
    },
    
    // Social
    socials: {
      instagram: {
        username: "@djmehdi.ma",
        followers: 12500,
        url: "https://instagram.com/djmehdi.ma",
      },
      youtube: {
        username: "DJ Mehdi",
        followers: 3200,
        url: "https://youtube.com/@djmehdi",
      },
      tiktok: null,
    },
    
    // Files
    presskit: true,
    techSheet: false,
    
    // Historique
    history: [
      { date: "2025-02-20T10:30", action: "Compte créé" },
      { date: "2025-02-20T11:00", action: "Profil soumis pour validation" },
      { date: "2025-02-21T09:15", action: "Ajout vidéo performance" },
      { date: "2025-02-21T14:30", action: "Modification tarif (3000 → 3500 MAD)" },
    ],
    
    // Profile completion
    completion: {
      total: 85,
      checks: {
        photo: true,
        minMedia: true,
        bio: true,
        social: true,
        phoneVerified: false,
      },
    },
    
    // Risk assessment
    risk: {
      level: "warning", // "safe" | "warning" | "danger"
      indicators: {
        duplicateEmail: false,
        duplicatePhone: false,
        insufficientMedia: false,
        recentAccount: true,
        suspiciousIP: false,
      },
    },
    
    // Market comparison
    marketComparison: {
      declaredPrice: 4000,
      categoryAvg: { min: 3500, max: 5000 },
      category: "DJ",
      location: "Casablanca",
    },
  };

  // Calculate risk level
  const getRiskConfig = (level: string) => {
    const configs = {
      safe: {
        label: "Profil fiable",
        icon: ShieldCheck,
        className: "bg-green-100 text-green-700 border-green-200",
        iconColor: "text-green-600",
      },
      warning: {
        label: "À vérifier",
        icon: ShieldAlert,
        className: "bg-orange-100 text-orange-700 border-orange-200",
        iconColor: "text-orange-600",
      },
      danger: {
        label: "Suspect",
        icon: ShieldX,
        className: "bg-red-100 text-red-700 border-red-200",
        iconColor: "text-red-600",
      },
    };
    return configs[level as keyof typeof configs] || configs.warning;
  };

  const riskConfig = getRiskConfig(artist.risk.level);
  const RiskIcon = riskConfig.icon;

  // Actions
  const handleApprove = () => {
    toast.success("Profil approuvé", {
      description: `${artist.stageName} peut maintenant être visible publiquement`,
    });
    setShowApproveDialog(false);
    navigate("/admin/artistes");
  };

  const handleReject = () => {
    if (!rejectReason) {
      toast.error("Veuillez sélectionner une raison");
      return;
    }
    toast.error("Profil rejeté", {
      description: `${artist.stageName} a été notifié par email`,
    });
    setShowRejectDialog(false);
    navigate("/admin/artistes");
  };

  const handleRequestInfo = () => {
    const selectedChecks = Object.values(requestInfoChecks).filter(Boolean).length;
    if (selectedChecks === 0 && !requestInfoMessage) {
      toast.error("Veuillez sélectionner au moins une demande");
      return;
    }
    toast.info("Demande d'informations envoyée", {
      description: `${artist.stageName} recevra un email avec les demandes`,
    });
    setShowRequestInfoDialog(false);
    navigate("/admin/artistes");
  };

  const handleSuspend = () => {
    if (!suspendReason) {
      toast.error("Veuillez préciser une raison");
      return;
    }
    toast.warning("Compte suspendu", {
      description: `${artist.stageName} ne peut plus accéder à son compte`,
    });
    setShowSuspendDialog(false);
    navigate("/admin/artistes");
  };

  const handleViewPublic = () => {
    window.open(`/public/artiste/${artistId}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-64" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-64" />
          </div>
          <div>
            <Skeleton className="h-[600px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/artistes")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Review : {artist.stageName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Analyse et validation du profil artiste
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleViewPublic}
        >
          <Eye className="h-4 w-4" />
          Aperçu profil public
        </Button>
      </div>

      {/* Layout 3 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLONNE GAUCHE - Infos principales */}
        <div className="lg:col-span-3 space-y-4">
          {/* Carte Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" />
                  <AvatarFallback>{artist.stageName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mt-3">{artist.stageName}</h3>
                <p className="text-sm text-gray-500">{artist.realName}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{artist.city}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{artist.category}</Badge>
                  {artist.hasAgent && (
                    <Badge variant="outline" className="bg-gray-100">
                      Avec agent
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{artist.phone}</span>
                  {artist.phoneVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{artist.email}</span>
                  {artist.emailVerified && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte Infos Booking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Infos Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Tarifs déclarés</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {artist.pricing.min.toLocaleString()} - {artist.pricing.max.toLocaleString()} {artist.pricing.currency}
                </p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Music className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Styles musicaux</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {artist.musicGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Types d'événements</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {artist.eventTypes.slice(0, 3).map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                  {artist.eventTypes.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{artist.eventTypes.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Disponibilités publiques</span>
                <Badge
                  variant={artist.availabilityEnabled ? "default" : "secondary"}
                  className={
                    artist.availabilityEnabled
                      ? "bg-green-600"
                      : ""
                  }
                >
                  {artist.availabilityEnabled ? "Activées" : "Désactivées"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Carte Score qualité profil */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Score qualité profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Complétude</span>
                  <span className="text-lg font-bold text-green-600">
                    {artist.completion.total}%
                  </span>
                </div>
                <Progress
                  value={artist.completion.total}
                  className="h-2"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {artist.completion.checks.photo ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className={artist.completion.checks.photo ? "text-gray-700" : "text-red-600"}>
                    Photo profil
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {artist.completion.checks.minMedia ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className={artist.completion.checks.minMedia ? "text-gray-700" : "text-red-600"}>
                    2 médias minimum
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {artist.completion.checks.bio ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className={artist.completion.checks.bio ? "text-gray-700" : "text-red-600"}>
                    Bio &gt; 300 caractères
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {artist.completion.checks.social ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className={artist.completion.checks.social ? "text-gray-700" : "text-red-600"}>
                    Lien social
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {artist.completion.checks.phoneVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span className={artist.completion.checks.phoneVerified ? "text-gray-700" : "text-red-600"}>
                    Téléphone vérifié
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLONNE CENTRALE - Contenu & Médias */}
        <div className="lg:col-span-6 space-y-4">
          {/* Section Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Biographie</CardTitle>
              <CardDescription>{artist.bio.length} caractères</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{artist.bio}</p>
            </CardContent>
          </Card>

          {/* Section Médias */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Médias</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    {artist.media.photos.length} photos
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    {artist.media.videos.length} vidéos
                  </span>
                </div>
              </div>
              <CardDescription>
                Dernière mise à jour : {new Date(artist.media.lastUpdate).toLocaleDateString("fr-FR")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Photos */}
              <div>
                <h4 className="text-sm font-medium mb-3">Photos</h4>
                <div className="grid grid-cols-3 gap-3">
                  {artist.media.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={photo}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Vidéos */}
              {artist.media.videos.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-3">Vidéos</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {artist.media.videos.map((video, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
                        >
                          <img
                            src={video.thumbnail}
                            alt={`Vidéo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white rounded-full p-3">
                              <Video className="h-6 w-6 text-gray-900" />
                            </div>
                          </div>
                          {video.hd && (
                            <Badge className="absolute top-2 right-2 bg-black/70 text-white text-xs">
                              HD
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Section Réseaux sociaux */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Réseaux sociaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {artist.socials.instagram ? (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{artist.socials.instagram.username}</p>
                      <p className="text-xs text-gray-500">
                        {artist.socials.instagram.followers.toLocaleString()} abonnés
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(artist.socials.instagram.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              {artist.socials.youtube ? (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600 rounded-lg">
                      <Youtube className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{artist.socials.youtube.username}</p>
                      <p className="text-xs text-gray-500">
                        {artist.socials.youtube.followers.toLocaleString()} abonnés
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(artist.socials.youtube.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              {!artist.socials.instagram && !artist.socials.youtube && !artist.socials.tiktok && (
                <div className="flex items-center justify-center p-6 border border-dashed rounded-lg">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    Aucun réseau connecté
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section Presskit & Fiche technique */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!artist.presskit}
              >
                <Download className="h-4 w-4" />
                {artist.presskit ? "Télécharger Presskit" : "Presskit non disponible"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!artist.techSheet}
              >
                <Download className="h-4 w-4" />
                {artist.techSheet ? "Télécharger fiche technique" : "Fiche technique non disponible"}
              </Button>
            </CardContent>
          </Card>

          {/* Section Historique */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historique du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artist.history.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5" />
                      {idx < artist.history.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(item.date).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLONNE DROITE STICKY - Decision Panel */}
        <div className="lg:col-span-3">
          <div className="sticky top-6 space-y-4">
            {/* Carte Résumé & Analyse */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Résumé & Analyse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Statut actuel</span>
                    <Badge
                      variant="outline"
                      className="bg-orange-100 text-orange-700 border-orange-200"
                    >
                      En attente validation
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Visible public</span>
                    <Badge variant="outline" className="bg-gray-100">
                      NON
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Date création</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(artist.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">IP création</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {artist.creationIP}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Agent associé</span>
                    <span className="text-gray-900">
                      {artist.hasAgent ? artist.agentName : "Non"}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Risk Indicator */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Risk Indicator</h4>
                  <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${riskConfig.className}`}>
                    <RiskIcon className={`h-6 w-6 ${riskConfig.iconColor}`} />
                    <span className="font-semibold">{riskConfig.label}</span>
                  </div>

                  <div className="space-y-2 mt-3">
                    <div className="flex items-start gap-2 text-sm">
                      {artist.risk.indicators.duplicateEmail ? (
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={artist.risk.indicators.duplicateEmail ? "text-red-600" : "text-gray-700"}>
                        {artist.risk.indicators.duplicateEmail
                          ? "Doublon email détecté"
                          : "Aucun doublon email"}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      {artist.risk.indicators.duplicatePhone ? (
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={artist.risk.indicators.duplicatePhone ? "text-red-600" : "text-gray-700"}>
                        {artist.risk.indicators.duplicatePhone
                          ? "Doublon téléphone détecté"
                          : "Aucun doublon téléphone"}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      {!artist.phoneVerified ? (
                        <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={!artist.phoneVerified ? "text-orange-600" : "text-gray-700"}>
                        {!artist.phoneVerified
                          ? "Téléphone non vérifié"
                          : "Téléphone vérifié"}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      {artist.risk.indicators.insufficientMedia ? (
                        <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={artist.risk.indicators.insufficientMedia ? "text-orange-600" : "text-gray-700"}>
                        {artist.risk.indicators.insufficientMedia
                          ? "Médias insuffisants"
                          : "Médias suffisants"}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      {artist.risk.indicators.recentAccount ? (
                        <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={artist.risk.indicators.recentAccount ? "text-orange-600" : "text-gray-700"}>
                        {artist.risk.indicators.recentAccount
                          ? "Compte récent (< 7 jours)"
                          : "Compte ancien"}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Comparaison Marché */}
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <h4 className="text-sm font-semibold">Comparaison Marché</h4>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Tarif déclaré :</span>{" "}
                      {artist.marketComparison.declaredPrice.toLocaleString()} MAD
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Moyenne {artist.marketComparison.category} {artist.marketComparison.location} :</span>{" "}
                      {artist.marketComparison.categoryAvg.min.toLocaleString()} – {artist.marketComparison.categoryAvg.max.toLocaleString()} MAD
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Admin */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white"
                  onClick={() => setShowApproveDialog(true)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  APPROVE
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                  onClick={() => setShowRequestInfoDialog(true)}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  REQUEST MORE INFO
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  REJECT
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-gray-400 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowSuspendDialog(true)}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  SUSPEND
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* MODALE APPROVE */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer validation du profil</DialogTitle>
            <DialogDescription>
              Le profil de {artist.stageName} sera approuvé et visible publiquement sur la plateforme.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  L'artiste sera notifié par email
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Son profil apparaîtra dans les résultats de recherche
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Annuler
            </Button>
            <Button
              className="bg-[#1DB954] hover:bg-[#1DB954]/90"
              onClick={handleApprove}
            >
              Confirmer l'approbation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODALE REJECT */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter le profil</DialogTitle>
            <DialogDescription>
              Le profil de {artist.stageName} sera rejeté. L'artiste sera notifié par email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="reject-reason">Raison du rejet *</Label>
              <Select value={rejectReason} onValueChange={setRejectReason}>
                <SelectTrigger id="reject-reason" className="mt-1.5">
                  <SelectValue placeholder="Sélectionner une raison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete">Profil incomplet</SelectItem>
                  <SelectItem value="insufficient-media">Médias insuffisants</SelectItem>
                  <SelectItem value="identity">Identité non vérifiable</SelectItem>
                  <SelectItem value="duplicate">Doublon détecté</SelectItem>
                  <SelectItem value="fraud">Suspicion fraude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reject-message">Message personnalisé (optionnel)</Label>
              <Textarea
                id="reject-message"
                placeholder="Ajoutez des détails pour aider l'artiste à corriger son profil..."
                value={rejectMessage}
                onChange={(e) => setRejectMessage(e.target.value)}
                rows={4}
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason}
            >
              Rejeter le profil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODALE REQUEST INFO */}
      <Dialog open={showRequestInfoDialog} onOpenChange={setShowRequestInfoDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Demander plus d'informations</DialogTitle>
            <DialogDescription>
              Sélectionnez les éléments manquants que {artist.stageName} doit compléter.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="req-videos"
                  checked={requestInfoChecks.videos}
                  onCheckedChange={(checked) =>
                    setRequestInfoChecks({ ...requestInfoChecks, videos: checked as boolean })
                  }
                />
                <Label htmlFor="req-videos" className="cursor-pointer">
                  Ajouter 2 vidéos minimum
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="req-phone"
                  checked={requestInfoChecks.phone}
                  onCheckedChange={(checked) =>
                    setRequestInfoChecks({ ...requestInfoChecks, phone: checked as boolean })
                  }
                />
                <Label htmlFor="req-phone" className="cursor-pointer">
                  Vérifier téléphone
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="req-socials"
                  checked={requestInfoChecks.socials}
                  onCheckedChange={(checked) =>
                    setRequestInfoChecks({ ...requestInfoChecks, socials: checked as boolean })
                  }
                />
                <Label htmlFor="req-socials" className="cursor-pointer">
                  Ajouter réseaux sociaux
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="req-pricing"
                  checked={requestInfoChecks.pricing}
                  onCheckedChange={(checked) =>
                    setRequestInfoChecks({ ...requestInfoChecks, pricing: checked as boolean })
                  }
                />
                <Label htmlFor="req-pricing" className="cursor-pointer">
                  Clarifier tarif
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="req-tech"
                  checked={requestInfoChecks.techSheet}
                  onCheckedChange={(checked) =>
                    setRequestInfoChecks({ ...requestInfoChecks, techSheet: checked as boolean })
                  }
                />
                <Label htmlFor="req-tech" className="cursor-pointer">
                  Ajouter fiche technique
                </Label>
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="req-message">Message additionnel (optionnel)</Label>
              <Textarea
                id="req-message"
                placeholder="Ajoutez des précisions ou instructions supplémentaires..."
                value={requestInfoMessage}
                onChange={(e) => setRequestInfoMessage(e.target.value)}
                rows={4}
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestInfoDialog(false)}>
              Annuler
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleRequestInfo}
            >
              Envoyer la demande
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODALE SUSPEND */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspendre le compte</DialogTitle>
            <DialogDescription>
              Le compte de {artist.stageName} sera suspendu. L'artiste ne pourra plus accéder à la plateforme.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="suspend-reason">Raison de la suspension *</Label>
            <Textarea
              id="suspend-reason"
              placeholder="Décrivez la raison de la suspension..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              rows={4}
              className="mt-1.5"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleSuspend}
              disabled={!suspendReason}
            >
              Suspendre le compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
