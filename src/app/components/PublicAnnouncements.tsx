import { useState, useMemo } from "react";
import {
  Megaphone,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Filter,
  ArrowLeft,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { mockAnnouncements, categories, eventTypes } from "@/app/data/announcementsData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PublicAnnouncementsProps {
  onBack: () => void;
}

export function PublicAnnouncements({ onBack }: PublicAnnouncementsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedCity, setSelectedCity] = useState("Toutes");

  const filteredAnnouncements = useMemo(() => {
    return mockAnnouncements.filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || announcement.talentCategory === selectedCategory;
      const matchesCity =
        selectedCity === "Toutes" || announcement.city === selectedCity;

      return matchesSearch && matchesCategory && matchesCity && announcement.status === "active";
    });
  }, [searchQuery, selectedCategory, selectedCity]);

  const cities = ["Toutes", ...Array.from(new Set(mockAnnouncements.map((a) => a.city)))];

  return (
    <div className="min-h-screen bg-[#191414] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 mb-4 gap-2"
            onClick={onBack}
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Megaphone className="size-10 text-[#1DB954]" />
            Annonces
          </h1>
          <p className="text-gray-400">
            {filteredAnnouncements.length} annonce{filteredAnnouncements.length > 1 ? "s" : ""} disponible
            {filteredAnnouncements.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtres */}
        <Card className="bg-[#282828] border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une annonce..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#191414] border-gray-700 text-white"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                  <SelectValue placeholder="Type de talent" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des annonces */}
        {filteredAnnouncements.length === 0 ? (
          <Card className="bg-[#282828] border-gray-800">
            <CardContent className="p-12 text-center">
              <Filter className="size-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucune annonce trouvée</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors"
              >
                <CardContent className="p-6">
                  {/* En-tête */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30">
                          {announcement.talentCategory}
                        </Badge>
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {announcement.eventType}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {announcement.description}
                      </p>
                    </div>
                  </div>

                  {/* Informations de l'organisateur */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-[#191414] rounded-lg">
                    <img
                      src={announcement.organizerAvatar}
                      alt={announcement.organizerName}
                      className="size-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {announcement.organizerName}
                      </p>
                      {announcement.organizerCompany && (
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <Building2 className="size-3" />
                          {announcement.organizerCompany}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Détails */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                      <Calendar className="size-4 text-[#1DB954] flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">Date</p>
                        <p className="text-white">
                          {format(new Date(announcement.eventDate), "dd MMM yyyy", { locale: fr })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                      <MapPin className="size-4 text-[#1DB954] flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">Ville</p>
                        <p className="text-white">{announcement.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                      <DollarSign className="size-4 text-[#1DB954] flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">Budget</p>
                        <p className="text-white font-semibold">
                          {announcement.budgetMin === announcement.budgetMax
                            ? `${announcement.budgetMin.toLocaleString()} DH`
                            : `${announcement.budgetMin.toLocaleString()} - ${announcement.budgetMax.toLocaleString()} DH`}
                        </p>
                      </div>
                    </div>

                    {announcement.duration && (
                      <div className="flex items-center gap-2 text-sm p-3 bg-[#191414] rounded-lg">
                        <Clock className="size-4 text-[#1DB954] flex-shrink-0" />
                        <div>
                          <p className="text-gray-500 text-xs">Durée</p>
                          <p className="text-white">{announcement.duration}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Exigences */}
                  {announcement.requirements && announcement.requirements.length > 0 && (
                    <div className="mb-4 p-3 bg-[#191414] rounded-lg">
                      <p className="text-gray-400 text-xs mb-2">Exigences :</p>
                      <ul className="space-y-1">
                        {announcement.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="text-white text-sm flex items-start gap-2">
                            <span className="text-[#1DB954] mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                        {announcement.requirements.length > 3 && (
                          <li className="text-gray-500 text-xs">
                            +{announcement.requirements.length - 3} autre(s)
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {announcement.applicationsCount} candidature
                        {announcement.applicationsCount > 1 ? "s" : ""}
                      </span>
                      <span>
                        Publié il y a{" "}
                        {Math.floor(
                          (Date.now() - new Date(announcement.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        jour(s)
                      </span>
                    </div>
                    <Button
                      className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
                      size="sm"
                    >
                      Postuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
