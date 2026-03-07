import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Calendar as CalendarIcon, X, Eye, Ban, Lock, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
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
import { useNavigate } from "react-router";
import { mockBookingEvents, mockAlerts, BookingEvent } from "../../data/adminAgendaData";

export function AdminAgenda() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // Mars 2025
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [selectedArtist, setSelectedArtist] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get unique values for filters
  const artists = Array.from(new Set(mockBookingEvents.map(e => e.artistName).filter(Boolean)));
  const cities = Array.from(new Set(mockBookingEvents.map(e => e.city).filter(c => c !== "N/A")));

  // Filter events
  const filteredEvents = mockBookingEvents.filter(event => {
    const matchArtist = selectedArtist === "all" || event.artistName === selectedArtist;
    const matchCity = selectedCity === "all" || event.city === selectedCity;
    const matchStatus = selectedStatus === "all" || event.status === selectedStatus;
    return matchArtist && matchCity && matchStatus;
  });

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleEventClick = (event: BookingEvent) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedArtist("all");
    setSelectedCity("all");
    setSelectedStatus("all");
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: {
        label: "Confirmé",
        className: "bg-green-100 text-green-700 border-green-200",
        color: "bg-green-500",
      },
      pending: {
        label: "En attente",
        className: "bg-orange-100 text-orange-700 border-orange-200",
        color: "bg-orange-500",
      },
      cancelled: {
        label: "Annulé",
        className: "bg-red-100 text-red-700 border-red-200",
        color: "bg-red-500",
      },
      unavailable: {
        label: "Indisponible",
        className: "bg-gray-100 text-gray-700 border-gray-200",
        color: "bg-gray-400",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <Card className="bg-gray-50 border-gray-200 rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
              <p className="text-sm text-gray-500 mt-1">Supervision des bookings</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Navigation mois */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousMonth}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm font-medium text-gray-900 min-w-[140px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextMonth}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              {/* Toggle vue */}
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    viewMode === "month"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Mois
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    viewMode === "week"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Semaine
                </button>
              </div>

              {/* Bouton Export */}
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="size-4" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card className="rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedArtist} onValueChange={setSelectedArtist}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Artiste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les artistes</SelectItem>
                {artists.map(artist => (
                  <SelectItem key={artist} value={artist}>
                    {artist}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
                <SelectItem value="unavailable">Indisponible</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-gray-600"
            >
              Réinitialiser
            </Button>

            <div className="ml-auto">
              <Badge variant="outline" className="bg-gray-50">
                {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout principal avec calendrier et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendrier principal */}
        <div className="lg:col-span-3">
          <Card className="rounded-xl">
            <CardContent className="p-6">
              {/* En-têtes des jours */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map(day => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="min-h-[120px]" />;
                  }

                  const dayEvents = getEventsForDay(day);
                  const isToday = 
                    day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();

                  return (
                    <div
                      key={day}
                      className={`min-h-[120px] border border-gray-200 rounded-lg p-2 ${
                        isToday ? "bg-blue-50 border-blue-300" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium ${
                            isToday ? "text-blue-600" : "text-gray-900"
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => {
                          const statusConfig = getStatusConfig(event.status);
                          return (
                            <button
                              key={event.id}
                              onClick={() => handleEventClick(event)}
                              className="w-full text-left p-1.5 rounded-md hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-start gap-1.5">
                                <div
                                  className={`size-2 rounded-full mt-1 flex-shrink-0 ${statusConfig.color}`}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate group-hover:text-gray-700">
                                    {event.artistName}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {event.city}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <p className="text-xs text-gray-500 pl-1">
                            +{dayEvents.length - 2} autre{dayEvents.length - 2 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bloc Alertes */}
        <div className="lg:col-span-1">
          <Card className="rounded-xl border-orange-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="size-5 text-orange-600" />
                Alertes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAlerts.map(alert => (
                <div
                  key={alert.id}
                  className="p-3 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-orange-900">
                      {alert.count}
                    </span>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                      {alert.type === "conflict" ? "Conflit" : "Alerte"}
                    </Badge>
                  </div>
                  <p className="text-xs text-orange-700">{alert.message}</p>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-orange-700 hover:bg-orange-50"
              >
                Voir détails
              </Button>
            </CardContent>
          </Card>

          {/* Légende */}
          <Card className="rounded-xl mt-6">
            <CardHeader>
              <CardTitle className="text-base">Légende</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Confirmé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-orange-500" />
                <span className="text-sm text-gray-600">En attente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600">Annulé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-gray-400" />
                <span className="text-sm text-gray-600">Indisponible</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drawer de détail */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              Détail du booking
            </SheetTitle>
            <SheetDescription>
              Informations détaillées sur le booking sélectionné.
            </SheetDescription>
          </SheetHeader>

          {selectedEvent && (
            <div className="space-y-6 mt-6">
              {/* Informations principales */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Artiste</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedEvent.artistName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Organisateur</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedEvent.organizerName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Date & Heure</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedEvent.date)}
                    </p>
                    <p className="text-sm text-gray-600">{selectedEvent.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedEvent.eventType}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Ville</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedEvent.city}
                  </p>
                  {selectedEvent.venue && (
                    <p className="text-sm text-gray-600">{selectedEvent.venue}</p>
                  )}
                </div>

                {selectedEvent.budget && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Budget</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedEvent.budget.toLocaleString()} MAD
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Statut</p>
                  <Badge className={getStatusConfig(selectedEvent.status).className}>
                    {getStatusConfig(selectedEvent.status).label}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <Button
                  className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white"
                  onClick={() => {
                    // Action modifier statut
                  }}
                >
                  Modifier statut
                </Button>

                {selectedEvent.requestId && (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      navigate(`/admin/booking-requests/detail/${selectedEvent.requestId}`);
                      setIsDrawerOpen(false);
                    }}
                  >
                    <MessageSquare className="size-4" />
                    Voir la conversation
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    // Action bloquer la date
                  }}
                >
                  <Lock className="size-4" />
                  Bloquer la date
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => {
                    // Action annuler booking
                  }}
                >
                  <Ban className="size-4" />
                  Annuler le booking
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}