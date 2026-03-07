import { useState } from "react";
import { Search, Filter, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
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
import { Card } from "../../components/ui/card";

export function AdminBookingRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const requests = [
    {
      id: "1",
      requestNumber: "BR-1045",
      artist: "DJ Mehdi",
      organizer: "Events Maroc",
      city: "Casablanca",
      eventDate: "2025-03-15",
      budget: "15,000 MAD",
      status: "pending",
      hasAgent: false,
      createdAt: "2025-02-20",
    },
    {
      id: "2",
      requestNumber: "BR-1046",
      artist: "Saad Lamjarred Tribute",
      organizer: "Festival Mawazine",
      city: "Rabat",
      eventDate: "2025-04-10",
      budget: "50,000 MAD",
      status: "accepted",
      hasAgent: false,
      createdAt: "2025-02-18",
    },
    {
      id: "3",
      requestNumber: "BR-1047",
      artist: "Groupe Fusion",
      organizer: "Mohamed Alami",
      city: "Marrakech",
      eventDate: "2025-03-05",
      budget: "3,000 MAD",
      status: "rejected",
      hasAgent: false,
      createdAt: "2025-02-22",
    },
    {
      id: "4",
      requestNumber: "BR-1048",
      artist: "DJ Sophia",
      organizer: "Club Diamond",
      city: "Casablanca",
      eventDate: "2025-02-28",
      budget: "8,000 MAD",
      status: "expired",
      hasAgent: false,
      createdAt: "2025-02-15",
    },
    {
      id: "5",
      requestNumber: "BR-1049",
      artist: "Orchestre Andalou",
      organizer: "Ministère de la Culture",
      city: "Fès",
      eventDate: "2025-05-20",
      budget: "35,000 MAD",
      status: "accepted",
      hasAgent: false,
      createdAt: "2025-01-10",
    },
    {
      id: "6",
      requestNumber: "BR-1050",
      artist: "MC Hamza",
      organizer: "Ahmed Bennani",
      city: "Tanger",
      eventDate: "2025-03-25",
      budget: "2,500 MAD",
      status: "accepted",
      hasAgent: false,
      createdAt: "2025-02-24",
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      accepted: { label: "Accepté", className: "bg-green-100 text-green-700 border-green-200" },
      rejected: { label: "Refusé", className: "bg-red-100 text-red-700 border-red-200" },
      expired: { label: "Expiré", className: "bg-gray-200 text-gray-700 border-gray-300" },
    };
    return configs[status] || configs.pending;
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
          <p className="text-gray-500 mt-1">Gérer les demandes de booking</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par ID, artiste ou organisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="accepted">Accepté</SelectItem>
              <SelectItem value="rejected">Refusé</SelectItem>
              <SelectItem value="expired">Expiré</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Artiste</TableHead>
              <TableHead>Organisateur</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Date événement</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => {
              const statusConfig = getStatusConfig(req.status);
              
              return (
                <TableRow key={req.id}>
                  <TableCell className="font-medium text-gray-900">{req.id}</TableCell>
                  <TableCell className="text-gray-600">{req.artist}</TableCell>
                  <TableCell className="text-gray-600">{req.organizer}</TableCell>
                  <TableCell className="text-gray-600">{req.city}</TableCell>
                  <TableCell className="text-gray-900">
                    {new Date(req.eventDate).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{req.budget}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-50">
                      {req.hasAgent ? "Agent" : "Direct"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/booking-requests/detail/${req.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}