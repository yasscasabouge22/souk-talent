import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  MoreVertical,
  Ban,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Skeleton } from "../../components/ui/skeleton";
import { toast } from "sonner";

export function AdminArtistes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtres avancés
  const [advancedFilters, setAdvancedFilters] = useState({
    statuses: [] as string[],
    cities: [] as string[],
    categories: [] as string[],
    hasAgent: null as boolean | null,
    incompleteProfile: false,
    dateFrom: "",
    dateTo: "",
  });

  // Mock data avec plus d'informations
  const artists = [
    {
      id: 1,
      name: "DJ Mehdi",
      city: "Casablanca",
      category: "DJ",
      status: "pending",
      completion: 85,
      createdAt: "2025-02-20",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      hasAgent: false,
      verified: false,
      suspicious: false,
    },
    {
      id: 2,
      name: "Orchestre Andalous",
      city: "Rabat",
      category: "Orchestre",
      status: "approved",
      completion: 100,
      createdAt: "2025-02-15",
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150",
      hasAgent: true,
      verified: true,
      suspicious: false,
    },
    {
      id: 3,
      name: "Sara Vocals",
      city: "Marrakech",
      category: "Chanteur",
      status: "pending",
      completion: 55,
      createdAt: "2025-02-18",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      hasAgent: false,
      verified: false,
      suspicious: false,
    },
    {
      id: 4,
      name: "Groupe Gnawa Spirit",
      city: "Essaouira",
      category: "Groupe Traditionnel",
      status: "approved",
      completion: 95,
      createdAt: "2025-02-10",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      hasAgent: true,
      verified: true,
      suspicious: false,
    },
    {
      id: 5,
      name: "Ahmed Animation",
      city: "Tanger",
      category: "Animateur",
      status: "rejected",
      completion: 45,
      createdAt: "2025-02-22",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      hasAgent: false,
      verified: false,
      suspicious: true,
    },
    {
      id: 6,
      name: "Karim Live Band",
      city: "Casablanca",
      category: "Groupe Moderne",
      status: "suspended",
      completion: 90,
      createdAt: "2025-02-05",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      hasAgent: false,
      verified: false,
      suspicious: false,
    },
    {
      id: 7,
      name: "Fatima Traditional",
      city: "Fès",
      category: "Chanteur",
      status: "pending",
      completion: 40,
      createdAt: "2025-02-23",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      hasAgent: false,
      verified: false,
      suspicious: false,
    },
  ];

  // Calcul des KPIs
  const stats = {
    pending: artists.filter((a) => a.status === "pending").length,
    approved: artists.filter((a) => a.status === "approved").length,
    rejected: artists.filter((a) => a.status === "rejected").length,
    suspended: artists.filter((a) => a.status === "suspended").length,
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      pending: { label: "En attente", className: "bg-orange-100 text-orange-700 border-orange-200" },
      approved: { label: "Approuvé", className: "bg-green-100 text-green-700 border-green-200" },
      rejected: { label: "Rejeté", className: "bg-red-100 text-red-700 border-red-200" },
      suspended: { label: "Suspendu", className: "bg-gray-200 text-gray-700 border-gray-300" },
    };
    return configs[status] || configs.pending;
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  // Filtrage avec recherche et filtres avancés
  const filteredArtists = artists.filter((artist) => {
    // Recherche globale
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.city.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtre KPI actif
    const matchesActiveStatus =
      !activeStatusFilter || artist.status === activeStatusFilter;

    // Filtres avancés
    const matchesStatuses =
      advancedFilters.statuses.length === 0 ||
      advancedFilters.statuses.includes(artist.status);

    const matchesCities =
      advancedFilters.cities.length === 0 ||
      advancedFilters.cities.includes(artist.city);

    const matchesCategories =
      advancedFilters.categories.length === 0 ||
      advancedFilters.categories.includes(artist.category);

    const matchesAgent =
      advancedFilters.hasAgent === null ||
      artist.hasAgent === advancedFilters.hasAgent;

    const matchesIncomplete =
      !advancedFilters.incompleteProfile || artist.completion < 70;

    return (
      matchesSearch &&
      matchesActiveStatus &&
      matchesStatuses &&
      matchesCities &&
      matchesCategories &&
      matchesAgent &&
      matchesIncomplete
    );
  });

  const handleExportCSV = () => {
    toast.success("Export CSV démarré", {
      description: "Le fichier sera téléchargé dans quelques secondes",
    });
  };

  const handleSuspendArtist = (artistId: number, artistName: string) => {
    toast.warning(`${artistName} suspendu`, {
      description: "Le profil a été suspendu avec succès",
    });
  };

  const handleDeleteArtist = (artistId: number, artistName: string) => {
    toast.error(`${artistName} supprimé`, {
      description: "Le profil a été définitivement supprimé",
    });
  };

  const resetFilters = () => {
    setAdvancedFilters({
      statuses: [],
      cities: [],
      categories: [],
      hasAgent: null,
      incompleteProfile: false,
      dateFrom: "",
      dateTo: "",
    });
    setActiveStatusFilter(null);
    setSearchQuery("");
  };

  const hasActiveFilters =
    advancedFilters.statuses.length > 0 ||
    advancedFilters.cities.length > 0 ||
    advancedFilters.categories.length > 0 ||
    advancedFilters.hasAgent !== null ||
    advancedFilters.incompleteProfile ||
    activeStatusFilter !== null ||
    searchQuery !== "";

  return (
    <div className="space-y-6 pb-24">
      {/* En-tête */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des artistes</h1>
          <p className="text-gray-500 mt-1">Validation & modération des profils</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* KPIs Cliquables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeStatusFilter === "pending" ? "ring-2 ring-orange-500" : ""
          }`}
          onClick={() =>
            setActiveStatusFilter(activeStatusFilter === "pending" ? null : "pending")
          }
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente validation</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pending}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeStatusFilter === "approved" ? "ring-2 ring-green-500" : ""
          }`}
          onClick={() =>
            setActiveStatusFilter(activeStatusFilter === "approved" ? null : "approved")
          }
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approuvés</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeStatusFilter === "suspended" ? "ring-2 ring-gray-500" : ""
          }`}
          onClick={() =>
            setActiveStatusFilter(activeStatusFilter === "suspended" ? null : "suspended")
          }
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspendus</p>
                <p className="text-3xl font-bold text-gray-700 mt-2">{stats.suspended}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Ban className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeStatusFilter === "rejected" ? "ring-2 ring-red-500" : ""
          }`}
          onClick={() =>
            setActiveStatusFilter(activeStatusFilter === "rejected" ? null : "rejected")
          }
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejetés</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et filtres */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom ou ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filtres avancés */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtres avancés
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-[#1DB954] text-white">
                    •
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtres avancés</SheetTitle>
                <SheetDescription>
                  Affinez votre recherche avec des critères personnalisés
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Statuts */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Statut</Label>
                  <div className="space-y-2">
                    {["pending", "approved", "rejected", "suspended"].map((status) => {
                      const config = getStatusConfig(status);
                      return (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={advancedFilters.statuses.includes(status)}
                            onCheckedChange={(checked) => {
                              setAdvancedFilters({
                                ...advancedFilters,
                                statuses: checked
                                  ? [...advancedFilters.statuses, status]
                                  : advancedFilters.statuses.filter((s) => s !== status),
                              });
                            }}
                          />
                          <Label htmlFor={`status-${status}`} className="cursor-pointer">
                            {config.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Villes */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Ville</Label>
                  <div className="space-y-2">
                    {["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Essaouira"].map(
                      (city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={`city-${city}`}
                            checked={advancedFilters.cities.includes(city)}
                            onCheckedChange={(checked) => {
                              setAdvancedFilters({
                                ...advancedFilters,
                                cities: checked
                                  ? [...advancedFilters.cities, city]
                                  : advancedFilters.cities.filter((c) => c !== city),
                              });
                            }}
                          />
                          <Label htmlFor={`city-${city}`} className="cursor-pointer">
                            {city}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <Separator />

                {/* Catégories */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Catégorie</Label>
                  <div className="space-y-2">
                    {[
                      "DJ",
                      "Orchestre",
                      "Chanteur",
                      "Groupe Traditionnel",
                      "Groupe Moderne",
                      "Animateur",
                    ].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={advancedFilters.categories.includes(category)}
                          onCheckedChange={(checked) => {
                            setAdvancedFilters({
                              ...advancedFilters,
                              categories: checked
                                ? [...advancedFilters.categories, category]
                                : advancedFilters.categories.filter((c) => c !== category),
                            });
                          }}
                        />
                        <Label htmlFor={`category-${category}`} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Avec/Sans agent */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Agent</Label>
                  <Select
                    value={
                      advancedFilters.hasAgent === null
                        ? "all"
                        : advancedFilters.hasAgent
                        ? "with"
                        : "without"
                    }
                    onValueChange={(value) => {
                      setAdvancedFilters({
                        ...advancedFilters,
                        hasAgent:
                          value === "all" ? null : value === "with" ? true : false,
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="with">Avec agent</SelectItem>
                      <SelectItem value="without">Sans agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Profil incomplet */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="incomplete"
                    checked={advancedFilters.incompleteProfile}
                    onCheckedChange={(checked) => {
                      setAdvancedFilters({
                        ...advancedFilters,
                        incompleteProfile: checked as boolean,
                      });
                    }}
                  />
                  <Label htmlFor="incomplete" className="cursor-pointer">
                    Profil incomplet (&lt; 70%)
                  </Label>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={resetFilters}
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    className="flex-1 bg-[#1DB954] hover:bg-[#1DB954]/90"
                    onClick={() => {
                      // Close the sheet programmatically if needed
                      toast.success("Filtres appliqués");
                    }}
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Résumé filtres actifs */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{filteredArtists.length}</span>{" "}
              artiste(s) trouvé(s)
            </p>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Réinitialiser tous les filtres
            </Button>
          </div>
        )}
      </Card>

      {/* Tableau */}
      {isLoading ? (
        <Card className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
                <Skeleton className="h-8 w-[100px]" />
              </div>
            ))}
          </div>
        </Card>
      ) : filteredArtists.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <Search className="h-full w-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun artiste trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              Essayez d'ajuster vos filtres ou votre recherche
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artiste</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Complétude</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map((artist) => {
                const statusConfig = getStatusConfig(artist.status);
                const isWeakProfile = artist.completion < 60;

                return (
                  <TableRow
                    key={artist.id}
                    className={
                      artist.status === "pending"
                        ? "bg-orange-50/30"
                        : ""
                    }
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={artist.avatar} alt={artist.name} />
                          <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{artist.name}</p>
                            {artist.suspicious && (
                              <AlertTriangle className="h-4 w-4 text-red-500" title="Profil suspect" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {artist.hasAgent && (
                              <Badge variant="outline" className="text-xs bg-gray-100 border-gray-200">
                                Avec agent
                              </Badge>
                            )}
                            {artist.verified && (
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                                Vérifié
                              </Badge>
                            )}
                            {isWeakProfile && (
                              <span className="text-xs text-red-600">Profil faible</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{artist.city}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-gray-100">
                        {artist.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getCompletionColor(
                              artist.completion
                            )}`}
                            style={{ width: `${artist.completion}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            artist.completion >= 80
                              ? "text-green-600"
                              : artist.completion >= 50
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}
                        >
                          {artist.completion}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {new Date(artist.createdAt).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {/* Bouton principal Analyser */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => navigate(`/admin/artistes/review/${artist.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          Analyser
                        </Button>

                        {/* Menu 3 points */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => navigate(`/public/artiste/${artist.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Voir profil public
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleSuspendArtist(artist.id, artist.name)}
                              className="text-orange-600"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Suspendre
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteArtist(artist.id, artist.name)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}