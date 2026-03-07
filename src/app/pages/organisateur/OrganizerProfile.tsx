import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  Camera,
  CheckCircle,
  AlertCircle,
  Lock,
  Bell,
  Languages,
  Trash2,
  Shield,
  Save,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Switch } from "../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { toast } from "sonner";

export function OrganizerProfile() {
  const navigate = useNavigate();

  // Form states
  const [accountType, setAccountType] = useState<"individual" | "company">("company");
  const [hasChanges, setHasChanges] = useState(false);

  // General info
  const [displayName, setDisplayName] = useState("Events Maroc");
  const [email, setEmail] = useState("contact@eventsmaroc.com");
  const [phone, setPhone] = useState("+212 522 XXX XXX");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [city, setCity] = useState("Casablanca");
  const [address, setAddress] = useState("123 Boulevard Mohammed V");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400");

  // Company info
  const [legalName, setLegalName] = useState("Events Maroc SARL");
  const [rc, setRc] = useState("RC 123456");
  const [ifNumber, setIfNumber] = useState("IF 78901234");
  const [ice, setIce] = useState("002345678901234");
  const [website, setWebsite] = useState("https://eventsmaroc.com");
  const [billingAddress, setBillingAddress] = useState("123 Boulevard Mohammed V, Casablanca");

  // Contact person
  const [contactName, setContactName] = useState("Mohammed Alami");
  const [contactPosition, setContactPosition] = useState("Directeur Événementiel");
  const [contactEmail, setContactEmail] = useState("m.alami@eventsmaroc.com");
  const [contactPhone, setContactPhone] = useState("+212 6XX XXX XXX");

  // Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Dialogs
  const [showVerifyPhoneDialog, setShowVerifyPhoneDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Moroccan cities
  const cities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fès",
    "Tanger",
    "Agadir",
    "Meknès",
    "Oujda",
    "Kenitra",
    "Tétouan",
    "Safi",
    "El Jadida",
    "Nador",
    "Mohammedia",
    "Beni Mellal",
  ];

  const handleSave = () => {
    toast.success("Profil mis à jour", {
      description: "Vos modifications ont été enregistrées avec succès",
    });
    setHasChanges(false);
  };

  const handleCancel = () => {
    toast.info("Modifications annulées");
    setHasChanges(false);
    // Reset form to original values
  };

  const handleVerifyPhone = () => {
    if (verificationCode.length === 6) {
      toast.success("Téléphone vérifié", {
        description: "Votre numéro a été vérifié avec succès",
      });
      setPhoneVerified(true);
      setShowVerifyPhoneDialog(false);
      setVerificationCode("");
    } else {
      toast.error("Code invalide", {
        description: "Veuillez entrer un code à 6 chiffres",
      });
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    toast.success("Mot de passe modifié", {
      description: "Votre mot de passe a été mis à jour avec succès",
    });
    setShowChangePasswordDialog(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    toast.error("Compte supprimé", {
      description: "Votre compte a été définitivement supprimé",
    });
    setShowDeleteAccountDialog(false);
    navigate("/");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to server
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setHasChanges(true);
      toast.success("Photo mise à jour");
    }
  };

  const markAsChanged = () => {
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-[#191414]">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Mon Profil</h1>
          <p className="text-gray-400">Gérez vos informations organisateur</p>
        </div>

        {/* Action buttons */}
        {hasChanges && (
          <div className="mb-8 flex items-center gap-3 animate-in slide-in-from-top-2 fade-in duration-300">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="gap-2 text-gray-300 hover:text-white hover:bg-[#282828]"
            >
              <X className="h-4 w-4" />
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold shadow-lg shadow-[#1DB954]/20"
            >
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {/* Section 1 - Type de compte */}
          <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Type de compte</CardTitle>
              <CardDescription className="text-gray-400">
                Choisissez le type de profil correspondant à votre activité.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={accountType}
                onValueChange={(value: "individual" | "company") => {
                  setAccountType(value);
                  markAsChanged();
                }}
                className="flex gap-4"
              >
                <div
                  className={`flex-1 flex items-center gap-3 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    accountType === "individual"
                      ? "border-[#1DB954] bg-[#1DB954]/10 shadow-lg shadow-[#1DB954]/20"
                      : "border-gray-700 hover:border-gray-600 bg-[#1a1a1a]"
                  }`}
                  onClick={() => {
                    setAccountType("individual");
                    markAsChanged();
                  }}
                >
                  <RadioGroupItem value="individual" id="individual" />
                  <div className="flex items-center gap-3">
                    <User className={`h-5 w-5 ${accountType === "individual" ? "text-[#1DB954]" : "text-gray-400"}`} />
                    <Label htmlFor="individual" className="cursor-pointer font-medium text-white">
                      Particulier
                    </Label>
                  </div>
                </div>

                <div
                  className={`flex-1 flex items-center gap-3 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    accountType === "company"
                      ? "border-[#1DB954] bg-[#1DB954]/10 shadow-lg shadow-[#1DB954]/20"
                      : "border-gray-700 hover:border-gray-600 bg-[#1a1a1a]"
                  }`}
                  onClick={() => {
                    setAccountType("company");
                    markAsChanged();
                  }}
                >
                  <RadioGroupItem value="company" id="company" />
                  <div className="flex items-center gap-3">
                    <Building2 className={`h-5 w-5 ${accountType === "company" ? "text-[#1DB954]" : "text-gray-400"}`} />
                    <Label htmlFor="company" className="cursor-pointer font-medium text-white">
                      Entreprise
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Section 2 - Informations générales */}
          <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo / Logo */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-[#1DB954]/30">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="text-2xl bg-[#1DB954]/20 text-white">
                      {displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 bg-[#1DB954] rounded-full cursor-pointer hover:bg-[#1ED760] transition-all shadow-lg group-hover:scale-110"
                  >
                    <Camera className="h-4 w-4 text-black" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                <div>
                  <p className="font-medium text-white">Photo / Logo</p>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG jusqu'à 5MB. Recommandé : 400x400px
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Nom affiché */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="display-name" className="text-gray-300">
                    Nom affiché <span className="text-[#1DB954]">*</span>
                  </Label>
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      markAsChanged();
                    }}
                    placeholder="Nom visible publiquement"
                    className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      readOnly
                      className="pl-10 bg-[#1a1a1a]/50 border-gray-700 text-gray-400"
                    />
                    <Badge
                      variant="outline"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email vérifié et non modifiable
                  </p>
                </div>

                {/* Téléphone */}
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Téléphone</Label>
                  <div className="flex gap-2 mt-1.5">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="+212 XXX XXX XXX"
                        className="pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>
                    {!phoneVerified && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowVerifyPhoneDialog(true)}
                        className="text-[#1DB954] border-[#1DB954]/50 hover:bg-[#1DB954]/10 hover:border-[#1DB954]"
                      >
                        Vérifier
                      </Button>
                    )}
                  </div>
                  {phoneVerified ? (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/30"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Non vérifié
                    </Badge>
                  )}
                </div>

                {/* Ville */}
                <div>
                  <Label htmlFor="city" className="text-gray-300">Ville</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Select value={city} onValueChange={(value) => {
                      setCity(value);
                      markAsChanged();
                    }}>
                      <SelectTrigger id="city" className="pl-10 bg-[#1a1a1a] border-gray-700 text-white focus:border-[#1DB954] focus:ring-[#1DB954]/20">
                        <SelectValue placeholder="Sélectionner une ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Adresse */}
                <div>
                  <Label htmlFor="address" className="text-gray-300">Adresse (optionnel)</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      markAsChanged();
                    }}
                    placeholder="Adresse complète"
                    className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 - Informations entreprise (CONDITIONNELLE) */}
          {accountType === "company" && (
            <div className="animate-in slide-in-from-top-4 fade-in duration-300">
              <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Building2 className="h-5 w-5 text-[#1DB954]" />
                    Informations entreprise
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Ces informations peuvent être demandées par certains artistes lors d'une confirmation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="legal-name" className="text-gray-300">Raison sociale</Label>
                      <Input
                        id="legal-name"
                        value={legalName}
                        onChange={(e) => {
                          setLegalName(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="Nom légal de l'entreprise"
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rc" className="text-gray-300">RC (Registre de Commerce)</Label>
                      <Input
                        id="rc"
                        value={rc}
                        onChange={(e) => {
                          setRc(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="RC XXXXXX"
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="if" className="text-gray-300">IF (Identifiant Fiscal)</Label>
                      <Input
                        id="if"
                        value={ifNumber}
                        onChange={(e) => {
                          setIfNumber(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="IF XXXXXXXX"
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ice" className="text-gray-300">ICE (optionnel)</Label>
                      <Input
                        id="ice"
                        value={ice}
                        onChange={(e) => {
                          setIce(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="000000000000000"
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-gray-300">Site web</Label>
                      <div className="relative mt-1.5">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          type="url"
                          value={website}
                          onChange={(e) => {
                            setWebsite(e.target.value);
                            markAsChanged();
                          }}
                          placeholder="https://exemple.com"
                          className="pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="billing-address" className="text-gray-300">Adresse de facturation</Label>
                      <Textarea
                        id="billing-address"
                        value={billingAddress}
                        onChange={(e) => {
                          setBillingAddress(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="Adresse complète pour la facturation"
                        rows={3}
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Section 4 - Contact principal (CONDITIONNELLE) */}
          {accountType === "company" && (
            <div className="animate-in slide-in-from-top-4 fade-in duration-300">
              <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <User className="h-5 w-5 text-[#1DB954]" />
                      Contact principal
                    </CardTitle>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Visible uniquement par l'administration
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contact-name" className="text-gray-300">Nom</Label>
                      <Input
                        id="contact-name"
                        value={contactName}
                        onChange={(e) => {
                          setContactName(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="Prénom Nom"
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-position" className="text-gray-300">Fonction</Label>
                      <Input
                        id="contact-position"
                        value={contactPosition}
                        onChange={(e) => {
                          setContactPosition(e.target.value);
                          markAsChanged();
                        }}
                        placeholder="Ex: Directeur Général"
                        className="mt-1.5 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-email" className="text-gray-300">Email</Label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => {
                            setContactEmail(e.target.value);
                            markAsChanged();
                          }}
                          placeholder="contact@entreprise.com"
                          className="pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contact-phone" className="text-gray-300">Téléphone</Label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="contact-phone"
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => {
                            setContactPhone(e.target.value);
                            markAsChanged();
                          }}
                          placeholder="+212 XXX XXX XXX"
                          className="pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Section 5 - Paramètres de compte */}
          <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="h-5 w-5 text-[#1DB954]" />
                Paramètres de compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Recevoir notifications email</Label>
                  <p className="text-sm text-gray-400">
                    Recevez des emails pour vos demandes et messages
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={(checked) => {
                    setEmailNotifications(checked);
                    markAsChanged();
                  }}
                />
              </div>

              <Separator className="bg-gray-700" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Recevoir notifications SMS</Label>
                  <p className="text-sm text-gray-400">
                    Recevez des SMS pour les demandes importantes
                  </p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={(checked) => {
                    setSmsNotifications(checked);
                    markAsChanged();
                  }}
                />
              </div>

              <Separator className="bg-gray-700" />

              {/* Langue */}
              <div>
                <Label htmlFor="language" className="text-gray-300">Langue préférée</Label>
                <div className="relative mt-1.5">
                  <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                  <Select value={language} onValueChange={(value) => {
                    setLanguage(value);
                    markAsChanged();
                  }}>
                    <SelectTrigger id="language" className="pl-10 max-w-xs bg-[#1a1a1a] border-gray-700 text-white focus:border-[#1DB954] focus:ring-[#1DB954]/20">
                      <SelectValue placeholder="Choisir une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 - Sécurité */}
          <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="h-5 w-5 text-[#1DB954]" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Modifier mot de passe */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Modifier mot de passe</Label>
                  <p className="text-sm text-gray-400">
                    Changer votre mot de passe de connexion
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowChangePasswordDialog(true)}
                  className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a] hover:text-white"
                >
                  Modifier
                </Button>
              </div>

              <Separator className="bg-gray-700" />

              {/* Double authentification */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Authentification à deux facteurs</Label>
                  <p className="text-sm text-gray-400">
                    Sécurisez votre compte avec une vérification en deux étapes
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={(checked) => {
                    setTwoFactorEnabled(checked);
                    markAsChanged();
                    if (checked) {
                      toast.success("Double authentification activée");
                    } else {
                      toast.info("Double authentification désactivée");
                    }
                  }}
                />
              </div>

              <Separator className="bg-gray-700" />

              {/* Supprimer compte */}
              <div>
                <div className="space-y-0.5 mb-3">
                  <Label className="text-red-400">Zone de danger</Label>
                  <p className="text-sm text-gray-400">
                    La suppression de votre compte est irréversible
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteAccountDialog(true)}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer mon compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky save button mobile */}
        {hasChanges && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#191414] border-t border-gray-800 md:hidden shadow-lg z-50">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-[#282828]"
              >
                Annuler
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog - Vérifier téléphone */}
      <Dialog open={showVerifyPhoneDialog} onOpenChange={setShowVerifyPhoneDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vérifier votre téléphone</DialogTitle>
            <DialogDescription>
              Un code de vérification a été envoyé au {phone}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="verification-code">Code de vérification</Label>
            <Input
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="text-center text-2xl tracking-widest mt-2"
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              Entrez le code à 6 chiffres reçu par SMS
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyPhoneDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleVerifyPhone}
              disabled={verificationCode.length !== 6}
              className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-black font-semibold"
            >
              Vérifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog - Modifier mot de passe */}
      <Dialog open={showChangePasswordDialog} onOpenChange={setShowChangePasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogDescription>
              Choisissez un mot de passe fort avec au moins 8 caractères
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePasswordDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleChangePassword} className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-black font-semibold">
              Modifier le mot de passe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog - Supprimer compte */}
      <Dialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer définitivement le compte</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">
                  Attention : Action définitive
                </p>
                <ul className="text-xs text-red-700 mt-2 space-y-1">
                  <li>• Toutes vos demandes seront annulées</li>
                  <li>• Vos conversations seront supprimées</li>
                  <li>• Votre historique sera perdu</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteAccountDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}