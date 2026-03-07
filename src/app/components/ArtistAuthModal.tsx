import { useState } from "react";
import { User, Mail, Lock, Phone, Music } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { supabase } from "../../utils/api";

interface ArtistAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (artistInfo: { id: string; name: string; email: string; isAgent?: boolean }) => void;
  onNavigateToRegister?: () => void;
}

export function ArtistAuthModal({ isOpen, onClose, onLogin }: ArtistAuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginType, setLoginType] = useState<"artist" | "agent">("artist");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [formData, setFormData] = useState({ loginEmail: "", loginPassword: "", stageName: "", email: "", password: "", confirmPassword: "", phone: "", category: "" });
  const categories = ["DJ", "Groupe Traditionnel", "Orchestre", "Chanteur", "Groupe Moderne", "Animateur"];
  const updateForm = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!formData.loginEmail || !formData.loginPassword) { toast.error("Veuillez remplir tous les champs"); return; }
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: formData.loginEmail, password: formData.loginPassword });
      if (signInError) { setError("Email ou mot de passe incorrect"); return; }
      const isAgent = loginType === "agent";
      localStorage.setItem("isAgent", JSON.stringify(isAgent));
      toast.success("Connexion réussie !", { description: isAgent ? "Bienvenue dans votre espace agent" : "Bienvenue dans votre espace artiste" });
      onLogin({ id: data.user.id, name: data.user.user_metadata?.full_name || formData.loginEmail.split("@")[0], email: formData.loginEmail, isAgent });
      handleClose();
    } catch (err: any) { setError(err.message || "Une erreur est survenue"); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!formData.stageName || !formData.email || !formData.password || !formData.phone || !formData.category) { toast.error("Veuillez remplir tous les champs"); return; }
    if (formData.password !== formData.confirmPassword) { setError("Les mots de passe ne correspondent pas"); return; }
    if (formData.password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères"); return; }
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email: formData.email, password: formData.password, options: { data: { full_name: formData.stageName, phone: formData.phone, role: "artist", category: formData.category } } });
      if (signUpError) throw signUpError;
      if (data.user) { await supabase.from("artists").update({ category: formData.category }).eq("id", data.user.id); }
      toast.success("Compte créé avec succès !", { description: `Bienvenue ${formData.stageName} !`, duration: 5000 });
      onLogin({ id: data.user?.id || "", name: formData.stageName, email: formData.email, isAgent: false });
      handleClose();
    } catch (err: any) { setError(err.message || "Une erreur est survenue"); }
    finally { setLoading(false); }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { toast.error("Veuillez entrer votre email"); return; }
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(forgotEmail);
      toast.success("Email envoyé !", { description: "Vérifiez votre boîte mail." });
      setShowForgotPassword(false);
    } catch { toast.error("Erreur lors de l'envoi"); }
    finally { setLoading(false); }
  };

  const handleClose = () => { setFormData({ loginEmail: "", loginPassword: "", stageName: "", email: "", password: "", confirmPassword: "", phone: "", category: "" }); setError(""); setMode("login"); setShowForgotPassword(false); onClose(); };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#191414] border-gray-700 text-white max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1DB954] flex items-center gap-2"><Music className="size-6" />Espace Artiste</DialogTitle>
          <DialogDescription className="text-gray-400">{mode === "login" ? "Connectez-vous à votre espace artiste" : "Créez votre profil artiste"}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "login" ? "bg-[#1DB954] text-black" : "bg-gray-800 text-gray-400"}`}>Connexion</button>
          <button onClick={() => setMode("register")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "register" ? "bg-[#1DB954] text-black" : "bg-gray-800 text-gray-400"}`}>Inscription</button>
        </div>
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-gray-400 text-sm">Entrez votre email pour réinitialiser votre mot de passe.</p>
            <Input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="votre@email.com" className="bg-gray-800 border-gray-600 text-white" />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowForgotPassword(false)} className="flex-1 border-gray-600 text-gray-300">Retour</Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-[#1DB954] text-black font-bold">{loading ? "Envoi..." : "Envoyer"}</Button>
            </div>
          </form>
        ) : mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex gap-2">
              <button type="button" onClick={() => setLoginType("artist")} className={`flex-1 py-2 rounded text-sm ${loginType === "artist" ? "bg-[#1DB954]/20 border border-[#1DB954] text-[#1DB954]" : "bg-gray-800 text-gray-400"}`}>Artiste</button>
              <button type="button" onClick={() => setLoginType("agent")} className={`flex-1 py-2 rounded text-sm ${loginType === "agent" ? "bg-[#1DB954]/20 border border-[#1DB954] text-[#1DB954]" : "bg-gray-800 text-gray-400"}`}>Agent</button>
            </div>
            <div><Label className="text-gray-300">Email</Label><div className="relative mt-1"><Mail className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="email" value={formData.loginEmail} onChange={(e) => updateForm("loginEmail", e.target.value)} placeholder="votre@email.com" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            <div><Label className="text-gray-300">Mot de passe</Label><div className="relative mt-1"><Lock className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="password" value={formData.loginPassword} onChange={(e) => updateForm("loginPassword", e.target.value)} placeholder="••••••••" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="button" onClick={() => setShowForgotPassword(true)} className="text-[#1DB954] text-sm hover:underline">Mot de passe oublié ?</button>
            <Button type="submit" disabled={loading} className="w-full bg-[#1DB954] text-black font-bold py-3">{loading ? "Connexion..." : "Se connecter"}</Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div><Label className="text-gray-300">Nom de scène *</Label><div className="relative mt-1"><User className="absolute left-3 top-3 size-4 text-gray-400" /><Input value={formData.stageName} onChange={(e) => updateForm("stageName", e.target.value)} placeholder="Votre nom de scène" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            <div><Label className="text-gray-300">Email *</Label><div className="relative mt-1"><Mail className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="votre@email.com" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            <div><Label className="text-gray-300">Téléphone *</Label><div className="relative mt-1"><Phone className="absolute left-3 top-3 size-4 text-gray-400" /><Input value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+212 6XX XXX XXX" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            <div><Label className="text-gray-300">Catégorie *</Label><Select onValueChange={(v) => updateForm("category", v)}><SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white"><SelectValue placeholder="Choisissez votre catégorie" /></SelectTrigger><SelectContent className="bg-gray-800 border-gray-600">{categories.map(cat => (<SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700">{cat}</SelectItem>))}</SelectContent></Select></div>
            <div><Label className="text-gray-300">Mot de passe *</Label><div className="relative mt-1"><Lock className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="password" value={formData.password} onChange={(e) => updateForm("password", e.target.value)} placeholder="••••••••" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            <div><Label className="text-gray-300">Confirmer le mot de passe *</Label><div className="relative mt-1"><Lock className="absolute left-3 top-3 size-4 text-gray-400" /><Input type="password" value={formData.confirmPassword} onChange={(e) => updateForm("confirmPassword", e.target.value)} placeholder="••••••••" className="pl-10 bg-gray-800 border-gray-600 text-white" /></div></div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-[#1DB954] text-black font-bold py-3">{loading ? "Création..." : "Créer mon compte artiste"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
