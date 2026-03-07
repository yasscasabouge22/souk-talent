import { useState } from "react";
import {
  Heart,
  Search,
  Filter,
  MapPin,
  Star,
  Mail,
  Calendar,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  addedDate: Date;
}

export function OrganizerFavorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const [favorites, setFavorites] = useState<FavoriteArtist[]>([
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
      addedDate: new Date(2026, 0, 10),
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
      addedDate: new Date(2026, 0, 8),
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
      addedDate: new Date(2026, 0, 5),
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
      addedDate: new Date(2026, 0, 3),
    },
    {
      id: "5",
      name: "DJ Sofia",
      category: "DJ",
      city: "Casablanca",
      image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b1?w=300",
      priceMin: 6000,
      priceMax: 12000,
      rating: 4.6,
      reviewCount: 29,
      verified: false,
      addedDate: new Date(2025, 11, 28),
    },
    {
      id: "6",
      name: "Amazigh Roots",
      category: "Groupe Traditionnel",
      city: "Agadir",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300",
      priceMin: 8000,
      priceMax: 15000,
      rating: 4.5,
      reviewCount: 21,
      verified: false,
      addedDate: new Date(2025, 11, 25),
    },
  ]);

  const handleRemoveFavorite = (artistId: string, artistName: string) => {
    setFavorites(favorites.filter((f) => f.id !== artistId));
    toast.success(`${artistName} retiré des favoris`);
  };

  // Filtrage
  const filteredFavorites = favorites.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || artist.category === filterCategory;
    const matchesCity = filterCity === "all" || artist.city === filterCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  const categories = [...new Set(favorites.map((f) => f.category))];
  const cities = [...new Set(favorites.map((f) => f.city))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Heart className="size-8 fill-red-500 text-red-500" />
          Mes Favoris
        </h1>
        <p className="text-gray-400">
          Retrouvez tous vos artistes préférés en un seul endroit
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total favoris</p>
                <p className="text-3xl font-bold text-white">{favorites.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Heart className="size-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Artistes vérifiés</p>
                <p className="text-3xl font-bold text-white">
                  {favorites.filter((f) => f.verified).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <Star className="size-6 text-[#1DB954]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Note moyenne</p>
                <p className="text-3xl font-bold text-white">
                  {(favorites.reduce((acc, f) => acc + f.rating, 0) / favorites.length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Star className="size-6 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="bg-[#282828] border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dans vos favoris..."
                  className="pl-10 bg-[#191414] border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[200px] bg-[#191414] border-gray-700 text-white">
                  <Filter className="size-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-[#191414] border-gray-700">
                  <SelectItem value="all" className="text-white">
                    Toutes catégories
                  </SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="w-[180px] bg-[#191414] border-gray-700 text-white">
                  <MapPin className="size-4 mr-2" />
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent className="bg-[#191414] border-gray-700">
                  <SelectItem value="all" className="text-white">
                    Toutes villes
                  </SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des favoris */}
      {filteredFavorites.length === 0 ? (
        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-12">
            <div className="text-center">
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
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((artist) => (
            <Card
              key={artist.id}
              className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-all group overflow-hidden"
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
                  onClick={() => handleRemoveFavorite(artist.id, artist.name)}
                  className="absolute top-3 right-3 w-10 h-10 bg-black/70 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Heart className="size-5 fill-red-500 text-red-500 group-hover:fill-white group-hover:text-white" />
                </button>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {artist.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {artist.category}
                  </Badge>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin className="size-3" />
                    {artist.city}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold">{artist.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    ({artist.reviewCount} avis)
                  </span>
                </div>
                <p className="text-[#1DB954] font-semibold mb-4">
                  {artist.priceMin.toLocaleString()} - {artist.priceMax.toLocaleString()} DH
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                  >
                    <Mail className="size-4" />
                    Contacter
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 gap-2"
                  >
                    <Calendar className="size-4" />
                    Réserver
                  </Button>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Ajouté le {artist.addedDate.toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
