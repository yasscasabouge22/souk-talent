import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Inbox,
  MessageSquare,
  Calendar,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  Megaphone,
  HelpCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { OrganizerDashboard } from "./OrganizerDashboard";
import { OrganizerFavorites } from "./OrganizerFavorites";
import { OrganizerAnnouncements } from "./OrganizerAnnouncements";
import { OrganizerSupportPage } from "./OrganizerSupportPage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface OrganizerSpaceProps {
  organizerName: string;
  organizerEmail: string;
  onLogout: () => void;
  onNavigateToArtists: () => void;
}

export function OrganizerSpace({
  organizerName,
  organizerEmail,
  onLogout,
  onNavigateToArtists,
}: OrganizerSpaceProps) {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "search",
      label: "Rechercher un artiste",
      icon: Search,
    },
    {
      id: "announcements",
      label: "Annonces",
      icon: Megaphone,
    },
    {
      id: "requests",
      label: "Demandes & Bookings",
      icon: Inbox,
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
    },
    {
      id: "events",
      label: "Événements",
      icon: Calendar,
    },
    {
      id: "favorites",
      label: "Favoris",
      icon: Heart,
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: Settings,
    },
    {
      id: "support",
      label: "Aide / Support",
      icon: HelpCircle,
    },
  ];

  const handleNavigate = (section: string) => {
    if (section === "search") {
      onNavigateToArtists();
      return;
    }
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <OrganizerDashboard
            organizerName={organizerName}
            onNavigate={handleNavigate}
          />
        );
      case "favorites":
        return <OrganizerFavorites />;
      case "announcements":
        return <OrganizerAnnouncements />;
      case "requests":
        return (
          <div className="text-center py-12">
            <Inbox className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Demandes & Bookings
            </h3>
            <p className="text-gray-400">Section en cours de développement</p>
          </div>
        );
      case "messages":
        return (
          <div className="text-center py-12">
            <MessageSquare className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Messages</h3>
            <p className="text-gray-400">Section en cours de développement</p>
          </div>
        );
      case "events":
        return (
          <div className="text-center py-12">
            <Calendar className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Événements</h3>
            <p className="text-gray-400">Section en cours de développement</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <Settings className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Paramètres</h3>
            <p className="text-gray-400">Section en cours de développement</p>
          </div>
        );
      case "support":
        return <OrganizerSupportPage />;
      default:
        return (
          <OrganizerDashboard
            organizerName={organizerName}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#191414]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-black border-r border-gray-800">
        <div className="flex flex-col flex-1">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-[#1DB954]">Souk Talent</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#1DB954] text-black"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-gray-800">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt={organizerName} />
                    <AvatarFallback className="bg-[#1DB954] text-black">
                      {organizerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white truncate">
                      {organizerName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{organizerEmail}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#282828] border-gray-700"
              >
                <DropdownMenuItem
                  onClick={onNavigateToArtists}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                >
                  <Eye className="size-4 mr-2" />
                  Explorer les artistes
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-gray-700 cursor-pointer"
                >
                  <LogOut className="size-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold text-[#1DB954]">Souk Talent</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={onNavigateToArtists}
            >
              <Eye className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-black border-t border-gray-800">
            <nav className="px-4 py-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#1DB954] text-black"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
              >
                <LogOut className="size-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="container mx-auto px-4 py-8 max-w-7xl pb-24 lg:pb-8">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
        <nav className="flex items-center justify-around px-2 py-3">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
                  isActive ? "text-[#1DB954]" : "text-gray-400"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-xs font-medium truncate max-w-[60px]">
                  {item.id === "search" ? "Recherche" : item.label}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => handleNavigate("favorites")}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
              currentSection === "favorites" ? "text-[#1DB954]" : "text-gray-400"
            }`}
          >
            <Heart className="size-5" />
            <span className="text-xs font-medium">Favoris</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
