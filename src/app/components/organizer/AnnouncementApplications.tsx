import { useState } from "react";
import {
  ArrowLeft,
  User,
  MapPin,
  Music,
  Star,
  DollarSign,
  Calendar,
  MessageSquare,
  Send,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  UserCircle,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Announcement } from "@/app/data/announcementsData";
import { ArtistProfile } from "../ArtistProfile";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface Application {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistCategory: string;
  artistCity: string;
  artistRating: number;
  artistReviewCount: number;
  coverLetter: string;
  proposedPrice: number;
  appliedAt: string;
  status: "pending" | "accepted" | "rejected";
}

interface AnnouncementApplicationsProps {
  announcement: Announcement;
  onBack: () => void;
}

export function AnnouncementApplications({ announcement, onBack }: AnnouncementApplicationsProps) {
  const [showArtistProfile, setShowArtistProfile] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app-1",
      artistId: "1",
      artistName: "DJ Khalid",
      artistAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
      artistCategory: "DJ",
      artistCity: "Casablanca",
      artistRating: 4.8,
      artistReviewCount: 124,
      coverLetter: "Bonjour, je suis DJ professionnel avec plus de 8 ans d'expérience dans l'animation de mariages haut de gamme. Je dispose d'un équipement de qualité supérieure (Pioneer DJ, son L-Acoustics) et peux adapter ma playlist selon vos préférences. J'ai animé plus de 200 mariages et je suis spécialisé dans le mix oriental/électro qui plaît à tous les âges.",
      proposedPrice: 15000,
      appliedAt: "2026-02-02T14:30:00",
      status: "pending",
    },
    {
      id: "app-2",
      artistId: "2",
      artistName: "DJ Amine",
      artistAvatar: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400",
      artistCategory: "DJ",
      artistCity: "Casablanca",
      artistRating: 4.9,
      artistReviewCount: 89,
      coverLetter: "Passionné par la musique depuis 10 ans, j'ai développé une expertise unique dans les événements de mariage. Mon style musical éclectique me permet de créer une ambiance parfaite pour tous vos invités. Portfolio et vidéos disponibles sur demande.",
      proposedPrice: 18000,
      appliedAt: "2026-02-01T10:15:00",
      status: "pending",
    },
    {
      id: "app-3",
      artistId: "3",
      artistName: "DJ Sarah",
      artistAvatar: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b1?w=400",
      artistCategory: "DJ",
      artistCity: "Rabat",
      artistRating: 4.7,
      artistReviewCount: 156,
      coverLetter: "DJ professionnelle spécialisée dans les mariages haut de gamme. Je travaille avec les meilleurs équipements et propose un service personnalisé avec playlist sur mesure selon vos goûts musicaux. Références vérifiables.",
      proposedPrice: 16500,
      appliedAt: "2026-02-01T16:45:00",
      status: "pending",
    },
    {
      id: "app-4",
      artistId: "4",
      artistName: "DJ Youssef",
      artistAvatar: "https://images.unsplash.com/photo-1605722243979-fe0be8158232?w=400",
      artistCategory: "DJ",
      artistCity: "Casablanca",
      artistRating: 4.6,
      artistReviewCount: 67,
      coverLetter: "Expérience confirmée en événementiel de luxe. Je propose une prestation complète incluant son, lumière et écrans LED pour une soirée inoubliable.",
      proposedPrice: 20000,
      appliedAt: "2026-01-31T09:00:00",
      status: "pending",
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    eventDate: announcement.eventDate,
    message: "",
  });

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleContactArtist = (application: Application) => {
    setSelectedApplication(application);
    setContactForm({
      eventDate: announcement.eventDate,
      message: `Bonjour ${application.artistName},\n\nNous avons examiné votre candidature pour notre annonce "${announcement.title}" et nous serions intéressés par vos services.\n\nNous aimerions discuter des détails de la prestation pour le ${format(new Date(announcement.eventDate), "dd MMMM yyyy", { locale: fr })}.\n\nCordialement`,
    });
    setShowContactModal(true);
  };

  const handleSendContactRequest = () => {
    if (!selectedApplication) return;

    if (!contactForm.eventDate) {
      toast.error("Veuillez sélectionner une date");
      return;
    }

    toast.success("Demande de mise en relation envoyée !", {
      description: `${selectedApplication.artistName} recevra votre demande et pourra y répondre.`,
    });

    // Mettre à jour le statut de la candidature
    setApplications(prev =>
      prev.map(app =>
        app.id === selectedApplication.id
          ? { ...app, status: "accepted" as const }
          : app
      )
    );

    setShowContactModal(false);
    setShowDetailsModal(false);
  };

  const handleRejectApplication = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: "rejected" as const }
          : app
      )
    );
    toast.info("Candidature marquée comme refusée");
    setShowDetailsModal(false);
  };

  const pendingApplications = applications.filter(app => app.status === "pending");
  const acceptedApplications = applications.filter(app => app.status === "accepted");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

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
            Contacté
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
    return (
      <Card key={application.id} className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={application.artistAvatar}
                alt={application.artistName}
                className="size-24 rounded-full object-cover border-2 border-[#1DB954]"
              />
            </div>

            {/* Infos artiste */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{application.artistName}</h3>
                    {getStatusBadge(application.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Music className="size-4" />
                      {application.artistCategory}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      {application.artistCity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      {application.artistRating} ({application.artistReviewCount} avis)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Tarif proposé</p>
                  <p className="text-2xl font-bold text-[#1DB954]">
                    {application.proposedPrice.toLocaleString()} DH
                  </p>
                </div>
              </div>

              {/* Lettre de motivation */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm line-clamp-2">{application.coverLetter}</p>
              </div>

              {/* Date de candidature */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Postulé le {format(new Date(application.appliedAt), "dd MMM yyyy à HH:mm", { locale: fr })}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                    onClick={() => {
                      setSelectedArtistId(application.artistId);
                      setShowArtistProfile(true);
                    }}
                  >
                    <UserCircle className="size-4 mr-2" />
                    Voir profil artiste
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                    onClick={() => handleViewDetails(application)}
                  >
                    <Eye className="size-4 mr-2" />
                    Voir détails
                  </Button>
                  {application.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleRejectApplication(application.id)}
                      >
                        <XCircle className="size-4 mr-2" />
                        Refuser
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
                        onClick={() => handleContactArtist(application)}
                      >
                        <Send className="size-4 mr-2" />
                        Mise en relation
                      </Button>
                    </>
                  )}
                  {application.status === "accepted" && (
                    <Button
                      size="sm"
                      className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
                      onClick={() => handleContactArtist(application)}
                    >
                      <MessageSquare className="size-4 mr-2" />
                      Contacter à nouveau
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {showArtistProfile && selectedArtistId ? (
        <ArtistProfile
          artistId={selectedArtistId}
          onBack={() => setShowArtistProfile(false)}
          organizer={null}
        />
      ) : (
        <div className="min-h-screen bg-[#191414] py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="outline"
                className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 mb-4 gap-2"
                onClick={onBack}
              >
                <ArrowLeft className="size-4" />
                Retour aux annonces
              </Button>

              <Card className="bg-[#282828] border-gray-800 mb-6">
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold text-white mb-2">{announcement.title}</h1>
                  <p className="text-gray-400 mb-4">{announcement.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <Calendar className="size-4 text-[#1DB954]" />
                      {format(new Date(announcement.eventDate), "dd MMMM yyyy", { locale: fr })}
                    </span>
                    <span className="flex items-center gap-2 text-gray-400">
                      <MapPin className="size-4 text-[#1DB954]" />
                      {announcement.city}
                    </span>
                    <span className="flex items-center gap-2 text-gray-400">
                      <DollarSign className="size-4 text-[#1DB954]" />
                      {announcement.budgetMin.toLocaleString()} - {announcement.budgetMax.toLocaleString()} DH
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                      <p className="text-sm text-gray-400">Contactées</p>
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

            {/* Liste des candidatures */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Candidatures reçues ({applications.length})
              </h2>

              {pendingApplications.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Clock className="size-5 text-yellow-400" />
                    En attente de réponse
                  </h3>
                  {pendingApplications.map(renderApplicationCard)}
                </div>
              )}

              {acceptedApplications.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CheckCircle className="size-5 text-[#1DB954]" />
                    Artistes contactés
                  </h3>
                  {acceptedApplications.map(renderApplicationCard)}
                </div>
              )}

              {rejectedApplications.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <XCircle className="size-5 text-red-400" />
                    Candidatures refusées
                  </h3>
                  {rejectedApplications.map(renderApplicationCard)}
                </div>
              )}

              {applications.length === 0 && (
                <Card className="bg-[#282828] border-gray-800">
                  <CardContent className="p-12 text-center">
                    <User className="size-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Aucune candidature reçue
                    </h3>
                    <p className="text-gray-400">
                      Les artistes intéressés pourront postuler à votre annonce
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Modal de détails */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
              <DialogContent className="bg-[#191414] border-gray-800 text-white max-h-[90vh] overflow-y-auto max-w-3xl">
                {selectedApplication && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={selectedApplication.artistAvatar}
                          alt={selectedApplication.artistName}
                          className="size-16 rounded-full object-cover border-2 border-[#1DB954]"
                        />
                        <div>
                          <DialogTitle className="text-2xl text-white">
                            {selectedApplication.artistName}
                          </DialogTitle>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Music className="size-4" />
                              {selectedApplication.artistCategory}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="size-4" />
                              {selectedApplication.artistCity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <DialogDescription className="sr-only">
                        Détails de la candidature de l'artiste
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-6">
                      {/* Tarif proposé */}
                      <div className="p-4 bg-[#282828] rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="size-5 text-[#1DB954]" />
                          <p className="text-sm text-gray-400">Tarif proposé</p>
                        </div>
                        <p className="text-3xl font-bold text-[#1DB954]">
                          {selectedApplication.proposedPrice.toLocaleString()} DH
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Votre budget: {announcement.budgetMin.toLocaleString()} - {announcement.budgetMax.toLocaleString()} DH
                        </p>
                      </div>

                      {/* Lettre de motivation */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <MessageSquare className="size-5 text-[#1DB954]" />
                          Lettre de motivation
                        </h3>
                        <div className="p-4 bg-[#282828] rounded-lg">
                          <p className="text-gray-300 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                        </div>
                      </div>

                      {/* Date de candidature */}
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex gap-3">
                          <AlertCircle className="size-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-200">
                            <p className="font-semibold mb-1">Date de candidature</p>
                            <p>
                              Postulé le {format(new Date(selectedApplication.appliedAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                          onClick={() => setShowDetailsModal(false)}
                        >
                          Fermer
                        </Button>
                        {selectedApplication.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleRejectApplication(selectedApplication.id)}
                            >
                              <XCircle className="size-4 mr-2" />
                              Refuser
                            </Button>
                            <Button
                              className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                              onClick={() => {
                                setShowDetailsModal(false);
                                handleContactArtist(selectedApplication);
                              }}
                            >
                              <Send className="size-4 mr-2" />
                              Mise en relation
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Modal de mise en relation */}
            <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
              <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-2xl">
                {selectedApplication && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-white">
                        Mise en relation avec {selectedApplication.artistName}
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Envoyez une demande de prestation à cet artiste
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-6">
                      {/* Info artiste */}
                      <div className="flex items-center gap-4 p-4 bg-[#282828] rounded-lg">
                        <img
                          src={selectedApplication.artistAvatar}
                          alt={selectedApplication.artistName}
                          className="size-16 rounded-full object-cover border-2 border-[#1DB954]"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{selectedApplication.artistName}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Music className="size-4" />
                              {selectedApplication.artistCategory}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="size-4 fill-yellow-400 text-yellow-400" />
                              {selectedApplication.artistRating}
                            </span>
                          </div>
                          <p className="text-[#1DB954] font-semibold mt-1">
                            {selectedApplication.proposedPrice.toLocaleString()} DH
                          </p>
                        </div>
                      </div>

                      {/* Date de l'événement */}
                      <div className="space-y-2">
                        <Label htmlFor="eventDate" className="text-white">
                          Date de l'événement *
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={contactForm.eventDate}
                          onChange={(e) => setContactForm({ ...contactForm, eventDate: e.target.value })}
                          className="bg-[#282828] border-gray-700 text-white"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <p className="text-xs text-gray-500">
                          Date initialement prévue: {format(new Date(announcement.eventDate), "dd MMMM yyyy", { locale: fr })}
                        </p>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">
                          Message à l'artiste *
                        </Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="bg-[#282828] border-gray-700 text-white min-h-[150px]"
                          placeholder="Présentez votre événement et vos attentes..."
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex gap-3">
                          <AlertCircle className="size-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-200">
                            <p className="font-semibold mb-1">À propos de la mise en relation</p>
                            <p>
                              L'artiste recevra votre demande et pourra l'accepter ou la refuser. 
                              Vous pourrez ensuite échanger via la messagerie interne pour finaliser les détails.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                          onClick={() => setShowContactModal(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                          onClick={handleSendContactRequest}
                        >
                          <Send className="size-4 mr-2" />
                          Envoyer la demande
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}