import { useState } from "react";
import { Settings as SettingsIcon, Lock, Bell, Eye, Trash2, UserPlus, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { toast } from "sonner";

export function ArtistSettings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showDeleteAgentModal, setShowDeleteAgentModal] = useState(false);
  
  // Agent account state
  const [agentAccount, setAgentAccount] = useState<{
    email: string;
    name: string;
  } | null>(null);
  
  const [newAgentData, setNewAgentData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Settings state
  const [emailSettings, setEmailSettings] = useState({
    newRequests: true,
    requestAccepted: true,
    requestDeclined: false,
    profileViews: false,
    weeklyReport: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showPricing: true,
  });

  const handleSaveAccount = () => {
    toast.success("Paramètres du compte mis à jour");
  };

  const handleDeleteAccount = () => {
    toast.error("Compte supprimé", {
      description: "Toutes vos données ont été effacées.",
    });
    setShowDeleteModal(false);
  };

  const handleAddAgent = () => {
    if (newAgentData.password !== newAgentData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    setAgentAccount({
      email: newAgentData.email,
      name: newAgentData.name,
    });
    toast.success("Agent ajouté avec succès");
    setShowAgentModal(false);
  };

  const handleDeleteAgent = () => {
    setAgentAccount(null);
    toast.success("Agent supprimé avec succès");
    setShowDeleteAgentModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <SettingsIcon className="size-8" />
          Paramètres
        </h1>
        <p className="text-gray-400">Gérez vos préférences et votre compte</p>
      </div>

      {/* Compte */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="size-5" />
            Compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="mehdi.elalami@email.com"
              className="bg-[#191414] border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-gray-300">
              Mot de passe actuel
            </Label>
            <Input
              id="current-password"
              type="password"
              className="bg-[#191414] border-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-gray-300">
              Nouveau mot de passe
            </Label>
            <Input
              id="new-password"
              type="password"
              className="bg-[#191414] border-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-300">
              Confirmer le mot de passe
            </Label>
            <Input
              id="confirm-password"
              type="password"
              className="bg-[#191414] border-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>

          <Button
            className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
            onClick={handleSaveAccount}
          >
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="size-5" />
            Notifications
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2">
            Choisissez les notifications que vous souhaitez recevoir par email
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Nouvelles demandes</p>
              <p className="text-sm text-gray-400">
                Recevoir un email pour chaque nouvelle demande
              </p>
            </div>
            <Switch
              checked={emailSettings.newRequests}
              onCheckedChange={(checked) =>
                setEmailSettings({ ...emailSettings, newRequests: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Demande acceptée</p>
              <p className="text-sm text-gray-400">
                Notification quand un client confirme votre acceptation
              </p>
            </div>
            <Switch
              checked={emailSettings.requestAccepted}
              onCheckedChange={(checked) =>
                setEmailSettings({ ...emailSettings, requestAccepted: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Demande refusée</p>
              <p className="text-sm text-gray-400">
                Notification quand une demande est annulée
              </p>
            </div>
            <Switch
              checked={emailSettings.requestDeclined}
              onCheckedChange={(checked) =>
                setEmailSettings({ ...emailSettings, requestDeclined: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Vues du profil</p>
              <p className="text-sm text-gray-400">
                Notification quotidienne du nombre de vues
              </p>
            </div>
            <Switch
              checked={emailSettings.profileViews}
              onCheckedChange={(checked) =>
                setEmailSettings({ ...emailSettings, profileViews: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Rapport hebdomadaire</p>
              <p className="text-sm text-gray-400">
                Résumé de votre activité chaque semaine
              </p>
            </div>
            <Switch
              checked={emailSettings.weeklyReport}
              onCheckedChange={(checked) =>
                setEmailSettings({ ...emailSettings, weeklyReport: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Confidentialité */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="size-5" />
            Confidentialité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Activation profil</p>
              <p className="text-sm text-gray-400">
                Désactiver votre profil temporairement sans le supprimer
              </p>
            </div>
            <Switch
              checked={privacySettings.profilePublic}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, profilePublic: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Afficher les tarifs</p>
              <p className="text-sm text-gray-400">
                Les visiteurs peuvent voir votre fourchette de prix
              </p>
            </div>
            <Switch
              checked={privacySettings.showPricing}
              onCheckedChange={(checked) =>
                setPrivacySettings({ ...privacySettings, showPricing: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Agent */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserPlus className="size-5" />
            Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {agentAccount ? (
            <div className="space-y-2">
              <p className="text-white">Agent actuel</p>
              <p className="text-sm text-gray-400">
                {agentAccount.name} ({agentAccount.email})
              </p>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => setShowDeleteAgentModal(true)}
              >
                <Trash2 className="size-4 mr-2" />
                Supprimer l'agent
              </Button>
            </div>
          ) : (
            <Button
              className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
              onClick={() => setShowAgentModal(true)}
            >
              Ajouter un agent
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Zone de danger */}
      <Card className="bg-red-500/10 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <Trash2 className="size-5" />
            Zone de danger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Une fois votre compte supprimé, toutes vos données seront définitivement
            effacées. Cette action est irréversible.
          </p>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="size-4 mr-2" />
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center gap-2">
              <Trash2 className="size-5" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Cette action est irréversible
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <p className="text-gray-300">
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
              <strong className="text-white"> irréversible</strong> et toutes vos
              données seront perdues.
            </p>

            <div className="space-y-2">
              <Label htmlFor="delete-confirm" className="text-gray-300">
                Tapez "SUPPRIMER" pour confirmer
              </Label>
              <Input
                id="delete-confirm"
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="SUPPRIMER"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={handleDeleteAccount}
              >
                Supprimer définitivement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Agent Modal */}
      <Dialog open={showAgentModal} onOpenChange={setShowAgentModal}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <UserPlus className="size-5" />
              Ajouter un agent
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              L'agent aura accès à votre compte avec des permissions limitées
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <p className="text-gray-300">
              Ajoutez un agent pour gérer votre compte à votre place.
            </p>

            <div className="space-y-2">
              <Label htmlFor="agent-name" className="text-gray-300">
                Nom de l'agent
              </Label>
              <Input
                id="agent-name"
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Nom de l'agent"
                value={newAgentData.name}
                onChange={(e) => setNewAgentData({ ...newAgentData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-email" className="text-gray-300">
                Email de l'agent
              </Label>
              <Input
                id="agent-email"
                type="email"
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Email de l'agent"
                value={newAgentData.email}
                onChange={(e) => setNewAgentData({ ...newAgentData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-password" className="text-gray-300">
                Mot de passe de l'agent
              </Label>
              <Input
                id="agent-password"
                type="password"
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Mot de passe de l'agent"
                value={newAgentData.password}
                onChange={(e) => setNewAgentData({ ...newAgentData, password: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-confirm-password" className="text-gray-300">
                Confirmer le mot de passe
              </Label>
              <Input
                id="agent-confirm-password"
                type="password"
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Confirmer le mot de passe"
                value={newAgentData.confirmPassword}
                onChange={(e) => setNewAgentData({ ...newAgentData, confirmPassword: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setShowAgentModal(false)}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                onClick={handleAddAgent}
              >
                Ajouter l'agent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Agent Confirmation Modal */}
      <Dialog open={showDeleteAgentModal} onOpenChange={setShowDeleteAgentModal}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center gap-2">
              <Trash2 className="size-5" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Cette action est irréversible
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <p className="text-gray-300">
              Êtes-vous sûr de vouloir supprimer cet agent ? Cette action est
              <strong className="text-white"> irréversible</strong> et toutes ses
              données seront perdues.
            </p>

            <div className="space-y-2">
              <Label htmlFor="delete-confirm" className="text-gray-300">
                Tapez "SUPPRIMER" pour confirmer
              </Label>
              <Input
                id="delete-confirm"
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="SUPPRIMER"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setShowDeleteAgentModal(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={handleDeleteAgent}
              >
                Supprimer définitivement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}