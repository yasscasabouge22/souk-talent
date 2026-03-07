// Mock data pour les agents et leurs détails

export interface AgentPermission {
  read_messages: boolean;
  reply_messages: boolean;
  manage_availability: boolean;
  accept_refuse_requests: boolean;
  edit_profile: boolean;
  manage_contracts: boolean;
}

export interface ArtistAccess {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistStatus: "pending" | "approved" | "refused";
  permissions: AgentPermission;
  invitationDate: string;
  grantedBy: string;
  lastAction: string;
  lastActionDate: string;
}

export interface AgentActivity {
  id: string;
  timestamp: string;
  action: string;
  type: "message" | "booking" | "availability" | "profile" | "contract";
  artistName?: string;
  details: string;
}

export interface AgentStats {
  activeAccess: number;
  revokedAccess: number;
  requestsManaged: number;
  acceptanceRate: number;
  relatedReports: number;
}

export interface AccessLevel {
  read_messages: boolean;
  reply_messages: boolean;
  manage_requests: boolean;
  manage_availability: boolean;
  edit_profile: boolean;
  full_access: boolean;
}

export interface AgentAlert {
  id: string;
  type: "high_access" | "unusual_ip" | "failed_attempts" | "sensitive_changes";
  severity: "warning" | "critical";
  message: string;
  timestamp: string;
}

export interface AgentDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "active" | "suspended";
  memberSince: string;
  lastLogin: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  artistAccess: ArtistAccess[];
  recentActivity: AgentActivity[];
  stats: AgentStats;
  alerts: AgentAlert[];
  activityStatus: "normal" | "monitor" | "critical";
}

