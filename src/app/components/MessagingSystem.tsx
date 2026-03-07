import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Send, Calendar, Clock, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  artistName: string;
  artistId: string;
  date: string;
  time?: string;
  city?: string;
  eventType: string;
  location: string;
  proposedBudget?: string;
  message: string;
  formula?: string;
  sentAt: string;
  status: "pending" | "accepted" | "declined";
}

interface Formula {
  name: string;
  description: string;
  instruments?: string;
  musicians: number;
  duration: string;
  price: string;
}

interface MessagingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  artistId: string;
  selectedDate: string;
  organizerName: string;
  formulas?: Formula[];
  artistPriceRange?: string;
}

export function MessagingSystem({
  isOpen,
  onClose,
  artistName,
  artistId,
  selectedDate,
  organizerName,
  formulas,
  artistPriceRange,
}: MessagingSystemProps) {
  const [eventType, setEventType] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [proposedBudget, setProposedBudget] = useState("");
  const [message, setMessage] = useState("");
  const [formula, setFormula] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi du message
    const newMessage: Message = {
      id: Date.now().toString(),
      artistName,
      artistId,
      date: selectedDate,
      time,
      city,
      eventType,
      location,
      proposedBudget,
      message,
      formula,
      sentAt: new Date().toISOString(),
      status: "pending",
    };

    // Stocker dans localStorage pour la démo
    const existingMessages = JSON.parse(localStorage.getItem("booking_messages") || "[]");
    localStorage.setItem("booking_messages", JSON.stringify([...existingMessages, newMessage]));

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setEventType("");
      setTime("");
      setCity("");
      setLocation("");
      setProposedBudget("");
      setMessage("");
      setFormula("");
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#191414] border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#1DB954] flex items-center gap-2">
            <MessageSquare className="size-5" />
            Demande de réservation
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Envoyez une demande à {artistName} pour le {new Date(selectedDate).toLocaleDateString("fr-FR", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="size-8 text-black" />
            </div>
            <h3 className="text-xl text-[#1DB954] mb-2">Demande envoyée !</h3>
            <p className="text-gray-400">
              {artistName} recevra votre demande et vous répondra bientôt.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Card className="p-4 bg-gray-800 border-gray-700">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="size-4 text-[#1DB954]" />
                <div>
                  <p className="text-gray-400">Date sélectionnée</p>
                  <p className="text-white font-medium">
                    {new Date(selectedDate).toLocaleDateString("fr-FR", { 
                      weekday: "long", 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-gray-300">Type d'événement *</Label>
              <Input
                id="eventType"
                placeholder="Mariage, Concert, Soirée privée, etc."
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            {/* Heure et Ville sur la même ligne */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time" className="text-gray-300">Heure de l'événement</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-300">Ville de l'événement</Label>
                <Input
                  id="city"
                  placeholder="Casablanca, Rabat, Marrakech..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Lieu et Budget sur la même ligne */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">Lieu de l'événement *</Label>
                <Input
                  id="location"
                  placeholder="Salle, Hôtel, Adresse..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposedBudget" className="text-gray-300">Budget proposé</Label>
                <Input
                  id="proposedBudget"
                  placeholder="Ex: 5000 MAD"
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                {artistPriceRange && (
                  <p className="text-xs text-gray-400 mt-1">
                    Fourchette de prix : {artistPriceRange}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">Message *</Label>
              <Textarea
                id="message"
                placeholder="Décrivez votre événement, vos attentes, la durée souhaitée..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white min-h-32"
                required
              />
            </div>

            {formulas && formulas.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="formula" className="text-gray-300">Formule</Label>
                <Select
                  id="formula"
                  value={formula}
                  onValueChange={(value) => setFormula(value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Choisissez une formule" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {formulas.map((f) => (
                      <SelectItem key={f.name} value={f.name}>
                        {f.name} - {f.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
              >
                <Send className="size-4" />
                Envoyer la demande
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Composant pour voir les messages envoyés
export function MessagesList({ organizerEmail }: { organizerEmail: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Charger les messages au montage
  useState(() => {
    const stored = JSON.parse(localStorage.getItem("booking_messages") || "[]");
    setMessages(stored);
  });

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="size-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Aucune demande envoyée pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <Card key={msg.id} className="p-4 bg-gray-800 border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-medium text-white">{msg.artistName}</h4>
              <p className="text-sm text-gray-400">{msg.eventType} - {msg.location}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              msg.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
              msg.status === "accepted" ? "bg-green-500/20 text-green-500" :
              "bg-red-500/20 text-red-500"
            }`}>
              {msg.status === "pending" ? "En attente" :
               msg.status === "accepted" ? "Accepté" : "Refusé"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Calendar className="size-4" />
            {new Date(msg.date).toLocaleDateString("fr-FR")}
          </div>
          <p className="text-sm text-gray-300">{msg.message}</p>
          {msg.formula && (
            <p className="text-sm text-gray-300">Formule choisie: {msg.formula}</p>
          )}
        </Card>
      ))}
    </div>
  );
}