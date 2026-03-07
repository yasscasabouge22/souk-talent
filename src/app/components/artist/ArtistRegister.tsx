import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Mail, Lock, Phone, AlertCircle, Loader2, Eye, EyeOff, MapPin, Music, ArrowLeft } from "lucide-react";
import { toast } from "sonner";


interface ArtistRegisterProps {
  onRegisterSuccess: (data: { phone: string; email: string }) => void;
  onNavigateToLogin: () => void;
  onNavigateToHome?: () => void;
}

export function ArtistRegister({ onRegisterSuccess, onNavigateToLogin, onNavigateToHome }: ArtistRegisterProps) {
  const [stageName, setStageName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    stageName: "",
    email: "",
    phone: "",
    category: "",
    city: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const validateForm = () => {
    const newErrors = {
      stageName: "",
      email: "",
      phone: "",
      category: "",
      city: "",
      password: "",
      confirmPassword: "",
      terms: "",
    };

    let isValid = true;

    if (!stageName.trim()) {
      newErrors.stageName = "Le nom de scène est requis";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
      isValid = false;
    } else if (!/^(\+212|0)[5-7][0-9]{8}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Numéro marocain invalide";
      isValid = false;
    }

    if (!category.trim()) {
      newErrors.category = "La catégorie est requise";
      isValid = false;
    }

    if (!city.trim()) {
      newErrors.city = "La ville est requise";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 caractères";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = "Vous devez accepter les conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs");
      return;
    }

    setIsLoading(true);

    // Simulation d'appel API
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Compte créé avec succès !");
      onRegisterSuccess({ phone, email });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        {onNavigateToHome && (
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 text-gray-400 hover:text-[#1DB954] transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Retour à l'accueil</span>
          </button>
        )}
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logo} alt="Souk Talent" className="h-16 w-16 object-contain" />
            <h1 className="font-bold text-[#1DB954] text-2xl">Souk Talent</h1>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-[#282828] border-[#1DB954]/20 rounded-2xl shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl text-white">Créer votre compte artiste</CardTitle>
            <CardDescription className="text-gray-400">
              Rejoignez Souk Talent et recevez des demandes de booking
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom de scène */}
              <div className="space-y-2">
                <Label htmlFor="stageName" className="text-gray-300">
                  Nom de scène <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="stageName"
                    value={stageName}
                    onChange={(e) => {
                      setStageName(e.target.value);
                      setErrors({ ...errors, stageName: "" });
                    }}
                    placeholder="Votre nom d'artiste"
                    className={`pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.stageName ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.stageName && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.stageName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder="votre@email.com"
                    className={`pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Mot de passe <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: "" });
                    }}
                    placeholder="Minimum 6 caractères"
                    className={`pl-10 pr-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirmation du mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirmez le mot de passe <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
                    placeholder="Confirmez votre mot de passe"
                    className={`pl-10 pr-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Téléphone <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="+212 6XX XXX XXX"
                    className={`pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Catégorie */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">
                  Catégorie <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      setCategory(value);
                      setErrors({ ...errors, category: "" });
                    }}
                  >
                    <SelectTrigger className={`pl-10 bg-[#1a1a1a] border-gray-700 text-white focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.category ? "border-red-500" : ""
                    }`}>
                      <SelectValue placeholder="Choisissez votre catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#282828] border-gray-700">
                      <SelectItem value="chanteur" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Chanteur</SelectItem>
                      <SelectItem value="danseur" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Danseur</SelectItem>
                      <SelectItem value="musicien" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Musicien</SelectItem>
                      <SelectItem value="acteur" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Acteur</SelectItem>
                      <SelectItem value="artiste_visuel" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Artiste visuel</SelectItem>
                      <SelectItem value="comique" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Comique</SelectItem>
                      <SelectItem value="dj" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">DJ</SelectItem>
                      <SelectItem value="animateur" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Animateur</SelectItem>
                      <SelectItem value="photographe" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Photographe</SelectItem>
                      <SelectItem value="producteur" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Producteur</SelectItem>
                      <SelectItem value="autre" className="text-white hover:bg-[#1DB954]/10 focus:bg-[#1DB954]/20">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.category && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Ville */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-300">
                  Ville <span className="text-[#1DB954]">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setErrors({ ...errors, city: "" });
                    }}
                    placeholder="Votre ville"
                    className={`pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#1DB954] focus:ring-[#1DB954]/20 ${
                      errors.city ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.city && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.city}
                  </p>
                )}
              </div>

              {/* Conditions */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => {
                      setAcceptTerms(checked as boolean);
                      setErrors({ ...errors, terms: "" });
                    }}
                    className={`mt-0.5 ${errors.terms ? "border-red-500" : ""}`}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-gray-300 leading-relaxed cursor-pointer"
                  >
                    J'accepte les{" "}
                    <a href="#" className="text-[#1DB954] hover:underline">
                      conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a href="#" className="text-[#1DB954] hover:underline">
                      politique de confidentialité
                    </a>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-400 flex items-center gap-1 ml-7">
                    <AlertCircle className="h-3 w-3" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Bouton principal */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold text-base shadow-lg shadow-[#1DB954]/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </Button>

              {/* Lien connexion */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-sm text-gray-400 hover:text-[#1DB954] transition-colors"
                >
                  Déjà inscrit ?{" "}
                  <span className="text-[#1DB954] font-medium">Se connecter</span>
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          En créant un compte, vous acceptez de recevoir des notifications de Souk Talent
        </p>
      </div>
    </div>
  );
}