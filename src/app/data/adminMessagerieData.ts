export interface Message {
  id: string;
  sender: "artist" | "organizer";
  senderName: string;
  content: string;
  timestamp: string;
}

export interface Report {
  id: string;
  date: string;
  reportedBy: "artist" | "organizer";
  reporterName: string;
  reporterId: string;
  concernedName: string;
  concernedId: string;
  concernedType: "artist" | "organizer";
  reason: string;
  comment: string;
  bookingId?: string;
  bookingReference?: string;
  status: "new" | "in_progress" | "resolved" | "rejected";
  conversation: Message[];
  adminNotes?: string;
}

export interface Dispute {
  id: string;
  bookingReference: string;
  bookingId: string;
  artistName: string;
  artistId: string;
  organizerName: string;
  organizerId: string;
  problem: string;
  status: "pending" | "negotiating" | "resolved" | "escalated";
  createdAt: string;
}

export interface WatchedAccount {
  id: string;
  name: string;
  type: "artist" | "organizer";
  reportsCount: number;
  bookingsCount: number;
  riskLevel: "low" | "medium" | "high";
  lastReportDate: string;
}

export interface MessagerieStats {
  activeReports: number;
  resolvedThisMonth: number;
  resolvedPercentage: number;
  watchedAccounts: number;
}

export const mockReports: Report[] = [
  {
    id: "rep-1",
    date: "2025-02-25T14:30:00",
    reportedBy: "organizer",
    reporterName: "Events Maroc",
    reporterId: "org-1",
    concernedName: "DJ Mehdi",
    concernedId: "artist-1",
    concernedType: "artist",
    reason: "Langage inapproprié",
    comment: "L'artiste a utilisé un langage déplacé dans la conversation et a fait preuve d'agressivité.",
    bookingId: "1",
    bookingReference: "BR-1045",
    status: "new",
    conversation: [
      {
        id: "msg-1",
        sender: "organizer",
        senderName: "Events Maroc",
        content: "Bonjour, je souhaite confirmer la date du 15 mars. Pouvez-vous m'envoyer le contrat?",
        timestamp: "2025-02-20T10:30:00",
      },
      {
        id: "msg-2",
        sender: "artist",
        senderName: "DJ Mehdi",
        content: "Vous me dérangez avec ça? J'ai déjà dit oui, arrêtez de me spammer!",
        timestamp: "2025-02-20T14:15:00",
      },
      {
        id: "msg-3",
        sender: "organizer",
        senderName: "Events Maroc",
        content: "Je comprends, mais j'ai besoin du contrat pour finaliser...",
        timestamp: "2025-02-20T15:00:00",
      },
      {
        id: "msg-4",
        sender: "artist",
        senderName: "DJ Mehdi",
        content: "Vous êtes vraiment insupportable. Débrouillez-vous!",
        timestamp: "2025-02-20T16:30:00",
      },
    ],
  },
  {
    id: "rep-2",
    date: "2025-02-24T09:15:00",
    reportedBy: "artist",
    reporterName: "MC Hamza",
    reporterId: "artist-6",
    concernedName: "Ahmed Bennani",
    concernedId: "org-6",
    concernedType: "organizer",
    reason: "Demande non professionnelle",
    comment: "L'organisateur propose un budget dérisoire et insiste de manière agressive.",
    bookingId: "6",
    bookingReference: "BR-1050",
    status: "in_progress",
    conversation: [
      {
        id: "msg-1",
        sender: "organizer",
        senderName: "Ahmed Bennani",
        content: "Salut, je veux te réserver pour 2500 MAD. C'est bon?",
        timestamp: "2025-02-24T20:15:00",
      },
      {
        id: "msg-2",
        sender: "artist",
        senderName: "MC Hamza",
        content: "Mon tarif minimum est 10 000 MAD pour un événement privé.",
        timestamp: "2025-02-24T20:45:00",
      },
      {
        id: "msg-3",
        sender: "organizer",
        senderName: "Ahmed Bennani",
        content: "T'es sérieux? C'est juste 2h de musique! Allez 3000 max.",
        timestamp: "2025-02-24T21:00:00",
      },
      {
        id: "msg-4",
        sender: "artist",
        senderName: "MC Hamza",
        content: "Désolé, je ne peux pas accepter ce tarif.",
        timestamp: "2025-02-24T21:15:00",
      },
      {
        id: "msg-5",
        sender: "organizer",
        senderName: "Ahmed Bennani",
        content: "Vous les artistes vous vous prenez pour qui? Ok j'irai voir ailleurs.",
        timestamp: "2025-02-24T21:30:00",
      },
    ],
    adminNotes: "Organisateur connu pour proposer des budgets bas. Déjà 2 signalements similaires.",
  },
  {
    id: "rep-3",
    date: "2025-02-22T16:45:00",
    reportedBy: "artist",
    reporterName: "Groupe Fusion",
    reporterId: "artist-3",
    concernedName: "Mohamed Alami",
    concernedId: "org-3",
    concernedType: "organizer",
    reason: "Non-paiement",
    comment: "L'organisateur n'a pas payé l'acompte promis après acceptation.",
    bookingId: "3",
    bookingReference: "BR-1047",
    status: "in_progress",
    conversation: [
      {
        id: "msg-1",
        sender: "organizer",
        senderName: "Mohamed Alami",
        content: "Parfait, je confirme le booking. Je vous envoie l'acompte demain.",
        timestamp: "2025-02-10T11:00:00",
      },
      {
        id: "msg-2",
        sender: "artist",
        senderName: "Groupe Fusion",
        content: "Merci! J'attends le virement pour bloquer la date.",
        timestamp: "2025-02-10T14:00:00",
      },
      {
        id: "msg-3",
        sender: "artist",
        senderName: "Groupe Fusion",
        content: "Bonjour, avez-vous fait le virement? Cela fait 5 jours.",
        timestamp: "2025-02-15T10:00:00",
      },
      {
        id: "msg-4",
        sender: "artist",
        senderName: "Groupe Fusion",
        content: "Toujours pas de nouvelles. Je dois libérer la date si pas de paiement.",
        timestamp: "2025-02-20T09:00:00",
      },
    ],
  },
  {
    id: "rep-4",
    date: "2025-02-18T11:20:00",
    reportedBy: "organizer",
    reporterName: "Club Diamond",
    reporterId: "org-4",
    concernedName: "DJ Sophia",
    concernedId: "artist-4",
    reason: "Annulation tardive",
    comment: "L'artiste a annulé 48h avant l'événement sans raison valable.",
    bookingId: "4",
    bookingReference: "BR-1048",
    status: "resolved",
    conversation: [
      {
        id: "msg-1",
        sender: "organizer",
        senderName: "Club Diamond",
        content: "Tout est confirmé pour samedi?",
        timestamp: "2025-02-26T10:00:00",
      },
      {
        id: "msg-2",
        sender: "artist",
        senderName: "DJ Sophia",
        content: "Désolée, je dois annuler. J'ai un imprévu.",
        timestamp: "2025-02-26T14:00:00",
      },
      {
        id: "msg-3",
        sender: "organizer",
        senderName: "Club Diamond",
        content: "Quoi?! C'est dans 2 jours! Vous ne pouvez pas faire ça!",
        timestamp: "2025-02-26T14:30:00",
      },
    ],
    adminNotes: "Résolu - Artiste a présenté un certificat médical. Pas de sanction.",
  },
  {
    id: "rep-5",
    date: "2025-02-15T08:00:00",
    reportedBy: "artist",
    reporterName: "Orchestre Andalou",
    reporterId: "artist-5",
    concernedName: "Fake Organizer",
    concernedId: "org-10",
    concernedType: "organizer",
    reason: "Fraude suspectée",
    comment: "L'organisateur demande des informations bancaires avant toute confirmation.",
    status: "resolved",
    conversation: [
      {
        id: "msg-1",
        sender: "organizer",
        senderName: "Fake Organizer",
        content: "Bonjour, envoyez-moi votre RIB pour virement.",
        timestamp: "2025-02-14T10:00:00",
      },
      {
        id: "msg-2",
        sender: "artist",
        senderName: "Orchestre Andalou",
        content: "Pouvons-nous d'abord discuter des détails du booking?",
        timestamp: "2025-02-14T11:00:00",
      },
      {
        id: "msg-3",
        sender: "organizer",
        senderName: "Fake Organizer",
        content: "Non, j'ai besoin du RIB maintenant pour sécuriser la date.",
        timestamp: "2025-02-14T12:00:00",
      },
    ],
    adminNotes: "Compte organisateur suspendu - Activité frauduleuse confirmée.",
  },
];

