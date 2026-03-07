import { useState } from "react";
import {
  Megaphone,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Send,
  FileText,
  Eye,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Announcement } from "@/app/data/announcementsData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface Application {
  id: string;
  announcementId: string;
  announcement: Announcement;
  appliedAt: string;
  status: "pending" | "accepted" | "rejected";
  coverLetter?: string;
  proposedPrice?: number;
  organizerResponse?: string;
}

export function ArtistAnnouncementsPage() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app-1",
      announcementId: "ann-1",
      announcement: {
        id: "ann-1",
        organizerId: "org-123",
        organizerName: "Fatima El Alaoui",
        organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        title: "Recherche DJ pour mariage à Casablanca",
        description: "Mariage haut de gamme avec 250 invités. Recherche DJ expérimenté pour animer la soirée avec mix électro et oriental.",
        talentCategory: "DJ",
        eventType: "Mariage",
        eventDate: "2026-04-15",
        city: "Casablanca",
        region: "Grand Casablanca",
        venue: "Hôtel Sofitel",
        budgetMin: 12000,
        budgetMax: 18000,
        guestCount: 250,
        duration: "5 heures",
        requirements: ["Équipement professionnel", "Expérience minimum 3 ans", "Références vérifiables"],
        createdAt: "2026-02-01T10:00:00",
        expiresAt: "2026-03-15T23:59:59",
        status: "active",
        applicationsCount: 8,
      },
      appliedAt: "2026-02-02T14:30:00",
      status: "pending",
      coverLetter: "Bonjour, je suis DJ professionnel avec plus de 5 ans d'expérience dans l'animation de mariages haut de gamme. Je dispose d'un équipement de qualité et peux adapter ma playlist selon vos préférences.",
      proposedPrice: 15000,
    },
    {
      id: "app-2",
      announcementId: "ann-2",
      announcement: {
        id: "ann-2",
        organizerId: "org-456",
        organizerName: "Karim Bennani",
        organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        title: "DJ pour soirée corporate à Rabat",
        description: "Soirée d'entreprise avec 150 invités. Ambiance lounge et électro.",
        talentCategory: "DJ",
        eventType: "Corporate",
        eventDate: "2026-03-20",
        city: "Rabat",
        region: "Rabat-Salé-Kénitra",
        venue: "Centre de conférences",
        budgetMin: 8000,
        budgetMax: 12000,
        guestCount: 150,
        duration: "4 heures",
        requirements: ["Expérience corporate", "Équipement son et lumière"],
        createdAt: "2026-01-28T14:00:00",
        expiresAt: "2026-03-10T23:59:59",
        status: "active",
        applicationsCount: 12,
      },
      appliedAt: "2026-01-29T09:15:00",
      status: "accepted",
      coverLetter: "Expérience confirmée en événements corporate. Portfolio disponible.",
      proposedPrice: 10000,
      organizerResponse: "Votre profil correspond parfaitement à nos attentes. Nous souhaitons vous rencontrer pour discuter des détails.",
    },
    {
      id: "app-3",
      announcementId: "ann-3",
      announcement: {
        id: "ann-3",
        organizerId: "org-789",
        organizerName: "Sara Lamrani",
        organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        title: "Animation DJ pour club privé",
        description: "Soirée mensuelle dans club select de Marrakech.",
        talentCategory: "DJ",
        eventType: "Club",
        eventDate: "2026-02-25",
        city: "Marrakech",
        region: "Marrakech-Safi",
        venue: "Pacha Marrakech",
        budgetMin: 15000,
        budgetMax: 20000,
        guestCount: 300,
        duration: "6 heures",
        requirements: ["Style house/techno", "Expérience club"],
        createdAt: "2026-01-25T16:00:00",
        expiresAt: "2026-02-20T23:59:59",
        status: "closed",
        applicationsCount: 25,
      },
      appliedAt: "2026-01-26T11:00:00",
      status: "rejected",
      coverLetter: "DJ spécialisé en musique électronique avec résidence dans plusieurs clubs.",
      proposedPrice: 18000,
      organizerResponse: "Nous avons retenu un autre candidat pour cette date. Merci pour votre candidature.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const pendingApplications = applications.filter(app => app.status === "pending");
  const acceptedApplications = applications.filter(app => app.status === "accepted");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleConvertToRequest = (application: Application) => {
    toast.success("Demande créée avec succès !", {
      description: `Une demande de prestation a été envoyée à ${application.announcement.organizerName}`,
    });
    setShowDetailsModal(false);
  };

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="size-3 mr-1" />
            En attente
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30">
            <CheckCircle className="size-3 mr-1" />
            Acceptée
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="size-3 mr-1" />
            Refusée
          </Badge>
        );
    }
  };

  const renderApplicationCard = (application: Application) => {
    const { announcement } = application;
    
    return (
      <Card 
        key={application.id} 
        className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors cursor-pointer"
        onClick={() => handleViewDetails(application)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white">{announcement.title}</h3>
                {getStatusBadge(application.status)}
              </div>
              <p className="text-gray-400 text-sm mb-3">{announcement.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <img
                  src={announcement.organizerAvatar}
                  alt={announcement.organizerName}
                  className="size-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-white">{announcement.organizerName}</p>
                  <p className="text-xs text-gray-500">Organisateur</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4 text-[#1DB954]" />
                  <div>
                    <p className="text-gray-500 text-xs">Date</p>
                    <p className="text-white">
                      {format(new Date(announcement.eventDate), "dd MMM yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-[#1DB954]" />
                  <div>
                    <p className="text-gray-500 text-xs">Ville</p>
                    <p className="text-white">{announcement.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="size-4 text-[#1DB954]" />
                  <div>
                    <p className="text-gray-500 text-xs">Budget</p>
                    <p className="text-white">
                      {announcement.budgetMin.toLocaleString()} - {announcement.budgetMax.toLocaleString()} DH
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-[#1DB954]" />
                  <div>
                    <p className="text-gray-500 text-xs">Durée</p>
                    <p className="text-white">{announcement.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Send className="size-4" />
                Postulé le {format(new Date(application.appliedAt), "dd MMM yyyy", { locale: fr })}
              </span>
              {application.proposedPrice && (
                <span className="flex items-center gap-1">
                  <DollarSign className="size-4" />
                  Tarif proposé: {application.proposedPrice.toLocaleString()} DH
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(application);
              }}
            >
              <Eye className="size-4 mr-2" />
              Voir détails
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Megaphone className="size-10 text-[#1DB954]" />
          Mes Candidatures aux Annonces
        </h1>
        <p className="text-gray-400">
          Suivez vos candidatures et gérez vos réponses aux annonces d'organisateurs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Clock className="size-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingApplications.length}</p>
                <p className="text-sm text-gray-400">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#1DB954]/20 rounded-full">
                <CheckCircle className="size-6 text-[#1DB954]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{acceptedApplications.length}</p>
                <p className="text-sm text-gray-400">Acceptées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <XCircle className="size-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{rejectedApplications.length}</p>
                <p className="text-sm text-gray-400">Refusées</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
          <Input
            placeholder="Rechercher une annonce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#282828] border-gray-800 text-white"
          />
        </div>
        <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-800">
          <Filter className="size-4 mr-2" />
          Filtrer
        </Button>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-[#282828] border border-gray-800">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black"
          >
            <Clock className="size-4 mr-2" />
            En attente ({pendingApplications.length})
          </TabsTrigger>
          <TabsTrigger 
            value="accepted"
            className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black"
          >
            <CheckCircle className="size-4 mr-2" />
            Acceptées ({acceptedApplications.length})
          </TabsTrigger>
          <TabsTrigger 
            value="rejected"
            className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black"
          >
            <XCircle className="size-4 mr-2" />
            Refusées ({rejectedApplications.length})
          </TabsTrigger>
        </TabsList>

        {/* En attente */}
        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.length === 0 ? (
            <Card className="bg-[#282828] border-gray-800">
              <CardContent className="p-12 text-center">
                <AlertCircle className="size-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucune candidature en attente
                </h3>
                <p className="text-gray-400">
                  Vos candidatures en attente de réponse apparaîtront ici
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingApplications.map(renderApplicationCard)
          )}
        </TabsContent>

        {/* Acceptées */}
        <TabsContent value="accepted" className="space-y-4">
          {acceptedApplications.length === 0 ? (
            <Card className="bg-[#282828] border-gray-800">
              <CardContent className="p-12 text-center">
                <CheckCircle className="size-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucune candidature acceptée
                </h3>
                <p className="text-gray-400">
                  Les candidatures acceptées apparaîtront ici
                </p>
              </CardContent>
            </Card>
          ) : (
            acceptedApplications.map(renderApplicationCard)
          )}
        </TabsContent>

        {/* Refusées */}
        <TabsContent value="rejected" className="space-y-4">
          {rejectedApplications.length === 0 ? (
            <Card className="bg-[#282828] border-gray-800">
              <CardContent className="p-12 text-center">
                <XCircle className="size-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucune candidature refusée
                </h3>
                <p className="text-gray-400">
                  Les candidatures refusées apparaîtront ici
                </p>
              </CardContent>
            </Card>
          ) : (
            rejectedApplications.map(renderApplicationCard)
          )}
        </TabsContent>
      </Tabs>

      {/* Modal de détails */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white max-h-[90vh] overflow-y-auto max-w-3xl">
          {selectedApplication && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <DialogTitle className="text-2xl text-white">
                    {selectedApplication.announcement.title}
                  </DialogTitle>
                  {getStatusBadge(selectedApplication.status)}
                </div>
                <DialogDescription className="text-gray-400">
                  Détails de votre candidature
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Info organisateur */}
                <div className="flex items-center gap-3 p-4 bg-[#282828] rounded-lg">
                  <img
                    src={selectedApplication.announcement.organizerAvatar}
                    alt={selectedApplication.announcement.organizerName}
                    className="size-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">
                      {selectedApplication.announcement.organizerName}
                    </p>
                    <p className="text-sm text-gray-400">Organisateur</p>
                  </div>
                </div>

                {/* Description de l'annonce */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-400">{selectedApplication.announcement.description}</p>
                </div>

                {/* Détails de l'événement */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#282828] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="size-5 text-[#1DB954]" />
                      <p className="text-sm text-gray-400">Date</p>
                    </div>
                    <p className="text-white font-semibold">
                      {format(new Date(selectedApplication.announcement.eventDate), "dd MMMM yyyy", { locale: fr })}
                    </p>
                  </div>

                  <div className="p-4 bg-[#282828] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="size-5 text-[#1DB954]" />
                      <p className="text-sm text-gray-400">Lieu</p>
                    </div>
                    <p className="text-white font-semibold">
                      {selectedApplication.announcement.venue || selectedApplication.announcement.city}
                    </p>
                  </div>

                  <div className="p-4 bg-[#282828] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="size-5 text-[#1DB954]" />
                      <p className="text-sm text-gray-400">Invités</p>
                    </div>
                    <p className="text-white font-semibold">
                      {selectedApplication.announcement.guestCount} personnes
                    </p>
                  </div>

                  <div className="p-4 bg-[#282828] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="size-5 text-[#1DB954]" />
                      <p className="text-sm text-gray-400">Durée</p>
                    </div>
                    <p className="text-white font-semibold">
                      {selectedApplication.announcement.duration}
                    </p>
                  </div>
                </div>

                {/* Budget */}
                <div className="p-4 bg-[#282828] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="size-5 text-[#1DB954]" />
                    <p className="text-sm text-gray-400">Budget de l'organisateur</p>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedApplication.announcement.budgetMin.toLocaleString()} - {selectedApplication.announcement.budgetMax.toLocaleString()} DH
                  </p>
                  {selectedApplication.proposedPrice && (
                    <p className="text-[#1DB954] mt-2">
                      Votre tarif proposé: {selectedApplication.proposedPrice.toLocaleString()} DH
                    </p>
                  )}
                </div>

                {/* Exigences */}
                {selectedApplication.announcement.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Exigences</h3>
                    <ul className="space-y-2">
                      {selectedApplication.announcement.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-400">
                          <CheckCircle className="size-4 text-[#1DB954]" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Votre candidature */}
                {selectedApplication.coverLetter && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Votre lettre de motivation</h3>
                    <div className="p-4 bg-[#282828] rounded-lg">
                      <p className="text-gray-400">{selectedApplication.coverLetter}</p>
                    </div>
                  </div>
                )}

                {/* Réponse de l'organisateur */}
                {selectedApplication.organizerResponse && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <MessageSquare className="size-5 text-[#1DB954]" />
                      Réponse de l'organisateur
                    </h3>
                    <div className="p-4 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg">
                      <p className="text-white">{selectedApplication.organizerResponse}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    Fermer
                  </Button>
                  {selectedApplication.status === "accepted" && (
                    <Button
                      className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                      onClick={() => handleConvertToRequest(selectedApplication)}
                    >
                      <Send className="size-4 mr-2" />
                      Créer une demande
                    </Button>
                  )}
                  {selectedApplication.status === "pending" && (
                    <Button
                      className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                      onClick={() => {
                        toast.info("Fonctionnalité de messagerie à venir");
                        setShowDetailsModal(false);
                      }}
                    >
                      <MessageSquare className="size-4 mr-2" />
                      Contacter l'organisateur
                    </Button>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="size-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-200">
                      <p className="font-semibold mb-1">À propos des candidatures acceptées</p>
                      <p>
                        Quand votre candidature est acceptée, vous pouvez créer une demande pour finaliser les détails avec l'organisateur et ajouter l'événement à votre calendrier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
