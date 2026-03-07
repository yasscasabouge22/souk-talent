import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Eye } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Card } from "../../components/ui/card";

export function AdminOrganisateurs() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const organizers = [
    {
      id: 1,
      name: "Events Maroc",
      type: "Entreprise",
      city: "Casablanca",
      requestsCount: 23,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    },
    {
      id: 2,
      name: "Premium Events",
      type: "Entreprise",
      city: "Rabat",
      requestsCount: 45,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=150",
    },
    {
      id: 3,
      name: "Mohammed Alami",
      type: "Particulier",
      city: "Marrakech",
      requestsCount: 2,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 4,
      name: "Luxury Weddings",
      type: "Entreprise",
      city: "Tanger",
      requestsCount: 67,
      status: "suspended",
      avatar: "https://images.unsplash.com/photo-1519167758481-83f29da8ace8?w=150",
    },
  ];

  const filteredOrganizers = organizers.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Organisateurs</h1>
        <p className="text-gray-500 mt-1">Gérer les profils organisateurs</p>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un organisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Demandes envoyées</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrganizers.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={org.avatar} alt={org.name} />
                      <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{org.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-gray-100">
                    {org.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{org.city}</TableCell>
                <TableCell>
                  <span className="font-medium text-gray-900">{org.requestsCount}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      org.status === "active"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-200 text-gray-700 border-gray-300"
                    }
                  >
                    {org.status === "active" ? "Actif" : "Suspendu"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/organisateurs/detail/${org.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}