import { supabase } from "../../../utils/api";
import { useState, useEffect } from "react";
import { Megaphone, Plus, Calendar, MapPin, DollarSign, Users, Trash2, Archive, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";

interface OrganizerAnnouncementsPageProps { onBack: () => void; }

export function OrganizerAnnouncementsPage({ onBack }: OrganizerAnnouncementsPageProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", talentCategory: "", eventType: "",
    eventDate: "", city: "", region: "", budgetMin: "", budgetMax: "", requirements: "",
  });

  const categories = ["DJ", "Groupe Traditionnel", "Orchestre", "Chanteur", "Groupe Moderne", "Animateur"];
  const eventTypes = ["Mariage", "Corporate", "Soirée privée", "Club", "Festival", "Anniversaire"];
  const regions = ["Casablanca-Settat", "Rabat-Salé-Kénitra", "Marrakech-Safi", "Tanger-Tétouan-Al Hoceïma", "Fès-Meknès", "Souss-Massa"];

  const activeAnnouncements = announcements.filter(a => a.status === "active");
  const archivedAnnouncements = announcements.filter(a => a.status === "closed" || a.status === "expired");

  useEffect(() => { fetchMyAnnouncements(); }, []);

  const fetchMyAnnouncements = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("announcements").select("*").eq("organizer_id", user.id).order("created_at", { ascending: false });
      setAnnouncements(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.talentCategory || !formData.eventDate || !formData.city || !formData.budgetMin) {
      toast.error("Veuillez remplir tous les champs obligatoires"); return;
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
        event_date: formData.eventDate || null,
        event_city: formData.city,
        region: formData.region,
        budget_min: parseInt(formData.budgetMin) || 0,
        budget_max: formData.budgetMax ? parseInt(formData.budgetMax) : null,
        status: "active",
      });
      if (error) throw error;
      await fetchMyAnnouncements();
      setShowModal(false);
      setFormData({ title: "", description: "", talentCategory: "", eventType: "", eventDate: "", city: "", region: "", budgetMin: "", budgetMax: "", requirements: "" });
      toast.success("Annonce publiée avec succès !");
    } catch (err: any) { toast.error("Erreur : " + err.message); }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.info("Annonce supprimée");
  };

  const handleArchive = async (id: string) => {
    await supabase.from("announcements").update({ status: "closed" }).eq("id", id);
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, status: "closed" } : a));
    toast.success("Annonce archivée");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Date non définie";
    try { return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return dateStr; }
  };

  const renderCard = (a: any, showArchive = false) => (
    <Card key={a.id} className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {a.categories_needed?.map((cat: string) => <Badge key={cat} className="bg-[#1DB954]/20 text-[#1DB954]">{cat}</Badge>)}
              {a.event_type && <Badge variant="outline" className="border-gray-700 text-gray-400">{a.event_type}</Badge>}
              <Badge className={a.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                {a.status === "active" ? "Active" : "Archivée"}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{a.title}</h3>
            {a.description && <p className="text-gray-400 text-sm line-clamp-2">{a.description}</p>}
          </div>
          <div className="flex gap-2 ml-4">
            {showArchive && <button onClick={() => handleArchive(a.id)} className="text-gray-400 hover:text-yellow-400 transition-colors"><Archive className="size-4" /></button>}
            <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="size-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {a.event_date && (
            <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
              <Calendar className="size-4 text-[#1DB954]" />
              <div><p className="text-gray-500 text-xs">Date</p><p className="text-white">{formatDate(a.event_date)}</p></div>
            </div>
          )}
          {a.event_city && (
            <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
              <MapPin className="size-4 text-[#1DB954]" />
              <div><p className="text-gray-500 text-xs">Ville</p><p className="text-white">{a.event_city}</p></div>
            </div>
          )}
          {a.budget_min && (
            <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
              <DollarSign className="size-4 text-[#1DB954]" />
              <div><p className="text-gray-500 text-xs">Budget</p>
                <p className="text-white">{a.budget_max ? `${a.budget_min.toLocaleString()} - ${a.budget_max.toLocaleString()} DH` : `${a.budget_min.toLocaleString()} DH`}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
            <Users className="size-4 text-[#1DB954]" />
            <div><p className="text-gray-500 text-xs">Candidatures</p><p className="text-white">{a.applications_count || 0}</p></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#191414] py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 mb-4 gap-2" onClick={onBack}>
              <ArrowLeft className="size-4" />Retour
            </Button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Megaphone className="size-8 text-[#1DB954]" />Mes Annonces</h1>
            <p className="text-gray-400 mt-1">Trouvez le talent parfait pour vos événements</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="bg-[#1DB954] hover:bg-[#1ED760] text-black font-bold gap-2">
            <Plus className="size-4" />Nouvelle annonce
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#282828] border-gray-800 p-4 text-center">
            <p className="text-3xl font-bold text-[#1DB954]">{activeAnnouncements.length}</p>
            <p className="text-gray-400 text-sm">Actives</p>
          </Card>
          <Card className="bg-[#282828] border-gray-800 p-4 text-center">
            <p className="text-3xl font-bold text-white">{announcements.reduce((s, a) => s + (a.applications_count || 0), 0)}</p>
            <p className="text-gray-400 text-sm">Candidatures</p>
          </Card>
          <Card className="bg-[#282828] border-gray-800 p-4 text-center">
            <p className="text-3xl font-bold text-gray-400">{archivedAnnouncements.length}</p>
            <p className="text-gray-400 text-sm">Archivées</p>
          </Card>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="bg-[#282828] border border-gray-700 mb-6">
            <TabsTrigger value="active" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">Actives ({activeAnnouncements.length})</TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">Archivées ({archivedAnnouncements.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {loading ? <p className="text-gray-400 text-center py-8">Chargement...</p>
              : activeAnnouncements.length === 0 ? (
                <Card className="bg-[#282828] border-gray-800"><CardContent className="p-12 text-center">
                  <Megaphone className="size-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Aucune annonce active</h3>
                  <p className="text-gray-400 mb-4">Publiez votre première annonce pour trouver des artistes</p>
                  <Button onClick={() => setShowModal(true)} className="bg-[#1DB954] text-black"><Plus className="size-4 mr-2" />Créer une annonce</Button>
                </CardContent></Card>
              ) : <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{activeAnnouncements.map(a => renderCard(a, true))}</div>}
          </TabsContent>
          <TabsContent value="archived">
            {archivedAnnouncements.length === 0
              ? <Card className="bg-[#282828] border-gray-800"><CardContent className="p-12 text-center"><p className="text-gray-400">Aucune annonce archivée</p></CardContent></Card>
              : <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{archivedAnnouncements.map(a => renderCard(a, false))}</div>}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-[#1E1E1E] border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-xl font-bold text-[#1DB954]">Nouvelle annonce</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label className="text-gray-300">Titre *</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Recherche DJ pour mariage" className="mt-1 bg-gray-800 border-gray-600 text-white" /></div>
            <div><Label className="text-gray-300">Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Décrivez votre événement..." className="mt-1 bg-gray-800 border-gray-600 text-white" rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-gray-300">Type de talent *</Label>
                <Select onValueChange={v => setFormData({...formData, talentCategory: v})}>
                  <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white"><SelectValue placeholder="Choisir" /></SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">{categories.map(c => <SelectItem key={c} value={c} className="text-white">{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-gray-300">Type d'événement</Label>
                <Select onValueChange={v => setFormData({...formData, eventType: v})}>
                  <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white"><SelectValue placeholder="Choisir" /></SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">{eventTypes.map(t => <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-gray-300">Date *</Label><Input type="date" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} className="mt-1 bg-gray-800 border-gray-600 text-white" /></div>
              <div><Label className="text-gray-300">Ville *</Label><Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Ex: Casablanca" className="mt-1 bg-gray-800 border-gray-600 text-white" /></div>
            </div>
            <div><Label className="text-gray-300">Région</Label>
              <Select onValueChange={v => setFormData({...formData, region: v})}>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white"><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">{regions.map(r => <SelectItem key={r} value={r} className="text-white">{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-gray-300">Budget minimum (DH) *</Label><Input type="number" value={formData.budgetMin} onChange={e => setFormData({...formData, budgetMin: e.target.value})} placeholder="Ex: 5000" className="mt-1 bg-gray-800 border-gray-600 text-white" /></div>
              <div><Label className="text-gray-300">Budget maximum (DH)</Label><Input type="number" value={formData.budgetMax} onChange={e => setFormData({...formData, budgetMax: e.target.value})} placeholder="Ex: 10000" className="mt-1 bg-gray-800 border-gray-600 text-white" /></div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1 border-gray-600 text-gray-300">Annuler</Button>
              <Button onClick={handleSubmit} className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black font-bold">Publier l'annonce</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
