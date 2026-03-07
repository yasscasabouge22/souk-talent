export interface Artist {
  id: string;
  name: string;
  category: string;
  region: string;
  imageUrl: string;
  priceRange: string;
  rating: number;
  reviewsCount: number;
  description: string;
  isVerified?: boolean;
  availability: Date[];
  specialties: string[];
  experience: number;
  phoneNumber: string;
  email: string;
  instagram?: string;
  soundcloud?: string;
  presskit?: string;
  ficheTechnique?: string;
  gallery?: {
    photos: string[];
    videos: { url: string; title: string; thumbnail: string }[];
    audios: { url: string; title: string; duration: string }[];
  };
  formulas?: {
    name: string;
    description: string;
    instruments?: string;
    musicians: number;
    duration: string;
    price: string;
  }[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  organizerName: string;
  organizerAvatar: string;
  date: string;
  comment: string;
  ratings: {
    musique: number;
    professionnalisme: number;
    performanceScenique: number;
  };
  overallRating: number;
}

export const categories = [
  "Tous",
  "DJ",
  "Chanteur",
  "Groupe tradi",
  "Live Band",
  "Animateur & Spectacle",
  "Musicien Solo",
];

export const regions = [
  "Toutes les régions",
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Fès",
  "Agadir",
  "Meknès",
  "Oujda",
];

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "DJ Mehdi El Alami",
    category: "DJ",
    region: "Casablanca",
    imageUrl: "https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHBlcmZvcm1hbmNlJTIwbmlnaHR8ZW58MXx8fHwxNzY3NTIxNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "5000 - 15000 DH",
    rating: 4.8,
    reviewsCount: 127,
    description: "DJ professionnel spécialisé dans les événements corporatifs et mariages. Mix électro, house et commerciale.",
    isVerified: true,
    availability: [
      new Date(2026, 0, 10),
      new Date(2026, 0, 15),
      new Date(2026, 0, 20),
      new Date(2026, 0, 25),
      new Date(2026, 1, 5),
      new Date(2026, 1, 14),
    ],
    specialties: ["House", "Électro", "Commercial", "Mariage"],
    experience: 8,
    phoneNumber: "+212 6 12 34 56 78",
    email: "mehdi.alami@example.ma",
    instagram: "@dj_mehdi_elalami",
    soundcloud: "https://soundcloud.com/dj-mehdi-elalami",
    presskit: "https://example.com/presskit-mehdi-elalami.pdf",
    ficheTechnique: "https://example.com/fiche-technique-mehdi.pdf",
    gallery: {
      photos: [
        "https://images.unsplash.com/photo-1698153782147-07bb858d5232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHBlcmZvcm1hbmNlJTIwY29uY2VydHxlbnwxfHx8fDE3NjgwNDQwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1656369895489-e24a2d0816e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njc5NDgwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1738667289162-9e55132e18a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3Njc5NjE2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHBlcmZvcm1hbmNlJTIwbmlnaHR8ZW58MXx8fHwxNzY3NTIxNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      videos: [
        { url: "https://example.com/video1.mp4", title: "Performance Mariage Casa 2025", thumbnail: "https://images.unsplash.com/photo-1698153782147-07bb858d5232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHBlcmZvcm1hbmNlJTIwY29uY2VydHxlbnwxfHx8fDE3NjgwNDQwNTR8MA&ixlib=rb-4.1.0&q=80&w=400" },
        { url: "https://example.com/video2.mp4", title: "Mix Live Électro House", thumbnail: "https://images.unsplash.com/photo-1656369895489-e24a2d0816e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njc5NDgwNzd8MA&ixlib=rb-4.1.0&q=80&w=400" },
        { url: "https://example.com/video3.mp4", title: "Soirée Corporative", thumbnail: "https://images.unsplash.com/photo-1738667289162-9e55132e18a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3Njc5NjE2OTl8MA&ixlib=rb-4.1.0&q=80&w=400" },
      ],
      audios: [
        { url: "https://example.com/audio1.mp3", title: "Mix House Commercial 2025", duration: "45:23" },
        { url: "https://example.com/audio2.mp3", title: "Set Électro Progressive", duration: "38:15" },
        { url: "https://example.com/audio3.mp3", title: "Deep House Session", duration: "52:10" },
      ],
    },
    formulas: [
      {
        name: "Formula 1",
        description: "Mix Live Électro House",
        instruments: "DJ Set",
        musicians: 1,
        duration: "2h",
        price: "10000 DH",
      },
      {
        name: "Formula 2",
        description: "Soirée Corporative",
        instruments: "DJ Set",
        musicians: 1,
        duration: "3h",
        price: "15000 DH",
      },
    ],
    reviews: [
      {
        id: "1",
        organizerName: "M8TE agency",
        organizerAvatar: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjgwNzQ1MDJ8MA&ixlib=rb-4.1.0&q=80&w=200",
        date: "novembre 2025",
        comment: "3ème collaboration sur un événement avec DJ Mehdi et c'est toujours un succès auprès de nos clients.",
        ratings: {
          musique: 5.0,
          professionnalisme: 5.0,
          performanceScenique: 4.9,
        },
        overallRating: 5.0,
      },
      {
        id: "2",
        organizerName: "ECAM LaSalle",
        organizerAvatar: "https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2ODA1MDE5N3ww&ixlib=rb-4.1.0&q=80&w=200",
        date: "octobre 2025",
        comment: "Soirée de gala de la célébration anniversaire des 125 ans d'ECAM LaSalle - école d'ingénieur à Casablanca. Très bon DJ, professionnel...",
        ratings: {
          musique: 5.0,
          professionnalisme: 5.0,
          performanceScenique: 4.8,
        },
        overallRating: 4.9,
      },
    ],
  },
  {
    id: "2",
    name: "Orchestre Andaloussi",
    category: "Groupe Traditionnel",
    region: "Fès",
    imageUrl: "https://images.unsplash.com/photo-1764933513906-c91791738271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhbmQlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3Njc1NzE4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "10000 - 25000 DH",
    rating: 4.9,
    reviewsCount: 89,
    description: "Orchestre traditionnel spécialisé dans la musique andalouse et arabo-andalouse. Idéal pour les mariages traditionnels.",
    availability: [
      new Date(2026, 0, 12),
      new Date(2026, 0, 18),
      new Date(2026, 0, 22),
      new Date(2026, 1, 8),
      new Date(2026, 1, 15),
    ],
    specialties: ["Andalouse", "Chaabi", "Malhoun", "Mariage traditionnel"],
    experience: 15,
    phoneNumber: "+212 6 23 45 67 89",
    email: "contact@andaloussi.ma",
    gallery: {
      photos: [
        "https://images.unsplash.com/photo-1558286517-e60ea02e2db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1vcm9jY2FuJTIwbXVzaWN8ZW58MXx8fHwxNzY4MDQ0MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1639600312933-99347be81372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjgwNDQwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1764933513906-c91791738271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhbmQlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3Njc1NzE4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1656369895489-e24a2d0816e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njc5NDgwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      videos: [
        { url: "https://example.com/andaloussi-video1.mp4", title: "Mariage Traditionnel à Fès", thumbnail: "https://images.unsplash.com/photo-1558286517-e60ea02e2db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1vcm9jY2FuJTIwbXVzaWN8ZW58MXx8fHwxNzY4MDQ0MDU1fDA&ixlib=rb-4.1.0&q=80&w=400" },
        { url: "https://example.com/andaloussi-video2.mp4", title: "Nouba Andalouse Complète", thumbnail: "https://images.unsplash.com/photo-1639600312933-99347be81372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjgwNDQwNTV8MA&ixlib=rb-4.1.0&q=80&w=400" },
      ],
      audios: [
        { url: "https://example.com/andaloussi-audio1.mp3", title: "Malouf Andalou", duration: "28:45" },
        { url: "https://example.com/andaloussi-audio2.mp3", title: "Chaabi Traditionnel", duration: "32:18" },
        { url: "https://example.com/andaloussi-audio3.mp3", title: "Malhoun Classique", duration: "25:30" },
      ],
    },
    formulas: [
      {
        name: "Trio Andalou",
        description: "Formation idéale pour une soirée intime en petit comité.",
        instruments: "Oud - Violon - Chant",
        musicians: 3,
        duration: "2 heures",
        price: "à partir de 10000 DH",
      },
      {
        name: "Quintet Traditionnel",
        description: "Idéal pour une soirée festive et dansante.",
        instruments: "Oud - Violon - Chant - Percussions - Qanun",
        musicians: 5,
        duration: "2 heures",
        price: "à partir de 15000 DH",
      },
      {
        name: "Orchestre Complet",
        description: "Formation complète pour mariages et grands événements. Formule modulable jusqu'à 15 musiciens !",
        instruments: "Ensemble andalou complet avec chanteurs",
        musicians: 10,
        duration: "2 heures",
        price: "à partir de 25000 DH",
      },
    ],
  },
  {
    id: "3",
    name: "Fatima Zahra",
    category: "Chanteur",
    region: "Marrakech",
    imageUrl: "https://images.unsplash.com/photo-1567981964169-7c2597346322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMG11c2ljJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY3NTcxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "8000 - 20000 DH",
    rating: 4.7,
    reviewsCount: 156,
    description: "Chanteuse polyvalente, répertoire varié allant du chaabi au moderne. Spectacles énergiques et captivants.",
    availability: [
      new Date(2026, 0, 11),
      new Date(2026, 0, 16),
      new Date(2026, 0, 23),
      new Date(2026, 0, 30),
      new Date(2026, 1, 7),
      new Date(2026, 1, 20),
    ],
    specialties: ["Chaabi", "Pop", "Moderne", "Arabe"],
    experience: 10,
    phoneNumber: "+212 6 34 56 78 90",
    email: "fatimazahra@example.ma",
    gallery: {
      photos: [
        "https://images.unsplash.com/photo-1677947226901-5164b32d5cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBwZXJmb3JtYW5jZSUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzY4MDQ0MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1567981964169-7c2597346322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMG11c2ljJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY3NTcxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1656369895489-e24a2d0816e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njc5NDgwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1738667289162-9e55132e18a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3Njc5NjE2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      videos: [
        { url: "https://example.com/fatima-video1.mp4", title: "Concert Live Marrakech", thumbnail: "https://images.unsplash.com/photo-1677947226901-5164b32d5cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBwZXJmb3JtYW5jZSUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzY4MDQ0MDU1fDA&ixlib=rb-4.1.0&q=80&w=400" },
        { url: "https://example.com/fatima-video2.mp4", title: "Chaabi Medley", thumbnail: "https://images.unsplash.com/photo-1567981964169-7c2597346322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMG11c2ljJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY3NTcxODE2fDA&ixlib=rb-4.1.0&q=80&w=400" },
        { url: "https://example.com/fatima-video3.mp4", title: "Pop Arabe Performance", thumbnail: "https://images.unsplash.com/photo-1656369895489-e24a2d0816e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njc5NDgwNzd8MA&ixlib=rb-4.1.0&q=80&w=400" },
      ],
      audios: [
        { url: "https://example.com/fatima-audio1.mp3", title: "Ya Rayah - Cover", duration: "4:32" },
        { url: "https://example.com/fatima-audio2.mp3", title: "Medley Chaabi", duration: "18:45" },
        { url: "https://example.com/fatima-audio3.mp3", title: "Pop Moderne Mix", duration: "22:10" },
      ],
    },
    formulas: [
      {
        name: "Formula 1",
        description: "Concert Live Marrakech",
        instruments: "Chanteuse Solo",
        musicians: 1,
        duration: "1h30",
        price: "10000 DH",
      },
      {
        name: "Formula 2",
        description: "Pop Arabe Performance",
        instruments: "Chanteuse Solo",
        musicians: 1,
        duration: "2h",
        price: "15000 DH",
      },
    ],
  },
  {
    id: "4",
    name: "DJ Amine Beats",
    category: "DJ",
    region: "Rabat",
    imageUrl: "https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHBlcmZvcm1hbmNlJTIwbmlnaHR8ZW58MXx8fHwxNzY3NTIxNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "6000 - 18000 DH",
    rating: 4.6,
    reviewsCount: 94,
    description: "Expert en soirées privées et événements d'entreprise. Matériel son et lumière de haute qualité.",
    availability: [
      new Date(2026, 0, 9),
      new Date(2026, 0, 14),
      new Date(2026, 0, 21),
      new Date(2026, 0, 28),
      new Date(2026, 1, 6),
    ],
    specialties: ["RnB", "Hip-Hop", "Afrobeat", "Événement corporatif"],
    experience: 6,
    phoneNumber: "+212 6 45 67 89 01",
    email: "amine.beats@example.ma",
    formulas: [
      {
        name: "Formula 1",
        description: "Soirée Privée",
        instruments: "DJ Set",
        musicians: 1,
        duration: "2h",
        price: "10000 DH",
      },
      {
        name: "Formula 2",
        description: "Événement Corporatif",
        instruments: "DJ Set",
        musicians: 1,
        duration: "3h",
        price: "15000 DH",
      },
    ],
  },
  {
    id: "5",
    name: "Groupe Gnawa Essaouira",
    category: "Groupe Traditionnel",
    region: "Agadir",
    imageUrl: "https://images.unsplash.com/photo-1764933513906-c91791738271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJhbmQlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3Njc1NzE4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "7000 - 16000 DH",
    rating: 4.9,
    reviewsCount: 72,
    description: "Groupe authentique de musique Gnawa. Performances spirituelles et énergiques pour tous types d'événements.",
    isVerified: true,
    availability: [
      new Date(2026, 0, 13),
      new Date(2026, 0, 19),
      new Date(2026, 0, 26),
      new Date(2026, 1, 9),
      new Date(2026, 1, 16),
    ],
    specialties: ["Gnawa", "Spirituel", "Festival", "Événement culturel"],
    experience: 12,
    phoneNumber: "+212 6 56 78 90 12",
    email: "gnawa.essaouira@example.ma",
    formulas: [
      {
        name: "Formula 1",
        description: "Performance Spirituelle",
        instruments: "Groupe Gnawa",
        musicians: 10,
        duration: "2h",
        price: "15000 DH",
      },
      {
        name: "Formula 2",
        description: "Festival Gnawa",
        instruments: "Groupe Gnawa",
        musicians: 10,
        duration: "3h",
        price: "20000 DH",
      },
    ],
  },
  {
    id: "6",
    name: "Orchestre Variété Moderne",
    category: "Orchestre",
    region: "Casablanca",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY3NDY3MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "15000 - 35000 DH",
    rating: 4.8,
    reviewsCount: 103,
    description: "Orchestre complet avec chanteurs, musiciens et animateurs. Répertoire international et marocain.",
    availability: [
      new Date(2026, 0, 17),
      new Date(2026, 0, 24),
      new Date(2026, 0, 31),
      new Date(2026, 1, 14),
      new Date(2026, 1, 21),
    ],
    specialties: ["Variété", "International", "Mariage", "Gala"],
    experience: 20,
    phoneNumber: "+212 6 67 89 01 23",
    email: "orchestre.moderne@example.ma",
    formulas: [
      {
        name: "Formula 1",
        description: "Mariage",
        instruments: "Orchestre Complet",
        musicians: 20,
        duration: "2h",
        price: "20000 DH",
      },
      {
        name: "Formula 2",
        description: "Gala",
        instruments: "Orchestre Complet",
        musicians: 20,
        duration: "3h",
        price: "25000 DH",
      },
    ],
  },
  {
    id: "7",
    name: "Karim Animation",
    category: "Animateur",
    region: "Tanger",
    imageUrl: "https://images.unsplash.com/photo-1567981964169-7c2597346322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMG11c2ljJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY3NTcxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "3000 - 8000 DH",
    rating: 4.5,
    reviewsCount: 68,
    description: "Animateur professionnel pour anniversaires, événements d'entreprise et fêtes privées.",
    availability: [
      new Date(2026, 0, 10),
      new Date(2026, 0, 11),
      new Date(2026, 0, 17),
      new Date(2026, 0, 18),
      new Date(2026, 0, 24),
      new Date(2026, 0, 25),
      new Date(2026, 1, 1),
    ],
    specialties: ["Anniversaire", "Événement enfant", "Team building", "Animation"],
    experience: 5,
    phoneNumber: "+212 6 78 90 12 34",
    email: "karim.animation@example.ma",
    formulas: [
      {
        name: "Formula 1",
        description: "Anniversaire",
        instruments: "Animateur Solo",
        musicians: 1,
        duration: "1h30",
        price: "5000 DH",
      },
      {
        name: "Formula 2",
        description: "Team Building",
        instruments: "Animateur Solo",
        musicians: 1,
        duration: "2h",
        price: "8000 DH",
      },
    ],
  },
  {
    id: "8",
    name: "Groupe Fusion Band",
    category: "Groupe Moderne",
    region: "Marrakech",
    imageUrl: "https://images.unsplash.com/photo-1567981964169-7c2597346322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMG11c2ljJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY3NTcxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    priceRange: "12000 - 28000 DH",
    rating: 4.7,
    reviewsCount: 81,
    description: "Groupe moderne fusionnant musique traditionnelle marocaine et sonorités contemporaines.",
    availability: [
      new Date(2026, 0, 15),
      new Date(2026, 0, 22),
      new Date(2026, 0, 29),
      new Date(2026, 1, 12),
      new Date(2026, 1, 19),
    ],
    specialties: ["Fusion", "World Music", "Festival", "Concert"],
    experience: 7,
    phoneNumber: "+212 6 89 01 23 45",
    email: "fusion.band@example.ma",
    formulas: [
      {
        name: "Formula 1",
        description: "Festival",
        instruments: "Groupe Fusion",
        musicians: 10,
        duration: "2h",
        price: "15000 DH",
      },
      {
        name: "Formula 2",
        description: "Concert",
        instruments: "Groupe Fusion",
        musicians: 10,
        duration: "3h",
        price: "20000 DH",
      },
    ],
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Sara Benali",
    role: "Organisatrice de mariage",
    comment: "Service exceptionnel ! J'ai trouvé l'orchestre parfait pour mon mariage en quelques clics. La vérification de disponibilité en temps réel m'a fait gagner un temps précieux.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mohamed Tazi",
    role: "Directeur événementiel",
    comment: "Enfin une plateforme professionnelle pour le secteur. Plus besoin de passer par des intermédiaires. Contact direct et transparent avec les artistes.",
    rating: 5,
  },
  {
    id: "3",
    name: "Laila Amrani",
    role: "Entreprise",
    comment: "Nous avons organisé plusieurs événements corporatifs grâce à cette plateforme. Large choix d'artistes de qualité et processus très simple.",
    rating: 5,
  },
];