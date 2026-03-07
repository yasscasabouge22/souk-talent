import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Inbox,
  Calendar,
  Settings,
  Eye,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Megaphone,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { ArtistDashboard } from "./ArtistDashboard";
import { ArtistProfileEditor } from "./ArtistProfileEditor";
import { ArtistRequests } from "./ArtistRequests";
import { ArtistCalendar } from "./ArtistCalendar";
import { ArtistReviews } from "./ArtistReviews";
import { ArtistSettings } from "./ArtistSettings";
import { ArtistAnnouncementsPage } from "./ArtistAnnouncementsPage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ArtistSpaceProps {
  artistName: string;
  artistAvatar?: string;
  onLogout: () => void;
  onViewPublicProfile: () => void;
  isAgent?: boolean;
}

export function ArtistSpace({
  artistName,
  artistAvatar = "https://images.unsplash.com/photo-1766650587984-8ce45acc42c8?w=150",
  onLogout,
  onViewPublicProfile,
  isAgent = false,
}: ArtistSpaceProps) {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
    },
    {
      id: "profile",
      label: "Profil",
      icon: User,
    },
    {
      id: "requests",
      label: "Demandes",
      icon: Inbox,
    },
    {
      id: "announcements",
      label: "Annonces",
      icon: Megaphone,
    },
    {
      id: "calendar",
      label: "Calendrier",
      icon: Calendar,
    },
    {
      id: "reviews",
      label: "Commentaires",
      icon: MessageSquare,
    },
    // L'agent n'a pas accès aux paramètres
    ...(!isAgent ? [
      {
        id: "settings",
        label: "Paramètres",
        icon: Settings,
      }
    ] : []),
  ];

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleViewRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setCurrentSection("requests");
  };

  const renderContent = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <ArtistDashboard
            artistName={artistName}
            onNavigate={handleNavigate}
            onViewRequest={handleViewRequest}
          />
        );
      case "profile":
        return <ArtistProfileEditor onViewPublicProfile={onViewPublicProfile} />;
      case "requests":
        return <ArtistRequests />;
      case "calendar":
        return <ArtistCalendar />;
      case "reviews":
        return <ArtistReviews />;
      case "settings":
        return <ArtistSettings />;
      case "announcements":
        return <ArtistAnnouncementsPage />;
      default:
        return (
          <ArtistDashboard
            artistName={artistName}
            onNavigate={handleNavigate}
            onViewRequest={handleViewRequest}
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
                    <AvatarImage src={artistAvatar} alt={artistName} />
                    <AvatarFallback className="bg-[#1DB954] text-black">
                      {artistName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white truncate">
                      {artistName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isAgent ? "Espace Agent" : "Espace Artiste"}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#282828] border-gray-700"
              >
                {isAgent && (
                  <>
                    <div className="px-2 py-2">
                      <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md">
                        <Users className="size-4 text-blue-400" />
                        <span className="text-xs text-blue-400 font-medium">Mode Agent</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-700" />
                  </>
                )}
                <DropdownMenuItem
                  onClick={onViewPublicProfile}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                >
                  <Eye className="size-4 mr-2" />
                  Voir mon profil public
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
              onClick={onViewPublicProfile}
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
        <div className="container mx-auto px-4 py-8 max-w-7xl">{renderContent()}</div>
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
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => handleNavigate("settings")}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
              currentSection === "settings" ? "text-[#1DB954]" : "text-gray-400"
            }`}
          >
            <Settings className="size-5" />
            <span className="text-xs font-medium">Plus</span>
          </button>
        </nav>
      </div>
    </div>
  );
}