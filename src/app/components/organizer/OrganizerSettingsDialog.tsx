import { useState } from "react";
import { Settings, Bell, Mail, MessageSquare, Calendar, Lock, Eye, Globe, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface OrganizerSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrganizerSettingsDialog({
  isOpen,
  onClose,
}: OrganizerSettingsDialogProps) {
  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [newMessages, setNewMessages] = useState(true);
  const [requestUpdates, setRequestUpdates] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);

  // Confidentialité
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Préférences
  const [language, setLanguage] = useState("fr");
  const [timezone, setTimezone] = useState("GMT+1");

  // Mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveNotifications = () => {
    toast.success("Préférences de notifications enregistrées !");
  };

  const handleSavePrivacy = () => {
    toast.success("Paramètres de confidentialité enregistrés !");
  };

  const handleSavePreferences = () => {
    toast.success("Préférences enregistrées !");
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères !");
      return;
    }
    toast.success("Mot de passe modifié avec succès !");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#191414] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="size-6 text-[#1DB954]" />
            Paramètres
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="mt-4">
          <TabsList className="grid w-full grid-cols-4 bg-[#282828]">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black text-xs md:text-sm">
              <Bell className="size-4 mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black text-xs md:text-sm">
              <Shield className="size-4 mr-1" />
              Confidentialité
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black text-xs md:text-sm">
              <Globe className="size-4 mr-1" />
              Préférences
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black text-xs md:text-sm">
              <Lock className="size-4 mr-1" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* Onglet Notifications */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Canaux de notification</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-[#1DB954]" />
                    <div>
                      <Label className="text-white">Notifications par email</Label>
                      <p className="text-sm text-gray-400">Recevoir les notifications par email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-5 text-[#1DB954]" />
                    <div>
                      <Label className="text-white">Notifications par SMS</Label>
                      <p className="text-sm text-gray-400">Recevoir les notifications par SMS</p>
                    </div>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
            </div>

            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Types de notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Nouveaux messages</Label>
                    <p className="text-sm text-gray-400">Notifications des messages des artistes</p>
                  </div>
                  <Switch checked={newMessages} onCheckedChange={setNewMessages} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Mises à jour des demandes</Label>
                    <p className="text-sm text-gray-400">Acceptation, refus ou modification de demandes</p>
                  </div>
                  <Switch checked={requestUpdates} onCheckedChange={setRequestUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Rappels d'événements</Label>
                    <p className="text-sm text-gray-400">Rappels avant vos événements</p>
                  </div>
                  <Switch checked={eventReminders} onCheckedChange={setEventReminders} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Promotions et nouveautés</Label>
                    <p className="text-sm text-gray-400">Offres spéciales et nouveaux artistes</p>
                  </div>
                  <Switch checked={promotions} onCheckedChange={setPromotions} />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSaveNotifications}
              className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
            >
              Enregistrer les préférences de notifications
            </Button>
          </TabsContent>

          {/* Onglet Confidentialité */}
          <TabsContent value="privacy" className="mt-6 space-y-6">
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Visibilité du profil</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Qui peut voir votre profil ?</Label>
                  <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                    <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#191414] border-gray-700">
                      <SelectItem value="public" className="text-white">Public - Tous les artistes</SelectItem>
                      <SelectItem value="verified" className="text-white">Artistes vérifiés uniquement</SelectItem>
                      <SelectItem value="private" className="text-white">Privé - Personne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Informations visibles</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-[#1DB954]" />
                    <div>
                      <Label className="text-white">Afficher mon email</Label>
                      <p className="text-sm text-gray-400">Visible sur votre profil public</p>
                    </div>
                  </div>
                  <Switch checked={showEmail} onCheckedChange={setShowEmail} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-5 text-[#1DB954]" />
                    <div>
                      <Label className="text-white">Afficher mon téléphone</Label>
                      <p className="text-sm text-gray-400">Visible sur votre profil public</p>
                    </div>
                  </div>
                  <Switch checked={showPhone} onCheckedChange={setShowPhone} />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSavePrivacy}
              className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
            >
              Enregistrer les paramètres de confidentialité
            </Button>
          </TabsContent>

          {/* Onglet Préférences */}
          <TabsContent value="preferences" className="mt-6 space-y-6">
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Préférences régionales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Langue</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#191414] border-gray-700">
                      <SelectItem value="fr" className="text-white">Français</SelectItem>
                      <SelectItem value="ar" className="text-white">العربية</SelectItem>
                      <SelectItem value="en" className="text-white">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Fuseau horaire</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#191414] border-gray-700">
                      <SelectItem value="GMT+1" className="text-white">GMT+1 (Maroc)</SelectItem>
                      <SelectItem value="GMT+0" className="text-white">GMT+0 (Londres)</SelectItem>
                      <SelectItem value="GMT+2" className="text-white">GMT+2 (Paris)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Préférences d'affichage</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Format de date</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger className="bg-[#191414] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#191414] border-gray-700">
                      <SelectItem value="dd/mm/yyyy" className="text-white">JJ/MM/AAAA</SelectItem>
                      <SelectItem value="mm/dd/yyyy" className="text-white">MM/JJ/AAAA</SelectItem>
                      <SelectItem value="yyyy-mm-dd" className="text-white">AAAA-MM-JJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSavePreferences}
              className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
            >
              Enregistrer les préférences
            </Button>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Lock className="size-5 text-[#1DB954]" />
                Changer le mot de passe
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Mot de passe actuel</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe actuel"
                    className="bg-[#191414] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Nouveau mot de passe</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 caractères"
                    className="bg-[#191414] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">Confirmer le nouveau mot de passe</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className="bg-[#191414] border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Sessions actives</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#191414] rounded-lg">
                  <div>
                    <p className="text-white font-medium">Windows - Chrome</p>
                    <p className="text-sm text-gray-400">Casablanca, Maroc • Maintenant</p>
                  </div>
                  <span className="text-xs text-[#1DB954]">Session actuelle</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#191414] rounded-lg">
                  <div>
                    <p className="text-white font-medium">iPhone - Safari</p>
                    <p className="text-sm text-gray-400">Casablanca, Maroc • Il y a 2 heures</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                    Déconnecter
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleChangePassword}
              className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
            >
              Modifier le mot de passe
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