export const mockAgentsDetails: Record<string, AgentDetail> = {
  "1": {
    id: "1",
    name: "Hassan Benali",
    email: "hassan.benali@example.com",
    phone: "+212 6 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    status: "active",
    memberSince: "Janvier 2024",
    lastLogin: "Il y a 2h",
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: true,
    stats: {
      activeAccess: 2,
      revokedAccess: 1,
      requestsManaged: 14,
      acceptanceRate: 72,
      relatedReports: 0,
    },
    activityStatus: "normal",
    artistAccess: [
      {
        id: "access-1",
        artistId: "artist-1",
        artistName: "DJ Khalid",
        artistAvatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150",
        artistStatus: "approved",
        permissions: {
          read_messages: true,
          reply_messages: true,
          manage_availability: true,
          accept_refuse_requests: true,
          edit_profile: false,
          manage_contracts: false,
        },
        invitationDate: "15 Jan 2024",
        grantedBy: "DJ Khalid",
        lastAction: "A répondu à demande #BR-1021",
        lastActionDate: "Il y a 2h",
      },
      {
        id: "access-2",
        artistId: "artist-2",
        artistName: "Samira Voice",
        artistAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        artistStatus: "approved",
        permissions: {
          read_messages: true,
          reply_messages: true,
          manage_availability: true,
          accept_refuse_requests: false,
          edit_profile: false,
          manage_contracts: false,
        },
        invitationDate: "20 Jan 2024",
        grantedBy: "Samira Voice",
        lastAction: "A mis une date en hold",
        lastActionDate: "Il y a 5h",
      },
      {
        id: "access-3",
        artistId: "artist-3",
        artistName: "Omar Flow",
        artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        artistStatus: "approved",
        permissions: {
          read_messages: false,
          reply_messages: false,
          manage_availability: false,
          accept_refuse_requests: false,
          edit_profile: false,
          manage_contracts: false,
        },
        invitationDate: "10 Jan 2024",
        grantedBy: "Omar Flow",
        lastAction: "Accès révoqué",
        lastActionDate: "Il y a 3 jours",
      },
    ],
    recentActivity: [
      {
        id: "act-1",
        timestamp: "12:03",
        action: "A répondu à demande #BR-1021",
        type: "booking",
        artistName: "DJ Khalid",
        details: "Demande acceptée pour événement à Marrakech",
      },
      {
        id: "act-2",
        timestamp: "12:10",
        action: "A envoyé message à Organisateur X",
        type: "message",
        artistName: "DJ Khalid",
        details: "Discussion sur les détails techniques",
      },
      {
        id: "act-3",
        timestamp: "12:45",
        action: "A mis une date en hold",
        type: "availability",
        artistName: "Samira Voice",
        details: "25 Février 2026 - Hold pour 48h",
      },
      {
        id: "act-4",
        timestamp: "13:00",
        action: "A accepté demande #BR-1023",
        type: "booking",
        artistName: "DJ Khalid",
        details: "Événement privé à Casablanca",
      },
      {
        id: "act-5",
        timestamp: "14:30",
        action: "A modifié disponibilités",
        type: "availability",
        artistName: "Samira Voice",
        details: "Ajouté disponibilités Mars 2026",
      },
    ],
    alerts: [],
  },
  "2": {
    id: "2",
    name: "Fatima Agency",
    email: "contact@fatimaagency.ma",
    phone: "+212 6 98 76 54 32",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "active",
    memberSince: "Novembre 2023",
    lastLogin: "Il y a 1 jour",
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    stats: {
      activeAccess: 5,
      revokedAccess: 2,
      requestsManaged: 42,
      acceptanceRate: 85,
      relatedReports: 0,
    },
    activityStatus: "monitor",
    artistAccess: [
      {
        id: "access-4",
        artistId: "artist-4",
        artistName: "Youssef Band",
        artistAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        artistStatus: "approved",
        permissions: {
          read_messages: true,
          reply_messages: true,
          manage_availability: true,
          accept_refuse_requests: true,
          edit_profile: true,
          manage_contracts: true,
        },
        invitationDate: "5 Déc 2023",
        grantedBy: "Youssef Band",
        lastAction: "A négocié un contrat",
        lastActionDate: "Il y a 1 jour",
      },
      {
        id: "access-5",
        artistId: "artist-5",
        artistName: "Amina Chaoui",
        artistAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        artistStatus: "approved",
        permissions: {
          read_messages: true,
          reply_messages: true,
          manage_availability: true,
          accept_refuse_requests: true,
          edit_profile: false,
          manage_contracts: false,
        },
        invitationDate: "15 Déc 2023",
        grantedBy: "Amina Chaoui",
        lastAction: "A envoyé 5 messages",
        lastActionDate: "Il y a 1 jour",
      },
    ],
    recentActivity: [
      {
        id: "act-6",
        timestamp: "09:15",
        action: "A négocié tarif pour demande #BR-2045",
        type: "contract",
        artistName: "Youssef Band",
        details: "Proposition tarifaire acceptée",
      },
      {
        id: "act-7",
        timestamp: "10:30",
        action: "A répondu à 5 messages",
        type: "message",
        artistName: "Amina Chaoui",
        details: "Conversations avec organisateurs",
      },
    ],
    alerts: [
      {
        id: "alert-1",
        type: "high_access",
        severity: "warning",
        message: "Cet agent gère plus de 5 artistes",
        timestamp: "Il y a 2 jours",
      },
      {
        id: "alert-2",
        type: "sensitive_changes",
        severity: "warning",
        message: "Modifications fréquentes de contrats (8 en 7 jours)",
        timestamp: "Il y a 1 jour",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Karim Productions",
    email: "karim@productions.ma",
    phone: "+212 6 55 44 33 22",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "suspended",
    memberSince: "Octobre 2023",
    lastLogin: "Il y a 5 jours",
    emailVerified: true,
    phoneVerified: false,
    twoFactorEnabled: false,
    stats: {
      activeAccess: 0,
      revokedAccess: 5,
      requestsManaged: 23,
      acceptanceRate: 45,
      relatedReports: 3,
    },
    activityStatus: "critical",
    artistAccess: [],
    recentActivity: [
      {
        id: "act-8",
        timestamp: "5j",
        action: "Compte suspendu",
        type: "profile",
        details: "Suspension suite à signalements multiples",
      },
    ],
    alerts: [
      {
        id: "alert-3",
        type: "failed_attempts",
        severity: "critical",
        message: "12 tentatives de connexion échouées",
        timestamp: "Il y a 6 jours",
      },
      {
        id: "alert-4",
        type: "unusual_ip",
        severity: "critical",
        message: "Connexions depuis 5 IPs différentes en 24h",
        timestamp: "Il y a 7 jours",
      },
    ],
  },
};