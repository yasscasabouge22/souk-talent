import { useState } from "react";
import {
  Users,
  UserPlus,
  Award,
  CheckCircle,
  MessageSquare,
  Send,
  TrendingUp,
  Activity,
  AlertCircle,
  Shield,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function AdminMarketing() {
  const [period, setPeriod] = useState("30j");

  // Mock data pour les graphiques
  const artistSignupsData = [
    { month: "Juil", count: 12 },
    { month: "Août", count: 18 },
    { month: "Sept", count: 24 },
    { month: "Oct", count: 31 },
    { month: "Nov", count: 42 },
    { month: "Déc", count: 56 },
    { month: "Jan", count: 68 },
    { month: "Fév", count: 75 },
  ];

  const organizerSignupsData = [
    { month: "Juil", count: 8 },
    { month: "Août", count: 14 },
    { month: "Sept", count: 19 },
    { month: "Oct", count: 23 },
    { month: "Nov", count: 29 },
    { month: "Déc", count: 38 },
    { month: "Jan", count: 45 },
    { month: "Fév", count: 52 },
  ];

  // KPIs data
  const kpis = [
    {
      title: "Nouveaux artistes",
      value: period === "7j" ? "12" : period === "30j" ? "45" : "180",
      variation: "+23%",
      isPositive: true,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Nouveaux organisateurs",
      value: period === "7j" ? "8" : period === "30j" ? "28" : "112",
      variation: "+18%",
      isPositive: true,
      icon: UserPlus,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Demandes Pro envoyées",
      value: period === "7j" ? "5" : period === "30j" ? "19" : "67",
      variation: "+31%",
      isPositive: true,
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Taux validation Pro",
      value: "78%",
      variation: "+5%",
      isPositive: true,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Demandes envoyées",
      value: period === "7j" ? "34" : period === "30j" ? "142" : "589",
      variation: "+12%",
      isPositive: true,
      icon: Send,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      title: "Conversations actives",
      value: period === "7j" ? "28" : period === "30j" ? "95" : "412",
      variation: "-3%",
      isPositive: false,
      icon: MessageSquare,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  // Activation metrics
  const activationMetrics = [
    { label: "Profils artistes complets", percentage: 67 },
    { label: "Artistes avec médias", percentage: 54 },
    { label: "Agenda rempli", percentage: 42 },
    { label: "Demande Pro envoyée", percentage: 23 },
  ];

  // Engagement data
  const engagementData = [
    { label: "Demandes / organisateur", value: "3.2", trend: "+0.4" },
    { label: "Délai de réponse artiste", value: "4.8h", trend: "-1.2h" },
    { label: "Taux conversion demande", value: "34%", trend: "+2%" },
  ];

  // Top artists
  const topArtists = [
    { name: "DJ Mehdi", views: 234 },
    { name: "Orchestre Atlas", views: 198 },
    { name: "Groupe Fusion", views: 176 },
    { name: "Chanteur Traditionnel", views: 154 },
    { name: "Artiste Gnawa", views: 142 },
  ];

  // Quality metrics
  const qualityMetrics = [
    { label: "Signalements", value: 3, status: "success", color: "bg-green-100 text-green-700" },
    { label: "Taux de litiges", value: "1.2%", status: "success", color: "bg-green-100 text-green-700" },
    { label: "Profils vérifiés", value: "89%", status: "info", color: "bg-blue-100 text-blue-700" },
    { label: "Comptes surveillés", value: 2, status: "warning", color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing & Croissance</h1>
          <p className="text-gray-500 mt-1">Suivi de la croissance et de l'engagement</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7j">7 derniers jours</SelectItem>
            <SelectItem value="30j">30 derniers jours</SelectItem>
            <SelectItem value="90j">90 derniers jours</SelectItem>
            <SelectItem value="12m">12 derniers mois</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-gray-100">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      kpi.isPositive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {kpi.variation}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div className="text-xs text-gray-500">{kpi.title}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Graphiques de croissance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inscriptions artistes */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              Inscriptions artistes par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={artistSignupsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inscriptions organisateurs */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              Inscriptions organisateurs par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={organizerSignupsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: "#a855f7", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activation & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloc Activation */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Activation des artistes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activationMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{metric.label}</span>
                  <span className="font-semibold text-gray-900">{metric.percentage}%</span>
                </div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bloc Engagement */}
        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Métriques d'engagement */}
            {engagementData.map((data) => (
              <div
                key={data.label}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{data.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{data.value}</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      data.trend.startsWith("+")
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {data.trend}
                  </Badge>
                </div>
              </div>
            ))}

            {/* Artistes les plus consultés */}
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Artistes les plus consultés
              </h4>
              <div className="space-y-2">
                {topArtists.map((artist, index) => (
                  <div
                    key={artist.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium w-4">{index + 1}.</span>
                      <span className="text-gray-700">{artist.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-gray-900 font-medium">{artist.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bloc Qualité & Réseau */}
      <Card className="border-gray-100">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal-600" />
            Qualité & Réseau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualityMetrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl"
              >
                <div className={`px-3 py-1 rounded-full ${metric.color} font-bold text-xl mb-2`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 text-center">{metric.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
