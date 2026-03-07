import { useState } from "react";
import { X, User, Mail, Lock, Phone, Music, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface ArtistAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (artistInfo: { id: string; name: string; email: string; isAgent?: boolean }) => void;
  onNavigateToRegister?: () => void;
}

export function ArtistAuthModal({ isOpen, onClose, onLogin, onNavigateToRegister }: ArtistAuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginType, setLoginType] = useState<"artist" | "agent">("artist");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Connexion
    loginEmail: "",
    loginPassword: "",
    // Inscription
    stageName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    category: "",
    city: "",
  });

  const categories = [
    "DJ",
    "Groupe Traditionnel",
    "Orchestre",
    "Chanteur",
    "Groupe Moderne",
    "Animateur",
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.loginEmail || !formData.loginPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Simulation de connexion (en production, vérifier avec backend)
    const isAgent = loginType === "agent";
    
    // Stocker l'information isAgent dans localStorage
    localStorage.setItem("isAgent", JSON.stringify(isAgent));
    
    toast.success("Connexion réussie !", {
      description: isAgent 
        ? "Bienvenue dans votre espace agent" 
        : "Bienvenue dans votre espace artiste",
    });

    onLogin({
      id: "1",
      name: formData.loginEmail.split("@")[0],
      email: formData.loginEmail,
      isAgent,
    });

    resetForm();
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.stageName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone ||
      !formData.category ||
      !formData.city
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // Simulation de création de compte
    toast.success("Compte créé avec succès !", {
      description: "Bienvenue sur Souk Talent",
    });

    onLogin({
      id: Date.now().toString(),
      name: formData.stageName,
      email: formData.email,
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      loginEmail: "",
      loginPassword: "",
      stageName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      category: "",
      city: "",
    });
    setMode("login");
    setShowForgotPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleForgotPassword = () => {
    if (!formData.loginEmail) {
      toast.error("Veuillez entrer votre email");
      return;
    }
    toast.success("Email de récupération envoyé", {
      description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe",
    });
    setShowForgotPassword(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[#1DB954] text-2xl flex items-center gap-2">
                <Music className="size-6" />
                Espace Artiste
              </DialogTitle>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <DialogDescription className="sr-only">
              Connexion ou inscription à l'espace artiste
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {mode === "login" ? (
              // Login Mode
              <>
                {/* Login Type Tabs - Connexion Artiste / Connexion Agent */}
                <div className="flex gap-2 mb-6 p-1 bg-gray-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLoginType("artist")}
                    className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors text-sm ${
                      loginType === "artist"
                        ? "bg-[#1DB954] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Connexion Artiste
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType("agent")}
                    className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors text-sm ${
                      loginType === "agent"
                        ? "bg-[#1DB954] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Connexion Agent
                  </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail" className="text-gray-300">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        id="loginEmail"
                        type="email"
                        value={formData.loginEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, loginEmail: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white pl-10"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loginPassword" className="text-gray-300">
                        Mot de passe *
                      </Label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs text-[#1DB954] hover:underline"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        id="loginPassword"
                        type="password"
                        value={formData.loginPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, loginPassword: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold"
                  >
                    Se connecter
                  </Button>

                  <p className="text-center text-sm text-gray-400">
                    Pas encore de compte ?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigateToRegister) {
                          handleClose();
                          onNavigateToRegister();
                        } else {
                          setMode("register");
                        }
                      }}
                      className="text-[#1DB954] hover:underline font-medium"
                    >
                      Créer un compte
                    </button>
                  </p>
                </form>
              </>
            ) : (
              // Register Mode
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stageName" className="text-gray-300">
                    Nom de scène *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="stageName"
                      type="text"
                      value={formData.stageName}
                      onChange={(e) =>
                        setFormData({ ...formData, stageName: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                      placeholder="DJ Mehdi..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Téléphone *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-300">
                      Catégorie *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-white">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300">
                      Ville *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="bg-gray-800 border-gray-700 text-white pl-10"
                        placeholder="Casablanca"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Mot de passe *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Minimum 6 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirmer le mot de passe *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold"
                >
                  Créer mon compte artiste
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#1DB954] hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Lock className="size-5" />
              Mot de passe oublié
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400 mt-2">
              Entrez votre email pour recevoir un lien de réinitialisation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-gray-300">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  value={formData.loginEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, loginEmail: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white pl-10"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setShowForgotPassword(false)}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                onClick={handleForgotPassword}
              >
                Envoyer le lien
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}