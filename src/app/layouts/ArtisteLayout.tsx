import { Outlet, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  User, 
  Inbox, 
  Calendar, 
  MessageSquare, 
  Settings,
  Megaphone,
  Menu,
  LogOut,
  Eye,
  ChevronLeft,
  HelpCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function ArtisteLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAgent, setIsAgent] = useState(false);

  // Récupérer le statut agent depuis localStorage
  useEffect(() => {
    const agentStatus = localStorage.getItem("isAgent");
    if (agentStatus) {
      setIsAgent(JSON.parse(agentStatus));
    }
  }, []);

  // TODO: Récupérer ces infos depuis le contexte d'authentification
  const artistName = "Artiste Démo";
  const artistAvatar = "https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?w=150";

  const menuItems = [
    {
      id: "dashboard",
      path: "/artiste/dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
    },
    {
      id: "profil",
      path: "/artiste/profil",
      label: "Profil",
      icon: User,
    },
    {
      id: "demandes",
      path: "/artiste/demandes",
      label: "Demandes",
      icon: Inbox,
    },
    {
      id: "annonces",
      path: "/artiste/annonces",
      label: "Annonces",
      icon: Megaphone,
    },
    {
      id: "calendrier",
      path: "/artiste/calendrier",
      label: "Calendrier",
      icon: Calendar,
    },
    {
      id: "commentaires",
      path: "/artiste/commentaires",
      label: "Commentaires",
      icon: MessageSquare,
    },
    // L'agent n'a pas accès aux paramètres
    ...(!isAgent ? [
      {
        id: "parametres",
        path: "/artiste/parametres",
        label: "Paramètres",
        icon: Settings,
      }
    ] : []),
    {
      id: "support",
      path: "/artiste/support",
      label: "Support",
      icon: HelpCircle,
    },
  ];

  const handleLogout = () => {
    // Nettoyer les informations d'authentification
    localStorage.removeItem("isAgent");
    navigate("/public");
  };

  const handleViewPublicProfile = () => {
    // TODO: Utiliser l'ID réel de l'artiste
    navigate("/public/artist/1");
  };

  const isCurrentPath = (path: string) => {
    if (path === "/artiste/dashboard") {
      return location.pathname === "/artiste/dashboard" || location.pathname === "/artiste" || location.pathname === "/artiste/";
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#191414]">
      {/* Header avec logo et menu utilisateur */}
      <header className="bg-black border-b border-[#1DB954]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Menu burger mobile */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <button 
                onClick={() => navigate("/public")}
                className="flex items-center gap-2"
              >
                <div className="text-2xl text-[#1DB954]">
                  Souk Talent
                </div>
              </button>
            </div>

            {/* Menu utilisateur */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewPublicProfile}
                className="text-white hover:text-[#1DB954] hidden sm:flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Voir mon profil public
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={artistAvatar} alt={artistName} />
                      <AvatarFallback className="bg-[#1DB954] text-black">
                        {artistName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#282828] border-[#1DB954]/20">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-white">{artistName}</p>
                    <p className="text-xs text-gray-400">{isAgent ? "Agent" : "Artiste"}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#1DB954]/20" />
                  <DropdownMenuItem 
                    onClick={handleViewPublicProfile}
                    className="text-white hover:bg-[#1DB954]/20 cursor-pointer sm:hidden"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Profil public
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-white hover:bg-[#1DB954]/20 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-black border-r border-[#1DB954]/20 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentPath(item.path);
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#1DB954] text-black font-semibold"
                          : "text-gray-300 hover:bg-[#282828] hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setIsMobileMenuOpen(false)}>
            <div 
              className="w-64 h-full bg-black border-r border-[#1DB954]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white mb-4"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <nav>
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = isCurrentPath(item.path);
                      
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              navigate(item.path);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                              isActive
                                ? "bg-[#1DB954] text-black font-semibold"
                                : "text-gray-300 hover:bg-[#282828] hover:text-white"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}