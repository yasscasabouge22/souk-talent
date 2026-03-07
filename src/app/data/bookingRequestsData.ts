export interface TimelineEvent {
  id: string;
  type: "created" | "accepted" | "refused" | "confirmed" | "cancelled" | "modified" | "response";
  title: string;
  description: string;
  timestamp: string;
  actor: "artist" | "organizer" | "system";
  actorName?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: "contract" | "rider" | "quote" | "other";
  url: string;
  uploadedBy: "artist" | "organizer";
  uploadedAt: string;
}

export interface Report {
  id: string;
  reportedBy: "artist" | "organizer";
  reporterName: string;
  reason: string;
  date: string;
  status: "pending" | "resolved" | "dismissed";
  moderationNotes?: string;
}

export interface BookingRequestDetail {
  id: string;
  requestNumber: string;
  status: "pending" | "accepted" | "confirmed" | "refused" | "cancelled";
  
  // Artist info
  artist: {
    id: string;
    name: string;
    avatar: string;
    status: "approved" | "pending" | "suspended";
    category: string;
  };
  
  // Organizer info
  organizer: {
    id: string;
    name: string;
    avatar: string;
    status: "active" | "suspended" | "verified";
    type: "individual" | "company";
  };
  
  // Event details
  event: {
    type: string;
    date: string;
    time: string;
    city: string;
    venue?: string;
    duration?: string;
  };
  
  // Budget
  budget: {
    proposed: number;
    artistRate?: number;
    currency: string;
  };
  
  // Initial message
  initialMessage: {
    content: string;
    timestamp: string;
  };
  
  // Timeline
  timeline: TimelineEvent[];
  
  // Attachments
  attachments: Attachment[];
  
  // System info
  systemInfo: {
    createdAt: string;
    organizerIP: string;
    artistIP?: string;
    previousRequestsBetween: number;
    totalOrganizerRequests: number;
    totalArtistRequests: number;
  };
  
  // Risk assessment
  risk: {
    level: "normal" | "warning" | "danger";
    flags: string[];
    organizerReports: number;
    artistReports: number;
  };
  
  // Reports
  reports?: Report[];
  
  // Admin notes
  adminNotes?: string;
  isDisputed: boolean;
}

