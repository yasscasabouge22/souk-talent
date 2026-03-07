import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UserPlus, LogIn, Calendar, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

interface OrganizerInfo {
  email: string;
  name: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (organizer: OrganizerInfo) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (mode === "register") {
      if (!name) {
        setError("Veuillez entrer votre nom");
        return;
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
        return;
      }
    }

    // Simulation de l'authentification (en production, appeler une vraie API)
    const organizerInfo: OrganizerInfo = {
      email: email,
      name: mode === "register" ? name : email.split("@")[0],
    };

    onLogin(organizerInfo);
    
    // Afficher une notification de succès
    if (mode === "register") {
      toast.success("Compte créé avec succès !", {
        description: `Bienvenue ${organizerInfo.name}. Vous pouvez maintenant accéder aux coordonnées des artistes.`,
        duration: 4000,
      });
    } else {
      toast.success("Connexion réussie !", {
        description: `Bon retour ${organizerInfo.name}. Vous avez accès à toutes les fonctionnalités.`,
        duration: 4000,
      });
    }
    
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setMode("login");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#191414] border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1DB954] flex items-center gap-2">
            <Calendar className="size-6" />
            Espace Organisateur
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === "login" 
              ? "Connectez-vous pour accéder aux coordonnées des artistes et faire des réservations"
              : "Créez votre compte organisateur pour commencer à réserver des artistes"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Nom complet *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#282828] border-gray-600 text-white pl-10 focus:border-[#1DB954]"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#282828] border-gray-600 text-white pl-10 focus:border-[#1DB954]"
              />
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#282828] border-gray-600 text-white pl-10 focus:border-[#1DB954]"
              />
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmer le mot de passe *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#282828] border-gray-600 text-white pl-10 focus:border-[#1DB954]"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold py-3"
          >
            {mode === "login" ? (
              <>
                <LogIn className="size-4 mr-2" />
                Se connecter
              </>
            ) : (
              <>
                <UserPlus className="size-4 mr-2" />
                Créer mon compte
              </>
            )}
          </Button>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-center text-sm text-gray-400">
              {mode === "login" ? (
                <>
                  Vous n'avez pas de compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-[#1DB954] hover:text-[#1ED760] font-medium"
                  >
                    Créer un compte
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#1DB954] hover:text-[#1ED760] font-medium"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}