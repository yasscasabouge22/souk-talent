import { Users, Eye, Shield, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function AdminAgents() {
  const navigate = useNavigate();
  
  const agents = [
    {
      id: 1,
      name: "Hassan Benali",
      email: "hassan.benali@example.com",
      artistsCount: 2,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      accessLevel: "limited",
      accessStatus: "conforme",
    },
    {
      id: 2,
      name: "Fatima Agency",
      email: "contact@fatimaagency.ma",
      artistsCount: 5,
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      accessLevel: "full",
      accessStatus: "monitor",
    },
    {
      id: 3,
      name: "Karim Productions",
      email: "karim@productions.ma",
      artistsCount: 0,
      status: "suspended",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      accessLevel: "limited",
      accessStatus: "conforme",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
        <p className="text-gray-500 mt-1">Gérer les agents et leurs artistes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Agents
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{agents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Artistes représentés
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {agents.reduce((sum, agent) => sum + agent.artistsCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Niveau d'accès
            </CardTitle>
            <Shield className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {agents.reduce((sum, agent) => sum + (agent.accessLevel === "full" ? 1 : 0), 0)}/{agents.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Artistes représentés</TableHead>
              <TableHead>Niveau d'accès</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{agent.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-gray-900">{agent.artistsCount}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      agent.accessLevel === "full"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-200 text-gray-700 border-gray-300"
                    }
                  >
                    {agent.accessLevel === "full" ? "Complet" : "Limité"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      agent.status === "active"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-200 text-gray-700 border-gray-300"
                    }
                  >
                    {agent.status === "active" ? "Actif" : "Suspendu"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/agents/detail/${agent.id}`)}>
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