export const mockBookingRequests: Record<string, BookingRequestDetail> = {
  "1": {
    id: "1",
    requestNumber: "BR-1045",
    status: "pending",
    artist: {
      id: "artist-1",
      name: "DJ Mehdi",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      status: "approved",
      category: "DJ",
    },
    organizer: {
      id: "org-1",
      name: "Events Maroc",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      status: "verified",
      type: "company",
    },
    event: {
      type: "Mariage",
      date: "2025-03-15",
      time: "20:00",
      city: "Casablanca",
      venue: "Hôtel Hyatt Regency",
      duration: "4 heures",
    },
    budget: {
      proposed: 15000,
      artistRate: 18000,
      currency: "MAD",
    },
    initialMessage: {
      content: "Bonjour, je souhaite réserver vos services pour animer un mariage le 15 mars 2025 à Casablanca. L'événement aura lieu à l'Hôtel Hyatt Regency de 20h à minuit. Nous attendons environ 200 invités. Notre budget est de 15 000 MAD. Merci de me confirmer votre disponibilité.",
      timestamp: "2025-02-20T10:30:00",
    },
    timeline: [
      {
        id: "t1",
        type: "created",
        title: "Demande créée",
        description: "L'organisateur a envoyé une demande de booking",
        timestamp: "2025-02-20T10:30:00",
        actor: "organizer",
        actorName: "Events Maroc",
      },
      {
        id: "t2",
        type: "response",
        title: "Artiste a consulté",
        description: "L'artiste a ouvert la demande",
        timestamp: "2025-02-20T14:15:00",
        actor: "artist",
        actorName: "DJ Mehdi",
      },
    ],
    attachments: [],
    systemInfo: {
      createdAt: "2025-02-20T10:30:00",
      organizerIP: "105.159.43.21",
      artistIP: "105.159.12.87",
      previousRequestsBetween: 0,
      totalOrganizerRequests: 12,
      totalArtistRequests: 45,
    },
    risk: {
      level: "normal",
      flags: [],
      organizerReports: 0,
      artistReports: 0,
    },
    isDisputed: false,
  },
  "2": {
    id: "2",
    requestNumber: "BR-1046",
    status: "accepted",
    artist: {
      id: "artist-2",
      name: "Saad Lamjarred Tribute",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150",
      status: "approved",
      category: "Chanteur",
    },
    organizer: {
      id: "org-2",
      name: "Festival Mawazine",
      avatar: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=150",
      status: "verified",
      type: "company",
    },
    event: {
      type: "Festival",
      date: "2025-04-10",
      time: "21:00",
      city: "Rabat",
      venue: "Scène OLM Souissi",
      duration: "90 minutes",
    },
    budget: {
      proposed: 50000,
      artistRate: 45000,
      currency: "MAD",
    },
    initialMessage: {
      content: "Nous organisons le Festival Mawazine 2025 et souhaiterions vous inviter à performer sur la scène OLM Souissi le 10 avril. Durée de performance : 90 minutes. Budget : 50 000 MAD TTC.",
      timestamp: "2025-02-18T09:00:00",
    },
    timeline: [
      {
        id: "t1",
        type: "created",
        title: "Demande créée",
        description: "L'organisateur a envoyé une demande de booking",
        timestamp: "2025-02-18T09:00:00",
        actor: "organizer",
        actorName: "Festival Mawazine",
      },
      {
        id: "t2",
        type: "accepted",
        title: "Demande acceptée",
        description: "L'artiste a accepté la demande",
        timestamp: "2025-02-18T15:30:00",
        actor: "artist",
        actorName: "Saad Lamjarred Tribute",
      },
    ],
    attachments: [
      {
        id: "att1",
        name: "Contrat_Festival_Mawazine.pdf",
        type: "contract",
        url: "#",
        uploadedBy: "organizer",
        uploadedAt: "2025-02-19T10:00:00",
      },
      {
        id: "att2",
        name: "Rider_Technique.pdf",
        type: "rider",
        url: "#",
        uploadedBy: "artist",
        uploadedAt: "2025-02-19T16:30:00",
      },
    ],
    systemInfo: {
      createdAt: "2025-02-18T09:00:00",
      organizerIP: "105.159.88.44",
      artistIP: "105.159.77.23",
      previousRequestsBetween: 2,
      totalOrganizerRequests: 156,
      totalArtistRequests: 78,
    },
    risk: {
      level: "normal",
      flags: [],
      organizerReports: 0,
      artistReports: 0,
    },
    isDisputed: false,
  },
  "3": {
    id: "3",
    requestNumber: "BR-1047",
    status: "refused",
    artist: {
      id: "artist-3",
      name: "Groupe Fusion",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150",
      status: "approved",
      category: "Groupe Live",
    },
    organizer: {
      id: "org-3",
      name: "Mohamed Alami",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      status: "active",
      type: "individual",
    },
    event: {
      type: "Anniversaire",
      date: "2025-03-05",
      time: "19:00",
      city: "Marrakech",
      venue: "Villa privée",
      duration: "3 heures",
    },
    budget: {
      proposed: 3000,
      artistRate: 12000,
      currency: "MAD",
    },
    initialMessage: {
      content: "Bonjour, j'organise un anniversaire le 5 mars à Marrakech. Budget de 3000 MAD pour 3h de musique.",
      timestamp: "2025-02-22T11:00:00",
    },
    timeline: [
      {
        id: "t1",
        type: "created",
        title: "Demande créée",
        description: "L'organisateur a envoyé une demande de booking",
        timestamp: "2025-02-22T11:00:00",
        actor: "organizer",
        actorName: "Mohamed Alami",
      },
      {
        id: "t2",
        type: "refused",
        title: "Demande refusée",
        description: "L'artiste a refusé : Budget insuffisant",
        timestamp: "2025-02-22T13:45:00",
        actor: "artist",
        actorName: "Groupe Fusion",
      },
    ],
    attachments: [],
    systemInfo: {
      createdAt: "2025-02-22T11:00:00",
      organizerIP: "196.200.12.45",
      artistIP: "105.159.33.12",
      previousRequestsBetween: 0,
      totalOrganizerRequests: 1,
      totalArtistRequests: 23,
    },
    risk: {
      level: "warning",
      flags: [
        "Budget anormalement bas (75% sous le tarif artiste)",
        "Premier événement de cet organisateur",
      ],
      organizerReports: 0,
      artistReports: 0,
    },
    isDisputed: false,
  },
  "4": {
    id: "4",
    requestNumber: "BR-1048",
    status: "cancelled",
    artist: {
      id: "artist-4",
      name: "DJ Sophia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "approved",
      category: "DJ",
    },
    organizer: {
      id: "org-4",
      name: "Club Diamond",
      avatar: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=150",
      status: "active",
      type: "company",
    },
    event: {
      type: "Soirée Club",
      date: "2025-02-28",
      time: "23:00",
      city: "Casablanca",
      venue: "Club Diamond",
      duration: "5 heures",
    },
    budget: {
      proposed: 8000,
      artistRate: 8000,
      currency: "MAD",
    },
    initialMessage: {
      content: "Réservation pour une soirée au Club Diamond le 28 février de 23h à 4h du matin. 8000 MAD comme convenu.",
      timestamp: "2025-02-15T16:00:00",
    },
    timeline: [
      {
        id: "t1",
        type: "created",
        title: "Demande créée",
        description: "L'organisateur a envoyé une demande de booking",
        timestamp: "2025-02-15T16:00:00",
        actor: "organizer",
        actorName: "Club Diamond",
      },
      {
        id: "t2",
        type: "accepted",
        title: "Demande acceptée",
        description: "L'artiste a accepté la demande",
        timestamp: "2025-02-15T18:30:00",
        actor: "artist",
        actorName: "DJ Sophia",
      },
      {
        id: "t3",
        type: "cancelled",
        title: "Demande annulée",
        description: "L'organisateur a annulé : Changement de programmation",
        timestamp: "2025-02-23T09:15:00",
        actor: "organizer",
        actorName: "Club Diamond",
      },
    ],
    attachments: [],
    systemInfo: {
      createdAt: "2025-02-15T16:00:00",
      organizerIP: "105.159.55.67",
      artistIP: "105.159.44.33",
      previousRequestsBetween: 8,
      totalOrganizerRequests: 45,
      totalArtistRequests: 89,
    },
    risk: {
      level: "normal",
      flags: [],
      organizerReports: 0,
      artistReports: 0,
    },
    isDisputed: false,
  },
  "5": {
    id: "5",
    requestNumber: "BR-1049",
    status: "confirmed",
    artist: {
      id: "artist-5",
      name: "Orchestre Andalou",
      avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150",
      status: "approved",
      category: "Orchestre",
    },
    organizer: {
      id: "org-5",
      name: "Ministère de la Culture",
      avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150",
      status: "verified",
      type: "company",
    },
    event: {
      type: "Concert Public",
      date: "2025-05-20",
      time: "20:30",
      city: "Fès",
      venue: "Théâtre Mohammed V",
      duration: "2 heures",
    },
    budget: {
      proposed: 35000,
      artistRate: 32000,
      currency: "MAD",
    },
    initialMessage: {
      content: "Dans le cadre de la Fête de la Musique 2025, nous souhaitons programmer votre orchestre au Théâtre Mohammed V à Fès. Concert le 20 mai à 20h30. Budget : 35 000 MAD. Merci de confirmer.",
      timestamp: "2025-01-10T14:00:00",
    },
    timeline: [
      {
        id: "t1",
        type: "created",
        title: "Demande créée",
        description: "L'organisateur a envoyé une demande de booking",
        timestamp: "2025-01-10T14:00:00",
        actor: "organizer",
        actorName: "Ministère de la Culture",
      },
      {
        id: "t2",
        type: "accepted",
        title: "Demande acceptée",
        description: "L'artiste a accepté la demande",
        timestamp: "2025-01-12T09:30:00",
        actor: "artist",
        actorName: "Orchestre Andalou",
      },
      {
        id: "t3",
        type: "confirmed",
        title: "Demande confirmée",
        description: "Contrat signé et acompte versé",
        timestamp: "2025-01-20T11:00:00",
        actor: "system",
      },
    ],
    attachments: [
      {
        id: "att1",
        name: "Contrat_Ministere_Culture.pdf",
        type: "contract",
        url: "#",
        uploadedBy: "organizer",
        uploadedAt: "2025-01-15T10:00:00",
      },
      {
        id: "att2",
        name: "Rider_Technique_Orchestre.pdf",
        type: "rider",
        url: "#",
        uploadedBy: "artist",
        uploadedAt: "2025-01-16T14:30:00",
      },
      {
        id: "att3",
        name: "Devis_Final.pdf",
        type: "quote",
        url: "#",
        uploadedBy: "artist",
        uploadedAt: "2025-01-17T09:00:00",
      },
    ],
    systemInfo: {
      createdAt: "2025-01-10T14:00:00",
      organizerIP: "41.250.12.88",
      artistIP: "105.159.66.54",
      previousRequestsBetween: 5,
      totalOrganizerRequests: 234,
      totalArtistRequests: 112,
    },
    risk: {
      level: "normal",
      flags: [],
      organizerReports: 0,
      artistReports: 0,
    },
    isDisputed: false,
  },
  "6": {
    id: "6",
    requestNumber: "BR-1050",
    status: "accepted",
    artist: {
      id: "artist-6",
      name: "MC Hamza",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      status: "approved",
      category: "Rappeur",
    },
    organizer: {
      id: "org-6",
      name: "Ahmed Bennani",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "active",
      type: "individual",
    },
    event: {
      type: "Événement Privé",
      date: "2025-03-25",
      time: "18:00",
      city: "Tanger",
      venue: "Villa privée",
      duration: "2 heures",
    },
    budget: {
      proposed: 2500,
      artistRate: 10000,
      currency: "MAD",
    },
    initialMessage: {
      content: "Salut, je veux te réserver pour mon anniversaire le 25 mars à Tanger. Mon budget c'est 2500 MAD max. Tu peux faire 2h ?",
      timestamp: "2025-02-24T20:15:00",
    },
    timeline: [
      {
        id: "t1",
        type: "created",
        title: "Demande créée",
        description: "L'organisateur a envoyé une demande de booking",
        timestamp: "2025-02-24T20:15:00",
        actor: "organizer",
        actorName: "Ahmed Bennani",
      },
      {
        id: "t2",
        type: "accepted",
        title: "Demande acceptée",
        description: "L'artiste a accepté malgré le budget réduit",
        timestamp: "2025-02-24T21:30:00",
        actor: "artist",
        actorName: "MC Hamza",
      },
    ],
    attachments: [],
    systemInfo: {
      createdAt: "2025-02-24T20:15:00",
      organizerIP: "196.200.33.77",
      artistIP: "105.159.22.11",
      previousRequestsBetween: 0,
      totalOrganizerRequests: 2,
      totalArtistRequests: 67,
    },
    risk: {
      level: "danger",
      flags: [
        "Budget anormalement bas (75% sous le tarif artiste)",
        "Organisateur avec seulement 2 demandes totales",
        "Message informel et langage non professionnel",
        "Organisateur signalé 2 fois pour non-paiement",
        "Multiples demandes similaires en 24h",
      ],
      organizerReports: 2,
      artistReports: 0,
    },
    reports: [
      {
        id: "rep1",
        reportedBy: "artist",
        reporterName: "Autre artiste",
        reason: "Non-paiement après prestation",
        date: "2025-02-10T10:30:00",
        status: "pending",
      },
    ],
    isDisputed: true,
    adminNotes: "⚠️ Organisateur à surveiller - Historique de non-paiement signalé par 2 artistes différents. Vérifier avant toute validation.",
  },
};
