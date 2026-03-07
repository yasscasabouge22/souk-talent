export interface HistoryEntry {
  id: string;
  action: string;
  date: string;
  actor?: string;
  note?: string;
}

export interface DemandePro {
  id: string;
  date: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  city: string;
  availability: string;
  comment: string;
  status: "nouveau" | "contacte" | "planifie" | "realise" | "valide" | "refuse" | "annule";
  assignedTo?: string;
  scheduledDate?: string;
  internalNotes?: string;
  refusalReason?: string;
  history: HistoryEntry[];
}

export const mockDemandesPro: DemandePro[] = [
  {
    id: "dp-001",
    date: "2025-02-26T09:15:00",
    artistId: "artist-1",
    artistName: "DJ Mehdi",
    artistAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    city: "Casablanca",
    availability: "Disponible les lundis et mardis après-midi, préférence pour un rendez-vous en visio",
    comment: "Je souhaite passer au profil professionnel pour accéder à plus de fonctionnalités et améliorer ma visibilité.",
    status: "nouveau",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-26T09:15:00",
      },
    ],
  },
  {
    id: "dp-002",
    date: "2025-02-25T14:30:00",
    artistId: "artist-2",
    artistName: "Saad Lamjarred Tribute",
    artistAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150",
    city: "Rabat",
    availability: "Disponible tous les jours sauf week-end, de préférence le matin",
    comment: "J'ai déjà plusieurs bookings confirmés et je voudrais professionnaliser mon profil.",
    status: "contacte",
    assignedTo: "Admin Sarah",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-25T14:30:00",
      },
      {
        id: "h2",
        action: "Statut changé: Nouveau → Contacté",
        date: "2025-02-25T16:00:00",
        actor: "Admin Sarah",
      },
    ],
  },
  {
    id: "dp-003",
    date: "2025-02-24T11:00:00",
    artistId: "artist-5",
    artistName: "Orchestre Andalou",
    artistAvatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150",
    city: "Fès",
    availability: "Disponible mercredi 28 février à 15h ou jeudi 29 février à 10h",
    comment: "Notre orchestre existe depuis 15 ans. Nous voulons officialiser notre présence sur la plateforme.",
    status: "planifie",
    assignedTo: "Admin Karim",
    scheduledDate: "2025-02-28T15:00:00",
    internalNotes: "Vérifier les documents officiels de l'orchestre avant validation.",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-24T11:00:00",
      },
      {
        id: "h2",
        action: "Statut changé: Nouveau → Contacté",
        date: "2025-02-24T14:00:00",
        actor: "Admin Karim",
      },
      {
        id: "h3",
        action: "Statut changé: Contacté → Planifié",
        date: "2025-02-24T16:30:00",
        actor: "Admin Karim",
        note: "Rendez-vous planifié pour le 28 février à 15h",
      },
    ],
  },
  {
    id: "dp-004",
    date: "2025-02-23T10:00:00",
    artistId: "artist-4",
    artistName: "DJ Sophia",
    artistAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    city: "Casablanca",
    availability: "Flexible, disponible cette semaine",
    comment: "Je travaille déjà avec plusieurs clubs à Casablanca et je voudrais un profil pro.",
    status: "realise",
    assignedTo: "Admin Sarah",
    scheduledDate: "2025-02-26T10:00:00",
    internalNotes: "Entretien réalisé. Documents vérifiés. En attente de validation finale.",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-23T10:00:00",
      },
      {
        id: "h2",
        action: "Statut changé: Nouveau → Contacté",
        date: "2025-02-23T11:30:00",
        actor: "Admin Sarah",
      },
      {
        id: "h3",
        action: "Statut changé: Contacté → Planifié",
        date: "2025-02-23T14:00:00",
        actor: "Admin Sarah",
      },
      {
        id: "h4",
        action: "Statut changé: Planifié → Réalisé",
        date: "2025-02-26T11:00:00",
        actor: "Admin Sarah",
        note: "Entretien réalisé avec succès. Tous les critères sont remplis.",
      },
    ],
  },
  {
    id: "dp-005",
    date: "2025-02-22T16:20:00",
    artistId: "artist-6",
    artistName: "MC Hamza",
    artistAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    city: "Tanger",
    availability: "Disponible uniquement en soirée après 18h",
    comment: "Je veux le badge pro pour attirer plus d'événements corporates.",
    status: "valide",
    assignedTo: "Admin Karim",
    scheduledDate: "2025-02-25T18:30:00",
    internalNotes: "Profil validé. Badge Pro accordé le 26/02.",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-22T16:20:00",
      },
      {
        id: "h2",
        action: "Statut changé: Nouveau → Contacté",
        date: "2025-02-22T17:00:00",
        actor: "Admin Karim",
      },
      {
        id: "h3",
        action: "Statut changé: Contacté → Planifié",
        date: "2025-02-23T09:00:00",
        actor: "Admin Karim",
      },
      {
        id: "h4",
        action: "Statut changé: Planifié → Réalisé",
        date: "2025-02-25T19:00:00",
        actor: "Admin Karim",
      },
      {
        id: "h5",
        action: "Statut changé: Réalisé → Validé",
        date: "2025-02-26T10:00:00",
        actor: "Admin Karim",
        note: "Badge Professionnel accordé ✓",
      },
    ],
  },
  {
    id: "dp-006",
    date: "2025-02-21T13:45:00",
    artistId: "artist-3",
    artistName: "Groupe Fusion",
    artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150",
    city: "Marrakech",
    availability: "Disponible cette semaine, tous les jours",
    comment: "Nous voulons professionnaliser notre présence et accéder aux fonctionnalités avancées.",
    status: "refuse",
    assignedTo: "Admin Sarah",
    refusalReason: "Profil incomplet - Moins de 3 bookings réalisés sur la plateforme",
    internalNotes: "Demande refusée. Inviter à réessayer après avoir complété plus de bookings.",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-21T13:45:00",
      },
      {
        id: "h2",
        action: "Statut changé: Nouveau → Contacté",
        date: "2025-02-21T15:00:00",
        actor: "Admin Sarah",
      },
      {
        id: "h3",
        action: "Statut changé: Contacté → Refusé",
        date: "2025-02-21T16:30:00",
        actor: "Admin Sarah",
        note: "Profil incomplet - Moins de 3 bookings réalisés",
      },
    ],
  },
  {
    id: "dp-007",
    date: "2025-02-20T09:00:00",
    artistId: "artist-7",
    artistName: "Sara Vocals",
    artistAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    city: "Agadir",
    availability: "Disponible lundi et mercredi matin",
    comment: "Suite à plusieurs recommandations, je souhaite obtenir le statut professionnel.",
    status: "annule",
    assignedTo: "Admin Karim",
    internalNotes: "Demande annulée par l'artiste - A indiqué vouloir attendre encore quelques mois.",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-20T09:00:00",
      },
      {
        id: "h2",
        action: "Statut changé: Nouveau → Contacté",
        date: "2025-02-20T11:00:00",
        actor: "Admin Karim",
      },
      {
        id: "h3",
        action: "Statut changé: Contacté → Annulé",
        date: "2025-02-20T14:00:00",
        actor: "Admin Karim",
        note: "Demande annulée par l'artiste",
      },
    ],
  },
  {
    id: "dp-008",
    date: "2025-02-26T11:30:00",
    artistId: "artist-8",
    artistName: "Kamal Percussion",
    artistAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    city: "Rabat",
    availability: "Disponible jeudi et vendredi après-midi",
    comment: "Percussionniste professionnel depuis 20 ans. Je veux formaliser mon activité sur Souk Talent.",
    status: "nouveau",
    history: [
      {
        id: "h1",
        action: "Demande créée",
        date: "2025-02-26T11:30:00",
      },
    ],
  },
];

export interface DemandesProStats {
  nouvelles: number;
  total: number;
  enCours: number;
}

export const mockDemandesProStats: DemandesProStats = {
  nouvelles: 2,
  total: 8,
  enCours: 3,
};
