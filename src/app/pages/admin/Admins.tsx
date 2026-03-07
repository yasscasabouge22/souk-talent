import { Plus, Shield, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function AdminAdmins() {
  const admins = [
    {
      id: 1,
      name: "Admin Principal",
      email: "admin@souktalent.com",
      role: "super_admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      lastLogin: "2025-02-24 10:30",
    },
    {
      id: 2,
      name: "Modérateur 1",
      email: "mod1@souktalent.com",
      role: "moderator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      lastLogin: "2025-02-23 15:45",
    },
    {
      id: 3,
      name: "Support Team",
      email: "support@souktalent.com",
      role: "support",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      lastLogin: "2025-02-24 09:15",
    },
  ];

  const auditLogs = [
    {
      id: 1,
      admin: "Admin Principal",
      action: "Approuvé artiste DJ Mehdi",
      module: "Artistes",
      date: "2025-02-24 10:30",
    },
    {
      id: 2,
      admin: "Modérateur 1",
      action: "Rejeté demande BR-1003",
      module: "Booking",
      date: "2025-02-23 16:20",
    },
    {
      id: 3,
      admin: "Support Team",
      action: "Résolu ticket T-1001",
      module: "Support",
      date: "2025-02-23 14:10",
    },
  ];

  const getRoleBadge = (role: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      super_admin: { label: "Super Admin", className: "bg-[#1DB954] text-white" },
      moderator: { label: "Modérateur", className: "bg-blue-100 text-blue-700" },
      support: { label: "Support", className: "bg-purple-100 text-purple-700" },
    };
    const config = configs[role] || configs.support;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin & Rôles</h1>
          <p className="text-gray-500 mt-1">Gérer les administrateurs et leurs permissions</p>
        </div>
        <Button className="gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90">
          <Plus className="h-4 w-4" />
          Ajouter admin
        </Button>
      </div>

      <Tabs defaultValue="admins" className="space-y-6">
        <TabsList>
          <TabsTrigger value="admins">Administrateurs</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit log</TabsTrigger>
        </TabsList>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Liste des administrateurs</CardTitle>
              <CardDescription>Gérer les comptes admin</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Administrateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={admin.avatar} alt={admin.name} />
                            <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-900">{admin.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{admin.email}</TableCell>
                      <TableCell>{getRoleBadge(admin.role)}</TableCell>
                      <TableCell className="text-gray-600 text-sm">{admin.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {admin.role !== "super_admin" && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permissions par rôle</CardTitle>
              <CardDescription>Configurer les accès pour chaque rôle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { role: "Super Admin", permissions: ["all"] },
                  { role: "Modérateur", permissions: ["artistes", "booking", "messagerie", "moderation"] },
                  { role: "Support", permissions: ["support", "tickets"] },
                ].map((roleConfig) => (
                  <div key={roleConfig.role} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{roleConfig.role}</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pl-7">
                      {[
                        "Dashboard",
                        "Artistes",
                        "Organisateurs",
                        "Agents",
                        "Booking",
                        "Messagerie",
                        "Contenu",
                        "Vérifications",
                        "Marketing",
                        "Support",
                        "Modération",
                        "Paramètres",
                      ].map((module) => (
                        <div key={module} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${roleConfig.role}-${module}`}
                            defaultChecked={
                              roleConfig.permissions.includes("all") ||
                              roleConfig.permissions.some((p) =>
                                module.toLowerCase().includes(p.toLowerCase())
                              )
                            }
                            disabled={roleConfig.permissions.includes("all")}
                          />
                          <label
                            htmlFor={`${roleConfig.role}-${module}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {module}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Journal d'audit</CardTitle>
              <CardDescription>Historique des actions des administrateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Administrateur</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Date & Heure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium text-gray-900">{log.admin}</TableCell>
                      <TableCell className="text-gray-900">{log.action}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-gray-100">
                          {log.module}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">{log.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
