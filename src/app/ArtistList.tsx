import { useState, useEffect } from "react";
import { Search, MapPin, Star, Filter, BadgeCheck, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { supabase } from "../../utils/api";

const categories = ["Tous", "DJ", "Chanteur", "Groupe tradi", "Live Band", "Animateur & Spectacle", "Musicien Solo"];
const regions = ["Toutes les régions", "Casablanca-Settat", "Rabat-Salé-Kénitra", "Marrakech-Safi", "Fès-Meknès", "Tanger-Tétouan-Al Hoceïma", "Souss-Massa", "Oriental", "Béni Mellal-Khénifra", "Drâa-Tafilalet", "Laâyoune-Sakia El Hamra", "Dakhla-Oued Ed-Dahab", "Guelmim-Oued Noun"];

interface ArtistListProps {
  onSelectArtist: (artistId: string) => void;
  initialFilters?: { category?: string; region?: string };
}

export function ArtistList({ onSelectArtist, initialFilters }: ArtistListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.category || "Tous");
  const [selectedRegion, setSelectedRegion] = useState(initialFilters?.region || "Toutes les régions");
  const [sortBy, setSortBy] = useState("rating");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchArtists(); }, [selectedCategory, selectedRegion, sortBy]);

  const fetchArtists = async () => {
    setLoading(true); setError("");
    try {
      let query = supabase.from("artists").select(`*, profiles (id, full_name, avatar_url)`).eq("profile_active", true);
      if (selectedCategory !== "Tous") query = query.eq("category", selectedCategory);
      if (selectedRegion !== "Toutes les régions") query = query.eq("region", selectedRegion);
      if (sortBy === "rating") query = query.order("rating", { ascending: false });
      else if (sortBy === "price-low") query = query.order("price_min", { ascending: true });
      else if (sortBy === "price-high") query = query.order("price_min", { ascending: false });
      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setArtists(data || []);
    } catch (err: any) { setError("Erreur lors du chargement des artistes"); }
    finally { setLoading(false); }
  };

  const filteredArtists = artists.filter((artist) => {
    if (!searchQuery) return true;
    const name = artist.profiles?.full_name || "";
    const bio = artist.bio || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase()) || bio.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#191414] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="mb-2 text-white">Trouvez votre artiste</h2>
          <p className="text-gray-400">{loading ? "Chargement..." : `${filteredArtists.length} artiste${filteredArtists.length > 1 ? "s" : ""} disponible${filteredArtists.length > 1 ? "s" : ""}`}</p>
        </div>

        <div className="bg-[#282828] rounded-lg shadow-sm p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Rechercher un artiste..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-[#191414] border-gray-700 text-white" />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#191414] border-gray-700 text-white"><SelectValue placeholder="Catégorie" /></SelectTrigger>
              <SelectContent>{categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-[#191414] border-gray-700 text-white"><SelectValue placeholder="Région" /></SelectTrigger>
              <SelectContent>{regions.map((reg) => <SelectItem key={reg} value={reg}>{reg}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#191414] border-gray-700 text-white"><SelectValue placeholder="Trier par" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Meilleures notes</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20"><Loader2 className="size-10 animate-spin text-[#1DB954]" /></div>
        ) : error ? (
          <div className="text-center py-12"><p className="text-red-400">{error}</p><Button onClick={fetchArtists} className="mt-4 bg-[#1DB954] text-black">Réessayer</Button></div>
        ) : filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="size-12 mx-auto text-gray-500 mb-4" />
            <h3 className="mb-2 text-white">Aucun artiste trouvé</h3>
            <p className="text-gray-400">
              {selectedCategory !== "Tous" || selectedRegion !== "Toutes les régions" || searchQuery
                ? "Essayez de modifier vos critères de recherche"
                : "Aucun artiste inscrit pour le moment."}
            </p>
            {(selectedCategory !== "Tous" || selectedRegion !== "Toutes les régions" || searchQuery) && (
              <Button onClick={() => { setSelectedCategory("Tous"); setSelectedRegion("Toutes les régions"); setSearchQuery(""); }} className="mt-4 bg-[#1DB954] text-black">
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} onClick={() => onSelectArtist(artist.id)} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function ArtistCard({ artist, onClick }: { artist: any; onClick: () => void }) {
  const name = artist.profiles?.full_name || "Artiste";
  const avatar = artist.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1DB954&color=000&size=400`;
  const priceRange = artist.price_min && artist.price_max ? `${artist.price_min} - ${artist.price_max} MAD` : artist.price_min ? `À partir de ${artist.price_min} MAD` : "Prix sur demande";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-[#282828] border-gray-800" onClick={onClick}>
      <div className="aspect-video overflow-hidden">
        <img src={avatar} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white text-sm font-semibold truncate">{name}</h4>
              {artist.is_verified && <div className="group relative flex-shrink-0"><BadgeCheck className="size-4 text-[#1DB954] fill-[#1DB954]" /></div>}
              {artist.badge_pro && <Badge className="bg-yellow-500/20 text-yellow-400 text-xs px-1">PRO</Badge>}
            </div>
            <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954] text-xs">{artist.category || "Artiste"}</Badge>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <Star className="size-3 fill-[#1DB954] text-[#1DB954]" />
            <span className="text-white text-sm">{artist.rating ? Number(artist.rating).toFixed(1) : "Nouveau"}</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{artist.bio || "Artiste professionnel au Maroc"}</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-1 text-gray-400"><MapPin className="size-3 flex-shrink-0" /><span className="truncate">{artist.region || artist.location || "Maroc"}</span></div>
          {artist.genres && artist.genres.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {artist.genres.slice(0, 2).map((genre: string, i: number) => <Badge key={i} variant="outline" className="border-gray-700 text-gray-300 text-xs px-2 py-0">{genre}</Badge>)}
              {artist.genres.length > 2 && <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs px-2 py-0">+{artist.genres.length - 2}</Badge>}
            </div>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#1DB954] font-semibold">{priceRange}</span>
            <span className="text-gray-500">{artist.reviews_count || 0} avis</span>
          </div>
        </div>
        <Button className="w-full mt-3 bg-[#1DB954] hover:bg-[#1ED760] text-black text-sm py-2 h-auto">Voir le profil</Button>
      </CardContent>
    </Card>
  );
}
