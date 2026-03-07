// Types pour l'espace artiste

export interface BookingRequest {
  id: string;
  organizerName: string;
  organizerAvatar: string;
  organizerEmail: string;
  organizerPhone: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  city: string;
  budget?: string;
  message: string;
  formula?: string;
  status: "pending" | "accepted" | "declined" | "expired";
  receivedAt: string;
  responses?: {
    id: string;
    from: "artist" | "organizer";
    message: string;
    sentAt: string;
  }[];
}

export interface ArtistStats {
  profileViews: number;
  newRequests: number;
  pendingRequests: number;
  isProfessionalized: boolean;
}

export interface CalendarEvent {
  id: string;
  date: string;
  status: "available" | "unavailable" | "hold" | "confirmed";
  title?: string; // Titre de l'événement
  eventType?: string;
  client?: string;
  note?: string;
  organizerId?: string; // Ajout pour lier avec l'organisateur
  organizerName?: string; // Nom de l'organisateur
  organizerAvatar?: string; // Avatar de l'organisateur
  organizerEmail?: string;
  organizerPhone?: string;
  organizerCompany?: string;
  location?: string;
  city?: string;
  eventTime?: string;
  budget?: string;
  requestId?: string; // Lien vers la demande de réservation
  isPublic?: boolean; // Si l'événement est public
  flyerUrl?: string; // URL du flyer pour événement public
  ticketLink?: string; // Lien vers la billeterie
  artistId?: string; // ID de l'artiste
  artistName?: string; // Nom de l'artiste
}

export interface ProfessionalizationRequest {
  status: "not_activated" | "requested" | "scheduled" | "active";
  requestedAt?: string;
  scheduledDate?: string;
  city?: string;
  note?: string;
}

// Mock data pour l'artiste connecté (exemple: DJ Mehdi El Alami)
export const currentArtistId = "1";

export const mockBookingRequests: BookingRequest[] = [
  {
    id: "req-1",
    organizerName: "Sarah Bennani",
    organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    organizerEmail: "sarah.bennani@email.com",
    organizerPhone: "+212 6 12 34 56 78",
    eventType: "Mariage",
    eventDate: "2026-02-14",
    eventTime: "20:00",
    location: "Villa des Arts",
    city: "Casablanca",
    budget: "12000 DH",
    message: "Bonjour, nous organisons notre mariage et aimerions vous avoir comme DJ pour animer la soirée. Environ 150 invités attendus.",
    formula: "Formule Premium - 15000 DH",
    status: "pending",
    receivedAt: "2026-01-10T14:30:00",
    responses: [],
  },
  {
    id: "req-2",
    organizerName: "Karim Amrani",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    organizerEmail: "k.amrani@company.ma",
    organizerPhone: "+212 6 23 45 67 89",
    eventType: "Événement Corporate",
    eventDate: "2026-01-25",
    eventTime: "18:00",
    location: "Sofitel Casablanca",
    city: "Casablanca",
    budget: "8000 DH",
    message: "Soirée de fin d'année de notre entreprise. Ambiance lounge pour 80 personnes.",
    status: "pending",
    receivedAt: "2026-01-09T10:15:00",
  },
  {
    id: "req-3",
    organizerName: "Fatima Zohra",
    organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    organizerEmail: "fatimazohra@gmail.com",
    organizerPhone: "+212 6 34 56 78 90",
    eventType: "Anniversaire",
    eventDate: "2026-02-20",
    location: "Villa privée",
    city: "Rabat",
    message: "Anniversaire de mes 30 ans, ambiance house et électro.",
    status: "accepted",
    receivedAt: "2026-01-05T16:45:00",
    responses: [
      {
        id: "resp-1",
        from: "artist",
        message: "Merci pour votre demande ! Je serais ravi d'animer votre anniversaire. Je vous propose ma formule standard à 7500 DH.",
        sentAt: "2026-01-05T18:00:00",
      },
      {
        id: "resp-2",
        from: "organizer",
        message: "Parfait ! C'est confirmé.",
        sentAt: "2026-01-05T19:30:00",
      },
    ],
  },
  {
    id: "req-4",
    organizerName: "Omar Idrissi",
    organizerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    organizerEmail: "omar.idrissi@outlook.com",
    organizerPhone: "+212 6 45 67 89 01",
    eventType: "Soirée privée",
    eventDate: "2026-01-15",
    location: "Résidence privée",
    city: "Marrakech",
    budget: "6000 DH",
    message: "Petite soirée entre amis, 40 personnes.",
    status: "declined",
    receivedAt: "2026-01-03T09:20:00",
    responses: [
      {
        id: "resp-3",
        from: "artist",
        message: "Merci pour votre demande, malheureusement je ne suis pas disponible à cette date.",
        sentAt: "2026-01-03T11:00:00",
      },
    ],
  },
];

