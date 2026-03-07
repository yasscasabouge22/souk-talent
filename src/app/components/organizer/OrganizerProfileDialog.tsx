import { useState } from "react";
import { User, Mail, Phone, Building, MapPin, Calendar, Edit, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface OrganizerProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organizerName: string;
  organizerEmail: string;
}

export function OrganizerProfileDialog({
  isOpen,
  onClose,
  organizerName,
  organizerEmail,
}: OrganizerProfileDialogProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#191414] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="size-6 text-[#1DB954]" />
              Mon Profil Organisateur
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
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#282828] rounded-lg p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-[#1DB954] mb-1">47</p>
              <p className="text-sm text-gray-400">Demandes envoyées</p>
            </div>
            <div className="bg-[#282828] rounded-lg p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-[#1DB954] mb-1">23</p>
              <p className="text-sm text-gray-400">Événements réalisés</p>
            </div>
            <div className="bg-[#282828] rounded-lg p-4 border border-gray-800 text-center">
              <p className="text-3xl font-bold text-[#1DB954] mb-1">12</p>
              <p className="text-sm text-gray-400">Artistes favoris</p>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="size-5 text-[#1DB954]" />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Nom complet</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Téléphone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Ville</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Informations entreprise */}
          <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building className="size-5 text-[#1DB954]" />
              Informations entreprise
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Nom de l'entreprise</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Adresse</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Événements par an</Label>
                  <Input
                    value={formData.eventsPerYear}
                    onChange={(e) => setFormData({ ...formData, eventsPerYear: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Membre depuis</Label>
                  <Input
                    value={formData.memberSince}
                    disabled
                    className="mt-1 bg-[#191414] border-gray-700 text-white disabled:opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
