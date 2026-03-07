import { Outlet, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  Briefcase,
  Calendar,
  MessageSquare,
  FolderOpen,
  Award,
  TrendingUp,
  HeadphonesIcon,
  Lock,
  Settings,
  UserCog,
  Menu,
  Search,
  Bell,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TODO: Récupérer depuis le contexte d'authentification
  const adminName = "Admin Souk Talent";
  const adminAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150";

  const menuItems = [
    {
      id: "dashboard",
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "artistes",
      path: "/admin/artistes",
      label: "Artistes",
      icon: Users,
      badge: 12,
    },
    {
      id: "organisateurs",
      path: "/admin/organisateurs",
      label: "Organisateurs",
      icon: UserCheck,
    },
    {
      id: "agents",
      path: "/admin/agents",
      label: "Agents",
      icon: Briefcase,
    },
    {
      id: "booking-requests",
      path: "/admin/booking-requests",
      label: "Booking Requests",
      icon: Calendar,
      badge: 8,
    },
    {
      id: "agenda",
      path: "/admin/agenda",
      label: "Agenda Global",
      icon: Calendar,
    },
    {
      id: "messagerie-signalements",
      path: "/admin/messagerie-signalements",
      label: "Messagerie & Signalements",
      icon: MessageSquare,
      badge: 3,
    },
    {
      id: "contenu",
      path: "/admin/contenu",
      label: "Contenu & Catégories",
      icon: FolderOpen,
    },
    {
      id: "demandes-pro",
      path: "/admin/demandes-pro",
      label: "Demandes Pro",
      icon: Award,
      badge: 2,
    },
    {
      id: "marketing",
      path: "/admin/marketing",
      label: "Marketing & SEO",
      icon: TrendingUp,
    },
    {
      id: "support",
      path: "/admin/support",
      label: "Support",
      icon: HeadphonesIcon,
    },
    {
      id: "moderation",
      path: "/admin/moderation",
      label: "Modération & Sécurité",
      icon: Lock,
    },
    {
      id: "parametres",
      path: "/admin/parametres",
      label: "Paramètres",
      icon: Settings,
    },
    {
      id: "admins",
      path: "/admin/admins",
      label: "Admin & Rôles",
      icon: UserCog,
    },
  ];

  const handleLogout = () => {
    navigate("/public");
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  // Breadcrumb generation
  const getBreadcrumb = () => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);
    
    return parts.map((part, index) => {
      const isLast = index === parts.length - 1;
      const href = "/" + parts.slice(0, index + 1).join("/");
      const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
      
      return { label, href, isLast };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Menu burger mobile */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-[#1DB954]">
                  Souk Talent
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                  Admin
                </Badge>
              </div>
            </div>

            {/* Recherche globale */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Recherche globale..."
                  className="pl-9 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Actions droite */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Menu Admin */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={adminAvatar} alt={adminName} />
                      <AvatarFallback className="bg-[#1DB954] text-white">
                        {adminName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{adminName}</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
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
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentPath(item.path);
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${
                        isActive
                          ? "bg-[#1DB954]/10 text-[#1DB954] font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            isActive 
                              ? "bg-[#1DB954] text-white" 
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
            <div 
              className="w-64 h-full bg-white border-r border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mb-4"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <nav>
                  <ul className="space-y-1">
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
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${
                              isActive
                                ? "bg-[#1DB954]/10 text-[#1DB954] font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  isActive 
                                    ? "bg-[#1DB954] text-white" 
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {item.badge}
                              </Badge>
                            )}
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
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <nav className="flex items-center gap-2 text-sm">
              {getBreadcrumb().map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">/</span>}
                  {crumb.isLast ? (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  ) : (
                    <button
                      onClick={() => navigate(crumb.href)}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      {crumb.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Contenu de la page */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}