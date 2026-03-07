import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  Phone,
  Mail,
  Award,
  Calendar as CalendarIcon,
  CheckCircle,
  Lock,
  Image,
  Video,
  Music,
  Play,
  ListChecks,
  Heart,
  Instagram,
  Music as SoundcloudIcon,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { MessagingSystem } from "./MessagingSystem";
import { FormulasSection } from "./FormulasSection";
import { ReviewsSection } from "./ReviewsSection";
import { mockArtists } from "../data/mockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface OrganizerInfo {
  email: string;
  name: string;
}

interface ArtistProfileProps {
  artistId: string;
  onBack: () => void;
  organizer?: OrganizerInfo | null;
  onLoginRequest?: () => void;
  onToggleFavorite?: (artistId: string) => void;
  isFavorite?: boolean;
}

export function ArtistProfile({
  artistId,
  onBack,
  organizer,
  onLoginRequest,
  onToggleFavorite,
  isFavorite = false,
}: ArtistProfileProps) {
  const artist = mockArtists.find((a) => a.id === artistId);
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >();
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<
    string | null
  >(null);

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3>Artiste non trouvé</h3>
          <Button onClick={onBack} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!organizer) {
      // Demander de se connecter
      toast.info("Veuillez vous connecter pour faire une demande de réservation", {
        description: "Créez un compte ou connectez-vous pour accéder aux fonctionnalités de réservation",
        duration: 4000,
      });
      onLoginRequest?.();
      return;
    }

    // Ouvrir la messagerie avec la date sélectionnée
    setSelectedDate(date);
    setIsMessagingOpen(true);
  };

  const handleContactClick = () => {
    if (!selectedDate) {
      toast.warning("Veuillez d'abord choisir une date sur le calendrier de réservation", {
        description: "Sélectionnez une date disponible pour envoyer votre demande",
        duration: 4000,
      });
      return;
    }
    setIsMessagingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#191414] py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
          Retour aux artistes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Artist Header */}
            <Card className="bg-[#282828] border-gray-800">
              <CardContent className="p-0">
                <div className="aspect-[21/9] overflow-hidden rounded-t-lg">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="mb-2 text-white">
                        {artist.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="text-sm bg-[#1DB954]/20 text-[#1DB954]"
                        >
                          {artist.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="size-5 fill-[#1DB954] text-[#1DB954]" />
                          <span className="text-lg text-white">
                            {artist.rating}
                          </span>
                          <span className="text-gray-400 ml-1">
                            ({artist.reviewsCount} avis)
                          </span>
                        </div>
                      </div>
                    </div>
                    {organizer && onToggleFavorite && (
                      <Button
                        size="lg"
                        variant="outline"
                        className={`gap-2 ${
                          isFavorite
                            ? "border-red-500 text-red-500 hover:bg-red-500/10"
                            : "border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-500"
                        }`}
                        onClick={() => {
                          onToggleFavorite(artistId);
                          toast.success(
                            isFavorite
                              ? "Artiste retiré des favoris"
                              : "Artiste ajouté aux favoris"
                          );
                        }}
                      >
                        <Heart
                          className={`size-5 ${
                            isFavorite ? "fill-red-500" : ""
                          }`}
                        />
                        {isFavorite ? "Favoris" : "Ajouter aux favoris"}
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <MapPin className="size-4" />
                    <span>{artist.region}</span>
                  </div>

                  <p className="text-gray-300 mb-6">
                    {artist.description}
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="mb-3 text-white">
                      Répertoire
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {artist.specialties.map(
                        (specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-gray-700 text-gray-300"
                          >
                            {specialty}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-gray-300">
                    <Award className="size-5 text-[#1DB954]" />
                    <span>
                      {artist.experience} ans d'expérience
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability Calendar */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CalendarIcon className="size-5" />
                  Calendrier de réservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-4 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg">
                  <p className="text-sm text-gray-300">
                    {organizer
                      ? "Cliquez sur une date pour envoyer une demande de réservation via la messagerie interne"
                      : "Connectez-vous en tant qu'organisateur pour envoyer des demandes de réservation"}
                  </p>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={fr}
                  className="rounded-md border border-gray-700 w-fit mx-auto bg-[#ffffff]"
                  disabled={!organizer}
                />
              </CardContent>
            </Card>

            {/* Formulas */}
            {artist.formulas && artist.formulas.length > 0 && (
              <Card className="bg-[#282828] border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ListChecks className="size-5" />
                    Nos Formules
                  </CardTitle>
                  <p className="text-sm text-gray-400 mt-2">
                    Choisissez la formule qui correspond le
                    mieux à votre événement
                  </p>
                </CardHeader>
                <CardContent>
                  <FormulasSection formulas={artist.formulas} />
                </CardContent>
              </Card>
            )}

            {/* Photo Gallery */}
            {artist.gallery?.photos &&
              artist.gallery.photos.length > 0 && (
                <Card className="bg-[#282828] border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Image className="size-5" />
                      Galerie Photo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {artist.gallery.photos.map(
                        (photo, index) => (
                          <div
                            key={index}
                            className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() =>
                              setSelectedPhoto(photo)
                            }
                          >
                            <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Video Gallery */}
            {artist.gallery?.videos &&
              artist.gallery.videos.length > 0 && (
                <Card className="bg-[#282828] border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Video className="size-5" />
                      Galerie Vidéo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {artist.gallery.videos.map(
                        (video, index) => (
                          <div
                            key={index}
                            className="group cursor-pointer"
                          >
                            <div className="relative rounded-lg overflow-hidden mb-3">
                              <div className="aspect-video relative">
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play
                                      className="size-5 text-white ml-0.5"
                                      fill="white"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <h4 className="text-center text-white font-medium text-base">
                              {video.title}
                            </h4>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Audio Gallery */}
            {artist.gallery?.audios &&
              artist.gallery.audios.length > 0 && (
                <Card className="bg-[#282828] border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Music className="size-5" />
                      Galerie Audio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {artist.gallery.audios.map(
                        (audio, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center flex-shrink-0">
                              <Play
                                className="size-5 text-black ml-0.5"
                                fill="black"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">
                                {audio.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {audio.duration}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Reviews Section */}
            {artist.reviews && artist.reviews.length > 0 && (
              <ReviewsSection
                reviews={artist.reviews}
                overallRating={artist.rating}
                reviewsCount={artist.reviewsCount}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Tarification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-3xl text-[#1DB954] mb-2">
                    {artist.priceRange}
                  </p>
                  <p className="text-sm text-gray-400">
                    Prix indicatif par événement
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {organizer ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="size-4 text-gray-400" />
                      <a
                        href={`tel:${artist.phoneNumber}`}
                        className="text-[#1DB954] hover:underline"
                      >
                        {artist.phoneNumber}
                      </a>
                    </div>
                    <Button
                      className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold gap-2"
                      onClick={handleContactClick}
                    >
                      <Mail className="size-4" />
                      Mise en relation
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 relative">
                    <div className="blur-sm select-none pointer-events-none">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="size-4 text-gray-400" />
                        <span className="text-gray-400">
                          +212 6XX XXX XXX
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#191414] px-4 py-3 rounded-lg border border-[#1DB954] text-center">
                        <Lock className="size-6 text-[#1DB954] mx-auto mb-2" />
                        <p className="text-xs text-gray-300 mb-2">
                          Connectez-vous pour voir les
                          coordonnées
                        </p>
                        <Button
                          size="sm"
                          className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
                          onClick={onLoginRequest}
                        >
                          Se connecter
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  Contact direct sans frais ni commission
                </p>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Catégorie
                  </span>
                  <span className="text-white">
                    {artist.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Région</span>
                  <span className="text-white">
                    {artist.region}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Expérience
                  </span>
                  <span className="text-white">
                    {artist.experience} ans
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Réseaux & Documents */}
            {organizer && (artist.instagram || artist.soundcloud || artist.presskit || artist.ficheTechnique) && (
              <Card className="bg-[#282828] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Réseaux & Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {artist.instagram && (
                    <a
                      href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <Instagram className="size-5 text-pink-500 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Instagram</p>
                        <p className="text-xs text-gray-400">{artist.instagram}</p>
                      </div>
                    </a>
                  )}

                  {artist.soundcloud && (
                    <a
                      href={artist.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <SoundcloudIcon className="size-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">SoundCloud</p>
                        <p className="text-xs text-gray-400">Écoutez mes sets</p>
                      </div>
                    </a>
                  )}

                  {artist.presskit && (
                    <a
                      href={artist.presskit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <FileText className="size-5 text-[#1DB954] group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Press Kit</p>
                        <p className="text-xs text-gray-400">Dossier de presse</p>
                      </div>
                      <Download className="size-4 text-gray-400 group-hover:text-[#1DB954]" />
                    </a>
                  )}

                  {artist.ficheTechnique && (
                    <a
                      href={artist.ficheTechnique}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <FileText className="size-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Fiche Technique</p>
                        <p className="text-xs text-gray-400">Besoins techniques</p>
                      </div>
                      <Download className="size-4 text-gray-400 group-hover:text-blue-500" />
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Messaging System */}
      {organizer && selectedDate && (
        <MessagingSystem
          isOpen={isMessagingOpen}
          onClose={() => setIsMessagingOpen(false)}
          artistName={artist.name}
          artistId={artist.id}
          selectedDate={format(selectedDate, "yyyy-MM-dd")}
          organizerName={organizer.name}
          formulas={artist.formulas}
          artistPriceRange={artist.priceRange}
        />
      )}

      {/* Photo Viewer Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl bg-[#191414] border-gray-800 p-0">
          <DialogTitle className="sr-only">Aperçu de la photo</DialogTitle>
          <DialogDescription className="sr-only">
            Vue agrandie de la photo de galerie
          </DialogDescription>
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Photo en grand"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}