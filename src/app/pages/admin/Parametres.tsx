import { Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function AdminParametres() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-500 mt-1">Configuration de la plateforme</p>
        </div>
        <Button className="gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90">
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Règles de validation</CardTitle>
            <CardDescription>Configuration des critères de validation des profils</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validation manuelle obligatoire</Label>
                <p className="text-xs text-gray-500">Tous les profils nécessitent approbation admin</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Complétude minimale requise (%)</Label>
              <Input type="number" defaultValue="80" min="0" max="100" />
            </div>

            <div className="space-y-2">
              <Label>Photos minimales requises</Label>
              <Input type="number" defaultValue="3" min="1" max="10" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vérification téléphone obligatoire</Label>
                <p className="text-xs text-gray-500">SMS de vérification à l'inscription</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limites & Restrictions</CardTitle>
            <CardDescription>Gestion des quotas et limitations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Demandes max par organisateur/jour</Label>
              <Input type="number" defaultValue="10" min="1" max="100" />
            </div>

            <div className="space-y-2">
              <Label>Expiration auto demandes (jours)</Label>
              <Input type="number" defaultValue="7" min="1" max="30" />
            </div>

            <div className="space-y-2">
              <Label>Délai minimum entre 2 demandes (heures)</Label>
              <Input type="number" defaultValue="24" min="1" max="72" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Activer limite demandes</Label>
                <p className="text-xs text-gray-500">Appliquer les quotas définis</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications Email</CardTitle>
            <CardDescription>Configuration des emails automatiques</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email bienvenue artiste</Label>
                <p className="text-xs text-gray-500">Envoyé après inscription</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email validation profil</Label>
                <p className="text-xs text-gray-500">Envoyé après approbation</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Rappel demandes sans réponse</Label>
                <p className="text-xs text-gray-500">Après 48h d'inactivité</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications admin alertes</Label>
                <p className="text-xs text-gray-500">Signalements et activités suspectes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Langues & Localisation</CardTitle>
            <CardDescription>Configuration multilingue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Langue par défaut</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية (Arabe)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fuseau horaire</Label>
              <Select defaultValue="casablanca">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casablanca">Casablanca (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Devise</Label>
              <Select defaultValue="mad">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mad">MAD (Dirham marocain)</SelectItem>
                  <SelectItem value="eur">EUR (Euro)</SelectItem>
                  <SelectItem value="usd">USD (Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance & Système</CardTitle>
            <CardDescription>Outils de maintenance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mode maintenance</Label>
                <p className="text-xs text-gray-500">Désactiver temporairement la plateforme</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inscriptions ouvertes</Label>
                <p className="text-xs text-gray-500">Autoriser les nouvelles inscriptions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
