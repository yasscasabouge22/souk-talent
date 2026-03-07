import {
  Search,
  Send,
  MessageSquare,
  CheckCircle,
  Heart,
  Calendar,
  Plus,
  TrendingUp,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface OrganizerDashboardProps {
  organizerName: string;
  onNavigate: (section: string) => void;
}

export function OrganizerDashboard({ organizerName, onNavigate }: OrganizerDashboardProps) {
  const stats = [
    {
      label: "Demandes envoyées",
      value: 12,
      icon: Send,
      color: "blue",
      trend: "+3 ce mois",
    },
    {
      label: "Réponses reçues",
      value: 8,
      icon: MessageSquare,
      color: "purple",
      trend: "67% taux de réponse",
    },
    {
      label: "Bookings confirmés",
      value: 5,
      icon: CheckCircle,
      color: "green",
      trend: "+2 cette semaine",
    },
    {
      label: "Artistes favoris",
      value: 15,
      icon: Heart,
      color: "red",
      trend: "3 nouveaux",
    },
  ];

  const upcomingEvents = [
    {
      id: "1",
      name: "Mariage Sarah & Karim",
      date: "25 Janvier 2026",
      time: "19:00",
      location: "Sofitel Casablanca",
      artist: "DJ Mehdi El Alami",
      artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150",
      status: "confirmed",
    },
    {
      id: "2",
      name: "Soirée Corporate",
      date: "2 Février 2026",
      time: "20:00",
      location: "Hyatt Regency",
      artist: "Gnawa Fusion Group",
      artistAvatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150",
      status: "pending",
    },
    {
      id: "3",
      name: "Anniversaire 50 ans",
      date: "10 Février 2026",
      time: "18:00",
      location: "Villa Zevaco",
      artist: "Chaabi Rif Band",
      artistAvatar: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=150",
      status: "confirmed",
    },
  ];

  const recentMessages = [
    {
      id: "1",
      artistName: "DJ Mehdi El Alami",
      artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150",
      message: "Parfait ! Je confirme ma disponibilité pour le 25 janvier.",
      time: "Il y a 2h",
      unread: true,
    },
    {
      id: "2",
      artistName: "Gnawa Fusion Group",
      artistAvatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150",
      message: "Merci pour votre demande. Pouvons-nous discuter des détails ?",
      time: "Il y a 5h",
      unread: true,
    },
    {
      id: "3",
      artistName: "Chaabi Rif Band",
      artistAvatar: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=150",
      message: "C'est confirmé de notre côté !",
      time: "Hier",
      unread: false,
    },
  ];

  const suggestedArtists = [
    {
      id: "1",
      name: "Orchestre El Maghreb",
      category: "Orchestre",
      city: "Marrakech",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
      price: "12000 - 25000 DH",
      verified: true,
    },
    {
      id: "2",
      name: "DJ Sofia",
      category: "DJ",
      city: "Casablanca",
      image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b1?w=300",
      price: "6000 - 12000 DH",
      verified: true,
    },
    {
      id: "3",
      name: "Amazigh Roots",
      category: "Groupe Traditionnel",
      city: "Agadir",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300",
      price: "8000 - 15000 DH",
      verified: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Bienvenue, {organizerName} 👋
        </h1>
        <p className="text-gray-400">
          Gérez vos événements et trouvez les meilleurs artistes pour vos occasions
        </p>
      </div>

      {/* Barre de recherche rapide */}
      <Card className="bg-gradient-to-r from-[#1DB954]/20 to-[#1DB954]/5 border-[#1DB954]/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Rechercher un artiste, DJ, groupe..."
                  className="pl-10 bg-[#191414] border-gray-700 text-white h-12"
                  onFocus={() => onNavigate("search")}
                />
              </div>
            </div>
            <Button
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold h-12 gap-2"
              onClick={() => onNavigate("search")}
            >
              <Search className="size-5" />
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = {
            blue: "bg-blue-500/20 text-blue-400",
            purple: "bg-purple-500/20 text-purple-400",
            green: "bg-[#1DB954]/20 text-[#1DB954]",
            red: "bg-red-500/20 text-red-400",
          };

          return (
            <Card key={stat.label} className="bg-[#282828] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full ${colors[stat.color as keyof typeof colors]} flex items-center justify-center`}>
                    <Icon className="size-6" />
                  </div>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prochains événements */}
        <Card className="bg-[#282828] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="size-5" />
                Prochains événements
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#1DB954] hover:text-[#1ED760] hover:bg-[#1DB954]/10"
                onClick={() => onNavigate("events")}
              >
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-[#191414] rounded-lg border border-gray-700 hover:border-[#1DB954]/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate("events")}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <AvatarImage src={event.artistAvatar} alt={event.artist} />
                      <AvatarFallback className="bg-[#1DB954] text-black">
                        {event.artist.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-white font-semibold truncate">
                          {event.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className={
                            event.status === "confirmed"
                              ? "border-[#1DB954] text-[#1DB954]"
                              : "border-orange-500 text-orange-500"
                          }
                        >
                          {event.status === "confirmed" ? "Confirmé" : "En attente"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="size-3" />
                          {event.date} à {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="size-3" />
                          {event.artist}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                onClick={() => onNavigate("events")}
              >
                <Plus className="size-4 mr-2" />
                Créer un nouvel événement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages récents */}
        <Card className="bg-[#282828] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="size-5" />
                Messages récents
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#1DB954] hover:text-[#1ED760] hover:bg-[#1DB954]/10"
                onClick={() => onNavigate("messages")}
              >
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    msg.unread
                      ? "bg-[#1DB954]/5 border-[#1DB954]/30 hover:bg-[#1DB954]/10"
                      : "bg-[#191414] border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => onNavigate("messages")}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={msg.artistAvatar} alt={msg.artistName} />
                      <AvatarFallback className="bg-[#1DB954] text-black">
                        {msg.artistName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm truncate">
                          {msg.artistName}
                        </h4>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{msg.message}</p>
                    </div>
                    {msg.unread && (
                      <div className="w-2 h-2 bg-[#1DB954] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Artistes suggérés */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="size-5" />
            Artistes suggérés pour vous
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2">
            Basés sur vos recherches et préférences récentes
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedArtists.map((artist) => (
              <div
                key={artist.id}
                className="group bg-[#191414] rounded-lg border border-gray-700 hover:border-[#1DB954]/50 transition-all cursor-pointer overflow-hidden"
                onClick={() => onNavigate("search")}
              >
                <div className="relative h-48">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {artist.verified && (
                    <Badge className="absolute top-2 right-2 bg-[#1DB954] text-black">
                      Vérifié
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-1">{artist.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {artist.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {artist.city}
                    </span>
                  </div>
                  <p className="text-[#1DB954] font-semibold text-sm">{artist.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          size="lg"
          className="bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold h-16"
          onClick={() => onNavigate("search")}
        >
          <Search className="size-5 mr-2" />
          Rechercher un artiste
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 h-16"
          onClick={() => onNavigate("events")}
        >
          <Plus className="size-5 mr-2" />
          Créer un événement
        </Button>
      </div>
    </div>
  );
}
