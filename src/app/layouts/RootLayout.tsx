import { Outlet, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { AuthModal } from "../components/AuthModal";
import { ArtistAuthModal } from "../components/ArtistAuthModal";

interface OrganizerInfo {
  email: string;
  name: string;
}

interface ArtistInfo {
  id: string;
  name: string;
  email: string;
  isAgent?: boolean;
}

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [organizer, setOrganizer] = useState<OrganizerInfo | null>(null);
  const [artist, setArtist] = useState<ArtistInfo | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showArtistAuthModal, setShowArtistAuthModal] = useState(false);

  // Ne pas afficher le Header pour les routes artiste (elles ont leur propre layout)
  const isArtistePage = location.pathname.startsWith("/artiste");

  // Déterminer la page actuelle pour le Header
  const getCurrentPage = () => {
    const path = location.pathname;
    
    if (path === "/public" || path === "/") return "home";
    if (path.startsWith("/public/artists")) return "artists";
    if (path.startsWith("/public/artist/")) return "artist-profile";
    if (path.startsWith("/public/how-it-works")) return "how-it-works";
    if (path.startsWith("/public/agenda")) return "agenda";
    if (path.startsWith("/public/announcements")) return "announcements";
    
    if (path.startsWith("/organisateur/profile")) return "organizer-profile";
    if (path.startsWith("/organisateur/search")) return "organizer-search";
    if (path.startsWith("/organisateur/dashboard")) return "organizer-dashboard";
    if (path.startsWith("/organisateur/favorites")) return "organizer-favorites";
    if (path.startsWith("/organisateur/settings")) return "organizer-settings";
    if (path.startsWith("/organisateur/announcements")) return "organizer-announcements";
    if (path.startsWith("/organisateur/support")) return "organizer-support";
    
    return "home";
  };

  const handleNavigate = (page: string, filters?: { category?: string; region?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.set("category", filters.category);
    if (filters?.region) params.set("region", filters.region);
    
    const queryString = params.toString();
    
    // Mapper les anciennes pages vers les nouvelles routes
    const pageMap: Record<string, string> = {
      home: "/public",
      artists: "/public/artists",
      "artist-profile": "/public/artist",
      "how-it-works": "/public/how-it-works",
      agenda: "/public/agenda",
      announcements: "/public/announcements",
    };
    
    const route = pageMap[page] || `/public/${page}`;
    navigate(queryString ? `${route}?${queryString}` : route);
  };

  const handleLogin = (organizerInfo: OrganizerInfo) => {
    setOrganizer(organizerInfo);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setOrganizer(null);
    navigate("/public");
  };

  const handleArtistLogin = (artistInfo: ArtistInfo) => {
    setArtist(artistInfo);
    setShowArtistAuthModal(false);
    navigate("/artiste/dashboard");
  };

  const handleArtistLogout = () => {
    setArtist(null);
    localStorage.removeItem("isAgent");
    navigate("/public");
  };

  const handleOpenOrganizerMenu = (section: string) => {
    navigate(`/organisateur/${section}`);
  };

  const handleOpenArtistSpace = () => {
    if (artist) {
      navigate("/artiste/dashboard");
    }
  };

  return (
    <>
      {!isArtistePage && (
        <Header 
          onNavigate={handleNavigate} 
          currentPage={getCurrentPage()}
          organizer={organizer}
          artist={artist}
          onLogin={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          onArtistLogin={() => setShowArtistAuthModal(true)}
          onArtistLogout={handleArtistLogout}
          onOpenOrganizerMenu={handleOpenOrganizerMenu}
          onOpenArtistSpace={handleOpenArtistSpace}
        />
      )}
      
      <Outlet />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      
      <ArtistAuthModal
        isOpen={showArtistAuthModal}
        onClose={() => setShowArtistAuthModal(false)}
        onLogin={handleArtistLogin}
        onNavigateToRegister={() => {
          setShowArtistAuthModal(false);
          navigate("/artiste/register");
        }}
      />
    </>
  );
}