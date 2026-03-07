import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Send,
  Calendar,
  MapPin,
  Music,
  UserCircle,
  CheckCircle,
  AlertCircle,
  X,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOrganizer: boolean;
}

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
  status: "pending" | "accepted" | "rejected" | "confirmed";
  hasUnreadMessages: boolean;
}

interface Conversation {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  category: string;
  city: string;
  lastMessage: string;
  lastMessageDate: string;
  status: BookingRequest["status"];
  hasUnreadMessages: boolean;
}

interface OrganizerMessagingSystemProps {
  request: BookingRequest;
  onBack: () => void;
  onStatusUpdate: (requestId: string, newStatus: BookingRequest["status"]) => void;
}

export function OrganizerMessagingSystem({
  request,
  onBack,
  onStatusUpdate,
}: OrganizerMessagingSystemProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: request.id,
      artistId: request.artistId,
      artistName: request.artistName,
      artistAvatar: request.artistAvatar,
      category: request.category,
      city: request.city,
      lastMessage: request.lastMessage,
      lastMessageDate: request.lastMessageDate,
      status: request.status,
      hasUnreadMessages: request.hasUnreadMessages,
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "organizer-1",
      senderName: "Vous",
      content: `Bonjour ${request.artistName}, je suis intéressé par vos services pour mon événement le ${format(new Date(request.requestedDate), "dd MMMM yyyy", { locale: fr })} de ${request.requestedTime}. Seriez-vous disponible ?`,
      timestamp: "2026-02-13T14:00:00",
      isOrganizer: true,
    },
    {
      id: "2",
      senderId: request.artistId,
      senderName: request.artistName,
      content: request.lastMessage,
      timestamp: request.lastMessageDate,
      isOrganizer: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmDetails, setConfirmDetails] = useState({
    date: request.requestedDate,
    time: request.requestedTime,
    location: "",
    duration: "",
    notes: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "organizer-1",
      senderName: "Vous",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isOrganizer: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Update conversation last message
    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, lastMessage: newMessage, lastMessageDate: message.timestamp }
          : conv
      )
    );
  };

  const handleConfirmBooking = () => {
    if (!confirmDetails.location || !confirmDetails.duration) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const confirmationMessage: Message = {
      id: Date.now().toString(),
      senderId: "organizer-1",
      senderName: "Vous",
      content: `✅ Accord confirmé !\n\nDate: ${format(new Date(confirmDetails.date), "dd MMMM yyyy", { locale: fr })}\nHoraires: ${confirmDetails.time}\nLieu: ${confirmDetails.location}\nDurée: ${confirmDetails.duration}\n${confirmDetails.notes ? `Notes: ${confirmDetails.notes}` : ""}`,
      timestamp: new Date().toISOString(),
      isOrganizer: true,
    };

    setMessages([...messages, confirmationMessage]);
    setShowConfirmModal(false);
    
    // Update status to confirmed
    onStatusUpdate(request.id, "confirmed");
    setActiveConversation({ ...activeConversation, status: "confirmed" });
    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, status: "confirmed", lastMessage: "Accord confirmé", lastMessageDate: confirmationMessage.timestamp }
          : conv
      )
    );

    toast.success("L'accord a été confirmé avec succès !");
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const date = format(new Date(message.timestamp), "dd MMMM yyyy", { locale: fr });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="min-h-screen bg-[#191414]">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-700 bg-[#191414] px-6 py-4 flex-shrink-0">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 hover:bg-[#282828] text-gray-300 gap-2"
            >
              <ArrowLeft className="size-4" />
              Retour aux messages
            </Button>
            <h1 className="text-2xl font-bold text-white">Messagerie</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] h-full gap-0">
            {/* Left Column - Conversations */}
            <div className="border-r border-gray-700 bg-[#191414] overflow-y-auto h-full">
              <div className="p-4">
                <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                  Conversations
                </h2>
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversation(conv)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        activeConversation.id === conv.id
                          ? "bg-[#282828] shadow-sm border-2 border-[#1DB954]"
                          : "bg-[#282828] border-2 border-transparent hover:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={conv.artistAvatar}
                            alt={conv.artistName}
                            className="size-12 rounded-full object-cover"
                          />
                          {conv.hasUnreadMessages && (
                            <div className="absolute -top-1 -right-1 size-3 bg-[#1DB954] border-2 border-[#191414] rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-white text-sm truncate">
                              {conv.artistName}
                            </h3>
                            {conv.status === "confirmed" && (
                              <CheckCircle className="size-4 text-[#1DB954] flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-1">{conv.lastMessage}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(conv.lastMessageDate), "HH:mm", { locale: fr })}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Active Chat */}
            <div className="flex flex-col h-full bg-[#191414]">
              {/* Chat Header */}
              <div className="border-b border-gray-700 p-6 bg-[#191414] flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={activeConversation.artistAvatar}
                      alt={activeConversation.artistName}
                      className="size-14 rounded-full object-cover border-2 border-gray-700"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {activeConversation.artistName}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Music className="size-4" />
                          {activeConversation.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {activeConversation.city}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-[#282828] rounded-lg"
                  >
                    <UserCircle className="size-4 mr-2" />
                    Voir profil
                  </Button>
                </div>
              </div>

              {/* Status Banner */}
              {activeConversation.status === "pending" && (
                <div className="bg-yellow-500/20 border-b border-yellow-500/30 px-6 py-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-yellow-400 flex-shrink-0" />
                    <p className="text-sm text-yellow-300 font-medium">
                      En attente de réponse de l'artiste
                    </p>
                  </div>
                </div>
              )}

              {activeConversation.status === "accepted" && (
                <div className="bg-[#1DB954]/20 border-b border-[#1DB954]/30 px-6 py-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-[#1DB954] flex-shrink-0" />
                    <p className="text-sm text-[#1ED760] font-medium">
                      L'artiste a accepté votre demande
                    </p>
                  </div>
                </div>
              )}

              {activeConversation.status === "confirmed" && (
                <div className="bg-[#1DB954]/20 border-b border-[#1DB954]/30 px-6 py-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-[#1DB954] flex-shrink-0" />
                    <p className="text-sm text-[#1ED760] font-medium">
                      ✓ Accord confirmé - Réservation finalisée
                    </p>
                  </div>
                </div>
              )}

              {activeConversation.status === "rejected" && (
                <div className="bg-red-500/20 border-b border-red-500/30 px-6 py-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="size-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-300 font-medium">
                        Cette demande a été refusée
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-[#282828] rounded-lg text-sm px-4 py-2"
                    >
                      Rechercher un autre artiste
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#191414]">
                {Object.entries(messageGroups).map(([date, msgs]) => (
                  <div key={date}>
                    {/* Date Separator */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 h-px bg-gray-700"></div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {date}
                      </span>
                      <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-4">
                      {msgs.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOrganizer ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-lg ${
                              message.isOrganizer ? "order-2" : "order-1"
                            }`}
                          >
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                message.isOrganizer
                                  ? "bg-[#1DB954] text-black"
                                  : "bg-[#282828] text-white"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <p
                              className={`text-xs text-gray-500 mt-1 ${
                                message.isOrganizer ? "text-right" : "text-left"
                              }`}
                            >
                              {format(new Date(message.timestamp), "HH:mm", { locale: fr })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-700 p-6 bg-[#191414] flex-shrink-0">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 h-12 border-gray-700 rounded-xl bg-[#282828] text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-xl px-6 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Details Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-2xl bg-[#282828] border-gray-700 text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Confirmer l'accord
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Renseignez les détails finaux de votre événement avec {activeConversation.artistName}
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
                type="date"
                value={confirmDetails.date}
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
                type="text"
                placeholder="Ex: 20:00 - 02:00"
                value={confirmDetails.time}
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
                type="text"
                placeholder="Ex: Hôtel Hyatt Regency, Casablanca"
                value={confirmDetails.location}
                onChange={(e) => setConfirmDetails({ ...confirmDetails, location: e.target.value })}
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
                type="text"
                placeholder="Ex: 6 heures"
                value={confirmDetails.duration}
                onChange={(e) => setConfirmDetails({ ...confirmDetails, duration: e.target.value })}
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
                placeholder="Instructions spéciales, équipements requis, etc."
                value={confirmDetails.notes}
                onChange={(e) => setConfirmDetails({ ...confirmDetails, notes: e.target.value })}
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
                onClick={handleConfirmBooking}
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-xl h-12 font-medium"
              >
                Confirmer l'accord
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}