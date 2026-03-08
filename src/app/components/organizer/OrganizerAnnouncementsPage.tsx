import { supabase } from "../../../utils/api";
import { useState, useEffect } from "react";
import {
  Megaphone,
  Plus,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Trash2,
  Eye,
  Archive,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Announcement } from "@/app/data/announcementsData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { AnnouncementApplications } from "./AnnouncementApplications";

interface OrganizerAnnouncementsPageProps {
  onBack: () => void;
}

export function OrganizerAnnouncementsPage({ onBack }: OrganizerAnnouncementsPageProps) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showApplications, setShowApplications] = useState(false);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    // Annonces à venir (actives)
    {
      id: "org-ann-1",
      organizerId: "current-organizer",
      organizerName: "Vous",
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
    {
      id: "org-ann-2",
      organizerId: "current-organizer",
      organizerName: "Vous",
      organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      title: "Chanteur pour événement corporate",
      description: "Soirée d'entreprise avec 150 invités. Recherche chanteur/chanteuse pour ambiance lounge.",
      talentCategory: "Chanteur",
      eventType: "Corporate",
      eventDate: "2026-03-20",
      city: "Rabat",
      region: "Rabat-Salé-Kénitra",
      venue: "Centre de conférences",
      budgetMin: 8000,
      budgetMax: 12000,
      guestCount: 150,
      duration: "3 heures",
      requirements: ["Répertoire varié", "Tenue élégante"],
      createdAt: "2026-01-28T14:00:00",
      expiresAt: "2026-03-10T23:59:59",
      status: "active",
      applicationsCount: 12,
    },
  ]);

  const fetchMyAnnouncements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("announcements").select("*").eq("organizer_id", user.id).order("created_at", { ascending: false });
      setAnnouncements(data || []);
    } catch (err) { console.error(err); }
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    talentCategory: "",
    eventType: "",
    eventDate: "",
    city: "",
    region: "",
    venue: "",
    budgetMin: "",
    budgetMax: "",
    guestCount: "",
    duration: "",
    requirements: "",
  });

  const categories = ["DJ", "Groupe Traditionnel", "Orchestre", "Chanteur", "Groupe Moderne", "Animateur"];
  const eventTypes = ["Mariage", "Corporate", "Soirée privée", "Club", "Festival", "Anniversaire"];
  const regions = [
    "Grand Casablanca",
    "Rabat-Salé-Kénitra",
    "Marrakech-Safi",
    "Tanger-Tétouan-Al Hoceïma",
    "Fès-Meknès",
    "Souss-Massa",
  ];

  const activeAnnouncements = announcements.filter(a => a.status === "active");
  const archivedAnnouncements = announcements.filter(a => a.status === "closed" || a.status === "expired");

  const handleSubmit = async () => {
    if (!formData.title || !formData.talentCategory || !formData.eventDate || !formData.city || !formData.budgetMin) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Vous devez être connecté"); return; }
      const { error } = await supabase.from("announcements").insert({
        organizer_id: user.id,
        title: formData.title,
        description: formData.description,
        categories_needed: formData.talentCategory ? [formData.talentCategory] : [],
        event_type: formData.eventType,
        event_date: formData.eventDate,
        event_city: formData.city,
        region: formData.region,
        budget_min: parseInt(formData.budgetMin),
        budget_max: formData.budgetMax ? parseInt(formData.budgetMax) : parseInt(formData.budgetMin),
        status: "active",
      });
      if (error) throw error;
      await fetchMyAnnouncements();
      setShowModal(false);
      resetForm();
      toast.success("Annonce publiée avec succès !", {
        description: "Les artistes correspondant à votre recherche seront notifiés.",
      });
    } catch (err: any) {
      toast.error("Erreur lors de la publication : " + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      talentCategory: "",
      eventType: "",
      eventDate: "",
      city: "",
      region: "",
      venue: "",
      budgetMin: "",
      budgetMax: "",
      guestCount: "",
      duration: "",
      requirements: "",
    });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.info("Annonce supprimée");
  };

  const handleArchive = async (id: string) => {
    await supabase.from("announcements").update({ status: "closed" }).eq("id", id);
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, status: "closed" } : a
    ));
    toast.success("Annonce archivée");
  };

  const renderAnnouncementCard = (announcement: Announcement, showArchiveButton = false) => (
    <Card key={announcement.id} className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-white">{announcement.title}</h3>
              <Badge className={
                announcement.status === "active" 
                  ? "bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30"
                  : "bg-gray-700 text-gray-300 border-gray-600"
              }>
                {announcement.status === "active" ? "Active" : "Archivée"}
              </Badge>
            </div>
            <p className="text-gray-400 text-sm mb-4">{announcement.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="size-4 text-[#1DB954]" />
                <div>
                  <p className="text-gray-500 text-xs">Type</p>
                  <p className="text-white">{announcement.talentCategory}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4 text-[#1DB954]" />
                <div>
                  <p className="text-gray-500 text-xs">Date</p>
                  <p className="text-white">
                    {(() => { try { return format(new Date(announcement.eventDate), "dd MMM yyyy", { locale: fr }); } catch { return announcement.eventDate || "Date non définie"; } })()}
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
                    {announcement.budgetMin === announcement.budgetMax
                      ? `${announcement.budgetMin.toLocaleString()} DH`
                      : `${announcement.budgetMin.toLocaleString()} - ${announcement.budgetMax.toLocaleString()} DH`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            {showArchiveButton && (
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-[#1DB954] hover:bg-gray-800"
                onClick={() => handleArchive(announcement.id)}
                title="Archiver"
              >
                <Archive className="size-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-red-500 hover:bg-gray-800"
              onClick={() => handleDelete(announcement.id)}
              title="Supprimer"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Eye className="size-4" />
              {Math.floor(Math.random() * 100) + 20} vues
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-4" />
              {announcement.applicationsCount} candidature{announcement.applicationsCount > 1 ? "s" : ""}
            </span>
            <span>
              Publiée le {format(new Date(announcement.createdAt), "dd MMM yyyy", { locale: fr })}
            </span>
          </div>
          <Button
            size="sm"
            className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
            onClick={() => {
              setSelectedAnnouncement(announcement);
              setShowApplications(true);
            }}
          >
            Voir les candidatures
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {showApplications && selectedAnnouncement ? (
        <AnnouncementApplications
          announcement={selectedAnnouncement}
          onBack={() => setShowApplications(false)}
        />
      ) : (
        <div className="min-h-screen bg-[#191414] py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="outline"
                className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 mb-4 gap-2"
                onClick={onBack}
              >
                <ArrowLeft className="size-4" />
                Retour
              </Button>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                    <Megaphone className="size-10 text-[#1DB954]" />
                    Mes Annonces
                  </h1>
                  <p className="text-gray-400">Gérez vos annonces et trouvez le talent parfait</p>
                </div>
                <Button
                  className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                  onClick={() => setShowModal(true)}
                >
                  <Plus className="size-4" />
                  Nouvelle annonce
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-[#282828] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#1DB954]/20 rounded-full">
                      <Megaphone className="size-6 text-[#1DB954]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{activeAnnouncements.length}</p>
                      <p className="text-sm text-gray-400">Annonces actives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#282828] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Users className="size-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {announcements.reduce((sum, a) => sum + a.applicationsCount, 0)}
                      </p>
                      <p className="text-sm text-gray-400">Candidatures reçues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#282828] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <Archive className="size-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{archivedAnnouncements.length}</p>
                      <p className="text-sm text-gray-400">Archivées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Onglets */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList className="bg-[#282828] border border-gray-800">
                <TabsTrigger 
                  value="active" 
                  className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black"
                >
                  <CheckCircle className="size-4 mr-2" />
                  À venir ({activeAnnouncements.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="archived"
                  className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black"
                >
                  <Archive className="size-4 mr-2" />
                  Archivées ({archivedAnnouncements.length})
                </TabsTrigger>
              </TabsList>

              {/* Annonces actives */}
              <TabsContent value="active" className="space-y-4">
                {activeAnnouncements.length === 0 ? (
                  <Card className="bg-[#282828] border-gray-800">
                    <CardContent className="p-12 text-center">
                      <Megaphone className="size-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Aucune annonce active
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Créez votre première annonce pour trouver le talent parfait
                      </p>
                      <Button
                        className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                        onClick={() => setShowModal(true)}
                      >
                        <Plus className="size-4" />
                        Créer une annonce
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  activeAnnouncements.map((announcement) => renderAnnouncementCard(announcement, true))
                )}
              </TabsContent>

              {/* Annonces archivées */}
              <TabsContent value="archived" className="space-y-4">
                {archivedAnnouncements.length === 0 ? (
                  <Card className="bg-[#282828] border-gray-800">
                    <CardContent className="p-12 text-center">
                      <Archive className="size-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Aucune annonce archivée
                      </h3>
                      <p className="text-gray-400">
                        Les annonces archivées apparaîtront ici
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  archivedAnnouncements.map((announcement) => renderAnnouncementCard(announcement, false))
                )}
              </TabsContent>
            </Tabs>

            {/* Modal de création d'annonce */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogContent className="bg-[#191414] border-gray-800 text-white max-h-[90vh] overflow-y-auto max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-[#1DB954] text-2xl">Créer une annonce</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Remplissez les détails de votre recherche pour trouver le talent parfait
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  {/* Titre */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Titre de l'annonce *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Ex: Recherche DJ pour mariage à Marrakech"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                      placeholder="Décrivez votre événement et vos attentes..."
                    />
                  </div>

                  {/* Type de talent et Type d'événement */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="talentCategory" className="text-gray-300">
                        Type de talent recherché *
                      </Label>
                      <Select
                        value={formData.talentCategory}
                        onValueChange={(value) => setFormData({ ...formData, talentCategory: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat} className="text-white">
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventType" className="text-gray-300">
                        Type d'événement *
                      </Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Date et Durée */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate" className="text-gray-300">
                        Date de l'événement *
                      </Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-gray-300">
                        Durée
                      </Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Ex: 4 heures"
                      />
                    </div>
                  </div>

                  {/* Ville et Région */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-300">
                        Ville *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Ex: Casablanca"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-gray-300">
                        Région *
                      </Label>
                      <Select
                        value={formData.region}
                        onValueChange={(value) => setFormData({ ...formData, region: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {regions.map((region) => (
                            <SelectItem key={region} value={region} className="text-white">
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Lieu et Nombre d'invités */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-gray-300">
                        Lieu
                      </Label>
                      <Input
                        id="venue"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Ex: Hôtel Sofitel"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guestCount" className="text-gray-300">
                        Nombre d'invités
                      </Label>
                      <Input
                        id="guestCount"
                        type="number"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Ex: 200"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budgetMin" className="text-gray-300">
                        Budget minimum (DH) *
                      </Label>
                      <Input
                        id="budgetMin"
                        type="number"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Ex: 10000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budgetMax" className="text-gray-300">
                        Budget maximum (DH)
                      </Label>
                      <Input
                        id="budgetMax"
                        type="number"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Ex: 15000"
                      />
                    </div>
                  </div>

                  {/* Exigences */}
                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-gray-300">
                      Exigences particulières
                    </Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Une exigence par ligne&#10;Ex: Expérience minimum 5 ans&#10;Équipement professionnel&#10;Références vérifiables"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">Une exigence par ligne</p>
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                      onClick={handleSubmit}
                    >
                      <Megaphone className="size-4 mr-2" />
                      Publier l'annonce
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}