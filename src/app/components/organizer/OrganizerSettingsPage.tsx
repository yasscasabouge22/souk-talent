import { useState } from "react";
import { Settings, Bell, Mail, MessageSquare, Lock, Globe, Shield, ArrowLeft } from "lucide-react";
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

interface OrganizerSettingsPageProps {
  onBack: () => void;
}

export function OrganizerSettingsPage({ onBack }: OrganizerSettingsPageProps) {
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
    <div className="min-h-screen bg-[#191414]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="size-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="size-8 text-[#1DB954]" />
            Paramètres
          </h1>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="notifications">
            <TabsList className="grid w-full grid-cols-4 bg-[#282828] mb-6">
              <TabsTrigger value="notifications" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black py-3">
                <Bell className="size-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black py-3">
                <Shield className="size-4 mr-2" />
                <span className="hidden sm:inline">Confidentialité</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black py-3">
                <Globe className="size-4 mr-2" />
                <span className="hidden sm:inline">Préférences</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black py-3">
                <Lock className="size-4 mr-2" />
                <span className="hidden sm:inline">Sécurité</span>
              </TabsTrigger>
            </TabsList>

            {/* Onglet Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 text-lg">Canaux de notification</h3>
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
                <h3 className="text-white font-semibold mb-4 text-lg">Types de notifications</h3>
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
                className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black h-12"
              >
                Enregistrer les préférences de notifications
              </Button>
            </TabsContent>

            {/* Onglet Confidentialité */}
            <TabsContent value="privacy" className="space-y-6">
              <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 text-lg">Visibilité du profil</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Qui peut voir votre profil ?</Label>
                    <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                      <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
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
                <h3 className="text-white font-semibold mb-4 text-lg">Informations visibles</h3>
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
                className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black h-12"
              >
                Enregistrer les paramètres de confidentialité
              </Button>
            </TabsContent>

            {/* Onglet Préférences */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 text-lg">Préférences régionales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Langue</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
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
                      <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
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
                <h3 className="text-white font-semibold mb-4 text-lg">Préférences d'affichage</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Format de date</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger className="bg-[#191414] border-gray-700 text-white h-11">
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
                className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black h-12"
              >
                Enregistrer les préférences
              </Button>
            </TabsContent>

            {/* Onglet Sécurité */}
            <TabsContent value="security" className="space-y-6">
              <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Lock className="size-6 text-[#1DB954]" />
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
                      className="bg-[#191414] border-gray-700 text-white h-11"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Nouveau mot de passe</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 caractères"
                      className="bg-[#191414] border-gray-700 text-white h-11"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Confirmer le nouveau mot de passe</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmez votre nouveau mot de passe"
                      className="bg-[#191414] border-gray-700 text-white h-11"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#282828] rounded-lg p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 text-lg">Sessions actives</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[#191414] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Windows - Chrome</p>
                      <p className="text-sm text-gray-400">Casablanca, Maroc • Maintenant</p>
                    </div>
                    <span className="text-xs text-[#1DB954] font-medium">Session actuelle</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#191414] rounded-lg">
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
                className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black h-12"
              >
                Modifier le mot de passe
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
