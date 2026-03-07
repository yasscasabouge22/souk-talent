import { useState } from "react";
import { Calendar as CalendarIcon, Plus, ArrowLeft, User, MessageSquare, Mail, Phone, MapPin, Clock, Info, DollarSign, Star, Trash2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mockCalendarEvents, CalendarEvent, mockBookingRequests } from "@/app/data/artistDashboardData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

type ViewMode = "calendar" | "eventDetails" | "organizerProfile" | "sendMessage";

export function ArtistCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockCalendarEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  // Nouveaux états pour la gestion des vues
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [eventForAction, setEventForAction] = useState<CalendarEvent | null>(null);
  const [message, setMessage] = useState("");
  const [eventStatus, setEventStatus] = useState<CalendarEvent["status"]>("hold");
  const [eventIsPublic, setEventIsPublic] = useState(false);
  const [eventFlyerUrl, setEventFlyerUrl] = useState("");
  const [eventTicketLink, setEventTicketLink] = useState("");

  const [formData, setFormData] = useState({
    status: "unavailable" as CalendarEvent["status"],
    title: "",
    eventType: "",
    client: "",
    location: "",
    city: "",
    eventTime: "",
    note: "",
    isPublic: false,
    flyerUrl: "",
    ticketLink: "",
  });

  const getEventForDate = (date: Date) => {
    return events.find(
      (event) =>
        format(new Date(event.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setDate(selectedDate);
    const existingEvent = getEventForDate(selectedDate);

    if (existingEvent) {
      // Si l'événement a un organisateur (hold ou confirmed), ouvrir la vue de détails
      if (existingEvent.organizerName && (existingEvent.status === "hold" || existingEvent.status === "confirmed")) {
        setEventForAction(existingEvent);
        setEventStatus(existingEvent.status);
        setEventIsPublic(existingEvent.isPublic || false);
        setEventFlyerUrl(existingEvent.flyerUrl || "");
        setEventTicketLink(existingEvent.ticketLink || "");
        setViewMode("eventDetails");
      } else {
        // Sinon, ouvrir la modal d'édition classique
        setSelectedEvent(existingEvent);
        setFormData({
          status: existingEvent.status,
          title: existingEvent.title || "",
          eventType: existingEvent.eventType || "",
          client: existingEvent.client || "",
          location: existingEvent.location || "",
          city: existingEvent.city || "",
          eventTime: existingEvent.eventTime || "",
          note: existingEvent.note || "",
          isPublic: existingEvent.isPublic || false,
          flyerUrl: existingEvent.flyerUrl || "",
          ticketLink: existingEvent.ticketLink || "",
        });
        setModalMode("edit");
        setShowModal(true);
      }
    } else {
      setSelectedEvent(null);
      setFormData({
        status: "unavailable",
        title: "",
        eventType: "",
        client: "",
        location: "",
        city: "",
        eventTime: "",
        note: "",
        isPublic: false,
        flyerUrl: "",
        ticketLink: "",
      });
      setModalMode("add");
      setShowModal(true);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.organizerName && (event.status === "hold" || event.status === "confirmed")) {
      setEventForAction(event);
      setEventStatus(event.status);
      setEventIsPublic(event.isPublic || false);
      setEventFlyerUrl(event.flyerUrl || "");
      setEventTicketLink(event.ticketLink || "");
      setViewMode("eventDetails");
    } else {
      const eventDate = new Date(event.date);
      setDate(eventDate);
      setSelectedEvent(event);
      setFormData({
        status: event.status,
        title: event.title || "",
        eventType: event.eventType || "",
        client: event.client || "",
        location: event.location || "",
        city: event.city || "",
        eventTime: event.eventTime || "",
        note: event.note || "",
        isPublic: event.isPublic || false,
        flyerUrl: event.flyerUrl || "",
        ticketLink: event.ticketLink || "",
      });
      setModalMode("edit");
      setShowModal(true);
    }
  };

  const handleBackToCalendar = () => {
    setViewMode("calendar");
    setEventForAction(null);
    setMessage("");
  };

  const handleUpdateEventStatus = () => {
    if (!eventForAction) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventForAction.id 
          ? { 
              ...event, 
              status: eventStatus,
              isPublic: eventIsPublic,
              flyerUrl: eventFlyerUrl,
              ticketLink: eventTicketLink,
            } 
          : event
      )
    );
    toast.success("Statut de l'événement mis à jour !");
  };

  const handleSendMessageSubmit = () => {
    if (!message.trim()) {
      toast.error("Veuillez saisir un message");
      return;
    }

    toast.success(`Message envoyé à ${eventForAction?.organizerName} !`);
    setMessage("");
    setViewMode("eventDetails");
  };

  const handleSave = () => {
    if (!date) return;

    const eventData: CalendarEvent = {
      id: selectedEvent?.id || `cal-${Date.now()}`,
      date: format(date, "yyyy-MM-dd"),
      status: formData.status,
      title: formData.title || undefined,
      eventType: formData.eventType || undefined,
      client: formData.client || undefined,
      location: formData.location || undefined,
      city: formData.city || undefined,
      eventTime: formData.eventTime || undefined,
      note: formData.note || undefined,
      isPublic: formData.isPublic,
      flyerUrl: formData.flyerUrl,
      ticketLink: formData.ticketLink,
    };

    if (modalMode === "edit" && selectedEvent) {
      setEvents((prev) =>
        prev.map((event) => (event.id === selectedEvent.id ? eventData : event))
      );
      toast.success("Événement mis à jour !");
    } else {
      setEvents((prev) => [...prev, eventData]);
      toast.success("Événement ajouté !");
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedEvent) return;

    setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
    toast.info("Événement supprimé");
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      status: "unavailable",
      title: "",
      eventType: "",
      client: "",
      location: "",
      city: "",
      eventTime: "",
      note: "",
      isPublic: false,
      flyerUrl: "",
      ticketLink: "",
    });
    setSelectedEvent(null);
  };

  const getStatusColor = (status: CalendarEvent["status"]) => {
    const colors = {
      available: "bg-green-500/20 text-green-500 border-green-500/30",
      unavailable: "bg-red-500/20 text-red-500 border-red-500/30",
      hold: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      confirmed: "bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30",
    };
    return colors[status];
  };

  const getStatusLabel = (status: CalendarEvent["status"]) => {
    const labels = {
      available: "Disponible",
      unavailable: "Indisponible",
      hold: "En attente",
      confirmed: "Confirmé",
    };
    return labels[status];
  };

  // Modification du calendrier pour afficher les événements
  const modifiers = {
    confirmed: events
      .filter((e) => e.status === "confirmed")
      .map((e) => new Date(e.date)),
    hold: events.filter((e) => e.status === "hold").map((e) => new Date(e.date)),
    unavailable: events
      .filter((e) => e.status === "unavailable")
      .map((e) => new Date(e.date)),
  };

  const modifiersStyles = {
    confirmed: { backgroundColor: "#1DB954", color: "white" },
    hold: { backgroundColor: "#EAB308", color: "white" },
    unavailable: { backgroundColor: "#EF4444", color: "white" },
  };

  // Liste des événements à venir
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  // Récupérer toutes les demandes de l'organisateur
  const getOrganizerRequests = (organizerName: string) => {
    return mockBookingRequests.filter(req => req.organizerName === organizerName);
  };

  // Messages rapides prédéfinis
  const quickMessages = [
    "Bonjour, je confirme ma disponibilité pour cet événement.",
    "Pourriez-vous me donner plus de détails sur l'événement ?",
    "Je souhaiterais discuter des modalités pratiques.",
  ];

  // Vue calendrier
  if (viewMode === "calendar") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <CalendarIcon className="size-8" />
              Mon Calendrier
            </h1>
            <p className="text-gray-400">Gérez vos disponibilités et événements</p>
          </div>
          <Button
            className="bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
            onClick={() => {
              setModalMode("add");
              setDate(new Date());
              resetForm();
              setShowModal(true);
            }}
          >
            <Plus className="size-4" />
            Ajouter une indisponibilité
          </Button>
        </div>

        {/* Calendrier */}
        <Card className="bg-[#282828] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Calendrier</CardTitle>
            <p className="text-sm text-gray-400 mt-2">
              Cliquez sur une date pour ajouter ou modifier un événement
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
              {/* Calendrier */}
              <div className="flex-shrink-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  locale={fr}
                  className="rounded-md border border-gray-700 bg-white"
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                />
              </div>

              {/* Légende - à droite */}
              <div className="lg:max-w-[200px] w-full">
                <h4 className="text-sm font-semibold text-white mb-4">Légende</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                    <div className="w-4 h-4 rounded bg-green-500 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">Disponible</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                    <div className="w-4 h-4 rounded bg-red-500 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">Indisponible</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                    <div className="w-4 h-4 rounded bg-yellow-500 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">En attente</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                    <div className="w-4 h-4 rounded bg-[#1DB954] flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">Confirmé</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Événements à venir - En dessous du calendrier */}
        <Card className="bg-[#282828] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Événements à venir</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                Aucun événement prévu
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-[#191414] rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-white">
                        {format(new Date(event.date), "dd MMM yyyy", { locale: fr })}
                      </p>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusLabel(event.status)}
                      </Badge>
                    </div>
                    {event.title && (
                      <p className="text-sm font-semibold text-white mb-2">{event.title}</p>
                    )}
                    {event.eventType && (
                      <p className="text-sm text-gray-400 mb-2">{event.eventType}</p>
                    )}
                    {event.client && (
                      <p className="text-xs text-gray-500">{event.client}</p>
                    )}
                    {event.note && !event.client && (
                      <p className="text-xs text-gray-500">{event.note}</p>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <MapPin className="size-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal Ajout/Édition */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-[#191414] border-gray-800 text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#1DB954]">
                {modalMode === "edit" ? "Modifier l'événement" : "Ajouter un événement"}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                {modalMode === "edit"
                  ? "Modifiez les détails de l'événement sélectionné."
                  : "Ajoutez un nouvel événement à votre calendrier."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {date && (
                <div className="p-3 bg-[#282828] rounded-lg">
                  <p className="text-sm text-gray-400">Date sélectionnée</p>
                  <p className="text-white font-medium">
                    {format(date, "EEEE dd MMMM yyyy", { locale: fr })}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-300">
                  Statut *
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: CalendarEvent["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="available" className="text-white">
                      Disponible
                    </SelectItem>
                    <SelectItem value="unavailable" className="text-white">
                      Indisponible
                    </SelectItem>
                    <SelectItem value="hold" className="text-white">
                      En attente (Hold)
                    </SelectItem>
                    <SelectItem value="confirmed" className="text-white">
                      Confirmé
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.status === "hold" || formData.status === "confirmed") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Titre de l'événement
                    </Label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      placeholder="Titre de l'événement"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType" className="text-gray-300">
                      Type d'événement
                    </Label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, eventType: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Mariage" className="text-white">
                          Mariage
                        </SelectItem>
                        <SelectItem value="Corporate" className="text-white">
                          Corporate
                        </SelectItem>
                        <SelectItem value="Soirée privée" className="text-white">
                          Soirée privée
                        </SelectItem>
                        <SelectItem value="Club" className="text-white">
                          Club
                        </SelectItem>
                        <SelectItem value="Festival" className="text-white">
                          Festival
                        </SelectItem>
                        <SelectItem value="Anniversaire" className="text-white">
                          Anniversaire
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Client et Lieu sur la même ligne */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="client" className="text-gray-300">
                        Client
                      </Label>
                      <input
                        id="client"
                        type="text"
                        value={formData.client}
                        onChange={(e) =>
                          setFormData({ ...formData, client: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Nom du client"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">
                        Lieu
                      </Label>
                      <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Lieu de l'événement"
                      />
                    </div>
                  </div>

                  {/* Ville et Heure sur la même ligne */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-300">
                        Ville
                      </Label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Ville de l'événement"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventTime" className="text-gray-300">
                        Heure
                      </Label>
                      <input
                        id="eventTime"
                        type="text"
                        value={formData.eventTime}
                        onChange={(e) =>
                          setFormData({ ...formData, eventTime: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Ex: 20:00"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Section événement public - Uniquement pour statut confirmed */}
              {formData.status === "confirmed" && (
                <div className="space-y-4 p-4 bg-[#282828] rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isPublic" className="text-gray-300 cursor-pointer">
                      Événement public
                    </Label>
                    <input
                      id="isPublic"
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublic: e.target.checked })
                      }
                      className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-[#1DB954] focus:ring-[#1DB954] cursor-pointer"
                    />
                  </div>

                  {formData.isPublic && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="flyerUrl" className="text-gray-300">
                          URL du flyer
                        </Label>
                        <input
                          id="flyerUrl"
                          type="url"
                          value={formData.flyerUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, flyerUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          placeholder="https://exemple.com/flyer.jpg"
                        />
                        <p className="text-xs text-gray-500">
                          Image qui sera affichée dans l'agenda public
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ticketLink" className="text-gray-300">
                          Lien billeterie
                        </Label>
                        <input
                          id="ticketLink"
                          type="url"
                          value={formData.ticketLink}
                          onChange={(e) =>
                            setFormData({ ...formData, ticketLink: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          placeholder="https://exemple.com/tickets"
                        />
                        <p className="text-xs text-gray-500">
                          Lien vers la page d'achat des billets
                        </p>
                      </div>

                      <div className="p-3 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg">
                        <p className="text-sm text-[#1DB954]">
                          ✓ Cet événement sera visible dans l'agenda public de Souk Talent
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="note" className="text-gray-300">
                  Note
                </Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Ajouter une note..."
                />
              </div>

              <div className="flex gap-3">
                {modalMode === "edit" && (
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-500/20"
                    onClick={handleDelete}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Supprimer
                  </Button>
                )}
                <Button
                  className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black"
                  onClick={handleSave}
                >
                  {modalMode === "edit" ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Vue détails de l'événement
  if (viewMode === "eventDetails" && eventForAction) {
    return (
      <div className="space-y-6">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-colors gap-2"
            onClick={handleBackToCalendar}
          >
            <ArrowLeft className="size-4" />
            Retour au calendrier
          </Button>
          <h1 className="text-3xl font-bold text-white">Détails de l'événement</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Informations de l'événement</span>
                  <Badge className={getStatusColor(eventForAction.status)}>
                    {getStatusLabel(eventForAction.status)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date et heure */}
                <div className="flex items-center gap-4 p-4 bg-[#191414] rounded-lg">
                  <div className="p-3 bg-[#1DB954]/20 rounded-full">
                    <CalendarIcon className="size-6 text-[#1DB954]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-lg font-semibold text-white">
                      {format(new Date(eventForAction.date), "EEEE dd MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                  {eventForAction.eventTime && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="size-5" />
                      <span>{eventForAction.eventTime}</span>
                    </div>
                  )}
                </div>

                {/* Type d'événement */}
                {eventForAction.eventType && (
                  <div className="flex items-center gap-4 p-4 bg-[#191414] rounded-lg">
                    <div className="p-3 bg-[#1DB954]/20 rounded-full">
                      <Info className="size-6 text-[#1DB954]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Type d'événement</p>
                      <p className="text-white font-medium">{eventForAction.eventType}</p>
                    </div>
                  </div>
                )}

                {/* Localisation */}
                {eventForAction.location && (
                  <div className="flex items-center gap-4 p-4 bg-[#191414] rounded-lg">
                    <div className="p-3 bg-[#1DB954]/20 rounded-full">
                      <MapPin className="size-6 text-[#1DB954]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Lieu</p>
                      <p className="text-white font-medium">{eventForAction.location}</p>
                      {eventForAction.city && (
                        <p className="text-gray-400 text-sm mt-1">{eventForAction.city}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Budget */}
                {eventForAction.budget && (
                  <div className="flex items-center gap-4 p-4 bg-[#191414] rounded-lg">
                    <div className="p-3 bg-[#1DB954]/20 rounded-full">
                      <DollarSign className="size-6 text-[#1DB954]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Budget</p>
                      <p className="text-white font-medium">{eventForAction.budget}</p>
                    </div>
                  </div>
                )}

                {/* Note */}
                {eventForAction.note && (
                  <div className="p-4 bg-[#191414] rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Note</p>
                    <p className="text-white">{eventForAction.note}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informations organisateur */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="size-5 text-[#1DB954]" />
                  Organisateur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar et nom */}
                <div className="flex items-center gap-4">
                  <img
                    src={eventForAction.organizerAvatar}
                    alt={eventForAction.organizerName}
                    className="size-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-lg">{eventForAction.organizerName}</p>
                    {eventForAction.organizerCompany && (
                      <p className="text-gray-400 text-sm">{eventForAction.organizerCompany}</p>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {eventForAction.organizerEmail && (
                    <div className="flex items-center gap-2 p-3 bg-[#191414] rounded-lg">
                      <Mail className="size-4 text-[#1DB954]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm text-white truncate">{eventForAction.organizerEmail}</p>
                      </div>
                    </div>
                  )}

                  {eventForAction.organizerPhone && (
                    <div className="flex items-center gap-2 p-3 bg-[#191414] rounded-lg">
                      <Phone className="size-4 text-[#1DB954]" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">Téléphone</p>
                        <p className="text-sm text-white">{eventForAction.organizerPhone}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bouton profil organisateur */}
                <Button
                  variant="outline"
                  className="w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-colors gap-2"
                  onClick={() => setViewMode("organizerProfile")}
                >
                  <User className="size-4" />
                  Voir le profil complet
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            {/* Modifier le statut */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Modifier le statut</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventStatus" className="text-gray-300">
                    Statut de l'événement
                  </Label>
                  <Select value={eventStatus} onValueChange={(value: CalendarEvent["status"]) => setEventStatus(value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="hold" className="text-white">
                        En attente (Hold)
                      </SelectItem>
                      <SelectItem value="confirmed" className="text-white">
                        Confirmé
                      </SelectItem>
                      <SelectItem value="unavailable" className="text-white">
                        Annulé
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Section événement public - Uniquement si confirmé */}
                {eventStatus === "confirmed" && (
                  <div className="space-y-4 p-4 bg-[#191414] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="eventIsPublic" className="text-gray-300 cursor-pointer">
                        Événement public
                      </Label>
                      <input
                        id="eventIsPublic"
                        type="checkbox"
                        checked={eventIsPublic}
                        onChange={(e) => setEventIsPublic(e.target.checked)}
                        className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-[#1DB954] focus:ring-[#1DB954] cursor-pointer"
                      />
                    </div>

                    {eventIsPublic && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="eventFlyerUrl" className="text-gray-300">
                            URL du flyer
                          </Label>
                          <input
                            id="eventFlyerUrl"
                            type="url"
                            value={eventFlyerUrl}
                            onChange={(e) => setEventFlyerUrl(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                            placeholder="https://exemple.com/flyer.jpg"
                          />
                          <p className="text-xs text-gray-500">
                            Image qui sera affichée dans l'agenda public
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="eventTicketLink" className="text-gray-300">
                            Lien billeterie
                          </Label>
                          <input
                            id="eventTicketLink"
                            type="url"
                            value={eventTicketLink}
                            onChange={(e) => setEventTicketLink(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                            placeholder="https://exemple.com/tickets"
                          />
                          <p className="text-xs text-gray-500">
                            Lien vers la page d'achat des billets
                          </p>
                        </div>

                        <div className="p-3 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg">
                          <p className="text-sm text-[#1DB954]">
                            ✓ Cet événement sera visible dans l'agenda public
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <Button
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
                  onClick={handleUpdateEventStatus}
                >
                  Mettre à jour le statut
                </Button>
              </CardContent>
            </Card>

            {/* Messagerie */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                  onClick={() => setViewMode("sendMessage")}
                >
                  <MessageSquare className="size-4" />
                  Envoyer un message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Vue profil organisateur
  if (viewMode === "organizerProfile" && eventForAction && eventForAction.organizerName) {
    const organizerRequests = getOrganizerRequests(eventForAction.organizerName);
    const acceptedEvents = organizerRequests.filter(req => req.status === "accepted").length;
    const totalRequests = organizerRequests.length;

    return (
      <div className="space-y-6">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-colors gap-2"
            onClick={() => setViewMode("eventDetails")}
          >
            <ArrowLeft className="size-4" />
            Retour à l'événement
          </Button>
          <h1 className="text-3xl font-bold text-white">Profil de l'organisateur</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations du profil */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête profil */}
            <Card className="bg-[#282828] border-gray-800">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center pb-6 border-b border-gray-800">
                  <img
                    src={eventForAction.organizerAvatar}
                    alt={eventForAction.organizerName}
                    className="size-24 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-2xl font-bold text-white mb-1">{eventForAction.organizerName}</h2>
                  {eventForAction.organizerCompany && (
                    <p className="text-gray-400 mb-3">{eventForAction.organizerCompany}</p>
                  )}

                  {/* Stats */}
                  <div className="flex gap-6 mt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1DB954]">{totalRequests}</p>
                      <p className="text-sm text-gray-400">Demandes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1DB954]">{acceptedEvents}</p>
                      <p className="text-sm text-gray-400">Événements</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="size-5 text-yellow-500 fill-yellow-500" />
                        <p className="text-2xl font-bold text-white">4.8</p>
                      </div>
                      <p className="text-sm text-gray-400">Note</p>
                    </div>
                  </div>
                </div>

                {/* Coordonnées */}
                <div className="space-y-3 mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Coordonnées</h3>
                  
                  {eventForAction.organizerEmail && (
                    <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                      <div className="p-2 bg-[#1DB954]/20 rounded-full">
                        <Mail className="size-5 text-[#1DB954]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm text-white truncate">{eventForAction.organizerEmail}</p>
                      </div>
                    </div>
                  )}

                  {eventForAction.organizerPhone && (
                    <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                      <div className="p-2 bg-[#1DB954]/20 rounded-full">
                        <Phone className="size-5 text-[#1DB954]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">Téléphone</p>
                        <p className="text-sm text-white">{eventForAction.organizerPhone}</p>
                      </div>
                    </div>
                  )}

                  {eventForAction.city && (
                    <div className="flex items-center gap-3 p-3 bg-[#191414] rounded-lg">
                      <div className="p-2 bg-[#1DB954]/20 rounded-full">
                        <MapPin className="size-5 text-[#1DB954]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">Localisation</p>
                        <p className="text-sm text-white">{eventForAction.city}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Historique des événements */}
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Historique des demandes</CardTitle>
              </CardHeader>
              <CardContent>
                {organizerRequests.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">Aucun historique disponible</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {organizerRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-3 bg-[#191414] rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="size-4 text-[#1DB954]" />
                            <span className="text-sm text-white font-medium">
                              {format(new Date(request.eventDate), "dd MMM yyyy", { locale: fr })}
                            </span>
                          </div>
                          <Badge
                            className={
                              request.status === "accepted"
                                ? "bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30"
                                : request.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                                : "bg-red-500/20 text-red-500 border-red-500/30"
                            }
                          >
                            {request.status === "accepted"
                              ? "Accepté"
                              : request.status === "pending"
                              ? "En attente"
                              : "Refusé"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{request.eventType}</p>
                        <p className="text-xs text-gray-500 mt-1">{request.location}, {request.city}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div>
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                  onClick={() => setViewMode("sendMessage")}
                >
                  <MessageSquare className="size-4" />
                  Envoyer un message
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-white hover:bg-gray-800 gap-2"
                  onClick={() => setViewMode("eventDetails")}
                >
                  Retour à l'événement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Vue envoi de message
  if (viewMode === "sendMessage" && eventForAction) {
    return (
      <div className="space-y-6">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 gap-2"
            onClick={() => setViewMode("eventDetails")}
          >
            <ArrowLeft className="size-4" />
            Retour à l'événement
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="size-8" />
            Envoyer un message
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Nouveau message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations sur l'organisateur et l'événement */}
                <div className="p-4 bg-[#191414] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={eventForAction.organizerAvatar}
                      alt={eventForAction.organizerName}
                      className="size-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold">{eventForAction.organizerName}</p>
                      <p className="text-sm text-gray-400">Organisateur</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CalendarIcon className="size-4 text-[#1DB954]" />
                      <span>{format(new Date(eventForAction.date), "dd MMM yyyy", { locale: fr })}</span>
                    </div>
                    {eventForAction.location && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="size-4 text-[#1DB954]" />
                        <span>{eventForAction.location}</span>
                      </div>
                    )}
                  </div>

                  {eventForAction.eventType && (
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <p className="text-sm text-white">{eventForAction.eventType}</p>
                    </div>
                  )}
                </div>

                {/* Messages rapides */}
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Messages rapides</Label>
                  <div className="flex flex-wrap gap-2">
                    {quickMessages.map((quickMsg, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(quickMsg)}
                        className="text-xs px-3 py-2 bg-[#191414] hover:bg-gray-700 text-gray-300 rounded-full transition-colors"
                      >
                        {quickMsg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Zone de texte */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">
                    Votre message
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez votre message ici..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[200px] resize-none"
                    maxLength={1000}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      {message.length}/1000 caractères
                    </p>
                  </div>
                </div>

                {/* Note d'information */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    💡 L'organisateur recevra votre message par email et pourra vous répondre directement via la plateforme.
                  </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => setViewMode("eventDetails")}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="flex-1 bg-[#1DB954] hover:bg-[#1ED760] text-black gap-2"
                    onClick={handleSendMessageSubmit}
                    disabled={!message.trim()}
                  >
                    <Send className="size-4" />
                    Envoyer le message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec infos contact */}
          <div>
            <Card className="bg-[#282828] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventForAction.organizerEmail && (
                  <div className="p-3 bg-[#191414] rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="size-4 text-[#1DB954]" />
                      <p className="text-xs text-gray-400">Email</p>
                    </div>
                    <p className="text-sm text-white truncate">{eventForAction.organizerEmail}</p>
                  </div>
                )}

                {eventForAction.organizerPhone && (
                  <div className="p-3 bg-[#191414] rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="size-4 text-[#1DB954]" />
                      <p className="text-xs text-gray-400">Téléphone</p>
                    </div>
                    <p className="text-sm text-white">{eventForAction.organizerPhone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}