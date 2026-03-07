import { useState } from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Inbox,
  Search,
  X,
  Send,
  User,
  Mail,
  Calendar,
  Tag,
  AlertTriangle,
  FileText,
  MessageSquare,
  StickyNote,
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { mockSupportTickets, mockSupportStats, SupportTicket } from "../../data/adminSupportData";
import { toast } from "sonner";

export function AdminSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [period, setPeriod] = useState("30j");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentPriority, setCurrentPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [internalNote, setInternalNote] = useState("");

  // Filtrer les tickets
  const filteredTickets = mockSupportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesUserType = userTypeFilter === "all" || ticket.userType === userTypeFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesUserType && matchesCategory;
  });

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setCurrentStatus(ticket.status);
    setCurrentPriority(ticket.priority);
    setAssignedTo(ticket.assignedTo);
    setReplyMessage("");
    setInternalNote("");
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setUserTypeFilter("all");
    setCategoryFilter("all");
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Veuillez saisir un message");
      return;
    }
    toast.success("Réponse envoyée à l'utilisateur");
    setReplyMessage("");
  };

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    toast.success(`Statut mis à jour : ${getStatusConfig(newStatus).label}`);
  };

  const handleUpdatePriority = (newPriority: string) => {
    setCurrentPriority(newPriority);
    toast.success(`Priorité mise à jour : ${getPriorityConfig(newPriority).label}`);
  };

  const handleAssign = () => {
    toast.success(`Ticket assigné à ${assignedTo}`);
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) {
      toast.error("Veuillez saisir une note");
      return;
    }
    toast.success("Note interne enregistrée");
    setInternalNote("");
  };

  const handleCloseTicket = () => {
    handleUpdateStatus("ferme");
    setIsDrawerOpen(false);
    toast.success("Ticket clôturé");
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      nouveau: { label: "Nouveau", className: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      en_cours: { label: "En cours", className: "bg-blue-100 text-blue-700 border-blue-300" },
      attente_utilisateur: {
        label: "En attente utilisateur",
        className: "bg-gray-100 text-gray-700 border-gray-300",
      },
      resolu: { label: "Résolu", className: "bg-green-100 text-green-700 border-green-300" },
      ferme: { label: "Fermé", className: "bg-gray-100 text-gray-500 border-gray-200" },
    };
    return configs[status] || configs.nouveau;
  };

  const getPriorityConfig = (priority: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      faible: { label: "Faible", className: "bg-gray-100 text-gray-700 border-gray-300" },
      normale: { label: "Normale", className: "bg-blue-100 text-blue-700 border-blue-300" },
      elevee: { label: "Élevée", className: "bg-orange-100 text-orange-700 border-orange-300" },
      urgente: { label: "Urgente", className: "bg-red-100 text-red-700 border-red-300" },
    };
    return configs[priority] || configs.normale;
  };

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, string> = {
      technique: "Technique",
      compte: "Compte",
      reservation: "Réservation",
      paiement: "Paiement",
      autre: "Autre",
    };
    return configs[category] || category;
  };

  const getUserTypeBadge = (userType: string) => {
    if (userType === "artiste") {
      return <Badge className="bg-purple-100 text-purple-700 border-purple-300">Artiste</Badge>;
    }
    return <Badge className="bg-teal-100 text-teal-700 border-teal-300">Organisateur</Badge>;
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

  // Stats ajustées selon la période
  const getStatsForPeriod = () => {
    const base = mockSupportStats;
    if (period === "7j") {
      return {
        openTickets: Math.round(base.openTickets * 0.3),
        urgentTickets: Math.max(0, base.urgentTickets - 1),
        avgResponseTime: "1h 45min",
        resolvedLast30Days: Math.round(base.resolvedLast30Days * 0.25),
        variations: base.variations,
      };
    } else if (period === "90j") {
      return {
        openTickets: Math.round(base.openTickets * 2.5),
        urgentTickets: Math.round(base.urgentTickets * 2),
        avgResponseTime: "2h 50min",
        resolvedLast30Days: Math.round(base.resolvedLast30Days * 3),
        variations: base.variations,
      };
    }
    return base;
  };

  const stats = getStatsForPeriod();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support</h1>
            <p className="text-gray-600 mt-1">Gestion des demandes utilisateurs</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#1DB954] text-white border-[#1DB954] text-base px-4 py-1.5">
              {stats.openTickets} tickets ouverts
            </Badge>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7j">7 derniers jours</SelectItem>
                <SelectItem value="30j">30 derniers jours</SelectItem>
                <SelectItem value="90j">90 derniers jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tickets ouverts</CardTitle>
            <Inbox className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.openTickets}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span className={stats.variations.openTickets < 0 ? "text-green-600" : "text-red-600"}>
                {stats.variations.openTickets > 0 ? "+" : ""}
                {stats.variations.openTickets}%
              </span>{" "}
              vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tickets urgents</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.urgentTickets}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span
                className={stats.variations.urgentTickets < 0 ? "text-green-600" : "text-red-600"}
              >
                {stats.variations.urgentTickets > 0 ? "+" : ""}
                {stats.variations.urgentTickets}%
              </span>{" "}
              vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Temps moyen de réponse
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span
                className={stats.variations.avgResponseTime < 0 ? "text-green-600" : "text-red-600"}
              >
                {stats.variations.avgResponseTime > 0 ? "+" : ""}
                {stats.variations.avgResponseTime}%
              </span>{" "}
              vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tickets résolus (30 jours)
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.resolvedLast30Days}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span
                className={
                  stats.variations.resolvedLast30Days > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {stats.variations.resolvedLast30Days > 0 ? "+" : ""}
                {stats.variations.resolvedLast30Days}%
              </span>{" "}
              vs période précédente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="nouveau">Nouveau</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="attente_utilisateur">En attente utilisateur</SelectItem>
                <SelectItem value="resolu">Résolu</SelectItem>
                <SelectItem value="ferme">Fermé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="elevee">Élevée</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
                <SelectItem value="faible">Faible</SelectItem>
              </SelectContent>
            </Select>

            <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type utilisateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="artiste">Artiste</SelectItem>
                <SelectItem value="organisateur">Organisateur</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="technique">Technique</SelectItem>
                <SelectItem value="compte">Compte</SelectItem>
                <SelectItem value="reservation">Réservation</SelectItem>
                <SelectItem value="paiement">Paiement</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Nom, email, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Button variant="outline" onClick={handleResetFilters} className="whitespace-nowrap">
              <X className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des tickets */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Tickets de support ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Utilisateur</TableHead>
                  <TableHead className="font-semibold">Sujet</TableHead>
                  <TableHead className="font-semibold">Catégorie</TableHead>
                  <TableHead className="font-semibold">Priorité</TableHead>
                  <TableHead className="font-semibold">Statut</TableHead>
                  <TableHead className="font-semibold">Assigné à</TableHead>
                  <TableHead className="font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      Aucun ticket trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => {
                    const statusConfig = getStatusConfig(ticket.status);
                    const priorityConfig = getPriorityConfig(ticket.priority);

                    return (
                      <TableRow key={ticket.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm font-medium text-gray-900">
                          {ticket.id}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(ticket.date)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-gray-900">{ticket.userName}</span>
                            {getUserTypeBadge(ticket.userType)}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span className="text-sm text-gray-900 line-clamp-2">
                            {ticket.subject}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">
                            {getCategoryConfig(ticket.category)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={priorityConfig.className}>
                            {priorityConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {ticket.assignedTo}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Drawer de détail */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedTicket && (
            <>
              <SheetHeader className="pb-4">
                <SheetTitle className="text-2xl">Détail du ticket</SheetTitle>
                <SheetDescription>
                  Ticket {selectedTicket.id} • Créé le {formatDateTime(selectedTicket.date)}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 pb-6">
                {/* Informations ticket */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Informations du ticket
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Label className="text-gray-600">ID</Label>
                      <p className="font-mono font-medium text-gray-900">
                        {selectedTicket.id}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Type de compte</Label>
                      <div className="mt-1">{getUserTypeBadge(selectedTicket.userType)}</div>
                    </div>
                    <div>
                      <Label className="text-gray-600">Nom utilisateur</Label>
                      <p className="font-medium text-gray-900">{selectedTicket.userName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Email</Label>
                      <p className="text-gray-900">{selectedTicket.userEmail}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Catégorie</Label>
                      <p className="text-gray-900">
                        {getCategoryConfig(selectedTicket.category)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Date création</Label>
                      <p className="text-gray-900">{formatDateTime(selectedTicket.date)}</p>
                    </div>
                  </div>
                </div>

                {/* Message utilisateur */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message de l'utilisateur
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-lg font-semibold text-gray-900 mb-3">
                      {selectedTicket.subject}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{selectedTicket.message}</p>
                    {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Label className="text-sm text-gray-600">Pièces jointes</Label>
                        <div className="mt-2 space-y-2">
                          {selectedTicket.attachments.map((attachment, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-blue-600 hover:underline cursor-pointer"
                            >
                              {attachment}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Historique conversation */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Historique de la conversation
                  </h3>
                  <div className="space-y-3">
                    {selectedTicket.conversationHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-lg p-4 ${
                          msg.sender === "user"
                            ? "bg-gray-50 border border-gray-200"
                            : "bg-[#1DB954]/10 border border-[#1DB954]/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900">{msg.senderName}</span>
                            {msg.sender === "admin" && (
                              <Badge className="bg-[#1DB954] text-white text-xs">Admin</Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDateTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes internes */}
                {selectedTicket.internalNotes && selectedTicket.internalNotes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <StickyNote className="h-4 w-4" />
                      Notes internes (privées)
                    </h3>
                    <div className="space-y-2">
                      {selectedTicket.internalNotes.map((note) => (
                        <div
                          key={note.id}
                          className="bg-amber-50 border border-amber-200 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {note.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDateTime(note.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{note.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Actions admin */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900 text-lg">Actions administrateur</h3>

                  {/* Répondre */}
                  <div className="space-y-2">
                    <Label htmlFor="reply">Répondre à l'utilisateur</Label>
                    <Textarea
                      id="reply"
                      placeholder="Tapez votre réponse ici..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <Button onClick={handleSendReply} className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer la réponse
                    </Button>
                  </div>

                  <Separator />

                  {/* Modifier statut et priorité */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Changer le statut</Label>
                      <Select value={currentStatus} onValueChange={handleUpdateStatus}>
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nouveau">Nouveau</SelectItem>
                          <SelectItem value="en_cours">En cours</SelectItem>
                          <SelectItem value="attente_utilisateur">
                            En attente utilisateur
                          </SelectItem>
                          <SelectItem value="resolu">Résolu</SelectItem>
                          <SelectItem value="ferme">Fermé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Modifier la priorité</Label>
                      <Select value={currentPriority} onValueChange={handleUpdatePriority}>
                        <SelectTrigger id="priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="faible">Faible</SelectItem>
                          <SelectItem value="normale">Normale</SelectItem>
                          <SelectItem value="elevee">Élevée</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Assigner */}
                  <div className="space-y-2">
                    <Label htmlFor="assign">Assigner à un admin</Label>
                    <div className="flex gap-2">
                      <Select value={assignedTo} onValueChange={setAssignedTo}>
                        <SelectTrigger id="assign">
                          <SelectValue placeholder="Sélectionner un admin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="-">Non assigné</SelectItem>
                          <SelectItem value="Sarah Admin">Sarah Admin</SelectItem>
                          <SelectItem value="Youssef Admin">Youssef Admin</SelectItem>
                          <SelectItem value="Karim Admin">Karim Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleAssign} variant="outline">
                        Assigner
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Note interne */}
                  <div className="space-y-2">
                    <Label htmlFor="note">Ajouter une note interne (privée)</Label>
                    <Textarea
                      id="note"
                      placeholder="Note visible uniquement par l'équipe admin..."
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                    <Button onClick={handleAddNote} variant="outline" className="w-full">
                      <StickyNote className="h-4 w-4 mr-2" />
                      Enregistrer la note
                    </Button>
                  </div>

                  <Separator />

                  {/* Clôturer */}
                  <Button
                    onClick={handleCloseTicket}
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-100"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Clôturer le ticket
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
