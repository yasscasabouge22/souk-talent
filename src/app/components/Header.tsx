import { Music, Calendar, User, Menu, LogOut, LayoutDashboard, Search, Heart, Settings, MessageSquare, Megaphone, ChevronDown, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";


interface OrganizerInfo {
  email: string;
  name: string;
}

interface ArtistInfo {
  id: string;
  name: string;
  email: string;
}

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  organizer?: OrganizerInfo | null;
  artist?: ArtistInfo | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onArtistLogin?: () => void;
  onArtistLogout?: () => void;
  onOpenOrganizerMenu?: (section: string) => void;
  onOpenArtistSpace?: () => void;
}

export function Header({ onNavigate, currentPage, organizer, artist, onLogin, onLogout, onArtistLogin, onArtistLogout, onOpenOrganizerMenu, onOpenArtistSpace }: HeaderProps) {
  const navItems = [
    { label: "Accueil", value: "home" },
    { label: "Artistes", value: "artists" },
    { label: "Annonces", value: "announcements" },
    { label: "Agenda", value: "agenda" },
    { label: "Comment ça marche", value: "how-it-works" },
  ];

  return (
    <header className="border-b bg-[#191414] sticky top-0 z-50 border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img src="/logo.png" alt="Souk Talent" className="h-16 w-16 object-contain" />
            <div>
              <h1 className="font-bold text-[#1DB954] text-xl">Souk Talent</h1>
              <p className="text-xs text-gray-400">Where Skills Meet Opportunity</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`hover:text-[#1DB954] transition-colors ${
                  currentPage === item.value ? "text-[#1DB954]" : "text-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {artist ? (
              <div className="flex items-center gap-3">
                {/* Artist Account Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#282828] border border-[#1DB954]/30 hover:bg-[#282828]/80 hover:border-[#1DB954]/50 transition-all group">
                      <Avatar className="h-7 w-7 border border-[#1DB954]/30">
                        <AvatarImage src="" alt={artist.name} />
                        <AvatarFallback className="bg-[#1DB954]/20 text-[#1DB954] text-xs font-semibold">
                          {artist.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-white leading-none">{artist.name}</span>
                        <span className="text-[10px] text-gray-400 leading-none mt-0.5">Espace artiste</span>
                      </div>
                      <ChevronDown className="size-4 text-gray-400 group-hover:text-[#1DB954] transition-colors" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 bg-[#282828] border-gray-700 shadow-2xl">
                    <DropdownMenuLabel className="text-white font-semibold px-3 py-2.5">
                      Espace Artiste
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={onOpenArtistSpace}
                    >
                      <LayoutDashboard className="size-4 mr-3 text-[#1DB954]" />
                      Mon Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5">
                      <User className="size-4 mr-3" />
                      Mon Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5">
                      <MessageSquare className="size-4 mr-3" />
                      Mes Messages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal px-3 py-1.5">
                      Paramètres
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5">
                      <Settings className="size-4 mr-3" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5">
                      <HelpCircle className="size-4 mr-3" />
                      Aide / Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <div className="px-3 py-2.5 space-y-1.5">
                      <Badge variant="outline" className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 text-xs">
                        <CheckCircle className="size-3 mr-1" />
                        Compte actif
                      </Badge>
                      <p className="text-[10px] text-gray-500 leading-tight">{artist.email}</p>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 border-gray-700 text-gray-300 hover:bg-[#282828] hover:text-white hover:border-gray-600"
                  onClick={onArtistLogout}
                >
                  <LogOut className="size-4" />
                  Déconnexion
                </Button>
              </div>
            ) : organizer ? (
              <div className="flex items-center gap-3">
                {/* Organizer Account Switcher - VARIANTE A (sans bouton Mon espace) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#282828] border border-[#1DB954]/30 hover:bg-[#282828]/80 hover:border-[#1DB954]/50 transition-all group">
                      <Avatar className="h-7 w-7 border border-[#1DB954]/30">
                        <AvatarImage src="" alt={organizer.name} />
                        <AvatarFallback className="bg-[#1DB954]/20 text-[#1DB954] text-xs font-semibold">
                          {organizer.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-white leading-none">{organizer.name}</span>
                        <span className="text-[10px] text-gray-400 leading-none mt-0.5">Espace organisateur</span>
                      </div>
                      <ChevronDown className="size-4 text-gray-400 group-hover:text-[#1DB954] transition-colors" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 bg-[#282828] border-gray-700 shadow-2xl">
                    <DropdownMenuLabel className="text-white font-semibold px-3 py-2.5">
                      Espace Organisateur
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("profile")}
                    >
                      <User className="size-4 mr-3" />
                      Mon Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("search")}
                    >
                      <Search className="size-4 mr-3" />
                      Recherche Avancée
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("dashboard")}
                    >
                      <LayoutDashboard className="size-4 mr-3 text-[#1DB954]" />
                      Dashboard & Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("favorites")}
                    >
                      <Heart className="size-4 mr-3" />
                      Artistes Favoris
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("announcements")}
                    >
                      <Megaphone className="size-4 mr-3" />
                      Annonces
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal px-3 py-1.5">
                      Paramètres
                    </DropdownMenuLabel>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("settings")}
                    >
                      <Settings className="size-4 mr-3" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer px-3 py-2.5"
                      onClick={() => onOpenOrganizerMenu?.("support")}
                    >
                      <HelpCircle className="size-4 mr-3" />
                      Aide / Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <div className="px-3 py-2.5 space-y-1.5">
                      <Badge variant="outline" className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 text-xs">
                        <CheckCircle className="size-3 mr-1" />
                        Compte actif
                      </Badge>
                      <p className="text-[10px] text-gray-500 leading-tight">{organizer.email}</p>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* VARIANTE B : Bouton "Mon Espace" visible - commenté par défaut */}
                {/* <Button 
                  className="gap-2 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold"
                  onClick={() => onOpenOrganizerMenu?.("dashboard")}
                >
                  <LayoutDashboard className="size-4" />
                  Mon Espace
                </Button> */}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 border-gray-700 text-gray-300 hover:bg-[#282828] hover:text-white hover:border-gray-600"
                  onClick={onLogout}
                >
                  <LogOut className="size-4" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="gap-2 border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black"
                  onClick={onArtistLogin}
                >
                  <User className="size-4" />
                  Espace Artiste
                </Button>
                <Button 
                  className="gap-2 bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold"
                  onClick={onLogin}
                >
                  <Calendar className="size-4" />
                  Espace Organisateur
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-gray-600 text-white">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#191414] border-gray-800">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => onNavigate(item.value)}
                    className={`text-left hover:text-[#1DB954] transition-colors ${
                      currentPage === item.value ? "text-[#1DB954]" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
                  {artist ? (
                    <>
                      <div 
                        className="text-left mb-2 cursor-pointer hover:opacity-80 transition-opacity" 
                        onClick={onOpenArtistSpace}
                      >
                        <p className="text-sm text-white">{artist.name}</p>
                        <p className="text-xs text-[#1DB954]">Espace Artiste</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black"
                        onClick={onArtistLogout}
                      >
                        <LogOut className="size-4" />
                        Déconnexion
                      </Button>
                    </>
                  ) : organizer ? (
                    <>
                      <div className="text-left mb-2">
                        <p className="text-sm text-white">{organizer.name}</p>
                        <p className="text-xs text-gray-400">{organizer.email}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                        onClick={() => onOpenOrganizerMenu?.("profile")}
                      >
                        <User className="size-4" />
                        Mon Profil
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                        onClick={() => onOpenOrganizerMenu?.("search")}
                      >
                        <Search className="size-4" />
                        Recherche Avancée
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                        onClick={() => onOpenOrganizerMenu?.("dashboard")}
                      >
                        <LayoutDashboard className="size-4" />
                        Dashboard & Messages
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                        onClick={() => onOpenOrganizerMenu?.("favorites")}
                      >
                        <Heart className="size-4" />
                        Artistes Favoris
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                        onClick={() => onOpenOrganizerMenu?.("announcements")}
                      >
                        <Megaphone className="size-4" />
                        Annonces
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => onOpenOrganizerMenu?.("settings")}
                      >
                        <Settings className="size-4" />
                        Paramètres
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => onOpenOrganizerMenu?.("support")}
                      >
                        <HelpCircle className="size-4" />
                        Aide / Support
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black"
                        onClick={onLogout}
                      >
                        <LogOut className="size-4" />
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="gap-2 w-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black" onClick={onArtistLogin}>
                        <User className="size-4" />
                        Espace Artiste
                      </Button>
                      <Button 
                        className="gap-2 w-full bg-[#1DB954] hover:bg-[#1ED760] text-black"
                        onClick={onLogin}
                      >
                        <Calendar className="size-4" />
                        Espace Organisateur
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}