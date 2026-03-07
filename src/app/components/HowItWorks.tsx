import { Search, UserCheck, Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface HowItWorksProps {
  onNavigate: (page: string) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  return (
    <div className="min-h-screen bg-[#191414] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Comment ça marche ?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Une plateforme simple et transparente pour connecter organisateurs et artistes en quelques clics
          </p>
        </div>

        {/* Steps for Organizers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="mb-3 text-white">Pour les organisateurs d'événements</h3>
            <p className="text-gray-400">
              Trouvez et réservez l'artiste parfait en 4 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <StepCard
              number="1"
              icon={<Search className="size-8" />}
              title="Recherchez"
              description="Utilisez nos filtres pour trouver l'artiste qui correspond à vos besoins : catégorie, région, budget."
              color="green"
            />
            <StepCard
              number="2"
              icon={<UserCheck className="size-8" />}
              title="Consultez les profils"
              description="Découvrez les profils détaillés, avis clients, et visualisez les disponibilités en temps réel."
              color="green"
            />
            <StepCard
              number="3"
              icon={<MessageSquare className="size-8" />}
              title="Contactez directement"
              description="Envoyez votre demande directement à l'artiste sans intermédiaire ni frais de commission."
              color="green"
            />
            <StepCard
              number="4"
              icon={<CheckCircle className="size-8" />}
              title="Confirmez"
              description="Finalisez les détails directement avec l'artiste et profitez de votre événement réussi !"
              color="green"
            />
          </div>
        </div>

        {/* Steps for Artists */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="mb-3 text-white">Pour les artistes</h3>
            <p className="text-gray-400">
              Développez votre activité et gérez vos réservations facilement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="1"
              icon={<UserCheck className="size-8" />}
              title="Créez votre profil"
              description="Présentez votre parcours, spécialités, tarifs et ajoutez des photos/vidéos de vos performances."
              color="green"
            />
            <StepCard
              number="2"
              icon={<Calendar className="size-8" />}
              title="Gérez votre agenda"
              description="Mettez à jour votre disponibilité en temps réel pour que les organisateurs voient vos dates libres."
              color="green"
            />
            <StepCard
              number="3"
              icon={<MessageSquare className="size-8" />}
              title="Recevez des demandes"
              description="Les organisateurs vous contactent directement. Vous gardez 100% de vos revenus, sans commission."
              color="green"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-[#1DB954] to-[#1ED760] rounded-2xl p-12 text-black">
          <div className="text-center mb-12">
            <h3 className="mb-4">Les avantages de la plateforme</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <BenefitItem
              title="100% Gratuit"
              description="Aucune commission, aucun frais caché. La plateforme est totalement gratuite pour tous."
            />
            <BenefitItem
              title="Transparence totale"
              description="Prix clairs, avis vérifiés, contact direct. Pas d'intermédiaire entre vous."
            />
            <BenefitItem
              title="Temps réel"
              description="Disponibilités mises à jour instantanément pour éviter les doublons."
            />
            <BenefitItem
              title="Large choix"
              description="Des centaines d'artistes de toutes catégories partout au Maroc."
            />
            <BenefitItem
              title="Professionnel"
              description="Artistes vérifiés avec portfolios, expérience et évaluations clients."
            />
            <BenefitItem
              title="Simple et rapide"
              description="Interface intuitive pour trouver et contacter un artiste en quelques minutes."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="mb-6 text-white">Prêt à commencer ?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
              onClick={() => onNavigate("artists")}
            >
              Explorer les artistes
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Créer mon profil artiste
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "green";
}

function StepCard({ number, icon, title, description, color }: StepCardProps) {
  const colorClasses = {
    green: "bg-[#1DB954]/20 text-[#1DB954]",
  };

  return (
    <Card className="text-center hover:shadow-lg transition-shadow relative bg-[#282828] border-gray-800">
      <CardContent className="pt-8 pb-6">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1DB954] border-2 border-[#191414] flex items-center justify-center text-sm text-black font-bold">
          {number}
        </div>
        <div className={`inline-flex items-center justify-center size-16 rounded-full ${colorClasses[color]} mb-4`}>
          {icon}
        </div>
        <h4 className="mb-3 text-white">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <CheckCircle className="size-6" />
      </div>
      <div>
        <h4 className="mb-2">{title}</h4>
        <p className="text-gray-900 text-sm">{description}</p>
      </div>
    </div>
  );
}