import { useState } from "react";
import { Download, Search, Eye, Calendar, User, CheckCircle, XCircle, Ban, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useNavigate } from "react-router";
import { mockDemandesPro, mockDemandesProStats, DemandePro } from "../../data/adminDemandesProData";
import { toast } from "sonner";

export function AdminDemandesPro() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedDemande, setSelectedDemande] = useState<DemandePro | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [refusalReason, setRefusalReason] = useState("");
  const [showRefusalField, setShowRefusalField] = useState(false);

  // Filtres
  const cities = Array.from(new Set(mockDemandesPro.map(d => d.city)));

  const filteredDemandes = mockDemandesPro.filter(demande => {
    const matchesSearch =
      demande.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demande.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || demande.status === statusFilter;
    const matchesCity = cityFilter === "all" || demande.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const handleViewDemande = (demande: DemandePro) => {
    setSelectedDemande(demande);
    setCurrentStatus(demande.status);
    setAssignedTo(demande.assignedTo || "");
    setScheduledDate(demande.scheduledDate || "");
    setInternalNote("");
    setRefusalReason("");
    setShowRefusalField(false);
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCityFilter("all");
  };

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    toast.success(`Statut mis à jour : ${getStatusConfig(newStatus).label}`);
  };

  const handleSaveNote = () => {
    toast.success("Note interne enregistrée");
    setInternalNote("");
  };

  const handleMarkContacted = () => {
    handleUpdateStatus("contacte");
  };

  const handleSchedule = () => {
    if (!scheduledDate) {
      toast.error("Veuillez sélectionner une date/heure");
      return;
    }
    handleUpdateStatus("planifie");
  };

  const handleMarkDone = () => {
    handleUpdateStatus("realise");
  };

  const handleValidate = () => {
    handleUpdateStatus("valide");
    toast.success("Badge Professionnel accordé ✓");
  };

  const handleRefuse = () => {
    if (!refusalReason.trim()) {
      toast.error("Veuillez indiquer un motif de refus");
      return;
    }
    handleUpdateStatus("refuse");
    setShowRefusalField(false);
  };

  const handleCancel = () => {
    handleUpdateStatus("annule");
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      nouveau: {
        label: "Nouveau",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      },
      contacte: {
        label: "Contacté",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      },
      planifie: {
        label: "Planifié",
        className: "bg-purple-100 text-purple-700 border-purple-200",
      },
      realise: {
        label: "Réalisé",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      },
      valide: {
        label: "Validé",
        className: "bg-green-100 text-green-700 border-green-200",
      },
      refuse: {
        label: "Refusé",
        className: "bg-red-100 text-red-700 border-red-200",
      },
      annule: {
        label: "Annulé",
        className: "bg-gray-200 text-gray-600 border-gray-300",
      },
    };
    return configs[status as keyof typeof configs] || configs.nouveau;
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <Card className="bg-gray-50 border-gray-200 rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Demandes Pro</h1>
              <p className="text-sm text-gray-500 mt-1">
                Gestion des demandes de professionnalisation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                {mockDemandesProStats.nouvelles} nouvelle
                {mockDemandesProStats.nouvelles > 1 ? "s" : ""}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="size-4" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card className="rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="nouveau">Nouveau</SelectItem>
                <SelectItem value="contacte">Contacté</SelectItem>
                <SelectItem value="planifie">Planifié</SelectItem>
                <SelectItem value="realise">Réalisé</SelectItem>
                <SelectItem value="valide">Validé</SelectItem>
                <SelectItem value="refuse">Refusé</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[180px] border-gray-200">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Rechercher un artiste / ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-gray-200"
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-gray-600"
            >
              Réinitialiser
            </Button>

            <div className="ml-auto">
              <Badge variant="outline" className="bg-gray-50">
                {filteredDemandes.length} demande{filteredDemandes.length > 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau */}
      <Card className="rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Artiste</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Disponibilités</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDemandes.map((demande) => {
              const statusConfig = getStatusConfig(demande.status);
              return (
                <TableRow key={demande.id}>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(demande.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={demande.artistAvatar} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                          {demande.artistName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">
                        {demande.artistName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {demande.city}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-[200px]">
                    {truncateText(demande.availability, 50)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {demande.assignedTo || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDemande(demande)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Drawer de détail */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              Demande de professionnalisation
            </SheetTitle>
            <SheetDescription>
              Gérer et traiter la demande de l'artiste
            </SheetDescription>
          </SheetHeader>

          {selectedDemande && (
            <div className="space-y-6 mt-6">
              {/* A) Infos demande */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informations de la demande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">Artiste</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarImage src={selectedDemande.artistAvatar} />
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {selectedDemande.artistName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedDemande.artistName}
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-[#1DB954] text-xs"
                          onClick={() => {
                            navigate(`/admin/artistes/review/${selectedDemande.artistId}`);
                            setIsDrawerOpen(false);
                          }}
                        >
                          Voir fiche admin artiste →
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Ville</p>
                      <p className="text-sm text-gray-900">{selectedDemande.city}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">
                        Date de la demande
                      </p>
                      <p className="text-sm text-gray-900">
                        {formatDateTime(selectedDemande.date)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Disponibilités</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedDemande.availability}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Commentaire</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedDemande.comment}
                    </p>
                  </div>

                  {selectedDemande.refusalReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-xs text-red-900 font-medium mb-1">
                        Motif de refus
                      </p>
                      <p className="text-sm text-red-800">
                        {selectedDemande.refusalReason}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* B) Traitement admin */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Traitement admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status" className="text-xs text-gray-500 uppercase">
                      Statut
                    </Label>
                    <Select value={currentStatus} onValueChange={setCurrentStatus}>
                      <SelectTrigger id="status" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nouveau">Nouveau</SelectItem>
                        <SelectItem value="contacte">Contacté</SelectItem>
                        <SelectItem value="planifie">Planifié</SelectItem>
                        <SelectItem value="realise">Réalisé</SelectItem>
                        <SelectItem value="valide">Validé</SelectItem>
                        <SelectItem value="refuse">Refusé</SelectItem>
                        <SelectItem value="annule">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="assigned" className="text-xs text-gray-500 uppercase">
                      Assigné à (optionnel)
                    </Label>
                    <Input
                      id="assigned"
                      placeholder="Ex: Admin Sarah"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  {currentStatus === "planifie" && (
                    <div>
                      <Label htmlFor="scheduled" className="text-xs text-gray-500 uppercase">
                        Date/heure planifiée
                      </Label>
                      <Input
                        id="scheduled"
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="note" className="text-xs text-gray-500 uppercase">
                      Note interne
                    </Label>
                    <Textarea
                      id="note"
                      placeholder="Ajouter une note interne..."
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      className="mt-2 min-h-[80px]"
                    />
                  </div>

                  <Button
                    onClick={handleSaveNote}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!internalNote.trim()}
                  >
                    Enregistrer la note
                  </Button>
                </CardContent>
              </Card>

              {/* C) Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentStatus === "nouveau" && (
                    <Button
                      onClick={handleMarkContacted}
                      className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white"
                    >
                      Marquer comme contacté
                    </Button>
                  )}

                  {currentStatus === "contacte" && (
                    <Button
                      onClick={handleSchedule}
                      className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white gap-2"
                    >
                      <Calendar className="size-4" />
                      Planifier un rendez-vous
                    </Button>
                  )}

                  {currentStatus === "planifie" && (
                    <Button
                      onClick={handleMarkDone}
                      className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white gap-2"
                    >
                      <CheckCircle className="size-4" />
                      Marquer comme réalisé
                    </Button>
                  )}

                  {currentStatus === "realise" && (
                    <Button
                      onClick={handleValidate}
                      className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <CheckCircle className="size-4" />
                      Valider et accorder le badge Pro
                    </Button>
                  )}

                  {!["valide", "refuse", "annule"].includes(currentStatus) && (
                    <>
                      {!showRefusalField ? (
                        <Button
                          onClick={() => setShowRefusalField(true)}
                          variant="outline"
                          size="sm"
                          className="w-full border-red-200 text-red-700 hover:bg-red-50 gap-2"
                        >
                          <XCircle className="size-4" />
                          Refuser
                        </Button>
                      ) : (
                        <div className="space-y-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <Label htmlFor="refusal" className="text-xs text-red-900">
                            Motif du refus
                          </Label>
                          <Textarea
                            id="refusal"
                            placeholder="Expliquer pourquoi la demande est refusée..."
                            value={refusalReason}
                            onChange={(e) => setRefusalReason(e.target.value)}
                            className="min-h-[60px]"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleRefuse}
                              size="sm"
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            >
                              Confirmer le refus
                            </Button>
                            <Button
                              onClick={() => setShowRefusalField(false)}
                              size="sm"
                              variant="outline"
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handleCancel}
                        variant="ghost"
                        size="sm"
                        className="w-full text-gray-600 gap-2"
                      >
                        <Ban className="size-4" />
                        Annuler la demande
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* D) Historique */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="size-5 text-gray-600" />
                    Historique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedDemande.history.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="size-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {entry.action}
                          </p>
                          {entry.actor && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              Par {entry.actor}
                            </p>
                          )}
                          {entry.note && (
                            <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                              {entry.note}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDateTime(entry.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
