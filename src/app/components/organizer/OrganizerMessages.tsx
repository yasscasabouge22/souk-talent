import { useState, useEffect } from "react";
import { MessageSquare, Calendar, MapPin, Music, Search, UserCircle, CheckCircle, Archive, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { OrganizerMessagingSystem } from "./OrganizerMessagingSystem";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface BookingRequest {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  category: string;
  eventType?: string;
  city: string;
  location?: string;
  requestedDate: string;
  requestedTime: string;
  proposedBudget?: string;
  message?: string;
  formula?: string;
  lastMessage: string;
  lastMessageDate: string;
  status: "pending" | "accepted" | "rejected" | "confirmed" | "archived";
  hasUnreadMessages: boolean;
}

export function OrganizerMessages() {
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "accepted" | "rejected" | "confirmed" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archiveConfirmChecked, setArchiveConfirmChecked] = useState(false);
  const [requestToConfirm, setRequestToConfirm] = useState<BookingRequest | null>(null);
  const [requestToArchive, setRequestToArchive] = useState<BookingRequest | null>(null);
  const [confirmDetails, setConfirmDetails] = useState({
    date: "",
    time: "",
    location: "",
    duration: "",
    notes: "",
  });

  // Mock data
  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: "1",
      artistId: "artist-1",
      artistName: "DJ Khalid",
      artistAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
      category: "DJ",
      city: "Casablanca",
      requestedDate: "2026-06-24",
      requestedTime: "20:00 - 02:00",
      lastMessage: "Merci pour votre demande ! Je suis disponible pour cette date. Mon tarif est de 15000 DH pour la soirée complète.",
      lastMessageDate: "2026-02-14T15:30:00",
      status: "accepted",
      hasUnreadMessages: true,
    },
    {
      id: "2",
      artistId: "artist-2",
      artistName: "Groupe Chaabi Fassi",
      artistAvatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      category: "Musique traditionnelle",
      city: "Fès",
      requestedDate: "2026-07-15",
      requestedTime: "19:00 - 23:00",
      lastMessage: "Bonjour, je souhaiterais discuter des détails de votre événement avant de confirmer.",
      lastMessageDate: "2026-02-13T10:20:00",
      status: "pending",
      hasUnreadMessages: true,
    },
    {
      id: "3",
      artistId: "artist-3",
      artistName: "DJ Sarah",
      artistAvatar: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b1?w=400",
      category: "DJ",
      city: "Marrakech",
      requestedDate: "2026-08-20",
      requestedTime: "21:00 - 03:00",
      lastMessage: "Désolée, je ne suis pas disponible pour cette date. Je vous souhaite un excellent événement !",
      lastMessageDate: "2026-02-12T14:15:00",
      status: "rejected",
      hasUnreadMessages: false,
    },
    {
      id: "4",
      artistId: "artist-4",
      artistName: "Orchestre Andalou",
      artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      category: "Orchestre",
      city: "Rabat",
      requestedDate: "2026-09-10",
      requestedTime: "18:00 - 22:00",
      lastMessage: "Je viens de voir votre message, je vous réponds dans quelques minutes.",
      lastMessageDate: "2026-02-11T09:45:00",
      status: "pending",
      hasUnreadMessages: false,
    },
    {
      id: "5",
      artistId: "artist-5",
      artistName: "DJ Amine",
      artistAvatar: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400",
      category: "DJ",
      city: "Casablanca",
      requestedDate: "2026-10-05",
      requestedTime: "20:00 - 01:00",
      lastMessage: "Parfait ! J'ai bien reçu la confirmation. À bientôt !",
      lastMessageDate: "2026-02-10T16:30:00",
      status: "confirmed",
      hasUnreadMessages: false,
    },
    {
      id: "6",
      artistId: "artist-6",
      artistName: "Orchestre Andalou Fès",
      artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      category: "Orchestre",
      city: "Fès",
      requestedDate: "2026-11-20",
      requestedTime: "19:00 - 23:00",
      lastMessage: "Tout est confirmé pour votre événement !",
      lastMessageDate: "2026-02-09T12:00:00",
      status: "confirmed",
      hasUnreadMessages: false,
    },
  ]);

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === "all" || req.status === activeFilter;
    const matchesSearch = 
      req.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    confirmed: requests.filter((r) => r.status === "confirmed").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    archived: requests.filter((r) => r.status === "archived").length,
  };

  const getStatusBadge = (status: BookingRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-black border-yellow-600 font-medium">
            En attente
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-[#1DB954] text-black border-[#1ED760] font-medium">
            Acceptée
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="bg-[#1DB954] text-black border-[#1ED760] font-medium">
            Confirmée
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 text-white border-red-600 font-medium">
            Refusée
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-gray-500 text-white border-gray-600 font-medium">
            Archivée
          </Badge>
        );
    }
  };

  const handleContactArtist = (request: BookingRequest) => {
    setSelectedRequest(request);
    setShowMessaging(true);
  };

  const handleBackToList = () => {
    setShowMessaging(false);
    setSelectedRequest(null);
  };

  const handleStatusUpdate = (requestId: string, newStatus: BookingRequest["status"]) => {
    setRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: newStatus } : req)
    );
  };

  const handleConfirmRequest = (request: BookingRequest) => {
    setRequestToConfirm(request);
    setShowConfirmModal(true);
  };

  const handleArchiveRequest = (request: BookingRequest) => {
    setRequestToArchive(request);
    setArchiveConfirmChecked(false);
    setShowArchiveModal(true);
  };

  const handleConfirmDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfirmDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmSubmit = () => {
    if (requestToConfirm) {
      handleStatusUpdate(requestToConfirm.id, "confirmed");
      toast.success(`La demande de ${requestToConfirm.artistName} a été confirmée.`);
      setShowConfirmModal(false);
    }
  };

  const handleArchiveSubmit = () => {
    if (requestToArchive) {
      handleStatusUpdate(requestToArchive.id, "archived");
      toast.success(`La demande de ${requestToArchive.artistName} a été archivée.`);
      setShowArchiveModal(false);
    }
  };

  if (showMessaging && selectedRequest) {
    return (
      <OrganizerMessagingSystem
        request={selectedRequest}
        onBack={handleBackToList}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#191414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard & Messages</h1>
          <p className="text-gray-400">Gérez vos demandes et conversations avec les artistes</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par artiste, catégorie ou ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-[#282828] border-gray-700 rounded-xl text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === "all"
                ? "bg-[#1DB954] text-black shadow-md"
                : "bg-[#282828] text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Total ({counts.all})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === "pending"
                ? "bg-[#1DB954] text-black shadow-md"
                : "bg-[#282828] text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            En attente ({counts.pending})
          </button>
          <button
            onClick={() => setActiveFilter("accepted")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === "accepted"
                ? "bg-[#1DB954] text-black shadow-md"
                : "bg-[#282828] text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Acceptées ({counts.accepted})
          </button>
          <button
            onClick={() => setActiveFilter("confirmed")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === "confirmed"
                ? "bg-[#1DB954] text-black shadow-md"
                : "bg-[#282828] text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Confirmées ({counts.confirmed})
          </button>
          <button
            onClick={() => setActiveFilter("rejected")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === "rejected"
                ? "bg-[#1DB954] text-black shadow-md"
                : "bg-[#282828] text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Refusées ({counts.rejected})
          </button>
          <button
            onClick={() => setActiveFilter("archived")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeFilter === "archived"
                ? "bg-[#1DB954] text-black shadow-md"
                : "bg-[#282828] text-gray-300 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Archivées ({counts.archived})
          </button>
        </div>

        {/* Requests List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card
                key={request.id}
                className={`bg-[#282828] border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  request.status === "accepted" || request.status === "confirmed"
                    ? "border-[#1DB954]/50"
                    : request.status === "rejected"
                    ? "border-gray-700 opacity-75"
                    : "border-gray-700"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={request.artistAvatar}
                        alt={request.artistName}
                        className="size-16 rounded-full object-cover border-2 border-gray-700"
                      />
                      {request.hasUnreadMessages && (
                        <div className="absolute -top-1 -right-1 size-4 bg-[#1DB954] border-2 border-[#191414] rounded-full"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {request.artistName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Music className="size-4" />
                              {request.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="size-4" />
                              {request.city}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="mb-3 p-3 bg-[#191414] rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                          <Calendar className="size-4 text-gray-400" />
                          <span className="font-medium">
                            {format(new Date(request.requestedDate), "dd MMMM yyyy", { locale: fr })}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span>{request.requestedTime}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {request.lastMessage}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {format(new Date(request.lastMessageDate), "dd MMM yyyy à HH:mm", {
                            locale: fr,
                          })}
                        </span>
                        <div className="flex items-center gap-3">
                          {request.status === "accepted" && (
                            <Button
                              onClick={() => handleConfirmRequest(request)}
                              variant="outline"
                              className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black rounded-lg px-6 font-medium"
                            >
                              <CheckCircle className="size-4 mr-2" />
                              Confirmer les détails
                            </Button>
                          )}
                          {request.status !== "archived" && (
                            <Button
                              onClick={() => handleArchiveRequest(request)}
                              variant="outline"
                              className="border-gray-700 text-gray-300 hover:bg-[#191414] rounded-lg px-6 font-medium"
                            >
                              <Archive className="size-4 mr-2" />
                              Archiver
                            </Button>
                          )}
                          <Button
                            onClick={() => handleContactArtist(request)}
                            className="bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-lg px-6 font-medium"
                          >
                            <MessageSquare className="size-4 mr-2" />
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-[#282828] border-2 border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="size-20 bg-[#191414] rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                  <MessageSquare className="size-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {activeFilter === "all" && "Aucune demande"}
                  {activeFilter === "pending" && "Aucune demande en attente"}
                  {activeFilter === "accepted" && "Aucune demande acceptée pour le moment"}
                  {activeFilter === "confirmed" && "Aucune demande confirmée pour le moment"}
                  {activeFilter === "rejected" && "Aucune demande refusée"}
                  {activeFilter === "archived" && "Aucune demande archivée"}
                </h3>
                <p className="text-gray-400 mb-6">
                  Commencez par rechercher et contacter des artistes pour vos événements
                </p>
                <Button className="bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-lg px-8 font-medium">
                  <UserCircle className="size-4 mr-2" />
                  Rechercher un artiste
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de confirmation */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-2xl bg-[#282828] border-gray-700 text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Confirmer l'accord
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Renseignez les détails finaux de votre événement avec {requestToConfirm?.artistName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white font-medium">
                Date de l'événement *
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={requestToConfirm?.requestedDate || ""}
                disabled
                className="bg-[#191414] border-gray-700 text-gray-400 rounded-xl cursor-not-allowed opacity-75"
              />
              <p className="text-xs text-gray-500">Cette date a été confirmée par l'artiste</p>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-white font-medium">
                Horaires *
              </Label>
              <Input
                id="time"
                name="time"
                type="text"
                value={requestToConfirm?.requestedTime || ""}
                disabled
                className="bg-[#191414] border-gray-700 text-gray-400 rounded-xl cursor-not-allowed opacity-75"
              />
              <p className="text-xs text-gray-500">Ces horaires ont été confirmés par l'artiste</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white font-medium">
                Lieu *
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Ex: Hôtel Hyatt Regency, Casablanca"
                value={confirmDetails.location}
                onChange={handleConfirmDetailsChange}
                className="bg-[#191414] border-gray-700 text-white rounded-xl"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-white font-medium">
                Durée *
              </Label>
              <Input
                id="duration"
                name="duration"
                type="text"
                placeholder="Ex: 6 heures"
                value={confirmDetails.duration}
                onChange={handleConfirmDetailsChange}
                className="bg-[#191414] border-gray-700 text-white rounded-xl"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white font-medium">
                Notes complémentaires
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Instructions spéciales, équipements requis, etc."
                value={confirmDetails.notes}
                onChange={handleConfirmDetailsChange}
                className="bg-[#191414] border-gray-700 text-white rounded-xl min-h-[100px]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-[#191414] rounded-xl h-12"
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirmSubmit}
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-xl h-12 font-medium"
              >
                Confirmer l'accord
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal d'archivage */}
      <Dialog open={showArchiveModal} onOpenChange={setShowArchiveModal}>
        <DialogContent className="max-w-2xl bg-[#282828] border-gray-700 text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="size-7 text-orange-500" />
              Archiver la demande
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Cette action déplacera la demande vers vos archives
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Warning Box */}
            <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-xl p-6">
              <div className="flex gap-4">
                <AlertTriangle className="size-6 text-orange-500 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-400 text-lg">
                    Attention : Action irréversible
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Vous êtes sur le point d'archiver la demande{" "}
                    {requestToArchive?.status === "accepted" && "acceptée"}
                    {requestToArchive?.status === "confirmed" && "confirmée"}
                    {" "}de <span className="font-semibold text-white">{requestToArchive?.artistName}</span> pour le{" "}
                    <span className="font-semibold text-white">
                      {requestToArchive && format(new Date(requestToArchive.requestedDate), "dd MMMM yyyy", { locale: fr })}
                    </span>.
                  </p>
                  {requestToArchive?.status === "accepted" && (
                    <p className="text-sm text-orange-300 font-medium">
                      ⚠️ Cette demande a été acceptée par l'artiste mais n'a pas abouti. L'archivage confirme l'abandon de cette collaboration.
                    </p>
                  )}
                  {requestToArchive?.status === "confirmed" && (
                    <p className="text-sm text-orange-300 font-medium">
                      ⚠️ Cette demande est confirmée. Vérifiez que l'événement est bien terminé avant d'archiver.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-[#191414] rounded-lg border border-gray-700">
              <input
                type="checkbox"
                id="confirmArchive"
                checked={archiveConfirmChecked}
                onChange={(e) => setArchiveConfirmChecked(e.target.checked)}
                className="mt-1 size-5 rounded border-gray-600 bg-[#282828] text-[#1DB954] focus:ring-[#1DB954] focus:ring-offset-0"
              />
              <label htmlFor="confirmArchive" className="text-sm text-gray-300 cursor-pointer select-none">
                Je confirme vouloir archiver cette demande. Je comprends que cette action déplacera la demande vers mes archives.
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowArchiveModal(false)}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-[#191414] rounded-xl h-12 font-medium"
              >
                Annuler
              </Button>
              <Button
                onClick={handleArchiveSubmit}
                disabled={!archiveConfirmChecked}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Archive className="size-4 mr-2" />
                Confirmer l'archivage
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}