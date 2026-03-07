import { useState } from "react";
import { User, Mail, Phone, Building, MapPin, Calendar, Edit, Save, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface OrganizerProfilePageProps {
  organizerName: string;
  organizerEmail: string;
  onBack: () => void;
}

export function OrganizerProfilePage({
  organizerName,
  organizerEmail,
  onBack,
}: OrganizerProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: organizerName,
    email: organizerEmail,
    phone: "+212 6 12 34 56 78",
    company: "Events Maroc",
    city: "Casablanca",
    address: "Boulevard Mohammed V, Casablanca",
    description: "Organisateur d'événements professionnel spécialisé dans les mariages et événements corporatifs.",
    eventsPerYear: "25-50",
    memberSince: "2023",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profil mis à jour avec succès !");
  };

  return (
    <div className="min-h-screen bg-[#191414]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-gray-700 text-black hover:bg-gray-800"
            >
              <ArrowLeft className="size-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <User className="size-8 text-[#1DB954]" />
              Mon Profil Organisateur
            </h1>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
            >
              <Edit className="size-4" />
              Modifier
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
            >
              <Save className="size-4" />
              Enregistrer
            </Button>
          )}
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800 text-center">
              <p className="text-4xl font-bold text-[#1DB954] mb-2">47</p>
              <p className="text-sm text-gray-400">Demandes envoyées</p>
            </div>
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800 text-center">
              <p className="text-4xl font-bold text-[#1DB954] mb-2">23</p>
              <p className="text-sm text-gray-400">Événements réalisés</p>
            </div>
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800 text-center">
              <p className="text-4xl font-bold text-[#1DB954] mb-2">12</p>
              <p className="text-sm text-gray-400">Artistes favoris</p>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <User className="size-6 text-[#1DB954]" />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Nom complet</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Téléphone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Ville</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!isEditing}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Informations entreprise */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Building className="size-6 text-[#1DB954]" />
              Informations entreprise
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Nom de l'entreprise</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={!isEditing}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Adresse</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="bg-[#191414] border-gray-700 text-white disabled:opacity-70 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Événements par an</Label>
                  <Input
                    value={formData.eventsPerYear}
                    onChange={(e) => setFormData({ ...formData, eventsPerYear: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Membre depuis</Label>
                  <Input
                    value={formData.memberSince}
                    disabled
                    className="bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
