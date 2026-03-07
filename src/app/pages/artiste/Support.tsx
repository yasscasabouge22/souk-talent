import { useState } from "react";
import {
  Plus,
  Search,
  X,
  Send,
  User,
  Calendar,
  Tag,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Paperclip,
  HelpCircle,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { mockArtisteSupportTickets, ArtisteSupportTicket } from "../../data/artisteSupportData";
import { toast } from "sonner";

export function ArtisteSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ArtisteSupportTicket | null>(null);

  // État formulaire nouveau ticket
  const [newTicketCategory, setNewTicketCategory] = useState("");
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");

  // État réponse
  const [replyMessage, setReplyMessage] = useState("");

  // Filtrer les tickets
  const filteredTickets = mockArtisteSupportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewTicket = (ticket: ArtisteSupportTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage("");
    setIsDetailDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const handleCreateTicket = () => {
    if (!newTicketCategory || !newTicketSubject.trim() || !newTicketMessage.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Votre demande a été envoyée. Notre équipe vous répondra bientôt.");
    setIsCreateDialogOpen(false);
    // Réinitialiser le formulaire
    setNewTicketCategory("");
    setNewTicketSubject("");
    setNewTicketMessage("");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Veuillez saisir un message");
      return;
    }
    toast.success("Votre réponse a été envoyée");
    setReplyMessage("");
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      nouveau: { label: "Nouveau", className: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      en_cours: { label: "En cours", className: "bg-blue-100 text-blue-700 border-blue-300" },
      attente_reponse: {
        label: "En attente de votre réponse",
        className: "bg-orange-100 text-orange-700 border-orange-300",
      },
      resolu: { label: "Résolu", className: "bg-green-100 text-green-700 border-green-300" },
      ferme: { label: "Fermé", className: "bg-gray-100 text-gray-500 border-gray-200" },
    };
    return configs[status] || configs.nouveau;
  };

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, string> = {
      technique: "Problème technique",
      compte: "Compte",
      reservation: "Problème booking",
      messagerie: "Messagerie",
      profil: "Profil",
      autre: "Autre",
    };
    return configs[category] || category;
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

  const isFormValid = newTicketCategory && newTicketSubject.trim() && newTicketMessage.trim();

  return (
    <div className="min-h-screen bg-[#191414] text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-[#282828] rounded-xl p-6 border border-[#1DB954]/20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Support</h1>
                <p className="text-gray-400 mt-1">
                  Besoin d'aide ? Notre équipe vous répond rapidement.
                </p>
              </div>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ouvrir un ticket
              </Button>
            </div>
          </div>

          {/* Filtres */}
          <Card className="bg-[#282828] border-[#1DB954]/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-[#191414] border-[#1DB954]/20 text-white">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#282828] border-[#1DB954]/20">
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="en_cours">En cours</SelectItem>
                    <SelectItem value="attente_reponse">En attente de votre réponse</SelectItem>
                    <SelectItem value="resolu">Résolu</SelectItem>
                    <SelectItem value="ferme">Fermé</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-[#191414] border-[#1DB954]/20 text-white">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#282828] border-[#1DB954]/20">
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="technique">Problème technique</SelectItem>
                    <SelectItem value="compte">Compte</SelectItem>
                    <SelectItem value="reservation">Problème booking</SelectItem>
                    <SelectItem value="messagerie">Messagerie</SelectItem>
                    <SelectItem value="profil">Profil</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-[#191414] border-[#1DB954]/20 text-white"
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="bg-[#191414] border-[#1DB954]/20 text-white hover:bg-[#282828]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des tickets */}
          <Card className="bg-[#282828] border-[#1DB954]/20">
            <CardHeader>
              <CardTitle className="text-white">Mes tickets ({filteredTickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">
                    Vous n'avez aucun ticket pour le moment.
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="mt-4 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Créer mon premier ticket
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-[#1DB954]/20 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#191414] border-[#1DB954]/20 hover:bg-[#191414]">
                        <TableHead className="font-semibold text-gray-300">ID</TableHead>
                        <TableHead className="font-semibold text-gray-300">Date</TableHead>
                        <TableHead className="font-semibold text-gray-300">Sujet</TableHead>
                        <TableHead className="font-semibold text-gray-300">Catégorie</TableHead>
                        <TableHead className="font-semibold text-gray-300">Statut</TableHead>
                        <TableHead className="font-semibold text-gray-300 text-right">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => {
                        const statusConfig = getStatusConfig(ticket.status);

                        return (
                          <TableRow
                            key={ticket.id}
                            className="border-[#1DB954]/20 hover:bg-[#191414]/50"
                          >
                            <TableCell className="font-mono text-sm font-medium text-white">
                              {ticket.id}
                            </TableCell>
                            <TableCell className="text-sm text-gray-400">
                              {formatDate(ticket.date)}
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <span className="text-sm text-white line-clamp-2">
                                {ticket.subject}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-300">
                                {getCategoryConfig(ticket.category)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={statusConfig.className}>
                                {statusConfig.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewTicket(ticket)}
                                className="bg-[#191414] border-[#1DB954]/20 text-white hover:bg-[#1DB954] hover:text-black"
                              >
                                Voir
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modal Créer un ticket */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="bg-[#282828] border-[#1DB954]/20 text-white sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Ouvrir un ticket</DialogTitle>
              <DialogDescription className="text-gray-400">
                Décrivez votre problème et notre équipe vous répondra rapidement.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Catégorie <span className="text-red-500">*</span>
                </Label>
                <Select value={newTicketCategory} onValueChange={setNewTicketCategory}>
                  <SelectTrigger
                    id="category"
                    className="bg-[#191414] border-[#1DB954]/20 text-white"
                  >
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#282828] border-[#1DB954]/20">
                    <SelectItem value="technique">Problème technique</SelectItem>
                    <SelectItem value="reservation">Problème booking</SelectItem>
                    <SelectItem value="messagerie">Messagerie</SelectItem>
                    <SelectItem value="profil">Profil</SelectItem>
                    <SelectItem value="compte">Compte</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">
                  Sujet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="Résumez votre problème en quelques mots"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="bg-[#191414] border-[#1DB954]/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre problème en détail..."
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  rows={6}
                  className="resize-none bg-[#191414] border-[#1DB954]/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment" className="text-white">
                  Pièce jointe (optionnel)
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="bg-[#191414] border-[#1DB954]/20 text-white hover:bg-[#282828]"
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Joindre un fichier
                  </Button>
                  <span className="text-sm text-gray-400">PNG, JPG ou PDF (max 5 Mo)</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="bg-[#191414] border-[#1DB954]/20 text-white hover:bg-[#282828]"
              >
                Annuler
              </Button>
              <Button
                onClick={handleCreateTicket}
                disabled={!isFormValid}
                className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Envoyer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Drawer Détail ticket */}
        <Sheet open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen}>
          <SheetContent className="bg-[#282828] border-l border-[#1DB954]/20 text-white sm:max-w-2xl overflow-y-auto">
            {selectedTicket && (
              <>
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-2xl text-white">Détail du ticket</SheetTitle>
                  <SheetDescription className="text-gray-400">
                    Ticket {selectedTicket.id} • Créé le {formatDateTime(selectedTicket.date)}
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 pb-6">
                  {/* Informations ticket */}
                  <div className="bg-[#191414] rounded-lg p-4 space-y-3 border border-[#1DB954]/20">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Informations
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <Label className="text-gray-400">Sujet</Label>
                        <p className="font-medium text-white">{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Statut</Label>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className={getStatusConfig(selectedTicket.status).className}
                          >
                            {getStatusConfig(selectedTicket.status).label}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400">Catégorie</Label>
                        <p className="text-white">{getCategoryConfig(selectedTicket.category)}</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Date création</Label>
                        <p className="text-white">{formatDateTime(selectedTicket.date)}</p>
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
                            msg.sender === "artiste"
                              ? "bg-[#191414] border border-[#1DB954]/20"
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
                            <span className="text-xs text-gray-400">
                              {formatDateTime(msg.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-200 leading-relaxed">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-[#1DB954]/20" />

                  {/* Répondre */}
                  {selectedTicket.status !== "ferme" && selectedTicket.status !== "resolu" && (
                    <div className="space-y-2">
                      <Label htmlFor="reply" className="text-white">
                        Votre réponse
                      </Label>
                      <Textarea
                        id="reply"
                        placeholder="Tapez votre message ici..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        rows={4}
                        className="resize-none bg-[#191414] border-[#1DB954]/20 text-white"
                      />
                      <Button
                        onClick={handleSendReply}
                        className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer
                      </Button>
                    </div>
                  )}

                  {selectedTicket.status === "resolu" && (
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-400">Ticket résolu</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Ce ticket a été marqué comme résolu. Si vous avez besoin d'aide
                          supplémentaire, n'hésitez pas à ouvrir un nouveau ticket.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedTicket.status === "ferme" && (
                    <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-400">Ticket fermé</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Ce ticket a été fermé. Pour toute nouvelle demande, veuillez ouvrir un
                          nouveau ticket.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}