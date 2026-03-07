import { useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, Filter, Search } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { mockCalendarEvents } from "../data/artistDashboardData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function PublicAgenda() {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer uniquement les événements publics à venir
  const publicEvents = mockCalendarEvents
    .filter((event) => event.isPublic && new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Appliquer les filtres
  const filteredEvents = publicEvents.filter((event) => {
    const cityMatch = selectedCity === "all" || event.city === selectedCity;
    const typeMatch = selectedEventType === "all" || event.eventType === selectedEventType;
    const searchMatch = 
      searchQuery === "" ||
      event.artistName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city?.toLowerCase().includes(searchQuery.toLowerCase());

    return cityMatch && typeMatch && searchMatch;
  });

  // Extraire les villes uniques
  const cities = Array.from(new Set(publicEvents.map((event) => event.city).filter(Boolean)));
  
  // Extraire les types d'événements uniques
  const eventTypes = Array.from(new Set(publicEvents.map((event) => event.eventType).filter(Boolean)));

  return (
    <div className="min-h-screen bg-[#191414] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Calendar className="size-12 text-[#1DB954]" />
            Agenda Public
          </h1>
          <p className="text-xl text-gray-400">
            Découvrez tous les événements publics des artistes de Souk Talent
          </p>
        </div>

        {/* Filtres */}
        <Card className="bg-[#282828] border-gray-800 mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Recherche */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un artiste, lieu, événement..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                  />
                </div>
              </div>

              {/* Filtre par ville */}
              <div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <SelectValue placeholder="Toutes les villes" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white">
                      Toutes les villes
                    </SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city || ""} className="text-white">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtre par type */}
              <div>
                <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <div className="flex items-center gap-2">
                      <Filter className="size-4" />
                      <SelectValue placeholder="Tous les types" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white">
                      Tous les types
                    </SelectItem>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type || ""} className="text-white">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Résultats */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <p className="text-gray-400">
                {filteredEvents.length} événement{filteredEvents.length > 1 ? "s" : ""} trouvé{filteredEvents.length > 1 ? "s" : ""}
              </p>
              {(selectedCity !== "all" || selectedEventType !== "all" || searchQuery !== "") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCity("all");
                    setSelectedEventType("all");
                    setSearchQuery("");
                  }}
                  className="border-gray-700 text-gray-400 hover:bg-gray-800"
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Liste des événements */}
        {filteredEvents.length === 0 ? (
          <Card className="bg-[#282828] border-gray-800">
            <CardContent className="py-16 text-center">
              <Calendar className="size-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-2">Aucun événement public trouvé</p>
              <p className="text-sm text-gray-500">
                {publicEvents.length === 0
                  ? "Aucun événement public n'est actuellement programmé"
                  : "Essayez de modifier vos critères de recherche"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-[#282828] border-gray-800 overflow-hidden hover:border-[#1DB954] transition-all group"
              >
                {/* Flyer */}
                {event.flyerUrl && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={event.flyerUrl}
                      alt={event.eventType || "Event"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#1DB954] text-black border-none">
                        Public
                      </Badge>
                    </div>
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Type d'événement */}
                  {event.eventType && (
                    <p className="text-[#1DB954] font-semibold mb-2">{event.eventType}</p>
                  )}

                  {/* Note / Description */}
                  {event.note && (
                    <h3 className="text-xl font-bold text-white mb-3">{event.note}</h3>
                  )}

                  {/* Artiste */}
                  {event.artistName && (
                    <p className="text-gray-400 text-sm mb-3">
                      avec <span className="text-white font-medium">{event.artistName}</span>
                    </p>
                  )}

                  {/* Informations */}
                  <div className="space-y-2 mb-4">
                    {/* Date et heure */}
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="size-4 text-[#1DB954]" />
                      <span className="text-sm">
                        {format(new Date(event.date), "EEEE dd MMMM yyyy", { locale: fr })}
                      </span>
                    </div>

                    {event.eventTime && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="size-4 text-[#1DB954]" />
                        <span className="text-sm">{event.eventTime}</span>
                      </div>
                    )}

                    {/* Lieu */}
                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="size-4 text-[#1DB954]" />
                        <span className="text-sm">
                          {event.location}
                          {event.city && `, ${event.city}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Lien billeterie */}
                  {event.ticketLink && (
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2">
                        <ExternalLink className="size-4" />
                        Acheter des billets
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
