import { useState } from "react";
import { LayoutDashboard, MessageSquare, Send, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface OrganizerDashboardDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status: "active" | "archived";
}

interface Request {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  eventType: string;
  eventDate: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  price: number;
  sentDate: string;
}

export function OrganizerDashboardDialog({
  isOpen,
  onClose,
}: OrganizerDashboardDialogProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  // Mock data - Messages
  const messages: Message[] = [
    {
      id: "1",
      artistId: "1",
      artistName: "DJ Mehdi El Alami",
      artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100",
      lastMessage: "Parfait ! Je confirme ma disponibilité pour le 15 mars.",
      timestamp: "Il y a 2h",
      unread: true,
      status: "active",
    },
    {
      id: "2",
      artistId: "2",
      artistName: "Gnawa Fusion Group",
      artistAvatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=100",
      lastMessage: "Merci pour votre demande. Pouvez-vous me donner plus de détails ?",
      timestamp: "Il y a 5h",
      unread: false,
      status: "active",
    },
    {
      id: "3",
      artistId: "3",
      artistName: "Orchestre El Maghreb",
      artistAvatar: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100",
      lastMessage: "Désolé, je ne suis pas disponible à cette date.",
      timestamp: "Hier",
      unread: false,
      status: "active",
    },
  ];

  // Mock data - Demandes
  const requests: Request[] = [
    {
      id: "1",
      artistId: "1",
      artistName: "DJ Mehdi El Alami",
      artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100",
      eventType: "Mariage",
      eventDate: "2024-03-15",
      status: "accepted",
      price: 12000,
      sentDate: "2024-02-01",
    },
    {
      id: "2",
      artistId: "2",
      artistName: "Gnawa Fusion Group",
      artistAvatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=100",
      eventType: "Festival",
      eventDate: "2024-04-20",
      status: "pending",
      price: 15000,
      sentDate: "2024-02-10",
    },
    {
      id: "3",
      artistId: "3",
      artistName: "Orchestre El Maghreb",
      artistAvatar: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100",
      eventType: "Événement Corporatif",
      eventDate: "2024-05-10",
      status: "rejected",
      price: 20000,
      sentDate: "2024-02-05",
    },
    {
      id: "4",
      artistId: "4",
      artistName: "Chaabi Rif Band",
      artistAvatar: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100",
      eventType: "Mariage",
      eventDate: "2024-06-01",
      status: "pending",
      price: 14000,
      sentDate: "2024-02-12",
    },
  ];

  const getStatusBadge = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-black"><Clock className="size-3 mr-1" />En attente</Badge>;
      case "accepted":
        return <Badge className="bg-green-500 text-black"><CheckCircle className="size-3 mr-1" />Acceptée</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white"><XCircle className="size-3 mr-1" />Refusée</Badge>;
      case "cancelled":
        return <Badge className="bg-gray-500 text-white"><AlertCircle className="size-3 mr-1" />Annulée</Badge>;
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      toast.success("Message envoyé !");
      setMessageInput("");
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    accepted: requests.filter(r => r.status === "accepted").length,
    rejected: requests.filter(r => r.status === "rejected").length,
    unreadMessages: messages.filter(m => m.unread).length,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-[#191414] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="size-6 text-[#1DB954]" />
            Dashboard & Messages
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="demandes" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[#282828]">
            <TabsTrigger value="demandes" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">
              Mes Demandes ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">
              Messages ({stats.unreadMessages})
            </TabsTrigger>
          </TabsList>

          {/* Onglet Demandes */}
          <TabsContent value="demandes" className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Statistiques */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-[#282828] rounded-lg p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">Total</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="bg-[#282828] rounded-lg p-4 border border-yellow-500/30">
                <p className="text-sm text-gray-400 mb-1">En attente</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <div className="bg-[#282828] rounded-lg p-4 border border-green-500/30">
                <p className="text-sm text-gray-400 mb-1">Acceptées</p>
                <p className="text-2xl font-bold text-green-500">{stats.accepted}</p>
              </div>
              <div className="bg-[#282828] rounded-lg p-4 border border-red-500/30">
                <p className="text-sm text-gray-400 mb-1">Refusées</p>
                <p className="text-2xl font-bold text-red-500">{stats.rejected}</p>
              </div>
            </div>

            {/* Liste des demandes */}
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-[#282828] rounded-lg p-4 border border-gray-800 hover:border-[#1DB954]/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <img
                        src={request.artistAvatar}
                        alt={request.artistName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">{request.artistName}</h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          {request.eventType} • {new Date(request.eventDate).toLocaleDateString("fr-FR")}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Envoyée le {new Date(request.sentDate).toLocaleDateString("fr-FR")}</span>
                          <span className="text-[#1DB954] font-semibold">{request.price.toLocaleString()} DH</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                      onClick={() => {
                        setSelectedConversation(request.artistId);
                        toast.info("Ouverture de la conversation...");
                      }}
                    >
                      <MessageSquare className="size-4" />
                      Contacter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Messages */}
          <TabsContent value="messages" className="mt-4">
            <div className="grid grid-cols-3 gap-4 h-[60vh]">
              {/* Liste des conversations */}
              <div className="col-span-1 bg-[#282828] rounded-lg border border-gray-800 overflow-y-auto">
                <div className="p-3 border-b border-gray-700">
                  <h3 className="text-white font-semibold">Conversations</h3>
                </div>
                <div className="divide-y divide-gray-700">
                  {messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => setSelectedConversation(message.artistId)}
                      className={`w-full p-3 text-left hover:bg-[#191414] transition-colors ${
                        selectedConversation === message.artistId ? "bg-[#191414]" : ""
                      }`}
                    >
                      <div className="flex gap-2">
                        <img
                          src={message.artistAvatar}
                          alt={message.artistName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-semibold truncate ${message.unread ? "text-white" : "text-gray-400"}`}>
                              {message.artistName}
                            </p>
                            {message.unread && (
                              <span className="w-2 h-2 bg-[#1DB954] rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{message.lastMessage}</p>
                          <p className="text-xs text-gray-600 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone de conversation */}
              <div className="col-span-2 bg-[#282828] rounded-lg border border-gray-800 flex flex-col">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={messages.find(m => m.artistId === selectedConversation)?.artistAvatar}
                          alt="Artist"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-white font-semibold">
                            {messages.find(m => m.artistId === selectedConversation)?.artistName}
                          </h3>
                          <p className="text-xs text-gray-400">En ligne</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                      {/* Messages fictifs */}
                      <div className="flex justify-start">
                        <div className="bg-[#191414] rounded-lg p-3 max-w-[70%]">
                          <p className="text-white text-sm">Bonjour ! Je suis intéressé par vos services pour un mariage.</p>
                          <p className="text-xs text-gray-500 mt-1">10:30</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[#1DB954] rounded-lg p-3 max-w-[70%]">
                          <p className="text-black text-sm">Merci pour votre message ! Pouvez-vous me donner plus de détails ?</p>
                          <p className="text-xs text-black/60 mt-1">10:32</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-[#191414] rounded-lg p-3 max-w-[70%]">
                          <p className="text-white text-sm">
                            {messages.find(m => m.artistId === selectedConversation)?.lastMessage}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">10:35</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-700">
                      <div className="flex gap-2">
                        <Input
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="Tapez votre message..."
                          className="bg-[#191414] border-gray-700 text-white"
                        />
                        <Button
                          onClick={handleSendMessage}
                          className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
                        >
                          <Send className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="size-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Sélectionnez une conversation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}