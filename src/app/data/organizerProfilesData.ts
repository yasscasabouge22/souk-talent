export interface OrganizerProfile {
  id: string;
  name: string;
  avatar: string;
  type: "company" | "individual";
  city: string;
  memberSince: string;
  verified: boolean;
  about?: string;
  stats: {
    totalRequests: number;
    confirmedBookings: number;
    acceptanceRate: number;
    cancellations: number;
    lastActivity: string;
  };
  budgetInfo: {
    averageBudget: number;
    budgetRange: {
      min: number;
      max: number;
    };
    frequentCategories: Array<{
      name: string;
      count: number;
    }>;
  };
  reliability: {
    score: number; // 0-100
    status: "excellent" | "good" | "average" | "poor";
    factors: Array<{
      label: string;
      positive: boolean;
    }>;
  };
}

export const mockOrganizerProfiles: Record<string, OrganizerProfile> = {
  "req-1": {
    id: "org-1",
    name: "Events & Co Marrakech",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=EC&backgroundColor=1DB954",
    type: "company",
    city: "Marrakech",
    memberSince: "Mars 2024",
    verified: true,
    about:
      "Agence événementielle spécialisée dans l'organisation de mariages et événements corporate à Marrakech. Nous travaillons avec les meilleurs artistes de la région.",
    stats: {
      totalRequests: 34,
      confirmedBookings: 28,
      acceptanceRate: 82,
      cancellations: 2,
      lastActivity: "il y a 3 heures",
    },
    budgetInfo: {
      averageBudget: 4200,
      budgetRange: {
        min: 3500,
        max: 6000,
      },
      frequentCategories: [
        { name: "DJ", count: 15 },
        { name: "Groupe live", count: 8 },
        { name: "Percussionniste", count: 5 },
      ],
    },
    reliability: {
      score: 88,
      status: "excellent",
      factors: [
        { label: "Aucun signalement actif", positive: true },
        { label: "Historique stable", positive: true },
        { label: "Annulations faibles (6%)", positive: true },
        { label: "Compte actif depuis 11 mois", positive: true },
        { label: "Paiements à temps", positive: true },
      ],
    },
  },
  "req-2": {
    id: "org-2",
    name: "Youssef Bennani",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef",
    type: "individual",
    city: "Casablanca",
    memberSince: "Janvier 2025",
    verified: true,
    about: undefined,
    stats: {
      totalRequests: 5,
      confirmedBookings: 4,
      acceptanceRate: 80,
      cancellations: 0,
      lastActivity: "il y a 2 jours",
    },
    budgetInfo: {
      averageBudget: 3000,
      budgetRange: {
        min: 2500,
        max: 3500,
      },
      frequentCategories: [
        { name: "DJ", count: 3 },
        { name: "Violoniste", count: 1 },
      ],
    },
    reliability: {
      score: 75,
      status: "good",
      factors: [
        { label: "Aucun signalement actif", positive: true },
        { label: "Nouveau compte (2 mois)", positive: false },
        { label: "Aucune annulation", positive: true },
        { label: "Réponses rapides", positive: true },
      ],
    },
  },
  "req-3": {
    id: "org-3",
    name: "Prestige Events",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PE&backgroundColor=3b82f6",
    type: "company",
    city: "Rabat",
    memberSince: "Juillet 2024",
    verified: true,
    about:
      "Organisation d'événements corporate et privés haut de gamme. Spécialistes des soirées VIP et lancements de produits.",
    stats: {
      totalRequests: 23,
      confirmedBookings: 18,
      acceptanceRate: 78,
      cancellations: 1,
      lastActivity: "il y a 1 jour",
    },
    budgetInfo: {
      averageBudget: 5500,
      budgetRange: {
        min: 4000,
        max: 8000,
      },
      frequentCategories: [
        { name: "Groupe live", count: 10 },
        { name: "DJ", count: 6 },
        { name: "Orchestre", count: 2 },
      ],
    },
    reliability: {
      score: 85,
      status: "excellent",
      factors: [
        { label: "Aucun signalement actif", positive: true },
        { label: "Historique stable", positive: true },
        { label: "Annulations très faibles (4%)", positive: true },
        { label: "Compte actif depuis 8 mois", positive: true },
      ],
    },
  },
  "req-4": {
    id: "org-4",
    name: "Amina Tazi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
    type: "individual",
    city: "Tanger",
    memberSince: "Novembre 2024",
    verified: false,
    stats: {
      totalRequests: 3,
      confirmedBookings: 2,
      acceptanceRate: 67,
      cancellations: 0,
      lastActivity: "il y a 5 jours",
    },
    budgetInfo: {
      averageBudget: 2500,
      budgetRange: {
        min: 2000,
        max: 3000,
      },
      frequentCategories: [{ name: "DJ", count: 2 }],
    },
    reliability: {
      score: 62,
      status: "average",
      factors: [
        { label: "Aucun signalement actif", positive: true },
        { label: "Compte récent (3 mois)", positive: false },
        { label: "Peu d'activité", positive: false },
        { label: "Compte non vérifié", positive: false },
      ],
    },
  },
};