export const mockDisputes: Dispute[] = [
  {
    id: "disp-1",
    bookingReference: "BR-1045",
    bookingId: "1",
    artistName: "DJ Mehdi",
    artistId: "artist-1",
    organizerName: "Events Maroc",
    organizerId: "org-1",
    problem: "Désaccord sur la durée de prestation",
    status: "negotiating",
    createdAt: "2025-02-25T10:00:00",
  },
  {
    id: "disp-2",
    bookingReference: "BR-1047",
    bookingId: "3",
    artistName: "Groupe Fusion",
    artistId: "artist-3",
    organizerName: "Mohamed Alami",
    organizerId: "org-3",
    problem: "Non-paiement de l'acompte",
    status: "escalated",
    createdAt: "2025-02-22T16:00:00",
  },
  {
    id: "disp-3",
    bookingReference: "BR-1048",
    bookingId: "4",
    artistName: "DJ Sophia",
    artistId: "artist-4",
    organizerName: "Club Diamond",
    organizerId: "org-4",
    problem: "Annulation tardive",
    status: "resolved",
    createdAt: "2025-02-18T11:00:00",
  },
];

export const mockWatchedAccounts: WatchedAccount[] = [
  {
    id: "watch-1",
    name: "Ahmed Bennani",
    type: "organizer",
    reportsCount: 3,
    bookingsCount: 2,
    riskLevel: "high",
    lastReportDate: "2025-02-24T09:15:00",
  },
  {
    id: "watch-2",
    name: "DJ Mehdi",
    type: "artist",
    reportsCount: 2,
    bookingsCount: 45,
    riskLevel: "medium",
    lastReportDate: "2025-02-25T14:30:00",
  },
  {
    id: "watch-3",
    name: "Mohamed Alami",
    type: "organizer",
    reportsCount: 2,
    bookingsCount: 1,
    riskLevel: "medium",
    lastReportDate: "2025-02-22T16:45:00",
  },
  {
    id: "watch-4",
    name: "Fake Organizer",
    type: "organizer",
    reportsCount: 5,
    bookingsCount: 0,
    riskLevel: "high",
    lastReportDate: "2025-02-15T08:00:00",
  },
];

export const mockMessagerieStats: MessagerieStats = {
  activeReports: 3,
  resolvedThisMonth: 12,
  resolvedPercentage: 80,
  watchedAccounts: 4,
};
