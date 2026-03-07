import { ShieldCheck, Check, X, Eye } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function AdminVerifications() {
  const verificationRequests = [
    {
      id: 1,
      artist: "DJ Mehdi",
      city: "Casablanca",
      requestDate: "2025-02-20",
      documents: ["ID Card", "Artist Contract"],
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    },
    {
      id: 2,
      artist: "Orchestre Andalous",
      city: "Rabat",
      requestDate: "2025-02-18",
      documents: ["Business License", "Tax ID"],
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150",
    },
    {
      id: 3,
      artist: "Sara Vocals",
      city: "Marrakech",
      requestDate: "2025-02-15",
      documents: ["ID Card"],
      status: "approved",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Vérifications & Badges</h1>
        <p className="text-gray-500 mt-1">Gérer les demandes de badge vérifié</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Demandes en attente
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {verificationRequests.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Approuvées (30j)
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {verificationRequests.filter((r) => r.status === "approved").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Artistes vérifiés
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-[#1DB954]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File d'attente des vérifications</CardTitle>
          <CardDescription>Artistes demandant le badge "Vérifié"</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artiste</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Date demande</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verificationRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.avatar} alt={request.artist} />
                        <AvatarFallback>{request.artist.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{request.artist}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{request.city}</TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(request.requestDate).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {request.documents.map((doc) => (
                        <Badge key={doc} variant="secondary" className="text-xs bg-gray-100">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }
                    >
                      {request.status === "pending" ? "En attente" : "Approuvé"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
