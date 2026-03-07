import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../utils/api";

interface OrganizerInfo { email: string; name: string; }
interface AuthModalProps { isOpen: boolean; onClose: () => void; onLogin: (organizer: OrganizerInfo) => void; }

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !password) { setError("Veuillez remplir tous les champs"); setLoading(false); return; }
    try {
      if (mode === "register") {
        if (!name) { setError("Veuillez entrer votre nom"); setLoading(false); return; }
        if (password !== confirmPassword) { setError("Les mots de passe ne correspondent pas"); setLoading(false); return; }
        if (password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères"); setLoading(false); return; }
        const { error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name, role: "organizer" } } });
        if (signUpError) throw signUpError;
        toast.success("Compte créé avec succès !", { description: `Bienvenue ${name}.`, duration: 4000 });
        onLogin({ email, name });
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) { setError("Email ou mot de passe incorrect"); setLoading(false); return; }
        const displayName = data.user?.user_metadata?.full_name || email.split("@")[0];
        toast.success("Connexion réussie !", { description: `Bon retour ${displayName}.`, duration: 4000 });
        onLogin({ email, name: displayName });
      }
      handleClose();
    } catch (err: any) { setError(err.message || "Une erreur est survenue"); }
    finally { setLoading(false); }
  };

  const handleClose = () => { setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setError(""); setMode("login"); onClose(); };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#191414] border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1DB954] flex items-center gap-2"><Calendar className="size-6" />Espace Organisateur</DialogTitle>
          <DialogDescription className="text-gray-400">{mode === "login" ? "Connectez-vous pour accéder aux fonctionnalités" : "Créez votre compte organisateur"}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "login" ? "bg-[#1DB954] text-black" : "bg-gray-800 text-gray-400"}`}>Connexion</button>
          <button onClick={() => setMode("register")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "register" ? "bg-[#1DB954] text-black" : "bg-gray-800 text-gray-400"}`}>Inscription</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (<div><Label className="text-gray-300">Nom complet</Label><div className="relative mt-1"><User className="absolute left-3 top-3 size-4 text-gray-400" /><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>)}
          <div><Label className="text-gray-300">Email</Label><div className="relative mt-1"><Mail className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
          <div><Label className="text-gray-300">Mot de passe</Label><div className="relative mt-1"><Lock className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
          {mode === "register" && (<div><Label className="text-gray-300">Confirmer le mot de passe</Label><div className="relative mt-1"><Lock className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>)}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3">{loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
