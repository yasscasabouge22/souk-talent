import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Star,
  Filter,
  BadgeCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Artist,
  mockArtists,
  categories,
  regions,
} from "../data/mockData";

interface ArtistListProps {
  onSelectArtist: (artistId: string) => void;
  initialFilters?: {
    category?: string;
    region?: string;
  };
}

export function ArtistList({
  onSelectArtist,
  initialFilters,
}: ArtistListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.category || "Tous",
  );
  const [selectedRegion, setSelectedRegion] = useState(
    initialFilters?.region || "Toutes les régions",
  );
  const [sortBy, setSortBy] = useState("rating");

  const filteredArtists = useMemo(() => {
    let filtered = mockArtists.filter((artist) => {
      const matchesSearch =
        artist.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        artist.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" ||
        artist.category === selectedCategory;
      const matchesRegion =
        selectedRegion === "Toutes les régions" ||
        artist.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRegion;
    });

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => {
        const aPrice = parseInt(a.priceRange.split(" - ")[0]);
        const bPrice = parseInt(b.priceRange.split(" - ")[0]);
        return aPrice - bPrice;
      });
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => {
        const aPrice = parseInt(a.priceRange.split(" - ")[0]);
        const bPrice = parseInt(b.priceRange.split(" - ")[0]);
        return bPrice - aPrice;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedRegion, sortBy]);

  return (
    <div className="min-h-screen bg-[#191414] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="mb-2 text-white">
            Trouvez votre artiste
          </h2>
          <p className="text-gray-400">
            {filteredArtists.length} artiste
            {filteredArtists.length > 1 ? "s" : ""} disponible
            {filteredArtists.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#282828] rounded-lg shadow-sm p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un artiste..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10 bg-[#191414] border-gray-700 text-white"
                />
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((reg) => (
                  <SelectItem key={reg} value={reg}>
                    {reg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">
                  Meilleures notes
                </SelectItem>
                <SelectItem value="price-low">
                  Prix croissant
                </SelectItem>
                <SelectItem value="price-high">
                  Prix décroissant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Artist Cards */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="size-12 mx-auto text-gray-500 mb-4" />
            <h3 className="mb-2 text-white">
              Aucun artiste trouvé
            </h3>
            <p className="text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filteredArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onClick={() => onSelectArtist(artist.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ArtistCard({
  artist,
  onClick,
}: {
  artist: Artist;
  onClick: () => void;
}) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-[#282828] border-gray-800"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white text-sm font-semibold truncate">{artist.name}</h4>
              {artist.isVerified && (
                <div className="group relative flex-shrink-0">
                  <BadgeCheck className="size-4 text-[#1DB954] fill-[#1DB954]" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Artiste vérifié
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
            <Badge
              variant="secondary"
              className="bg-[#1DB954]/20 text-[#1DB954] text-xs"
            >
              {artist.category}
            </Badge>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <Star className="size-3 fill-[#1DB954] text-[#1DB954]" />
            <span className="text-white text-sm">{artist.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {artist.description}
        </p>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="size-3 flex-shrink-0" />
            <span className="truncate">{artist.region}</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {artist.specialties.slice(0, 2).map((specialty, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-gray-700 text-gray-300 text-xs px-2 py-0"
              >
                {specialty}
              </Badge>
            ))}
            {artist.specialties.length > 2 && (
              <Badge
                variant="outline"
                className="border-gray-700 text-gray-400 text-xs px-2 py-0"
              >
                +{artist.specialties.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#1DB954] font-semibold">
              {artist.priceRange}
            </span>
            <span className="text-gray-500">
              {artist.reviewsCount} avis
            </span>
          </div>
        </div>

        <Button className="w-full mt-3 bg-[#1DB954] hover:bg-[#1ED760] text-black text-sm py-2 h-auto">
          Voir le profil
        </Button>
      </CardContent>
    </Card>
  );
}