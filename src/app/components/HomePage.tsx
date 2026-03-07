import { Search, Star, Users, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { categories, regions, testimonials } from "../data/mockData";

interface HomePageProps {
  onNavigate: (page: string, filters?: { category?: string; region?: string }) => void;
}

const categoryImages = {
  "DJ": "https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHBlcmZvcm1hbmNlJTIwbmlnaHR8ZW58MXx8fHwxNzY3NTIxNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Chanteur": "https://images.unsplash.com/photo-1666143208844-ac2f983b171a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBtaWNyb3Bob25lJTIwc3RhZ2V8ZW58MXx8fHwxNzY3NTcyNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Groupe tradi": "https://images.unsplash.com/photo-1764933513906-c91791738271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhbmQlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3Njc1NzE4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "Live Band": "https://images.unsplash.com/photo-1762160773080-f7e052aec406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5kJTIwZ3VpdGFyfGVufDF8fHx8MTc2NzU3MjU1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "Animateur & Spectacle": "https://images.unsplash.com/photo-1574770291411-a7ca092d0052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGhvc3QlMjBlbnRlcnRhaW5lcnxlbnwxfHx8fDE3Njc1NzI1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "Musicien Solo": "https://images.unsplash.com/photo-1551696785-927d4ac2d35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjBjb25jZXJ0JTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzY3NTcyNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function HomePage({ onNavigate }: HomePageProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const category = formData.get("category") as string;
    const region = formData.get("region") as string;
    
    onNavigate("artists", { 
      category: category !== "Tous" ? category : undefined,
      region: region !== "Toutes les régions" ? region : undefined 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#191414] to-[#1DB954] text-white py-32 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc2NzQ4OTg0OHww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-5xl md:text-6xl">
              Connectez-vous aux meilleurs artistes du Maroc
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              La plateforme qui révolutionne l'événementiel marocain. Trouvez et réservez des artistes professionnels en toute transparence, sans commission.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch}>
              <Card className="p-6 bg-white/95 backdrop-blur">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select name="category" defaultValue="Tous">
                    <SelectTrigger>
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

                  <Select name="region" defaultValue="Toutes les régions">
                    <SelectTrigger>
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

                  <Button type="submit" className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2">
                    <Search className="size-4" />
                    Rechercher
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section - Moved up and enhanced */}
      <section className="py-20 bg-[#191414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="mb-4 text-white">Explorez par catégorie</h3>
            <p className="text-gray-400 text-lg">
              Du DJ moderne au groupe traditionnel, trouvez l'artiste parfait pour votre événement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => onNavigate("artists", { category })}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                {/* Category Image */}
                <img 
                  src={categoryImages[category as keyof typeof categoryImages]}
                  alt={category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                  <div className="mb-3 text-4xl">
                    {category === "DJ" && "🎧"}
                    {category === "Groupe tradi" && "🎵"}
                    {category === "Live Band" && "🎸"}
                    {category === "Chanteur" && "🎤"}
                    {category === "Musicien Solo" && "🎼"}
                    {category === "Animateur & Spectacle" && "🎪"}
                  </div>
                  <h4 className="mb-2 text-2xl">{category}</h4>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    Découvrir les artistes →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-2">500+</div>
              <p className="text-gray-900">Artistes inscrits</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">2000+</div>
              <p className="text-gray-900">Événements réussis</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">0%</div>
              <p className="text-gray-900">Commission</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">12</div>
              <p className="text-gray-900">Villes couvertes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#282828]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="mb-4 text-white">Pourquoi choisir Souk Talent ?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une plateforme moderne et transparente pour professionnaliser le marché de l'événementiel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow bg-[#191414] border-gray-800">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#1DB954]/20 mb-4">
                  <Zap className="size-8 text-[#1DB954]" />
                </div>
                <h4 className="mb-3 text-white">Disponibilité en temps réel</h4>
                <p className="text-gray-400">
                  Consultez les calendriers mis à jour instantanément
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-[#191414] border-gray-800">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#1DB954]/20 mb-4">
                  <Shield className="size-8 text-[#1DB954]" />
                </div>
                <h4 className="mb-3 text-white">Sans commission</h4>
                <p className="text-gray-400">
                  Plateforme 100% gratuite pour organisateurs et artistes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-[#191414] border-gray-800">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#1DB954]/20 mb-4">
                  <Users className="size-8 text-[#1DB954]" />
                </div>
                <h4 className="mb-3 text-white">Contact direct</h4>
                <p className="text-gray-400">
                  Échangez directement avec les artistes sans intermédiaire
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-[#191414] border-gray-800">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#1DB954]/20 mb-4">
                  <Star className="size-8 text-[#1DB954]" />
                </div>
                <h4 className="mb-3 text-white">Profils vérifiés</h4>
                <p className="text-gray-400">
                  Artistes professionnels avec avis et évaluations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Types Gallery - New */}
      <section className="py-20 bg-[#191414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="mb-4 text-white">Pour tous types d'événements</h3>
            <p className="text-gray-400 text-lg">
              Mariages, événements corporatifs, festivals, soirées privées...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY3NDY3MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mariages"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-2xl mb-2">Mariages</h4>
                  <p className="text-gray-200 text-sm">Rendez votre jour spécial inoubliable</p>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1567981964169-7c2597346322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMG11c2ljJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY3NTcxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Festivals"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-2xl mb-2">Festivals</h4>
                  <p className="text-gray-200 text-sm">Programmez des artistes de talent</p>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1762788109662-1442ea1cdaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGNlbGVicmF0aW9uJTIwY3Jvd2R8ZW58MXx8fHwxNjc3NTcyNTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Événements corporatifs"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-2xl mb-2">Événements Corporatifs</h4>
                  <p className="text-gray-200 text-sm">Impressionnez vos collaborateurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#282828]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="mb-4 text-white">Ce qu'ils en pensent</h3>
            <p className="text-gray-400">
              Des organisateurs satisfaits partout au Maroc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow bg-[#191414] border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-[#1DB954] text-[#1DB954]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.comment}"</p>
                  <div>
                    <p className="text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc2NzQ4OTg0OHww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#191414]/95 to-[#1DB954]/90" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="mb-4">Prêt à transformer vos événements ?</h3>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Rejoignez des centaines d'organisateurs qui font confiance à Souk Talent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
              onClick={() => onNavigate("artists")}
            >
              Trouver un artiste
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Devenir artiste
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}