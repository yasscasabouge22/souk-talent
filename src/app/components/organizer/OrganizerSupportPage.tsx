import { useState } from "react";
import {
  HelpCircle,
  Plus,
  MessageSquare,
  Calendar,
  Tag,
  Send,
  X,
  Paperclip,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  date: string;
  category: string;
  subject: string;
  status: "nouveau" | "en_cours" | "attente_reponse" | "resolu" | "ferme";
  conversationHistory: {
    id: string;
    sender: "user" | "support";
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export function OrganizerSupportPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  
  // Formulaire création ticket
  const [newCategory, setNewCategory] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDescription, setNewDescription] = useState("");
  
  // Réponse
  const [replyMessage, setReplyMessage] = useState("");

  // Données mock pour l'organisateur
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "T-2045",
      date: "2025-02-26T14:30:00",
      category: "Messagerie",
      subject: "Question sur les notifications",
      status: "en_cours",
      conversationHistory: [
        {
          id: "msg-1",
          sender: "user",
          senderName: "Vous",
          message: "Bonjour, est-ce que je reçois une notification quand un artiste répond à ma demande ?",
          timestamp: "2025-02-26T14:30:00",
        },
        {
          id: "msg-2",
          sender: "support",
          senderName: "Support Souk Talent",
          message: "Bonjour ! Oui, vous recevez une notification par email et sur la plateforme dès qu'un artiste répond à votre demande. Vous pouvez gérer vos préférences de notification dans les paramètres.",
          timestamp: "2025-02-26T14:45:00",
        },
      ],
    },
    {
      id: "T-2012",
      date: "2025-02-24T10:15:00",
      category: "Problème technique",
      subject: "Impossible de voir le calendrier d'un artiste",
      status: "resolu",
      conversationHistory: [
        {
          id: "msg-1",
          sender: "user",
          senderName: "Vous",
          message: "Le calendrier ne s'affiche pas quand je clique sur un profil artiste.",
          timestamp: "2025-02-24T10:15:00",
        },
        {
          id: "msg-2",
          sender: "support",
          senderName: "Support Souk Talent",
          message: "Merci pour votre signalement. Nous avons corrigé ce problème. Pouvez-vous réessayer maintenant ?",
          timestamp: "2025-02-24T11:00:00",
        },
        {
          id: "msg-3",
          sender: "user",
          senderName: "Vous",
          message: "C'est bon, ça fonctionne maintenant ! Merci.",
          timestamp: "2025-02-24T11:10:00",
        },
      ],
    },
  ]);

  const handleCreateTicket = () => {
    if (!newCategory || !newSubject.trim() || !newDescription.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newTicket: SupportTicket = {
      id: `T-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString(),
      category: newCategory,
      subject: newSubject,
      status: "nouveau",
      conversationHistory: [
        {
          id: "msg-1",
          sender: "user",
          senderName: "Vous",
          message: newDescription,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setIsCreateModalOpen(false);
    setNewCategory("");
    setNewSubject("");
    setNewDescription("");
    toast.success("Votre demande a été envoyée. Notre équipe vous répondra rapidement.");
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage("");
    setIsDetailOpen(true);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicket) {
      toast.error("Veuillez saisir un message");
      return;
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "user" as const,
      senderName: "Vous",
      message: replyMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedTicket = {
      ...selectedTicket,
      conversationHistory: [...selectedTicket.conversationHistory, newMessage],
    };

    setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setReplyMessage("");
    toast.success("Message envoyé");
  };

  const getStatusConfig = (status: SupportTicket["status"]) => {
    const configs = {
      nouveau: { label: "Nouveau", className: "bg-yellow-500 text-white border-yellow-500" },
      en_cours: { label: "En cours", className: "bg-blue-500 text-white border-blue-500" },
      attente_reponse: { label: "En attente de votre réponse", className: "bg-orange-500 text-white border-orange-500" },
      resolu: { label: "Résolu", className: "bg-green-500 text-white border-green-500" },
      ferme: { label: "Fermé", className: "bg-gray-500 text-white border-gray-500" },
    };
    return configs[status];
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Aide & Support</h1>
        <p className="text-gray-400 text-lg">
          Une question ou un problème ? Notre équipe vous accompagne.
        </p>
      </div>

      {/* Bouton principal */}
      <Button
        onClick={() => setIsCreateModalOpen(true)}
        className="w-full md:w-auto bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold h-12 px-8 rounded-lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        Ouvrir un ticket
      </Button>

      {/* Liste des tickets */}
      <Card className="bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-xl">Mes demandes</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="size-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                Vous n'avez encore soumis aucune demande.
              </h3>
              <p className="text-gray-500 text-sm">
                Cliquez sur "Ouvrir un ticket" pour contacter notre équipe.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => {
                const statusConfig = getStatusConfig(ticket.status);
                return (
                  <div
                    key={ticket.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {formatDate(ticket.date)}
                          </span>
                          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                            {ticket.category}
                          </Badge>
                        </div>
                        <h3 className="text-white font-medium">{ticket.subject}</h3>
                        <p className="text-sm text-gray-400">Ticket #{ticket.id}</p>
                      </div>
                      <Button
                        onClick={() => handleViewTicket(ticket)}
                        variant="outline"
                        size="sm"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white"
                      >
                        Voir
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal création ticket */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-[#282828] border-gray-700 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Ouvrir un ticket</DialogTitle>
            <DialogDescription className="text-gray-400">
              Décrivez votre problème ou votre question. Notre équipe vous répondra rapidement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Catégorie <span className="text-red-400">*</span>
              </Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger id="category" className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="Problème technique">Problème technique</SelectItem>
                  <SelectItem value="Problème booking">Problème booking</SelectItem>
                  <SelectItem value="Messagerie">Messagerie</SelectItem>
                  <SelectItem value="Profil organisateur">Profil organisateur</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                Sujet <span className="text-red-400">*</span>
              </Label>
              <Input
                id="subject"
                placeholder="Résumez votre demande en quelques mots"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre problème ou votre question en détail..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={5}
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachment" className="text-white">
                Pièce jointe <span className="text-gray-400">(optionnel)</span>
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white w-full"
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Joindre un fichier
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
            >
              Annuler
            </Button>
            <Button
              onClick={handleCreateTicket}
              className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold"
              disabled={!newCategory || !newSubject.trim() || !newDescription.trim()}
            >
              Envoyer la demande
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sheet détail ticket */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto bg-[#191414] border-gray-800 text-white">
          {selectedTicket && (
            <>
              <SheetHeader className="pb-4">
                <SheetTitle className="text-2xl text-white">{selectedTicket.subject}</SheetTitle>
                <SheetDescription className="text-gray-400">
                  Ticket #{selectedTicket.id} • Créé le {formatDateTime(selectedTicket.date)}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 pb-6">
                {/* Informations ticket */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 space-y-3">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Informations
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Label className="text-gray-400">Statut</Label>
                      <div className="mt-1">
                        <Badge variant="outline" className={getStatusConfig(selectedTicket.status).className}>
                          {getStatusConfig(selectedTicket.status).label}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-400">Catégorie</Label>
                      <p className="text-white mt-1">{selectedTicket.category}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-400">Date de création</Label>
                      <p className="text-white mt-1">{formatDateTime(selectedTicket.date)}</p>
                    </div>
                  </div>
                </div>

                {/* Historique conversation */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Conversation
                  </h3>
                  <div className="space-y-3">
                    {selectedTicket.conversationHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-lg p-4 ${
                          msg.sender === "user"
                            ? "bg-gray-900 border border-gray-800"
                            : "bg-[#1DB954]/10 border border-[#1DB954]/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-white">{msg.senderName}</span>
                            {msg.sender === "support" && (
                              <Badge className="bg-[#1DB954] text-black text-xs">Support</Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDateTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Zone de réponse */}
                <div className="space-y-3">
                  <Label htmlFor="reply" className="text-white">
                    Votre réponse
                  </Label>
                  <Textarea
                    id="reply"
                    placeholder="Écrivez votre message..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    className="resize-none bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleSendReply}
                    className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold"
                    disabled={!replyMessage.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
