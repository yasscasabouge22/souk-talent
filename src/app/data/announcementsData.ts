export interface Announcement {
  id: string;
  organizerId: string;
  organizerName: string;
  organizerAvatar: string;
  organizerCompany?: string;
  title: string;
  description: string;
  talentCategory: string; // DJ, Chanteur, Groupe Traditionnel, etc.
  eventType: string; // Mariage, Corporate, etc.
  eventDate: string;
  city: string;
  region: string;
  venue?: string;
  budgetMin: number;
  budgetMax: number;
  guestCount?: number;
  duration?: string;
  requirements?: string[];
  createdAt: string;
  expiresAt: string;
  status: "active" | "closed" | "expired";
  applicationsCount: number;
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    organizerId: "org-1",
    organizerName: "Sarah Bennani",
    organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    organizerCompany: "Luxury Events Maroc",
    title: "Recherche DJ pour mariage de luxe à Marrakech",
    description: "Nous organisons un mariage haut de gamme pour 300 invités dans un palace à Marrakech. Nous recherchons un DJ professionnel avec expérience dans les mariages de luxe, capable de mixer électro, house et musique orientale moderne.",
    talentCategory: "DJ",
    eventType: "Mariage",
    eventDate: "2026-06-15",
    city: "Marrakech",
    region: "Marrakech-Safi",
    venue: "La Mamounia",
    budgetMin: 15000,
    budgetMax: 25000,
    guestCount: 300,
    duration: "6 heures",
    requirements: [
      "Expérience minimum 5 ans",
      "Équipement professionnel",
      "Références vérifiables",
      "Playlist personnalisable"
    ],
    createdAt: "2026-02-01T10:00:00",
    expiresAt: "2026-03-01T23:59:59",
    status: "active",
    applicationsCount: 12,
  },
  {
    id: "ann-2",
    organizerId: "org-2",
    organizerName: "Ahmed El Fassi",
    organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    organizerCompany: "TechCorp Morocco",
    title: "Groupe traditionnel pour événement corporate",
    description: "Nous organisons un gala corporate pour célébrer les 20 ans de notre entreprise. Nous cherchons un groupe traditionnel marocain (Andalou/Gnawa) pour une prestation de 2 heures.",
    talentCategory: "Groupe Traditionnel",
    eventType: "Corporate",
    eventDate: "2026-03-20",
    city: "Casablanca",
    region: "Grand Casablanca",
    venue: "Hôtel Hyatt Regency",
    budgetMin: 12000,
    budgetMax: 18000,
    guestCount: 200,
    duration: "2 heures",
    requirements: [
      "Tenue traditionnelle",
      "Répertoire varié",
      "Sonorisation incluse"
    ],
    createdAt: "2026-01-30T14:30:00",
    expiresAt: "2026-02-28T23:59:59",
    status: "active",
    applicationsCount: 8,
  },
  {
    id: "ann-3",
    organizerId: "org-3",
    organizerName: "Karim Alaoui",
    organizerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    title: "Chanteur pour soirée privée à Rabat",
    description: "Soirée d'anniversaire privée dans une villa à Rabat. Recherche chanteur(se) avec répertoire français, anglais et arabe pour ambiance lounge et festive.",
    talentCategory: "Chanteur",
    eventType: "Soirée privée",
    eventDate: "2026-03-10",
    city: "Rabat",
    region: "Rabat-Salé-Kénitra",
    venue: "Villa privée",
    budgetMin: 8000,
    budgetMax: 12000,
    guestCount: 80,
    duration: "3 heures",
    requirements: [
      "Répertoire varié",
      "Micro et sonorisation",
      "Expérience soirées privées"
    ],
    createdAt: "2026-02-02T09:00:00",
    expiresAt: "2026-03-05T23:59:59",
    status: "active",
    applicationsCount: 15,
  },
  {
    id: "ann-4",
    organizerId: "org-4",
    organizerName: "Nadia Tazi",
    organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    organizerCompany: "Tazi Events",
    title: "Orchestre pour mariage à Fès",
    description: "Grand mariage traditionnel à Fès avec 400 invités. Recherche orchestre complet pour animer toute la soirée avec musique marocaine et orientale.",
    talentCategory: "Orchestre",
    eventType: "Mariage",
    eventDate: "2026-05-22",
    city: "Fès",
    region: "Fès-Meknès",
    venue: "Palais Jamai",
    budgetMin: 25000,
    budgetMax: 35000,
    guestCount: 400,
    duration: "5 heures",
    requirements: [
      "Minimum 8 musiciens",
      "Répertoire traditionnel et moderne",
      "Équipement son et lumière complet"
    ],
    createdAt: "2026-01-28T16:00:00",
    expiresAt: "2026-04-01T23:59:59",
    status: "active",
    applicationsCount: 6,
  },
  {
    id: "ann-5",
    organizerId: "org-5",
    organizerName: "Youssef Berrada",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    organizerCompany: "Club Anfa",
    title: "DJ résident pour club à Casablanca",
    description: "Le Club Anfa recherche un DJ résident pour animer nos soirées du week-end. Style house, deep house, techno.",
    talentCategory: "DJ",
    eventType: "Club",
    eventDate: "2026-03-01",
    city: "Casablanca",
    region: "Grand Casablanca",
    venue: "Club Anfa",
    budgetMin: 5000,
    budgetMax: 8000,
    duration: "4 heures par soirée",
    requirements: [
      "Matériel Pioneer DJ",
      "Expérience club",
      "Mix live obligatoire"
    ],
    createdAt: "2026-01-25T11:00:00",
    expiresAt: "2026-02-25T23:59:59",
    status: "active",
    applicationsCount: 22,
  },
];

export const categories = [
  "Tous",
  "DJ",
  "Chanteur",
  "Groupe tradi",
  "Live Band",
  "Animateur & Spectacle",
  "Musicien Solo",
];

export const eventTypes = [
  "Tous",
  "Mariage",
  "Corporate",
  "Soirée privée",
  "Club",
  "Festival",
  "Anniversaire",
];