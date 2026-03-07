import { useState } from "react";
import {
  Heart,
  Search,
  Filter,
  MapPin,
  Star,
  Mail,
  Calendar,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface FavoriteArtist {
  id: string;
  name: string;
  category: string;
  city: string;
  image: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

interface OrganizerFavoritesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteArtistIds: string[];
  onRemoveFavorite: (artistId: string) => void;
}

export function OrganizerFavoritesDialog({
  isOpen,
  onClose,
  favoriteArtistIds,
  onRemoveFavorite,
}: OrganizerFavoritesDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  // Mock data - Dans une vraie app, cela viendrait des favoris de l'utilisateur
  const allArtists: FavoriteArtist[] = [
    {
      id: "1",
      name: "DJ Mehdi El Alami",
      category: "DJ",
      city: "Casablanca",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      priceMin: 5000,
      priceMax: 15000,
      rating: 4.8,
      reviewCount: 47,
      verified: true,
    },
    {
      id: "2",
      name: "Gnawa Fusion Group",
      category: "Groupe Traditionnel",
      city: "Marrakech",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300",
      priceMin: 8000,
      priceMax: 18000,
      rating: 4.9,
      reviewCount: 63,
      verified: true,
    },
    {
      id: "3",
      name: "Chaabi Rif Band",
      category: "Groupe Traditionnel",
      city: "Tanger",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
      priceMin: 7000,
      priceMax: 16000,
      rating: 4.7,
      reviewCount: 38,
      verified: true,
    },
    {
      id: "4",
      name: "Orchestre El Maghreb",
      category: "Orchestre",
      city: "Marrakech",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
      priceMin: 12000,
      priceMax: 25000,
      rating: 4.9,
      reviewCount: 82,
      verified: true,
    },
  ];

  const favorites = allArtists.filter((artist) =>
    favoriteArtistIds.includes(artist.id)
  );

  const filteredFavorites = favorites.filter((artist) => {
    const matchesSearch = artist.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || artist.category === filterCategory;
    const matchesCity = filterCity === "all" || artist.city === filterCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  const categories = [...new Set(favorites.map((f) => f.category))];
  const cities = [...new Set(favorites.map((f) => f.city))];

  const handleRemoveFavorite = (artistId: string, artistName: string) => {
    onRemoveFavorite(artistId);
    toast.success(`${artistName} retiré des favoris`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-[#191414] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Heart className="size-6 fill-red-500 text-red-500" />
            Mes Artistes Favoris
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#282828] rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400 mb-1">Total favoris</p>
              <p className="text-2xl font-bold text-white">{favorites.length}</p>
            </div>
            <div className="bg-[#282828] rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400 mb-1">Vérifiés</p>
              <p className="text-2xl font-bold text-white">
                {favorites.filter((f) => f.verified).length}
              </p>
            </div>
            <div className="bg-[#282828] rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400 mb-1">Note moy.</p>
              <p className="text-2xl font-bold text-white">
                {favorites.length > 0
                  ? (
                      favorites.reduce((acc, f) => acc + f.rating, 0) /
                      favorites.length
                    ).toFixed(1)
                  : "0.0"}
              </p>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dans vos favoris..."
                  className="pl-10 bg-[#282828] border-gray-700 text-white"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-[#282828] border-gray-700 text-white">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-[#191414] border-gray-700">
                <SelectItem value="all" className="text-white">
                  Toutes
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-white">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="w-full md:w-[160px] bg-[#282828] border-gray-700 text-white">
                <MapPin className="size-4 mr-2" />
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent className="bg-[#191414] border-gray-700">
                <SelectItem value="all" className="text-white">
                  Toutes
                </SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="text-white">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Liste des favoris */}
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-12 bg-[#282828] rounded-lg border border-gray-800">
              <Heart className="size-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun favori trouvé
              </h3>
              <p className="text-gray-400">
                {searchQuery || filterCategory !== "all" || filterCity !== "all"
                  ? "Essayez de modifier vos filtres de recherche"
                  : "Commencez à ajouter des artistes à vos favoris"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFavorites.map((artist) => (
                <div
                  key={artist.id}
                  className="bg-[#282828] rounded-lg border border-gray-800 hover:border-[#1DB954]/50 transition-all group overflow-hidden"
                >
                  <div className="relative h-40">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {artist.verified && (
                      <Badge className="absolute top-2 left-2 bg-[#1DB954] text-black text-xs">
                        Vérifié
                      </Badge>
                    )}
                    <button
                      onClick={() =>
                        handleRemoveFavorite(artist.id, artist.name)
                      }
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="text-base font-semibold text-white mb-2 truncate">
                      {artist.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        {artist.category}
                      </Badge>
                      <span className="text-gray-400 flex items-center gap-1">
                        <MapPin className="size-3" />
                        {artist.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-sm font-semibold">
                          {artist.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        ({artist.reviewCount})
                      </span>
                    </div>
                    <p className="text-[#1DB954] font-semibold text-sm mb-3">
                      {artist.priceMin.toLocaleString()} -{" "}
                      {artist.priceMax.toLocaleString()} DH
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black text-xs gap-1"
                      >
                        <Mail className="size-3" />
                        Contacter
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 text-xs gap-1"
                      >
                        <Calendar className="size-3" />
                        Réserver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
