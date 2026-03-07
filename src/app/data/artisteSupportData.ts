export interface ArtisteSupportTicket {
  id: string;
  date: string;
  subject: string;
  category: "technique" | "compte" | "reservation" | "messagerie" | "profil" | "autre";
  status: "nouveau" | "en_cours" | "attente_reponse" | "resolu" | "ferme";
  message: string;
  conversationHistory: {
    id: string;
    sender: "artiste" | "support";
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export const mockArtisteSupportTickets: ArtisteSupportTicket[] = [
  {
    id: "T-1247",
    date: "2025-02-26T10:30:00",
    subject: "Impossible de modifier mon calendrier de disponibilités",
    category: "technique",
    status: "attente_reponse",
    message: "Bonjour, depuis hier je ne peux plus modifier mon calendrier de disponibilités. À chaque fois que j'essaie de bloquer une date, la page se recharge et rien n'est enregistré. J'ai plusieurs demandes en attente et je dois bloquer certaines dates urgentes. Merci de votre aide rapide.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "artiste",
        senderName: "DJ Mehdi Atlas",
        message: "Bonjour, depuis hier je ne peux plus modifier mon calendrier de disponibilités. À chaque fois que j'essaie de bloquer une date, la page se recharge et rien n'est enregistré. J'ai plusieurs demandes en attente et je dois bloquer certaines dates urgentes. Merci de votre aide rapide.",
        timestamp: "2025-02-26T10:30:00",
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Support Souk Talent",
        message: "Bonjour ! Merci pour votre message. Je comprends que c'est urgent. Pouvez-vous me préciser quel navigateur vous utilisez ? Et est-ce que vous avez des messages d'erreur qui s'affichent ?",
        timestamp: "2025-02-26T11:15:00",
      },
    ],
  },
  {
    id: "T-1243",
    date: "2025-02-25T11:45:00",
    subject: "Problème de connexion - mot de passe oublié",
    category: "compte",
    status: "resolu",
    message: "Je n'arrive plus à me connecter. J'ai cliqué sur 'Mot de passe oublié' mais je ne reçois pas l'email de réinitialisation. J'ai vérifié dans mes spams, rien.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "artiste",
        senderName: "Hamza Gnawa Fusion",
        message: "Je n'arrive plus à me connecter. J'ai cliqué sur 'Mot de passe oublié' mais je ne reçois pas l'email de réinitialisation. J'ai vérifié dans mes spams, rien.",
        timestamp: "2025-02-25T11:45:00",
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Support Souk Talent",
        message: "Bonjour Hamza, je vais vous renvoyer un lien de réinitialisation manuellement. Vérifiez votre boîte email dans quelques minutes. Si vous ne le recevez toujours pas, merci de me confirmer.",
        timestamp: "2025-02-25T11:50:00",
      },
      {
        id: "msg-3",
        sender: "artiste",
        senderName: "Hamza Gnawa Fusion",
        message: "Email reçu, merci ! C'est réglé maintenant.",
        timestamp: "2025-02-25T11:55:00",
      },
    ],
  },
  {
    id: "T-1236",
    date: "2025-02-20T14:30:00",
    subject: "Comment ajouter des vidéos à mon portfolio ?",
    category: "profil",
    status: "ferme",
    message: "Bonjour, j'aimerais ajouter des vidéos de mes performances à mon profil. Est-ce possible et comment faire ?",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "artiste",
        senderName: "Nadia Oriental Dance",
        message: "Bonjour, j'aimerais ajouter des vidéos de mes performances à mon profil. Est-ce possible et comment faire ?",
        timestamp: "2025-02-20T14:30:00",
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Support Souk Talent",
        message: "Bonjour Nadia ! Oui, vous pouvez ajouter des vidéos. Allez dans 'Mon Profil' > 'Portfolio' > 'Ajouter une vidéo'. Vous pouvez coller des liens YouTube, Vimeo ou Instagram. Si vous avez besoin d'aide, n'hésitez pas !",
        timestamp: "2025-02-20T14:45:00",
      },
      {
        id: "msg-3",
        sender: "artiste",
        senderName: "Nadia Oriental Dance",
        message: "Super, c'est fait ! Merci beaucoup.",
        timestamp: "2025-02-20T15:00:00",
      },
    ],
  },
];
