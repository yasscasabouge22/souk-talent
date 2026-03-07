import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Activity, 
  Eye, 
  Ban, 
  Flag, 
  MessageSquare, 
  TrendingDown,
  UserX,
  ChevronDown
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
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
import { useState } from "react";

export function AdminModeration() {
  const [period, setPeriod] = useState("7j");
  
  // KPIs Sécurité
  const kpis = [
    {
      label: "Comptes suspendus",
      value: "3",
      trend: "-25%",
      trendPositive: true,
      icon: Ban,
      iconColor: "text-red-500",
    },
    {
      label: "Comptes sous surveillance",
      value: "8",
      trend: "+14%",
      trendPositive: false,
      icon: Eye,
      iconColor: "text-orange-500",
    },
    {
      label: "Signalements",
      value: "12",
      trend: "-8%",
      trendPositive: true,
      icon: Flag,
      iconColor: "text-yellow-600",
    },
    {
      label: "Alertes critiques",
      value: "2",
      trend: "0%",
      trendPositive: true,
      icon: AlertTriangle,
      iconColor: "text-red-600",
    },
    {
      label: "Messages signalés",
      value: "15",
      trend: "+5%",
      trendPositive: false,
      icon: MessageSquare,
      iconColor: "text-blue-500",
    },
    {
      label: "Taux annulation anormal",
      value: "4",
      trend: "-12%",
      trendPositive: true,
      icon: TrendingDown,
      iconColor: "text-purple-500",
    },
  ];

  // Alertes automatiques
  const alerts = [
    {
      id: 1,
      date: "27/02/2026 14:30",
      user: "DJ Khalid Pro",
      type: "Taux annulation élevé",
      level: "critical",
      levelLabel: "Critique",
      occurrences: 8,
      userType: "Artiste",
    },
    {
      id: 2,
      date: "27/02/2026 12:15",
      user: "Events Prestige",
      type: "Envoi massif de messages",
      level: "high",
      levelLabel: "Élevé",
      occurrences: 45,
      userType: "Organisateur",
    },
    {
      id: 3,
      date: "27/02/2026 09:20",
      user: "Sara Music",
      type: "Multiples comptes même IP",
      level: "medium",
      levelLabel: "Moyen",
      occurrences: 2,
      userType: "Artiste",
    },
    {
      id: 4,
      date: "26/02/2026 18:45",
      user: "Ahmed Events",
      type: "Signalements multiples",
      level: "high",
      levelLabel: "Élevé",
      occurrences: 5,
      userType: "Organisateur",
    },
    {
      id: 5,
      date: "26/02/2026 15:30",
      user: "Orchestra Elite",
      type: "Comportement spam",
      level: "low",
      levelLabel: "Faible",
      occurrences: 3,
      userType: "Artiste",
    },
  ];

  // Comptes sous surveillance
  const watchlist = [
    {
      id: 1,
      name: "DJ Khalid Pro",
      type: "Artiste",
      reason: "Taux annulation élevé (73%)",
      alerts: 8,
      dateAdded: "20/02/2026",
      admin: "Admin Principal",
    },
    {
      id: 2,
      name: "Events Prestige",
      type: "Organisateur",
      reason: "Messages répétitifs suspects",
      alerts: 12,
      dateAdded: "18/02/2026",
      admin: "Admin Modération",
    },
    {
      id: 3,
      name: "Sara Music",
      type: "Artiste",
      reason: "Multiples comptes détectés",
      alerts: 3,
      dateAdded: "25/02/2026",
      admin: "Admin Principal",
    },
  ];

  // Historique des sanctions
  const sanctions = [
    {
      id: 1,
      user: "Fake Events Co",
      action: "Bannissement",
      reason: "Fraude confirmée - fausses informations",
      admin: "Admin Principal",
      date: "25/02/2026 16:00",
    },
    {
      id: 2,
      user: "DJ Spam Artist",
      action: "Suspension",
      reason: "Envoi massif de messages non sollicités",
      admin: "Admin Modération",
      date: "23/02/2026 10:30",
    },
    {
      id: 3,
      user: "Bad Organizer",
      action: "Avertissement",
      reason: "Annulations répétées sans justification",
      admin: "Admin Principal",
      date: "21/02/2026 14:15",
    },
    {
      id: 4,
      user: "Suspicious Account",
      action: "Suspension",
      reason: "Activité suspecte détectée par IA",
      admin: "Admin Sécurité",
      date: "19/02/2026 09:45",
    },
  ];

  // Analyse comportementale
  const behavioralMetrics = [
    { label: "% annulation moyen", value: "12%", status: "normal" },
    { label: "Délai moyen réponse", value: "2.3h", status: "good" },
    { label: "Messages envoyés / jour", value: "8.5", status: "normal" },
    { label: "Demandes envoyées / jour", value: "3.2", status: "normal" },
    { label: "Activité anormale détectée", value: "4 comptes", status: "warning" },
  ];

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case "Bannissement":
        return "bg-red-100 text-red-700 border-red-200";
      case "Suspension":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Avertissement":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const activeAlertsCount = alerts.filter(a => a.level === "critical" || a.level === "high").length;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Modération & Sécurité</h1>
            <p className="text-gray-500 mt-1">Surveillance et détection d'activités suspectes</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-red-100 text-red-700 border-red-200 px-3 py-1.5 text-sm">
              {activeAlertsCount} alertes actives
            </Badge>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[120px] bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7j">7 jours</SelectItem>
                <SelectItem value="30j">30 jours</SelectItem>
                <SelectItem value="90j">90 jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-sm border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`h-5 w-5 ${kpi.iconColor}`} />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <div className={`text-xs ${kpi.trendPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Section Alertes Automatiques */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-xl">Alertes Automatiques</CardTitle>
          <CardDescription>Détection en temps réel des comportements suspects</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Utilisateur</TableHead>
                <TableHead className="font-semibold">Type d'alerte</TableHead>
                <TableHead className="font-semibold">Niveau</TableHead>
                <TableHead className="font-semibold text-center">Occurrences</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-gray-600 text-sm">{alert.date}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{alert.user}</div>
                      <div className="text-xs text-gray-500">{alert.userType}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{alert.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getLevelBadgeClass(alert.level)}>
                      {alert.levelLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                      {alert.occurrences}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Voir profil
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                        Surveiller
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-red-200 text-red-700 hover:bg-red-50">
                        Suspendre
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Section Comptes sous surveillance */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-xl">Comptes sous surveillance</CardTitle>
          <CardDescription>Utilisateurs nécessitant une attention particulière</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold">Nom utilisateur</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Raison</TableHead>
                <TableHead className="font-semibold text-center">Alertes</TableHead>
                <TableHead className="font-semibold">Date ajout</TableHead>
                <TableHead className="font-semibold">Admin responsable</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{item.reason}</TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                      {item.alerts}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">{item.dateAdded}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{item.admin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Retirer
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-red-200 text-red-700 hover:bg-red-50">
                        Suspendre
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-red-300 text-red-800 hover:bg-red-100">
                        Bannir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Historique des sanctions */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-xl">Historique des sanctions</CardTitle>
          <CardDescription>Traçabilité complète des actions disciplinaires</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold">Utilisateur</TableHead>
                <TableHead className="font-semibold">Action prise</TableHead>
                <TableHead className="font-semibold">Motif</TableHead>
                <TableHead className="font-semibold">Admin</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sanctions.map((sanction) => (
                <TableRow key={sanction.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-900">{sanction.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getActionBadgeClass(sanction.action)}>
                      {sanction.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-md">{sanction.reason}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{sanction.admin}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{sanction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bloc Analyse comportementale */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-xl">Analyse comportementale</CardTitle>
          <CardDescription>Métriques globales de la plateforme</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {behavioralMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="flex items-center gap-2">
                    {metric.status === "good" && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Bon</span>
                      </div>
                    )}
                    {metric.status === "normal" && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>Normal</span>
                      </div>
                    )}
                    {metric.status === "warning" && (
                      <div className="flex items-center gap-1 text-xs text-orange-600">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>Attention</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}