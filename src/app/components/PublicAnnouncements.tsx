import { useState, useEffect } from "react";
import { Megaphone, Search, MapPin, Calendar, DollarSign, Users, Clock, Filter, ArrowLeft, Building2, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { supabase } from "../../utils/api";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const categories = ["Tous", "DJ", "Chanteur", "Groupe tradi", "Live Band", "Animateur & Spectacle", "Musicien Solo"];
const regions = ["Toutes", "Casablanca-Settat", "Rabat-Salé-Kénitra", "Marrakech-Safi", "Fès-Meknès", "Tanger-Tétouan-Al Hoceïma", "Souss-Massa", "Oriental"];

interface PublicAnnouncementsProps { onBack: () => void; }

export function PublicAnnouncements({ onBack }: PublicAnnouncementsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedRegion, setSelectedRegion] = useState("Toutes");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchAnnouncements(); }, [selectedCategory, selectedRegion]);

  const fetchAnnouncements = async () => {
    setLoading(true); setError("");
    try {
      let query = supabase
        .from("announcements")
        .select("*, organizers (id, company_name, profiles (full_name, avatar_url))")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (selectedCategory !== "Tous") query = query.contains("categories_needed", [selectedCategory]);
      if (selectedRegion !== "Toutes") query = query.eq("region", selectedRegion);
      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setAnnouncements(data || []);
    } catch (err: any) { setError("Erreur lors du chargement des annonces"); }
    finally { setLoading(false); }
  };

  const filtered = announcements.filter((a) => {
    if (!searchQuery) return true;
    return a.title?.toLowerCase().includes(searchQuery.toLowerCase()) || a.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#191414] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 mb-4 gap-2" onClick={onBack}>
            <ArrowLeft className="size-4" />Retour
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Megaphone className="size-10 text-[#1DB954]" />Annonces
          </h1>
          <p className="text-gray-400">{loading ? "Chargement..." : `${filtered.length} annonce${filtered.length > 1 ? "s" : ""} disponible${filtered.length > 1 ? "s" : ""}`}</p>
        </div>

        <Card className="bg-[#282828] border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Rechercher une annonce..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-[#191414] border-gray-700 text-white" />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white"><SelectValue placeholder="Catégorie" /></SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">{categories.map((cat) => <SelectItem key={cat} value={cat} className="text-white">{cat}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white"><SelectValue placeholder="Région" /></SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">{regions.map((r) => <SelectItem key={r} value={r} className="text-white">{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-10 animate-spin text-[#1DB954]" /></div>
        ) : error ? (
          <div className="text-center py-12"><p className="text-red-400">{error}</p><Button onClick={fetchAnnouncements} className="mt-4 bg-[#1DB954] text-black">Réessayer</Button></div>
        ) : filtered.length === 0 ? (
          <Card className="bg-[#282828] border-gray-800">
            <CardContent className="p-12 text-center">
              <Filter className="size-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucune annonce trouvée</h3>
              <p className="text-gray-400">{searchQuery || selectedCategory !== "Tous" || selectedRegion !== "Toutes" ? "Essayez de modifier vos critères" : "Aucune annonce publiée pour le moment."}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((a) => {
              const organizerName = a.organizers?.profiles?.full_name || a.organizers?.company_name || "Organisateur";
              const organizerAvatar = a.organizers?.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(organizerName)}&background=1DB954&color=000`;
              const daysSince = Math.floor((Date.now() - new Date(a.created_at).getTime()) / (1000 * 60 * 60 * 24));
              return (
                <Card key={a.id} className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {a.categories_needed?.map((cat: string) => (
                            <Badge key={cat} className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30">{cat}</Badge>
                          ))}
                          {a.event_type && <Badge variant="outline" className="border-gray-700 text-gray-400">{a.event_type}</Badge>}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{a.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{a.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4 p-3 bg-[#191414] rounded-lg">
                      <img src={organizerAvatar} alt={organizerName} className="size-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{organizerName}</p>
                        {a.organizers?.company_name && (
                          <p className="text-gray-500 text-xs flex items-center gap-1"><Building2 className="size-3" />{a.organizers.company_name}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {a.event_date && (
                        <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                          <Calendar className="size-4 text-[#1DB954] flex-shrink-0" />
                          <div><p className="text-gray-500 text-xs">Date</p><p className="text-white">{(() => { try { return format(new Date(a.event_date), "dd MMM yyyy", { locale: fr }); } catch { return a.event_date || ""; } })()}</p></div>
                        </div>
                      )}
                      {(a.event_city || a.region) && (
                        <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                          <MapPin className="size-4 text-[#1DB954] flex-shrink-0" />
                          <div><p className="text-gray-500 text-xs">Lieu</p><p className="text-white">{a.event_city || a.region}</p></div>
                        </div>
                      )}
                      {(a.budget_min || a.budget_max) && (
                        <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                          <DollarSign className="size-4 text-[#1DB954] flex-shrink-0" />
                          <div><p className="text-gray-500 text-xs">Budget</p>
                            <p className="text-white font-semibold">
                              {a.budget_min && a.budget_max ? `${(a.budget_min || 0).toLocaleString()} - ${a.budget_max.toLocaleString()} DH` : a.budget_min ? `À partir de ${(a.budget_min || 0).toLocaleString()} DH` : `Jusqu'à ${(a.budget_max || 0).toLocaleString()} DH`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Users className="size-3" />{a.applications_count || 0} candidature{(a.applications_count || 0) > 1 ? "s" : ""}</span>
                        <span>Publié il y a {daysSince} jour{daysSince > 1 ? "s" : ""}</span>
                      </div>
                      <Button className="bg-[#1DB954] hover:bg-[#1ED760] text-black" size="sm">Postuler</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
