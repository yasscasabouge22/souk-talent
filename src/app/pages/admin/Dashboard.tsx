import { 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  UserPlus,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export function AdminDashboard() {
  const kpis = [
    {
      title: "Nouveaux artistes",
      value: "47",
      subtitle: "30 derniers jours",
      icon: UserPlus,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "En attente validation",
      value: "12",
      subtitle: "Artistes à valider",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Demandes en attente",
      value: "8",
      subtitle: "Nécessitent action",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Demandes acceptées",
      value: "156",
      subtitle: "Ce mois-ci",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Taux d'acceptation",
      value: "78%",
      subtitle: "Sur 30 jours",
      icon: TrendingUp,
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "GMV Estimé",
      value: "450K MAD",
      subtitle: "Ce mois-ci",
      icon: DollarSign,
      color: "text-[#1DB954]",
      bgColor: "bg-[#1DB954]/10",
    },
  ];

  const recentArtists = [
    {
      id: 1,
      name: "DJ Mehdi",
      city: "Casablanca",
      category: "DJ",
      status: "pending",
      date: "Il y a 2h",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    },
    {
      id: 2,
      name: "Orchestre Andalous",
      city: "Rabat",
      category: "Orchestre",
      status: "approved",
      date: "Il y a 4h",
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150",
    },
    {
      id: 3,
      name: "Sara Vocals",
      city: "Marrakech",
      category: "Chanteur",
      status: "pending",
      date: "Il y a 6h",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  ];

  const recentRequests = [
    {
      id: 1,
      organizer: "Events Maroc",
      artist: "DJ Mehdi",
      event: "Mariage",
      city: "Casablanca",
      budget: "15,000 MAD",
      status: "pending",
      date: "Il y a 1h",
    },
    {
      id: 2,
      organizer: "Premium Events",
      artist: "Orchestre Andalous",
      event: "Événement corporatif",
      city: "Rabat",
      budget: "35,000 MAD",
      status: "accepted",
      date: "Il y a 3h",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "duplicate",
      message: "Doublons potentiels détectés : 3 artistes",
      severity: "warning",
    },
    {
      id: 2,
      type: "timeout",
      message: "5 demandes sans réponse depuis +48h",
      severity: "error",
    },
    {
      id: 3,
      type: "report",
      message: "Nouveau signalement sur conversation #4521",
      severity: "warning",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "En attente", variant: "secondary" },
      approved: { label: "Approuvé", variant: "outline" },
      accepted: { label: "Accepté", variant: "outline" },
    };
    
    const config = variants[status] || { label: status, variant: "default" };
    
    return (
      <Badge variant={config.variant} className={
        status === "approved" || status === "accepted" 
          ? "bg-green-50 text-green-700 border-green-200" 
          : ""
      }>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Vue d'ensemble de la plateforme Souk Talent</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor || "bg-gray-100"}`}>
                  <Icon className={`h-4 w-4 ${kpi.color || "text-gray-600"}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{kpi.subtitle}</p>
                  </div>
                  {kpi.trend && (
                    <div className={`text-sm font-medium ${kpi.trendUp ? "text-green-600" : "text-red-600"}`}>
                      {kpi.trend}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Graphiques & Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activité récente - Artistes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Derniers artistes inscrits</CardTitle>
            <CardDescription>Nouveaux profils créés</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentArtists.map((artist) => (
              <div key={artist.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{artist.name}</p>
                    <p className="text-xs text-gray-500">
                      {artist.category} • {artist.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(artist.status)}
                  <span className="text-xs text-gray-400 hidden sm:inline">{artist.date}</span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" size="sm">
              Voir tous les artistes
            </Button>
          </CardContent>
        </Card>

        {/* Activité récente - Demandes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dernières demandes</CardTitle>
            <CardDescription>Booking requests récents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{request.organizer}</p>
                    <p className="text-xs text-gray-500">
                      {request.artist} • {request.event}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{request.city}</span>
                  <span className="font-medium text-gray-900">{request.budget}</span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" size="sm">
              Voir toutes les demandes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alertes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertes & Actions requises
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start justify-between p-3 rounded-lg ${
                alert.severity === "error" 
                  ? "bg-red-50 border border-red-200" 
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                  alert.severity === "error" ? "text-red-500" : "text-yellow-600"
                }`} />
                <p className="text-sm text-gray-900">{alert.message}</p>
              </div>
              <Button variant="ghost" size="sm">
                Voir
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats par ville & catégorie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Artistes par ville</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { city: "Casablanca", count: 142, percentage: 35 },
              { city: "Marrakech", count: 89, percentage: 22 },
              { city: "Rabat", count: 76, percentage: 19 },
              { city: "Tanger", count: 45, percentage: 11 },
              { city: "Autres", count: 53, percentage: 13 },
            ].map((item) => (
              <div key={item.city} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.city}</span>
                  <span className="font-medium text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#1DB954] h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Catégories les plus demandées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { category: "DJ", count: 234, percentage: 40 },
              { category: "Orchestre", count: 156, percentage: 27 },
              { category: "Chanteur", count: 98, percentage: 17 },
              { category: "Groupe Traditionnel", count: 67, percentage: 11 },
              { category: "Autres", count: 29, percentage: 5 },
            ].map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.category}</span>
                  <span className="font-medium text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#1DB954] h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
