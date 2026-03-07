export interface BookingEvent {
  id: string;
  artistName: string;
  artistId: string;
  organizerName: string;
  organizerId: string;
  eventType: string;
  city: string;
  venue?: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "unavailable";
  budget?: number;
  requestId: string;
}

export const mockBookingEvents: BookingEvent[] = [
  {
    id: "evt-1",
    artistName: "DJ Mehdi",
    artistId: "artist-1",
    organizerName: "Events Maroc",
    organizerId: "org-1",
    eventType: "Mariage",
    city: "Casablanca",
    venue: "Hôtel Hyatt Regency",
    date: "2025-03-15",
    time: "20:00",
    status: "confirmed",
    budget: 15000,
    requestId: "1",
  },
  {
    id: "evt-2",
    artistName: "Saad Lamjarred Tribute",
    artistId: "artist-2",
    organizerName: "Festival Mawazine",
    organizerId: "org-2",
    eventType: "Festival",
    city: "Rabat",
    venue: "Scène OLM Souissi",
    date: "2025-03-10",
    time: "21:00",
    status: "confirmed",
    budget: 50000,
    requestId: "2",
  },
  {
    id: "evt-3",
    artistName: "DJ Sophia",
    artistId: "artist-4",
    organizerName: "Club Diamond",
    organizerId: "org-4",
    eventType: "Soirée Club",
    city: "Casablanca",
    venue: "Club Diamond",
    date: "2025-03-08",
    time: "23:00",
    status: "cancelled",
    budget: 8000,
    requestId: "4",
  },
  {
    id: "evt-4",
    artistName: "Orchestre Andalou",
    artistId: "artist-5",
    organizerName: "Ministère de la Culture",
    organizerId: "org-5",
    eventType: "Concert Public",
    city: "Fès",
    venue: "Théâtre Mohammed V",
    date: "2025-03-20",
    time: "20:30",
    status: "confirmed",
    budget: 35000,
    requestId: "5",
  },
  {
    id: "evt-5",
    artistName: "MC Hamza",
    artistId: "artist-6",
    organizerName: "Ahmed Bennani",
    organizerId: "org-6",
    eventType: "Événement Privé",
    city: "Tanger",
    venue: "Villa privée",
    date: "2025-03-25",
    time: "18:00",
    status: "pending",
    budget: 2500,
    requestId: "6",
  },
  {
    id: "evt-6",
    artistName: "DJ Mehdi",
    artistId: "artist-1",
    organizerName: "Private Event",
    organizerId: "org-7",
    eventType: "Soirée Privée",
    city: "Marrakech",
    venue: "Palais Privé",
    date: "2025-03-22",
    time: "19:00",
    status: "confirmed",
    budget: 18000,
    requestId: "7",
  },
  {
    id: "evt-7",
    artistName: "Groupe Fusion",
    artistId: "artist-3",
    organizerName: "N/A",
    organizerId: "",
    eventType: "Indisponible",
    city: "N/A",
    date: "2025-03-12",
    time: "00:00",
    status: "unavailable",
    requestId: "",
  },
  {
    id: "evt-8",
    artistName: "DJ Sophia",
    artistId: "artist-4",
    organizerName: "Beach Club",
    organizerId: "org-8",
    eventType: "Soirée Club",
    city: "Agadir",
    venue: "Beach Club Agadir",
    date: "2025-03-18",
    time: "22:00",
    status: "pending",
    budget: 12000,
    requestId: "8",
  },
  {
    id: "evt-9",
    artistName: "Orchestre Andalou",
    artistId: "artist-5",
    organizerName: "N/A",
    organizerId: "",
    eventType: "Indisponible",
    city: "N/A",
    date: "2025-03-05",
    time: "00:00",
    status: "unavailable",
    requestId: "",
  },
  {
    id: "evt-10",
    artistName: "MC Hamza",
    artistId: "artist-6",
    organizerName: "Youth Club",
    organizerId: "org-9",
    eventType: "Concert",
    city: "Casablanca",
    venue: "Club Jeunesse",
    date: "2025-03-28",
    time: "20:00",
    status: "confirmed",
    budget: 8000,
    requestId: "9",
  },
];

export interface Alert {
  id: string;
  type: "conflict" | "no_response" | "warning";
  message: string;
  count: number;
}

export const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    type: "conflict",
    message: "Bookings en conflit",
    count: 2,
  },
  {
    id: "alert-2",
    type: "no_response",
    message: "Demandes sans réponse depuis 72h",
    count: 5,
  },
];
