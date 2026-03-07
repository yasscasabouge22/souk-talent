import { useState } from "react";
import { Search, Filter, MapPin, DollarSign, Calendar, Music, ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface OrganizerAdvancedSearchPageProps {
  onBack: () => void;
  onSearch?: (filters: any) => void;
}

export function OrganizerAdvancedSearchPage({
  onBack,
  onSearch,
}: OrganizerAdvancedSearchPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [city, setCity] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [availability, setAvailability] = useState("all");
  const [verified, setVerified] = useState(false);

  // Mapping des sous-catégories par catégorie (identique au profil artiste)
  const subcategoriesByCategory: Record<string, string[]> = {
    "dj": [
      "House / Tech-house / Deep-House",
      "Techno / Trance / Psychedelic",
      "Commercial / Généraliste",
      "Hip-Hop / R&B / Old-school",
      "Old-School",
      "Oriental",
      "Disco / Funk / 80s / 90s",
      "Chill / Organic / Lounge / Listening / Buddha Bar",
      "Afrobeat / Latino / Salsa"
    ],
    "singer": [
      "Pop",
      "R&B / Soul",
      "Raï",
      "Rap / Hip-Hop",
      "Oriental / Arabic",
      "Amazigh",
      "Chaabi",
      "Jazz / Blues",
      "Flamenco / Hispanic",
      "Acoustic / Cover"
    ],
    "traditional": [
      "Gnawa",
      "Ahwach",
      "Chaabi",
      "Aita",
      "Dakka Marrakchia",
      "Amazigh",
      "Aissaoua",
      "Andalou",
      "Sahraoui",
      "Taktouka Jbalia",
      "Oriental",
      "Cheikhate",
      "pop",
      "Lounge"
    ],
    "band": [
      "pop",
      "Lounge",
      "Fusion",
      "Jazz",
      "Variété Française",
      "Latino, Cubain",
      "Blues",
      "Généraliste",
      "Rock / Metal"
    ],
    "entertainer": [
      "Animateur mariage",
      "Light Show",
      "Maître de Cérémonie",
      "Danceurs / Danseuses",
      "Percussionniste",
      "Cirque / Acrobatique",
      "Cracheur de Feu",
      "Magicien / Close-up",
      "Mentalist",
      "Humoriste / Stand-up"
    ],
    "solo": [
      "Guitariste",
      "Violoniste",
      "Saxophoniste",
      "Pianiste",
      "Percussionniste"
    ]
  };

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "dj", label: "DJ" },
    { value: "traditional", label: "Groupe Traditionnel" },
    { value: "band", label: "Groupe Musical" },
    { value: "singer", label: "Chanteur" },
    { value: "entertainer", label: "Animateur & Spectacle" },
    { value: "solo", label: "Musicien Solo" },
  ];

  const cities = [
    { value: "all", label: "Toutes les villes" },
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "fes", label: "Fès" },
    { value: "tanger", label: "Tanger" },
    { value: "agadir", label: "Agadir" },
  ];

  const handleSearch = () => {
    const filters = {
      searchTerm,
      category,
      subcategories,
      city,
      priceRange,
      availability,
      verified,
    };
    
    console.log("Searching with filters:", filters);
    toast.success("Recherche lancée avec vos critères !");
    
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategory("all");
    setSubcategories([]);
    setCity("all");
    setPriceRange([0, 50000]);
    setAvailability("all");
    setVerified(false);
    toast.info("Filtres réinitialisés");
  };

  const handleToggleSubcategory = (subcategory: string) => {
    if (subcategories.includes(subcategory)) {
      setSubcategories(subcategories.filter(s => s !== subcategory));
    } else {
      setSubcategories([...subcategories, subcategory]);
    }
  };

  const handleRemoveSubcategory = (subcategory: string) => {
    setSubcategories(subcategories.filter(s => s !== subcategory));
  };

  // Obtenir les sous-catégories disponibles pour la catégorie sélectionnée
  const availableSubcategories = category !== "all" ? (subcategoriesByCategory[category] || []) : [];

  return (
    <div className="min-h-screen bg-[#191414]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-colors"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Search className="size-8 text-[#1DB954]" />
            Recherche Avancée d'Artistes
          </h1>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Recherche par mot-clé */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <Label className="text-white font-semibold mb-3 block text-lg">Recherche par mot-clé</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nom d'artiste, style musical, instruments..."
                className="pl-10 bg-[#191414] border-gray-700 text-white h-12 text-base"
              />
            </div>
          </div>

          {/* Filtres principaux */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
              <Filter className="size-6 text-[#1DB954]" />
              Filtres principaux
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Catégorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
                    <Music className="size-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191414] border-gray-700">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="text-white">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Ville</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
                    <MapPin className="size-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191414] border-gray-700">
                    {cities.map((c) => (
                      <SelectItem key={c.value} value={c.value} className="text-white">
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Disponibilité</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
                    <Calendar className="size-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191414] border-gray-700">
                    <SelectItem value="all" className="text-white">Tous</SelectItem>
                    <SelectItem value="available" className="text-white">Disponibles maintenant</SelectItem>
                    <SelectItem value="weekend" className="text-white">Disponibles ce week-end</SelectItem>
                    <SelectItem value="month" className="text-white">Disponibles ce mois-ci</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sous-catégories */}
          {availableSubcategories.length > 0 && (
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <Label className="text-white font-semibold mb-4 block text-lg">Sous-catégories</Label>
              <div className="flex flex-wrap gap-2">
                {availableSubcategories.map(subcategory => (
                  <button
                    key={subcategory}
                    onClick={() => handleToggleSubcategory(subcategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      subcategories.includes(subcategory)
                        ? "bg-[#1DB954] text-black"
                        : "bg-[#191414] text-gray-300 border border-gray-700 hover:border-[#1DB954] hover:text-white"
                    }`}
                  >
                    {subcategories.includes(subcategory) && "✓ "}{subcategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fourchette de prix */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <Label className="text-white font-semibold flex items-center gap-2 text-lg">
                <DollarSign className="size-6 text-[#1DB954]" />
                Fourchette de prix
              </Label>
              <span className="text-[#1DB954] font-semibold text-lg">
                {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DH
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={50000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between mt-3 text-sm text-gray-400">
              <span>0 DH</span>
              <span>50 000 DH</span>
            </div>
          </div>

          {/* Options supplémentaires */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <Label className="text-white font-semibold mb-4 block text-lg">Options supplémentaires</Label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVerified(!verified)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  verified
                    ? "bg-[#1DB954] text-black"
                    : "bg-[#191414] text-gray-400 border border-gray-700 hover:border-[#1DB954]"
                }`}
              >
                {verified && "✓"} Artistes vérifiés uniquement
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-lg">Résultats estimés</p>
                <p className="text-gray-400">Environ 47 artistes correspondent à vos critères</p>
              </div>
              <Badge className="bg-[#1DB954] text-black px-6 py-3 text-2xl font-bold">
                47
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-colors h-12"
            >
              Réinitialiser
            </Button>
            <Button
              onClick={handleSearch}
              className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2 h-12 text-base"
            >
              <Search className="size-5" />
              Lancer la recherche
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}