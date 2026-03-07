import { useState } from "react";
import {
  User,
  MapPin,
  Save,
  Eye,
  Upload,
  X,
  Award,
  AlertCircle,
  Image as ImageIcon,
  Video as VideoIcon,
  Plus,
  Edit,
  Trash2,
  Users,
  Link as LinkIcon,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { toast } from "sonner";
import { mockArtistStats } from "../../data/artistDashboardData";
import { ProfileCompletionBar } from "./ProfileCompletionBar";

interface ArtistProfileEditorProps {
  onViewPublicProfile: () => void;
}

export function ArtistProfileEditor({ onViewPublicProfile }: ArtistProfileEditorProps) {
  const [showProfessionalizationModal, setShowProfessionalizationModal] =
    useState(false);
  
  const isProfessionalized = mockArtistStats.isProfessionalized;
  const maxPhotos = isProfessionalized ? 5 : 1;
  const maxVideos = isProfessionalized ? 5 : 1;

  // État du formulaire de demande Pro
  const [proRequestCity, setProRequestCity] = useState("");
  const [proRequestAvailability, setProRequestAvailability] = useState("");
  const [proRequestPhone, setProRequestPhone] = useState("");
  const [proRequestSessionType, setProRequestSessionType] = useState("");
  const [proRequestComment, setProRequestComment] = useState("");
  const [isSubmittingProRequest, setIsSubmittingProRequest] = useState(false);
  const [proRequestSuccess, setProRequestSuccess] = useState(false);
  const [proRequestErrors, setProRequestErrors] = useState<{city?: string; availability?: string}>({});
  
  // État simulé - à remplacer par vraie donnée API
  const hasExistingProRequest = false;
  const existingRequestStatus = "contacte"; // "nouveau", "contacte", "planifie"

  // État du formulaire
  const [formData, setFormData] = useState({
    stageName: "DJ Mehdi El Alami",
    category: "DJ",
    city: "Casablanca",
    region: "Grand Casablanca",
    languages: ["Français", "Arabe", "Anglais"],
    bio: "DJ professionnel spécialisé dans les événements corporatifs et mariages. Mix électro, house et commerciale.",
    specialties: ["House", "Électro", "Commercial", "Deep House"],
    eventTypes: ["Mariage", "Corporate", "Soirée privée", "Club"],
    priceMin: "5000",
    priceMax: "15000",
    priceUnit: "soiree",
    includesTravel: true,
    includesEquipment: true,
    isBand: false,
    phone: "+212 6 12 34 56 78",
    whatsapp: "+212 6 12 34 56 78",
    email: "mehdi.elalami@email.com",
    instagram: "@dj_mehdi_elalami",
    soundcloud: "",
    presskit: "",
    ficheTechnique: "",
  });

  const [uploadedPhotos, setUploadedPhotos] = useState(1);
  const [uploadedVideos, setUploadedVideos] = useState(1);
  
  // États pour les médias
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?w=300&h=300&fit=crop' }
  ]);
  const [videos, setVideos] = useState<{ id: string; youtubeUrl: string; title: string; thumbnail: string }[]>([
    { 
      id: '1', 
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Performance live',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    }
  ]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  
  const [formulas, setFormulas] = useState<{
    id: string;
    title: string;
    description: string;
    numberOfArtists: string;
    duration: string;
    price: string;
  }[]>([]);

  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [editingFormula, setEditingFormula] = useState<{
    id: string;
    title: string;
    description: string;
    numberOfArtists: string;
    duration: string;
    price: string;
  } | null>(null);

  const [newFormula, setNewFormula] = useState({
    title: "",
    description: "",
    numberOfArtists: "",
    duration: "",
    price: "",
  });

  // États pour les artistes recommandés
  const [showRecommendedArtists, setShowRecommendedArtists] = useState(false);
  const [recommendedArtists, setRecommendedArtists] = useState<{
    id: string;
    link: string;
    name: string;
  }[]>([]);
  const [newArtistLink, setNewArtistLink] = useState("");

  // Mapping des genres par catégorie
  const genresByCategory: Record<string, string[]> = {
    "DJ": [
      "House / Tech-house / Deep-House",
      "Techno / Trance / Psychedelic",
      "Commercial / Généraliste",
      "Hip-Hop / R&B / Old-school",
      "Old-School",
      "Oriental",
      "Disco / Funk / 80s / 90s",
      "Chill / Organic / Lounge / Listening / Buddha Bar",
      "Afrobeat / Latino / Salsa"
    ],
    "Chanteur": [
      "Pop",
      "R&B / Soul",
      "Raï",
      "Rap / Hip-Hop",
      "Oriental / Arabic",
      "Amazigh",
      "Chaabi",
      "Jazz / Blues",
      "Flamenco / Hispanic",
      "Acoustic / Cover"
    ],
    "Groupe tradi": [
      "Gnawa",
      "Ahwach",
      "Chaabi",
      "Aita",
      "Dakka Marrakchia",
      "Amazigh",
      "Aissaoua",
      "Andalou",
      "Sahraoui",
      "Taktouka Jbalia",
      "Oriental",
      "Cheikhate",
      "pop",
      "Lounge"
    ],
    "Live Band": [
      "pop",
      "Lounge",
      "Fusion",
      "Jazz",
      "Variété Française",
      "Latino, Cubain",
      "Blues",
      "Généraliste",
      "Rock / Metal"
    ],
    "Animateur & Spectacle": [
      "Animateur mariage",
      "Light Show",
      "Maître de Cérémonie",
      "Danceurs / Danseuses",
      "Percussionniste",
      "Cirque / Acrobatique",
      "Cracheur de Feu",
      "Magicien / Close-up",
      "Mentalist",
      "Humoriste / Stand-up"
    ],
    "Musicien Solo": [
      "Guitariste",
      "Violoniste",
      "Saxophoniste",
      "Pianiste",
      "Percussionniste"
    ]
  };

  // États pour les inputs personnalisés
  const [showAddGenreInput, setShowAddGenreInput] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [showAddEventTypeInput, setShowAddEventTypeInput] = useState(false);
  const [newEventType, setNewEventType] = useState("");

  // Fonction pour extraire l'ID YouTube depuis une URL
  const extractYoutubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Fonction pour ajouter une vidéo YouTube
  const handleAddYoutubeVideo = () => {
    if (!newVideoUrl.trim()) {
      toast.error("Veuillez entrer un lien YouTube");
      return;
    }

    if (!newVideoTitle.trim()) {
      toast.error("Veuillez entrer un titre pour la vidéo");
      return;
    }

    const videoId = extractYoutubeId(newVideoUrl);
    if (!videoId) {
      toast.error("Lien YouTube invalide");
      return;
    }

    if (videos.length >= maxVideos) {
      toast.error(`Vous ne pouvez pas ajouter plus de ${maxVideos} vidéo${maxVideos > 1 ? 's' : ''}`);
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      title: newVideoTitle,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    };

    setVideos([...videos, newVideo]);
    setUploadedVideos(videos.length + 1);
    setNewVideoUrl('');
    setNewVideoTitle('');
    setShowVideoModal(false);
    toast.success("Vidéo ajoutée avec succès !");
  };

  // Fonction pour supprimer une vidéo
  const handleRemoveVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId));
    setUploadedVideos(Math.max(0, uploadedVideos - 1));
    toast.info("Vidéo supprimée");
  };

  // Fonction pour gérer l'upload de photos
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (photos.length >= maxPhotos) {
      toast.error(`Vous ne pouvez pas ajouter plus de ${maxPhotos} photo${maxPhotos > 1 ? 's' : ''}`);
      return;
    }

    const file = files[0];
    
    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 MB");
      return;
    }

    // Lire le fichier et l'ajouter
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const newPhoto = {
          id: Date.now().toString(),
          url: result
        };
        setPhotos([...photos, newPhoto]);
        setUploadedPhotos(photos.length + 1);
        toast.success("Photo ajoutée avec succès !");
      }
    };
    reader.readAsDataURL(file);
    
    // Réinitialiser l'input
    event.target.value = '';
  };

  // Fonction pour supprimer une photo
  const handleRemovePhoto = (photoId: string) => {
    setPhotos(photos.filter(p => p.id !== photoId));
    setUploadedPhotos(Math.max(0, uploadedPhotos - 1));
    toast.info("Photo supprimée");
  };

  const handleAddRecommendedArtist = () => {
    if (!newArtistLink.trim()) {
      toast.error("Veuillez entrer un lien d'artiste");
      return;
    }

    // Extraire le nom de l'artiste du lien (simplification)
    const artistName = newArtistLink.split("/").pop() || "Artiste";

    setRecommendedArtists([
      ...recommendedArtists,
      {
        id: `artist-${Date.now()}`,
        link: newArtistLink,
        name: artistName,
      },
    ]);
    setNewArtistLink("");
    toast.success("Artiste recommandé ajouté !");
  };

  const handleRemoveRecommendedArtist = (id: string) => {
    setRecommendedArtists(recommendedArtists.filter((a) => a.id !== id));
    toast.info("Artiste recommandé supprimé");
  };

  const handleSave = () => {
    toast.success("Profil mis à jour avec succès !", {
      description: "Vos modifications ont été enregistrées.",
    });
  };

  const handleRequestProfessionalization = () => {
    setShowProfessionalizationModal(true);
  };

  // Fonctions de gestion des genres
  const handleToggleGenre = (genre: string) => {
    if (formData.specialties.includes(genre)) {
      setFormData({
        ...formData,
        specialties: formData.specialties.filter(s => s !== genre)
      });
    } else {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, genre]
      });
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter(s => s !== genre)
    });
  };

  const handleAddCustomGenre = () => {
    if (!newGenre.trim()) {
      toast.error("Veuillez entrer un genre");
      return;
    }
    if (formData.specialties.includes(newGenre.trim())) {
      toast.error("Ce genre est déjà ajouté");
      return;
    }
    setFormData({
      ...formData,
      specialties: [...formData.specialties, newGenre.trim()]
    });
    setNewGenre("");
    setShowAddGenreInput(false);
    toast.success("Genre ajouté avec succès");
  };

  // Fonctions de gestion des types d'événements
  const handleToggleEventType = (type: string) => {
    if (formData.eventTypes.includes(type)) {
      setFormData({
        ...formData,
        eventTypes: formData.eventTypes.filter(t => t !== type)
      });
    } else {
      setFormData({
        ...formData,
        eventTypes: [...formData.eventTypes, type]
      });
    }
  };

  const handleRemoveEventType = (type: string) => {
    setFormData({
      ...formData,
      eventTypes: formData.eventTypes.filter(t => t !== type)
    });
  };

  const handleAddCustomEventType = () => {
    if (!newEventType.trim()) {
      toast.error("Veuillez entrer un type d'événement");
      return;
    }
    if (formData.eventTypes.includes(newEventType.trim())) {
      toast.error("Ce type d'événement est déjà ajouté");
      return;
    }
    setFormData({
      ...formData,
      eventTypes: [...formData.eventTypes, newEventType.trim()]
    });
    setNewEventType("");
    setShowAddEventTypeInput(false);
    toast.success("Type d'événement ajouté avec succès");
  };

  const categories = ["DJ", "Chanteur", "Groupe tradi", "Live Band", "Animateur & Spectacle", "Musicien Solo"];
  const regions = ["Grand Casablanca", "Rabat-Salé-Kénitra", "Marrakech-Safi", "Tanger-Tétouan-Al Hoceïma", "Fès-Meknès", "Souss-Massa"];
  
  // Obtenir les genres disponibles pour la catégorie sélectionnée
  const availableGenres = genresByCategory[formData.category] || [];
  
  // Événements communs pour tous les types d'artistes
  const commonEventTypes = [
    "Mariage",
    "Corporate",
    "Soirée privée",
    "Club",
    "Festival",
    "Concert",
    "Bar/Restaurant",
    "Anniversaire",
    "Fête d'entreprise",
    "Événement culturel"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <User className="size-8" />
            Mon Profil
          </h1>
          <p className="text-gray-400">Gérez votre profil public</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={onViewPublicProfile}
          >
            <Eye className="size-4 mr-2" />
            Prévisualiser
          </Button>
          <Button
            className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
            onClick={handleSave}
          >
            <Save className="size-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Profile Completion Bar */}
      <ProfileCompletionBar
        formData={formData}
        photosCount={photos.length}
        videosCount={videos.length}
      />

      {/* Professionalization Banner */}
      {!isProfessionalized && (
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="size-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Professionnalisez votre profil
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Notre équipe se déplace pour réaliser vos photos et vidéos professionnelles.
                  Obtenez un badge vérifié et déverrouillez jusqu'à 5 photos et 5 vidéos.
                </p>
                <Button
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={handleRequestProfessionalization}
                >
                  <Award className="size-4 mr-2" />
                  Demandez l'aide à la professionnalisation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informations principales */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Informations principales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stageName" className="text-gray-300">
                Nom de scène *
              </Label>
              <Input
                id="stageName"
                value={formData.stageName}
                onChange={(e) =>
                  setFormData({ ...formData, stageName: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">
                Catégorie *
              </Label>
              <Select value={formData.category} onValueChange={(value) => {
                  // Filtrer les genres pour ne garder que ceux qui sont dans la nouvelle catégorie
                  const newAvailableGenres = genresByCategory[value] || [];
                  const filteredSpecialties = formData.specialties.filter(
                    s => newAvailableGenres.includes(s)
                  );
                  setFormData({ ...formData, category: value, specialties: filteredSpecialties });
                }}>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#191414] border-gray-700">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-300">
                Ville *
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="text-gray-300">
                Région *
              </Label>
              <Select value={formData.region} onValueChange={(value) =>
                  setFormData({ ...formData, region: value })
                }>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#191414] border-gray-700">
                  {regions.map((reg) => (
                    <SelectItem key={reg} value={reg} className="text-white">
                      {reg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Médias */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Médias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-gray-300 flex items-center gap-2">
                <ImageIcon className="size-4" />
                Photos
              </Label>
              <span className="text-sm text-gray-400">
                {uploadedPhotos} / {maxPhotos} utilisée{uploadedPhotos > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Array.from({ length: maxPhotos }).map((_, index) => (
                <label
                  key={index}
                  htmlFor={index >= uploadedPhotos ? `photo-upload-${index}` : undefined}
                  className={`aspect-square rounded-lg border-2 border-dashed ${
                    index < uploadedPhotos
                      ? "border-[#1DB954] bg-[#1DB954]/10"
                      : "border-gray-700 bg-[#191414] cursor-pointer"
                  } flex items-center justify-center hover:border-[#1DB954] transition-colors`}
                >
                  {index < uploadedPhotos ? (
                    <div className="relative w-full h-full">
                      <img
                        src={photos[index].url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 w-6 h-6 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemovePhoto(photos[index].id);
                        }}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="size-6 text-gray-600" />
                      <input
                        type="file"
                        id={`photo-upload-${index}`}
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </>
                  )}
                </label>
              ))}
            </div>
            {!isProfessionalized && (
              <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-gray-300 flex items-start gap-2">
                  <AlertCircle className="size-4 mt-0.5 text-purple-400 flex-shrink-0" />
                  Pour ajouter plus de photos et obtenir un badge vérifié, demandez la
                  professionnalisation.
                </p>
              </div>
            )}
          </div>

          {/* Vidéos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-gray-300 flex items-center gap-2">
                <VideoIcon className="size-4" />
                Vidéos YouTube
              </Label>
              <span className="text-sm text-gray-400">
                {uploadedVideos} / {maxVideos} utilisée{uploadedVideos > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Array.from({ length: maxVideos }).map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg border-2 border-dashed ${
                    index < uploadedVideos
                      ? "border-[#1DB954] bg-[#1DB954]/10"
                      : "border-gray-700 bg-[#191414]"
                  } flex items-center justify-center cursor-pointer hover:border-[#1DB954] transition-colors`}
                  onClick={() => {
                    if (index >= uploadedVideos) {
                      setShowVideoModal(true);
                    }
                  }}
                >
                  {index < uploadedVideos ? (
                    <div className="relative w-full h-full">
                      <img
                        src={videos[index].thumbnail}
                        alt={videos[index].title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 w-6 h-6 p-0 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveVideo(videos[index].id);
                        }}
                      >
                        <X className="size-4" />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                        <p className="text-xs text-white truncate">{videos[index].title}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="size-6 text-gray-600" />
                      <span className="text-xs text-gray-600">Ajouter</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ajoutez des liens YouTube de vos performances (pas d'upload direct de vidéo)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bio & Style */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Bio & Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">
              Bio *
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-[#191414] border-gray-700 text-white min-h-32"
              placeholder="Parlez de vous, votre expérience, votre style..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Genre</Label>
            
            {/* Genres sélectionnés */}
            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 cursor-pointer hover:bg-[#1DB954]/30"
                  >
                    {specialty}
                    <X 
                      className="size-3 ml-1 cursor-pointer" 
                      onClick={() => handleRemoveGenre(specialty)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Genres disponibles selon la catégorie */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Cliquez sur les genres qui vous correspondent :
              </p>
              <div className="flex flex-wrap gap-2">
                {availableGenres.map((genre, index) => {
                  const isSelected = formData.specialties.includes(genre);
                  return (
                    <Badge
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#1DB954] text-black hover:bg-[#1ED760] border-[#1DB954]"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => handleToggleGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  );
                })}
                
                {/* Bouton ou input pour ajouter un genre personnalisé */}
                {!showAddGenreInput ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-gray-400 hover:bg-gray-800"
                    onClick={() => setShowAddGenreInput(true)}
                  >
                    + Ajouter
                  </Button>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={newGenre}
                      onChange={(e) => setNewGenre(e.target.value)}
                      placeholder="Nouveau genre"
                      className="bg-[#191414] border-gray-700 text-white h-8 w-40"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCustomGenre();
                        } else if (e.key === 'Escape') {
                          setShowAddGenreInput(false);
                          setNewGenre("");
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      className="bg-[#1DB954] hover:bg-[#1ED760] text-black h-8"
                      onClick={handleAddCustomGenre}
                    >
                      OK
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:bg-gray-800 h-8"
                      onClick={() => {
                        setShowAddGenreInput(false);
                        setNewGenre("");
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Types d'événements</Label>
            
            {/* Types d'événements sélectionnés */}
            {formData.eventTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.eventTypes.map((type, index) => (
                  <Badge
                    key={index}
                    className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 cursor-pointer hover:bg-[#1DB954]/30"
                  >
                    {type}
                    <X 
                      className="size-3 ml-1 cursor-pointer" 
                      onClick={() => handleRemoveEventType(type)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Types d'événements disponibles */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Cliquez sur les types d'événements que vous faites :
              </p>
              <div className="flex flex-wrap gap-2">
                {commonEventTypes.map((type, index) => {
                  const isSelected = formData.eventTypes.includes(type);
                  return (
                    <Badge
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#1DB954] text-black hover:bg-[#1ED760] border-[#1DB954]"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => handleToggleEventType(type)}
                    >
                      {type}
                    </Badge>
                  );
                })}
                
                {/* Bouton ou input pour ajouter un type d'événement personnalisé */}
                {!showAddEventTypeInput ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-gray-400 hover:bg-gray-800"
                    onClick={() => setShowAddEventTypeInput(true)}
                  >
                    + Ajouter
                  </Button>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value)}
                      placeholder="Nouveau type"
                      className="bg-[#191414] border-gray-700 text-white h-8 w-40"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCustomEventType();
                        } else if (e.key === 'Escape') {
                          setShowAddEventTypeInput(false);
                          setNewEventType("");
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      className="bg-[#1DB954] hover:bg-[#1ED760] text-black h-8"
                      onClick={handleAddCustomEventType}
                    >
                      OK
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:bg-gray-800 h-8"
                      onClick={() => {
                        setShowAddEventTypeInput(false);
                        setNewEventType("");
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarification */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Tarification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priceMin" className="text-gray-300">
                Prix minimum (DH)
              </Label>
              <Input
                id="priceMin"
                type="number"
                value={formData.priceMin}
                onChange={(e) =>
                  setFormData({ ...formData, priceMin: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceMax" className="text-gray-300">
                Prix maximum (DH)
              </Label>
              <Input
                id="priceMax"
                type="number"
                value={formData.priceMax}
                onChange={(e) =>
                  setFormData({ ...formData, priceMax: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceUnit" className="text-gray-300">
                Unité
              </Label>
              <Select value={formData.priceUnit} onValueChange={(value) =>
                  setFormData({ ...formData, priceUnit: value })
                }>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#191414] border-gray-700">
                  <SelectItem value="soiree" className="text-white">
                    Par soirée
                  </SelectItem>
                  <SelectItem value="heure" className="text-white">
                    Par heure
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-300">Options incluses</Label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includesTravel"
                checked={formData.includesTravel}
                onChange={(e) =>
                  setFormData({ ...formData, includesTravel: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="includesTravel" className="text-gray-400 cursor-pointer">
                Déplacement inclus
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includesEquipment"
                checked={formData.includesEquipment}
                onChange={(e) =>
                  setFormData({ ...formData, includesEquipment: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label
                htmlFor="includesEquipment"
                className="text-gray-400 cursor-pointer"
              >
                Matériel fourni
              </Label>
            </div>
            <div className="flex items-center gap-2 pt-2 mt-2 border-t border-gray-700">
              <input
                type="checkbox"
                id="isBand"
                checked={formData.isBand}
                onChange={(e) =>
                  setFormData({ ...formData, isBand: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label
                htmlFor="isBand"
                className="text-gray-300 cursor-pointer font-medium flex items-center gap-2"
              >
                <Users className="size-4 text-[#1DB954]" />
                Nous sommes un band / groupe
              </Label>
            </div>
            {formData.isBand && (
              <div className="mt-3 p-3 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  Vous pouvez maintenant créer vos formules avec différentes configurations d'artistes
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Formules (visible uniquement si isBand est coché) */}
      {formData.isBand && (
        <Card className="bg-[#282828] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="size-5" />
                  Nos Formules
                </CardTitle>
                <p className="text-sm text-gray-400 mt-2">
                  Proposez différentes formules adaptées aux besoins de vos clients
                </p>
              </div>
              <Button
                className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                onClick={() => {
                  setEditingFormula(null);
                  setNewFormula({
                    title: "",
                    description: "",
                    numberOfArtists: "",
                    duration: "",
                    price: "",
                  });
                  setShowFormulaModal(true);
                }}
              >
                <Plus className="size-4" />
                Ajouter une formule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {formulas.length === 0 ? (
              <div className="text-center py-12 bg-[#191414] rounded-lg border border-gray-700">
                <Users className="size-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Aucune formule créée</p>
                <p className="text-sm text-gray-500 mb-4">
                  Créez vos premières formules pour les afficher sur votre profil public
                </p>
                <Button
                  variant="outline"
                  className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                  onClick={() => {
                    setEditingFormula(null);
                    setNewFormula({
                      title: "",
                      description: "",
                      numberOfArtists: "",
                      duration: "",
                      price: "",
                    });
                    setShowFormulaModal(true);
                  }}
                >
                  <Plus className="size-4 mr-2" />
                  Créer ma première formule
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formulas.map((formula) => (
                  <div
                    key={formula.id}
                    className="p-4 bg-[#191414] rounded-lg border border-gray-700 hover:border-[#1DB954]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{formula.title}</h4>
                        <p className="text-sm text-gray-400">{formula.description}</p>
                      </div>
                      <div className="flex gap-2 ml-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-[#1DB954] hover:bg-gray-800"
                          onClick={() => {
                            setEditingFormula(formula);
                            setNewFormula({
                              title: formula.title,
                              description: formula.description,
                              numberOfArtists: formula.numberOfArtists,
                              duration: formula.duration,
                              price: formula.price,
                            });
                            setShowFormulaModal(true);
                          }}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-red-500 hover:bg-gray-800"
                          onClick={() => {
                            setFormulas(formulas.filter((f) => f.id !== formula.id));
                            toast.info("Formule supprimée");
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="size-4" />
                        {formula.numberOfArtists} artiste{parseInt(formula.numberOfArtists) > 1 ? "s" : ""}
                      </span>
                      <span>⏱️ {formula.duration}</span>
                      <span className="text-[#1DB954] font-semibold ml-auto">
                        {formula.price} DH
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Artistes Recommandés */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="size-5" />
                Artistes Recommandés
              </CardTitle>
              <p className="text-sm text-gray-400 mt-2">
                Recommandez des artistes avec lesquels vous travaillez (musiciens, chanteurs, etc.)
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Case à cocher pour activer */}
          <div className="flex items-center gap-3 p-4 bg-[#191414] rounded-lg border border-gray-700">
            <input
              type="checkbox"
              id="showRecommendedArtists"
              checked={showRecommendedArtists}
              onChange={(e) => setShowRecommendedArtists(e.target.checked)}
              className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-[#1DB954] focus:ring-[#1DB954] cursor-pointer"
            />
            <Label
              htmlFor="showRecommendedArtists"
              className="text-gray-300 cursor-pointer font-medium"
            >
              Je souhaite recommander d'autres artistes
            </Label>
          </div>

          {/* Champs pour ajouter des artistes */}
          {showRecommendedArtists && (
            <div className="space-y-4 p-4 bg-[#191414] rounded-lg border border-gray-700">
              <div className="space-y-3">
                <Label className="text-gray-300">Ajouter un artiste</Label>
                <div className="flex gap-2">
                  <Input
                    value={newArtistLink}
                    onChange={(e) => setNewArtistLink(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                    placeholder="Lien du profil Souk Talent (ex: /artist/12345)"
                  />
                  <Button
                    className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                    onClick={handleAddRecommendedArtist}
                  >
                    <Plus className="size-4" />
                    Ajouter
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Copiez le lien du profil de l'artiste sur Souk Talent
                </p>
              </div>

              {/* Liste des artistes recommandés */}
              {recommendedArtists.length > 0 && (
                <div className="space-y-2 mt-4">
                  <Label className="text-gray-300 text-sm">
                    Artistes recommandés ({recommendedArtists.length})
                  </Label>
                  <div className="space-y-2">
                    {recommendedArtists.map((artist) => (
                      <div
                        key={artist.id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <LinkIcon className="size-4 text-[#1DB954] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {artist.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{artist.link}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-red-500 hover:bg-gray-800 flex-shrink-0"
                          onClick={() => handleRemoveRecommendedArtist(artist.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recommendedArtists.length === 0 && (
                <div className="text-center py-6 border-t border-gray-700 mt-4">
                  <Users className="size-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Aucun artiste recommandé pour le moment
                  </p>
                </div>
              )}

              <div className="p-3 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg mt-4">
                <p className="text-sm text-[#1DB954] flex items-start gap-2">
                  <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
                  Les artistes recommandés seront affichés sur votre profil public
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coordonnées */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Coordonnées</CardTitle>
          <p className="text-sm text-gray-400 mt-2">
            Ces informations seront visibles uniquement aux organisateurs connectés
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">
                Téléphone *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-gray-300">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#191414] border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-gray-300">
                Instagram
              </Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
                placeholder="@username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soundcloud" className="text-gray-300">
                SoundCloud
              </Label>
              <Input
                id="soundcloud"
                value={formData.soundcloud}
                onChange={(e) =>
                  setFormData({ ...formData, soundcloud: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
                placeholder="https://soundcloud.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="presskit" className="text-gray-300">
                Press Kit
              </Label>
              <Input
                id="presskit"
                value={formData.presskit}
                onChange={(e) =>
                  setFormData({ ...formData, presskit: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
                placeholder="https://example.com/presskit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ficheTechnique" className="text-gray-300">
                Fiche Technique
              </Label>
              <Input
                id="ficheTechnique"
                value={formData.ficheTechnique}
                onChange={(e) =>
                  setFormData({ ...formData, ficheTechnique: e.target.value })
                }
                className="bg-[#191414] border-gray-700 text-white"
                placeholder="https://example.com/fiche-technique"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professionalization Modal */}
      <Dialog
        open={showProfessionalizationModal}
        onOpenChange={(open) => {
          setShowProfessionalizationModal(open);
          if (!open) {
            // Reset form
            setProRequestCity("");
            setProRequestAvailability("");
            setProRequestPhone("");
            setProRequestSessionType("");
            setProRequestComment("");
            setProRequestErrors({});
            setProRequestSuccess(false);
          }
        }}
      >
        <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1DB954] flex items-center gap-2 text-xl">
              <Award className="size-5" />
              Demande Pro
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Obtenez un badge Pro et débloquez jusqu'à 5 photos et 5 vidéos.
            </DialogDescription>
          </DialogHeader>

          {/* État: Demande déjà en cours */}
          {hasExistingProRequest ? (
            <div className="space-y-4 mt-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <AlertCircle className="size-12 text-blue-400 mx-auto mb-3" />
                <p className="font-medium text-white mb-2">
                  Vous avez déjà une demande en cours.
                </p>
                <p className="text-sm text-gray-400 mb-3">
                  Statut actuel:{" "}
                  <span className="font-medium text-blue-400">
                    {existingRequestStatus === "nouveau" && "En attente"}
                    {existingRequestStatus === "contacte" && "Contacté"}
                    {existingRequestStatus === "planifie" && "Planifié"}
                  </span>
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setShowProfessionalizationModal(false)}
              >
                Fermer
              </Button>
            </div>
          ) : proRequestSuccess ? (
            /* État: Succès */
            <div className="space-y-4 mt-4">
              <div className="bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg p-4 text-center">
                <CheckCircle className="size-12 text-[#1DB954] mx-auto mb-3" />
                <p className="font-medium text-white mb-2">
                  Demande envoyée ✅
                </p>
                <p className="text-sm text-gray-400">
                  Notre équipe vous contactera prochainement.
                </p>
              </div>
              <Button
                className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
                onClick={() => setShowProfessionalizationModal(false)}
              >
                Fermer
              </Button>
            </div>
          ) : (
            /* État: Formulaire normal */
            <div className="space-y-4 mt-4">
              {/* Ville */}
              <div className="space-y-2">
                <Label htmlFor="prof-city" className="text-gray-300">
                  Ville *
                </Label>
                <Select value={proRequestCity} onValueChange={(value) => {
                  setProRequestCity(value);
                  setProRequestErrors({ ...proRequestErrors, city: undefined });
                }}>
                  <SelectTrigger
                    id="prof-city"
                    className={`bg-gray-800 border-gray-700 text-white ${
                      proRequestErrors.city ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Dans quelle ville êtes-vous ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Casablanca">Casablanca</SelectItem>
                    <SelectItem value="Rabat">Rabat</SelectItem>
                    <SelectItem value="Marrakech">Marrakech</SelectItem>
                    <SelectItem value="Fès">Fès</SelectItem>
                    <SelectItem value="Tanger">Tanger</SelectItem>
                    <SelectItem value="Agadir">Agadir</SelectItem>
                    <SelectItem value="Meknès">Meknès</SelectItem>
                    <SelectItem value="Oujda">Oujda</SelectItem>
                    <SelectItem value="Kenitra">Kenitra</SelectItem>
                    <SelectItem value="Tétouan">Tétouan</SelectItem>
                    <SelectItem value="Safi">Safi</SelectItem>
                    <SelectItem value="El Jadida">El Jadida</SelectItem>
                  </SelectContent>
                </Select>
                {proRequestErrors.city && (
                  <p className="text-xs text-red-400">{proRequestErrors.city}</p>
                )}
              </div>

              {/* Disponibilités */}
              <div className="space-y-2">
                <Label htmlFor="prof-availability" className="text-gray-300">
                  Disponibilités *
                </Label>
                <p className="text-xs text-gray-400">
                  Indiquez vos créneaux disponibles sur les 7 à 14 prochains jours (jours + horaires).
                </p>
                <Textarea
                  id="prof-availability"
                  value={proRequestAvailability}
                  onChange={(e) => {
                    setProRequestAvailability(e.target.value);
                    setProRequestErrors({ ...proRequestErrors, availability: undefined });
                  }}
                  placeholder="Ex : Mar & Jeu 18h–21h, Sam 11h–15h"
                  className={`bg-gray-800 border-gray-700 text-white min-h-[100px] ${
                    proRequestErrors.availability ? "border-red-500" : ""
                  }`}
                />
                {proRequestErrors.availability && (
                  <p className="text-xs text-red-400">{proRequestErrors.availability}</p>
                )}
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="prof-phone" className="text-gray-300">
                  Téléphone de contact <span className="text-gray-500">(optionnel)</span>
                </Label>
                <Input
                  id="prof-phone"
                  type="tel"
                  value={proRequestPhone}
                  onChange={(e) => setProRequestPhone(e.target.value)}
                  placeholder="+212 ..."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Préférence de séance */}
              <div className="space-y-2">
                <Label className="text-gray-300">
                  Préférence de séance <span className="text-gray-500">(optionnel)</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="session-type"
                      value="photo"
                      checked={proRequestSessionType === "photo"}
                      onChange={(e) => setProRequestSessionType(e.target.value)}
                      className="text-[#1DB954] focus:ring-[#1DB954]"
                    />
                    <span className="text-sm text-gray-300">Photo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="session-type"
                      value="video"
                      checked={proRequestSessionType === "video"}
                      onChange={(e) => setProRequestSessionType(e.target.value)}
                      className="text-[#1DB954] focus:ring-[#1DB954]"
                    />
                    <span className="text-sm text-gray-300">Vidéo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="session-type"
                      value="both"
                      checked={proRequestSessionType === "both"}
                      onChange={(e) => setProRequestSessionType(e.target.value)}
                      className="text-[#1DB954] focus:ring-[#1DB954]"
                    />
                    <span className="text-sm text-gray-300">Photo + Vidéo</span>
                  </label>
                </div>
              </div>

              {/* Commentaire */}
              <div className="space-y-2">
                <Label htmlFor="prof-comment" className="text-gray-300">
                  Commentaire <span className="text-gray-500">(optionnel)</span>
                </Label>
                <Textarea
                  id="prof-comment"
                  value={proRequestComment}
                  onChange={(e) => setProRequestComment(e.target.value)}
                  placeholder="Quartier, contraintes ou informations utiles…"
                  className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
                />
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setShowProfessionalizationModal(false)}
                  disabled={isSubmittingProRequest}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                  disabled={isSubmittingProRequest || !proRequestCity || !proRequestAvailability}
                  onClick={() => {
                    // Validation
                    const errors: {city?: string; availability?: string} = {};
                    if (!proRequestCity) {
                      errors.city = "La ville est requise";
                    }
                    if (!proRequestAvailability.trim()) {
                      errors.availability = "Les disponibilités sont requises";
                    }

                    if (Object.keys(errors).length > 0) {
                      setProRequestErrors(errors);
                      return;
                    }

                    // Simulation envoi
                    setIsSubmittingProRequest(true);
                    setTimeout(() => {
                      setIsSubmittingProRequest(false);
                      setProRequestSuccess(true);
                    }, 1500);
                  }}
                >
                  {isSubmittingProRequest ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer la demande"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Formula Modal */}
      <Dialog open={showFormulaModal} onOpenChange={setShowFormulaModal}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#1DB954] flex items-center gap-2">
              <Users className="size-5" />
              {editingFormula ? "Modifier la formule" : "Ajouter une formule"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              {editingFormula
                ? "Modifiez les détails de votre formule existante."
                : "Créez une nouvelle formule pour votre groupe."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="formula-title" className="text-gray-300">
                Titre *
              </Label>
              <Input
                id="formula-title"
                value={newFormula.title}
                onChange={(e) =>
                  setNewFormula({ ...newFormula, title: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Ex: Formule Duo, Trio Standard..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formula-description" className="text-gray-300">
                Description *
              </Label>
              <Textarea
                id="formula-description"
                value={newFormula.description}
                onChange={(e) =>
                  setNewFormula({ ...newFormula, description: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white min-h-20"
                placeholder="Décrivez cette formule..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="formula-artists" className="text-gray-300">
                  Nombre d'artistes *
                </Label>
                <Input
                  id="formula-artists"
                  type="number"
                  min="1"
                  value={newFormula.numberOfArtists}
                  onChange={(e) =>
                    setNewFormula({ ...newFormula, numberOfArtists: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formula-duration" className="text-gray-300">
                  Durée *
                </Label>
                <Input
                  id="formula-duration"
                  value={newFormula.duration}
                  onChange={(e) =>
                    setNewFormula({ ...newFormula, duration: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="3 heures"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="formula-price" className="text-gray-300">
                Prix (DH) *
              </Label>
              <Input
                id="formula-price"
                type="number"
                min="0"
                value={newFormula.price}
                onChange={(e) =>
                  setNewFormula({ ...newFormula, price: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="5000"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  setShowFormulaModal(false);
                  setNewFormula({
                    title: "",
                    description: "",
                    numberOfArtists: "",
                    duration: "",
                    price: "",
                  });
                  setEditingFormula(null);
                }}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                onClick={() => {
                  if (
                    !newFormula.title ||
                    !newFormula.description ||
                    !newFormula.numberOfArtists ||
                    !newFormula.duration ||
                    !newFormula.price
                  ) {
                    toast.error("Veuillez remplir tous les champs");
                    return;
                  }

                  if (editingFormula) {
                    // Modifier
                    setFormulas(
                      formulas.map((f) =>
                        f.id === editingFormula.id
                          ? { ...newFormula, id: editingFormula.id }
                          : f
                      )
                    );
                    toast.success("Formule modifiée avec succès !");
                  } else {
                    // Ajouter
                    setFormulas([
                      ...formulas,
                      {
                        id: Date.now().toString(),
                        ...newFormula,
                      },
                    ]);
                    toast.success("Formule ajoutée avec succès !");
                  }

                  setShowFormulaModal(false);
                  setNewFormula({
                    title: "",
                    description: "",
                    numberOfArtists: "",
                    duration: "",
                    price: "",
                  });
                  setEditingFormula(null);
                }}
              >
                {editingFormula ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video YouTube Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#1DB954] flex items-center gap-2">
              <VideoIcon className="size-5" />
              Ajouter une vidéo YouTube
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Ajoutez un lien YouTube de votre performance pour l'afficher sur votre profil.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="video-url" className="text-gray-300">
                Lien YouTube *
              </Label>
              <Input
                id="video-url"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-500">
                Copiez le lien complet de votre vidéo YouTube
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-title" className="text-gray-300">
                Titre de la vidéo *
              </Label>
              <Input
                id="video-title"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Ex: Performance live au festival..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  setShowVideoModal(false);
                  setNewVideoUrl('');
                  setNewVideoTitle('');
                }}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                onClick={handleAddYoutubeVideo}
              >
                Ajouter la vidéo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}