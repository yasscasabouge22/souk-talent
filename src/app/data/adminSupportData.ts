export interface SupportTicket {
  id: string;
  date: string;
  userName: string;
  userType: "artiste" | "organisateur";
  userEmail: string;
  subject: string;
  category: "technique" | "compte" | "reservation" | "paiement" | "autre";
  priority: "faible" | "normale" | "elevee" | "urgente";
  status: "nouveau" | "en_cours" | "attente_utilisateur" | "resolu" | "ferme";
  assignedTo: string;
  message: string;
  attachments?: string[];
  conversationHistory: {
    id: string;
    sender: "user" | "admin";
    senderName: string;
    message: string;
    timestamp: string;
  }[];
  internalNotes?: {
    id: string;
    author: string;
    note: string;
    timestamp: string;
  }[];
}

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "T-1247",
    date: "2025-02-26T10:30:00",
    userName: "DJ Mehdi Atlas",
    userType: "artiste",
    userEmail: "mehdi.atlas@email.com",
    subject: "Impossible de modifier mon calendrier de disponibilités",
    category: "technique",
    priority: "urgente",
    status: "nouveau",
    assignedTo: "-",
    message: "Bonjour, depuis hier je ne peux plus modifier mon calendrier de disponibilités. À chaque fois que j'essaie de bloquer une date, la page se recharge et rien n'est enregistré. J'ai plusieurs demandes en attente et je dois bloquer certaines dates urgentes. Merci de votre aide rapide.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "DJ Mehdi Atlas",
        message: "Bonjour, depuis hier je ne peux plus modifier mon calendrier de disponibilités. À chaque fois que j'essaie de bloquer une date, la page se recharge et rien n'est enregistré. J'ai plusieurs demandes en attente et je dois bloquer certaines dates urgentes. Merci de votre aide rapide.",
        timestamp: "2025-02-26T10:30:00",
      },
    ],
  },
  {
    id: "T-1246",
    date: "2025-02-26T09:15:00",
    userName: "Events Premium Marrakech",
    userType: "organisateur",
    userEmail: "contact@eventspremium.ma",
    subject: "Question sur le système de messagerie",
    category: "autre",
    priority: "normale",
    status: "en_cours",
    assignedTo: "Sarah Admin",
    message: "Bonjour, j'aimerais savoir comment fonctionne exactement le système de messagerie. Est-ce que les artistes reçoivent une notification email quand je leur envoie un message ? Merci.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Events Premium Marrakech",
        message: "Bonjour, j'aimerais savoir comment fonctionne exactement le système de messagerie. Est-ce que les artistes reçoivent une notification email quand je leur envoie un message ? Merci.",
        timestamp: "2025-02-26T09:15:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Sarah Admin",
        message: "Bonjour ! Oui tout à fait, lorsque vous envoyez un message à un artiste, il reçoit une notification par email immédiatement. Il peut aussi consulter tous ses messages directement dans sa messagerie sur la plateforme. Y a-t-il autre chose que je puisse vous expliquer ?",
        timestamp: "2025-02-26T09:45:00",
      },
    ],
    internalNotes: [
      {
        id: "note-1",
        author: "Sarah Admin",
        note: "Utilisateur très actif, bonne communication",
        timestamp: "2025-02-26T09:46:00",
      },
    ],
  },
  {
    id: "T-1245",
    date: "2025-02-25T16:20:00",
    userName: "Salma Vocals",
    userType: "artiste",
    userEmail: "salma.vocals@email.com",
    subject: "Ma photo de profil ne s'affiche pas",
    category: "technique",
    priority: "normale",
    status: "attente_utilisateur",
    assignedTo: "Youssef Admin",
    message: "Bonjour, j'ai téléchargé ma photo de profil mais elle n'apparaît toujours pas sur ma page artiste. J'ai essayé plusieurs fois avec des photos différentes mais ça ne fonctionne pas.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Salma Vocals",
        message: "Bonjour, j'ai téléchargé ma photo de profil mais elle n'apparaît toujours pas sur ma page artiste. J'ai essayé plusieurs fois avec des photos différentes mais ça ne fonctionne pas.",
        timestamp: "2025-02-25T16:20:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Youssef Admin",
        message: "Bonjour Salma, je vois le problème. Pouvez-vous vérifier que votre image fait moins de 5 Mo et qu'elle est au format JPG ou PNG ? Aussi, après le téléchargement, pensez-vous à cliquer sur 'Enregistrer' en bas de la page ?",
        timestamp: "2025-02-25T16:35:00",
      },
    ],
  },
  {
    id: "T-1244",
    date: "2025-02-25T14:10:00",
    userName: "Casa Events Production",
    userType: "organisateur",
    userEmail: "production@casaevents.ma",
    subject: "Demande de fonctionnalité : filtrer par disponibilité",
    category: "autre",
    priority: "faible",
    status: "resolu",
    assignedTo: "Karim Admin",
    message: "Bonjour, serait-il possible d'ajouter un filtre pour voir uniquement les artistes disponibles à une date précise ? Cela faciliterait beaucoup notre recherche. Merci !",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Casa Events Production",
        message: "Bonjour, serait-il possible d'ajouter un filtre pour voir uniquement les artistes disponibles à une date précise ? Cela faciliterait beaucoup notre recherche. Merci !",
        timestamp: "2025-02-25T14:10:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Karim Admin",
        message: "Bonjour ! Excellente suggestion, nous avons noté cette fonctionnalité dans notre roadmap. En attendant, vous pouvez consulter le calendrier de disponibilités de chaque artiste directement sur son profil. Merci pour votre feedback !",
        timestamp: "2025-02-25T14:25:00",
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Casa Events Production",
        message: "Parfait, merci pour votre réponse !",
        timestamp: "2025-02-25T14:30:00",
      },
    ],
  },
  {
    id: "T-1243",
    date: "2025-02-25T11:45:00",
    userName: "Hamza Gnawa Fusion",
    userType: "artiste",
    userEmail: "hamza.gnawa@email.com",
    subject: "Problème de connexion - mot de passe oublié",
    category: "compte",
    priority: "elevee",
    status: "resolu",
    assignedTo: "Sarah Admin",
    message: "Je n'arrive plus à me connecter. J'ai cliqué sur 'Mot de passe oublié' mais je ne reçois pas l'email de réinitialisation. J'ai vérifié dans mes spams, rien.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Hamza Gnawa Fusion",
        message: "Je n'arrive plus à me connecter. J'ai cliqué sur 'Mot de passe oublié' mais je ne reçois pas l'email de réinitialisation. J'ai vérifié dans mes spams, rien.",
        timestamp: "2025-02-25T11:45:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Sarah Admin",
        message: "Bonjour Hamza, je vais vous renvoyer un lien de réinitialisation manuellement. Vérifiez votre boîte email hamza.gnawa@email.com dans quelques minutes. Si vous ne le recevez toujours pas, merci de me confirmer.",
        timestamp: "2025-02-25T11:50:00",
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Hamza Gnawa Fusion",
        message: "Email reçu, merci ! C'est réglé maintenant.",
        timestamp: "2025-02-25T11:55:00",
      },
    ],
  },
  {
    id: "T-1242",
    date: "2025-02-25T09:00:00",
    userName: "Rabat Weddings Agency",
    userType: "organisateur",
    userEmail: "info@rabatweddings.ma",
    subject: "Mes demandes n'apparaissent pas dans mon historique",
    category: "technique",
    priority: "elevee",
    status: "en_cours",
    assignedTo: "Youssef Admin",
    message: "Bonjour, j'ai envoyé plusieurs demandes de réservation la semaine dernière mais elles n'apparaissent plus dans mon historique. Est-ce normal ? Je ne sais plus à qui j'ai écrit.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Rabat Weddings Agency",
        message: "Bonjour, j'ai envoyé plusieurs demandes de réservation la semaine dernière mais elles n'apparaissent plus dans mon historique. Est-ce normal ? Je ne sais plus à qui j'ai écrit.",
        timestamp: "2025-02-25T09:00:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Youssef Admin",
        message: "Bonjour, je vais vérifier cela de mon côté. Pouvez-vous me donner le nom d'un des artistes à qui vous avez envoyé une demande ? Cela m'aidera à investiguer le problème.",
        timestamp: "2025-02-25T09:20:00",
      },
    ],
    internalNotes: [
      {
        id: "note-1",
        author: "Youssef Admin",
        note: "Vérifier le système de filtres dans la messagerie - possible bug",
        timestamp: "2025-02-25T09:21:00",
      },
    ],
  },
  {
    id: "T-1241",
    date: "2025-02-24T17:30:00",
    userName: "Nadia Oriental Dance",
    userType: "artiste",
    userEmail: "nadia.oriental@email.com",
    subject: "Comment ajouter des vidéos à mon portfolio ?",
    category: "autre",
    priority: "normale",
    status: "ferme",
    assignedTo: "Karim Admin",
    message: "Bonjour, j'aimerais ajouter des vidéos de mes performances à mon profil. Est-ce possible et comment faire ?",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Nadia Oriental Dance",
        message: "Bonjour, j'aimerais ajouter des vidéos de mes performances à mon profil. Est-ce possible et comment faire ?",
        timestamp: "2025-02-24T17:30:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Karim Admin",
        message: "Bonjour Nadia ! Oui, vous pouvez ajouter des vidéos. Allez dans 'Mon Profil' > 'Portfolio' > 'Ajouter une vidéo'. Vous pouvez coller des liens YouTube, Vimeo ou Instagram. Si vous avez besoin d'aide, n'hésitez pas !",
        timestamp: "2025-02-24T17:45:00",
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Nadia Oriental Dance",
        message: "Super, c'est fait ! Merci beaucoup.",
        timestamp: "2025-02-24T18:00:00",
      },
    ],
  },
  {
    id: "T-1240",
    date: "2025-02-24T15:15:00",
    userName: "Fes Events Hall",
    userType: "organisateur",
    userEmail: "contact@feseventshall.ma",
    subject: "Comment vérifier qu'un artiste est professionnel ?",
    category: "reservation",
    priority: "normale",
    status: "resolu",
    assignedTo: "Sarah Admin",
    message: "Bonjour, comment puis-je être sûr qu'un artiste est fiable et professionnel avant de faire une demande ? Y a-t-il un système de vérification ?",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Fes Events Hall",
        message: "Bonjour, comment puis-je être sûr qu'un artiste est fiable et professionnel avant de faire une demande ? Y a-t-il un système de vérification ?",
        timestamp: "2025-02-24T15:15:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Sarah Admin",
        message: "Bonjour ! Les artistes avec le badge 'Vérifié' ont été validés par notre équipe. Nous vérifions leur identité et la qualité de leur profil. Vous pouvez aussi consulter leur portfolio (photos/vidéos) et leur historique de réservations. N'hésitez pas à poser des questions via la messagerie avant de confirmer.",
        timestamp: "2025-02-24T15:30:00",
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Fes Events Hall",
        message: "Très clair, merci !",
        timestamp: "2025-02-24T15:35:00",
      },
    ],
  },
  {
    id: "T-1239",
    date: "2025-02-24T10:00:00",
    userName: "Youssef Band Chaabi",
    userType: "artiste",
    userEmail: "youssef.chaabi@email.com",
    subject: "Changement de numéro de téléphone",
    category: "compte",
    priority: "faible",
    status: "resolu",
    assignedTo: "Youssef Admin",
    message: "Bonjour, je souhaite changer mon numéro de téléphone dans mon profil car j'ai une nouvelle ligne professionnelle.",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Youssef Band Chaabi",
        message: "Bonjour, je souhaite changer mon numéro de téléphone dans mon profil car j'ai une nouvelle ligne professionnelle.",
        timestamp: "2025-02-24T10:00:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Youssef Admin",
        message: "Bonjour ! Vous pouvez modifier votre numéro directement dans 'Paramètres' > 'Informations de contact'. N'oubliez pas de cliquer sur 'Enregistrer' après la modification.",
        timestamp: "2025-02-24T10:15:00",
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Youssef Band Chaabi",
        message: "Parfait, c'est fait. Merci !",
        timestamp: "2025-02-24T10:20:00",
      },
    ],
  },
  {
    id: "T-1238",
    date: "2025-02-23T14:50:00",
    userName: "Tangier Beach Events",
    userType: "organisateur",
    userEmail: "hello@tangierbeach.ma",
    subject: "Possibilité de réserver plusieurs artistes en même temps ?",
    category: "reservation",
    priority: "normale",
    status: "ferme",
    assignedTo: "Karim Admin",
    message: "Bonjour, nous organisons un grand événement avec plusieurs scènes. Est-il possible de faire des demandes à plusieurs artistes simultanément pour le même événement ?",
    conversationHistory: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "Tangier Beach Events",
        message: "Bonjour, nous organisons un grand événement avec plusieurs scènes. Est-il possible de faire des demandes à plusieurs artistes simultanément pour le même événement ?",
        timestamp: "2025-02-23T14:50:00",
      },
      {
        id: "msg-2",
        sender: "admin",
        senderName: "Karim Admin",
        message: "Bonjour ! Oui absolument. Vous pouvez envoyer des demandes à autant d'artistes que vous le souhaitez. Précisez simplement dans votre message qu'il s'agit d'un événement multi-scènes pour que les artistes comprennent le contexte.",
        timestamp: "2025-02-23T15:05:00",
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "Tangier Beach Events",
        message: "Génial, merci beaucoup !",
        timestamp: "2025-02-23T15:10:00",
      },
    ],
  },
];

export const mockSupportStats = {
  openTickets: 3,
  urgentTickets: 1,
  avgResponseTime: "2h 15min",
  resolvedLast30Days: 24,
  variations: {
    openTickets: -12,
    urgentTickets: -50,
    avgResponseTime: -18,
    resolvedLast30Days: 33,
  },
};