export const mockArtistStats: ArtistStats = {
  profileViews: 342,
  newRequests: 2,
  pendingRequests: 2,
  isProfessionalized: false,
};

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    date: "2026-02-20",
    status: "confirmed",
    eventType: "Anniversaire",
    client: "Fatima Zohra",
    note: "Anniversaire 30 ans - Villa Rabat",
    organizerId: "org-3",
    organizerName: "Fatima Zohra",
    organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    organizerEmail: "fatimazohra@gmail.com",
    organizerPhone: "+212 6 34 56 78 90",
    location: "Villa privée",
    city: "Rabat",
    eventTime: "20:00",
    budget: "7500 DH",
    requestId: "req-3",
  },
  {
    id: "cal-2",
    date: "2026-02-14",
    status: "hold",
    eventType: "Mariage",
    client: "Sarah Bennani",
    note: "En attente de confirmation",
    organizerId: "org-1",
    organizerName: "Sarah Bennani",
    organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    organizerEmail: "sarah.bennani@email.com",
    organizerPhone: "+212 6 12 34 56 78",
    location: "Villa des Arts",
    city: "Casablanca",
    eventTime: "20:00",
    budget: "12000 DH",
    requestId: "req-1",
  },
  {
    id: "cal-3",
    date: "2026-01-18",
    status: "unavailable",
    note: "Vacances personnelles",
  },
  {
    id: "cal-4",
    date: "2026-01-19",
    status: "unavailable",
    note: "Vacances personnelles",
  },
  {
    id: "cal-5",
    date: "2026-03-15",
    status: "confirmed",
    eventType: "Événement Corporate",
    client: "Karim Amrani",
    note: "Soirée entreprise",
    organizerId: "org-2",
    organizerName: "Karim Amrani",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    organizerEmail: "k.amrani@company.ma",
    organizerPhone: "+212 6 23 45 67 89",
    organizerCompany: "Company XYZ",
    location: "Sofitel Casablanca",
    city: "Casablanca",
    eventTime: "18:00",
    budget: "8000 DH",
    requestId: "req-2",
  },
  {
    id: "cal-6",
    date: "2026-04-05",
    status: "confirmed",
    eventType: "Concert / Club",
    note: "Soirée House Music au Pacha Marrakech",
    location: "Pacha Marrakech",
    city: "Marrakech",
    eventTime: "23:00",
    isPublic: true,
    flyerUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    ticketLink: "https://www.example.com/tickets",
    artistId: "1",
    artistName: "DJ Mehdi El Alami",
  },
  {
    id: "cal-7",
    date: "2026-05-20",
    status: "confirmed",
    eventType: "Festival",
    note: "Oasis Festival 2026",
    location: "The Source",
    city: "Marrakech",
    eventTime: "22:00",
    isPublic: true,
    flyerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    ticketLink: "https://www.example.com/oasis-tickets",
    artistId: "1",
    artistName: "DJ Mehdi El Alami",
  },
];

export const mockProfessionalizationRequest: ProfessionalizationRequest = {
  status: "not_activated",
};