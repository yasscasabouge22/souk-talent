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
  ArrowLeft,
} from "lucide-react";
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

interface OrganizerFavoritesPageProps {
  onBack: () => void;
  favoriteArtistIds: string[];
  onRemoveFavorite: (artistId: string) => void;
}

export function OrganizerFavoritesPage({
  onBack,
  favoriteArtistIds,
  onRemoveFavorite,
}: OrganizerFavoritesPageProps) {
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
    <div className="min-h-screen bg-[#191414]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Heart className="size-8 fill-red-500 text-red-500" />
            Mes Artistes Favoris
          </h1>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-400 mb-2">Total favoris</p>
              <p className="text-3xl font-bold text-white">{favorites.length}</p>
            </div>
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-400 mb-2">Vérifiés</p>
              <p className="text-3xl font-bold text-white">
                {favorites.filter((f) => f.verified).length}
              </p>
            </div>
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-400 mb-2">Note moyenne</p>
              <p className="text-3xl font-bold text-white">
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
                  className="pl-10 bg-[#282828] border-gray-700 text-white h-11"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-[#282828] border-gray-700 text-white h-11">
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
              <SelectTrigger className="w-full md:w-[180px] bg-[#282828] border-gray-700 text-white h-11">
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
            <div className="text-center py-16 bg-[#282828] rounded-lg border border-gray-800">
              <Heart className="size-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Aucun favori trouvé
              </h3>
              <p className="text-gray-400">
                {searchQuery || filterCategory !== "all" || filterCity !== "all"
                  ? "Essayez de modifier vos filtres de recherche"
                  : "Commencez à ajouter des artistes à vos favoris"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((artist) => (
                <div
                  key={artist.id}
                  className="bg-[#282828] rounded-lg border border-gray-800 hover:border-[#1DB954]/50 transition-all group overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {artist.verified && (
                      <Badge className="absolute top-3 left-3 bg-[#1DB954] text-black">
                        Vérifié
                      </Badge>
                    )}
                    <button
                      onClick={() =>
                        handleRemoveFavorite(artist.id, artist.name)
                      }
                      className="absolute top-3 right-3 w-10 h-10 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="size-5 text-white" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-white mb-3 truncate">
                      {artist.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        {artist.category}
                      </Badge>
                      <span className="text-gray-400 flex items-center gap-1 text-sm">
                        <MapPin className="size-3" />
                        {artist.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold">
                          {artist.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        ({artist.reviewCount})
                      </span>
                    </div>
                    <p className="text-[#1DB954] font-semibold mb-4">
                      {artist.priceMin.toLocaleString()} -{" "}
                      {artist.priceMax.toLocaleString()} DH
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black gap-1"
                      >
                        <Mail className="size-4" />
                        Contacter
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 gap-1"
                      >
                        <Calendar className="size-4" />
                        Réserver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
