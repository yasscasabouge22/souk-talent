import { createBrowserRouter } from "react-router";

// Pages Public
import { Home } from "./pages/public/Home";
import { Artists } from "./pages/public/Artists";
import { ArtistProfilePage } from "./pages/public/ArtistProfilePage";
import { HowItWorksPage } from "./pages/public/HowItWorksPage";
import { AgendaPage } from "./pages/public/AgendaPage";
import { AnnouncementsPage } from "./pages/public/AnnouncementsPage";

// Pages Artiste
import { Dashboard } from "./pages/artiste/Dashboard";
import { Profil } from "./pages/artiste/Profil";
import { Demandes } from "./pages/artiste/Demandes";
import { DemandeDetail } from "./pages/artiste/DemandeDetail";
import { OrganizerPublicProfile } from "./pages/artiste/OrganizerPublicProfile";
import { Annonces } from "./pages/artiste/Annonces";
import { Calendrier } from "./pages/artiste/Calendrier";
import { Commentaires } from "./pages/artiste/Commentaires";
import { Parametres } from "./pages/artiste/Parametres";
import { ArtistRegisterPage } from "./pages/artiste/Register";
import { ArtistRegistrationDemo } from "./pages/artiste/RegistrationDemo";
import { ArtisteSupport } from "./pages/artiste/Support";

// Pages Organisateur
import { OrganizerProfile } from "./pages/organisateur/OrganizerProfile";
import { OrganizerSearch } from "./pages/organisateur/OrganizerSearch";
import { OrganizerDashboard } from "./pages/organisateur/OrganizerDashboard";
import { OrganizerFavorites } from "./pages/organisateur/OrganizerFavorites";
import { OrganizerSettings } from "./pages/organisateur/OrganizerSettings";
import { OrganizerAnnouncements } from "./pages/organisateur/OrganizerAnnouncements";
import { OrganizerSupport } from "./pages/organisateur/OrganizerSupport";

// Pages Admin
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminArtistes } from "./pages/admin/Artistes";
import { AdminArtistReview } from "./pages/admin/ArtistReview";
import { AdminOrganisateurs } from "./pages/admin/Organisateurs";
import { AdminOrganizerDetail } from "./pages/admin/OrganizerDetail";
import { AdminAgents } from "./pages/admin/Agents";
import { AdminAgentDetail } from "./pages/admin/AgentDetail";
import { AdminBookingRequests } from "./pages/admin/BookingRequests";
import { AdminBookingRequestDetail } from "./pages/admin/BookingRequestDetail";
import { AdminAgenda } from "./pages/admin/Agenda";
import { AdminMessagerieSignalements } from "./pages/admin/MessagerieSignalements";
import { AdminDemandesPro } from "./pages/admin/DemandesPro";
import { AdminContenu } from "./pages/admin/Contenu";
import { AdminVerifications } from "./pages/admin/Verifications";
import { AdminMarketing } from "./pages/admin/Marketing";
import { AdminSupport } from "./pages/admin/Support";
import { AdminModeration } from "./pages/admin/Moderation";
import { AdminParametres } from "./pages/admin/Parametres";
import { AdminAdmins } from "./pages/admin/Admins";

// Layout Root
import { RootLayout } from "./layouts/RootLayout";
import { ArtisteLayout } from "./layouts/ArtisteLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Utils
import { RedirectToPublic } from "./components/RedirectToPublic";
import { RedirectToArtistDashboard } from "./components/RedirectToArtistDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <RedirectToPublic />,
      },
      
      // Routes Public
      {
        path: "public",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "artists",
            element: <Artists />,
          },
          {
            path: "artist/:artistId",
            element: <ArtistProfilePage />,
          },
          {
            path: "how-it-works",
            element: <HowItWorksPage />,
          },
          {
            path: "agenda",
            element: <AgendaPage />,
          },
          {
            path: "announcements",
            element: <AnnouncementsPage />,
          },
        ],
      },
      
      // Routes Organisateur
      {
        path: "organisateur",
        children: [
          {
            path: "profile",
            element: <OrganizerProfile />,
          },
          {
            path: "search",
            element: <OrganizerSearch />,
          },
          {
            path: "dashboard",
            element: <OrganizerDashboard />,
          },
          {
            path: "favorites",
            element: <OrganizerFavorites />,
          },
          {
            path: "settings",
            element: <OrganizerSettings />,
          },
          {
            path: "announcements",
            element: <OrganizerAnnouncements />,
          },
          {
            path: "support",
            element: <OrganizerSupport />,
          },
        ],
      },
      
      // 404 - Redirection vers /public
      {
        path: "*",
        element: <RedirectToPublic />,
      },
    ],
  },
  
  // Routes Artiste avec Layout séparé (hors RootLayout)
  {
    path: "artiste",
    element: <ArtisteLayout />,
    children: [
      {
        index: true,
        element: <RedirectToArtistDashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profil",
        element: <Profil />,
      },
      {
        path: "demandes",
        element: <Demandes />,
      },
      {
        path: "demandes/:demandeId",
        element: <DemandeDetail />,
      },
      {
        path: "demandes/:demandeId/profil-organisateur",
        element: <OrganizerPublicProfile />,
      },
      {
        path: "annonces",
        element: <Annonces />,
      },
      {
        path: "calendrier",
        element: <Calendrier />,
      },
      {
        path: "commentaires",
        element: <Commentaires />,
      },
      {
        path: "parametres",
        element: <Parametres />,
      },
      {
        path: "support",
        element: <ArtisteSupport />,
      },
    ],
  },
  
  // Routes d'inscription Artiste (sans layout - publiques)
  {
    path: "artiste/register",
    element: <ArtistRegisterPage />,
  },
  {
    path: "artiste/registration-demo",
    element: <ArtistRegistrationDemo />,
  },
  
  // Routes Admin avec Layout séparé (hors RootLayout)
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "artistes",
        element: <AdminArtistes />,
      },
      {
        path: "artistes/review/:artistId",
        element: <AdminArtistReview />,
      },
      {
        path: "organisateurs",
        element: <AdminOrganisateurs />,
      },
      {
        path: "organisateurs/detail/:organizerId",
        element: <AdminOrganizerDetail />,
      },
      {
        path: "agents",
        element: <AdminAgents />,
      },
      {
        path: "agents/detail/:agentId",
        element: <AdminAgentDetail />,
      },
      {
        path: "booking-requests",
        element: <AdminBookingRequests />,
      },
      {
        path: "booking-requests/detail/:requestId",
        element: <AdminBookingRequestDetail />,
      },
      {
        path: "agenda",
        element: <AdminAgenda />,
      },
      {
        path: "messagerie-signalements",
        element: <AdminMessagerieSignalements />,
      },
      {
        path: "demandes-pro",
        element: <AdminDemandesPro />,
      },
      {
        path: "contenu",
        element: <AdminContenu />,
      },
      {
        path: "verifications",
        element: <AdminVerifications />,
      },
      {
        path: "marketing",
        element: <AdminMarketing />,
      },
      {
        path: "support",
        element: <AdminSupport />,
      },
      {
        path: "moderation",
        element: <AdminModeration />,
      },
      {
        path: "parametres",
        element: <AdminParametres />,
      },
      {
        path: "admins",
        element: <AdminAdmins />,
      },
    ],
  },
]);