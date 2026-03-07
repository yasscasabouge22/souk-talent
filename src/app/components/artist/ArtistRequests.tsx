import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Inbox,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { mockBookingRequests, BookingRequest } from "../../data/artistDashboardData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function ArtistRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(mockBookingRequests);

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const acceptedRequests = requests.filter((r) => r.status === "accepted");
  const declinedRequests = requests.filter((r) => r.status === "declined");
  const expiredRequests = requests.filter((r) => r.status === "expired");

  const getStatusBadge = (status: BookingRequest["status"]) => {
    const variants = {
      pending: {
        label: "En attente",
        color: "bg-yellow-500/20 text-yellow-500",
        icon: Clock,
      },
      accepted: {
        label: "Acceptée",
        color: "bg-green-500/20 text-green-500",
        icon: CheckCircle,
      },
      declined: {
        label: "Refusée",
        color: "bg-red-500/20 text-red-500",
        icon: XCircle,
      },
      expired: {
        label: "Expirée",
        color: "bg-gray-500/20 text-gray-500",
        icon: Clock,
      },
    };

    return variants[status];
  };

  const handleAccept = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "accepted" as const } : req
      )
    );
  };

  const handleDecline = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "declined" as const } : req
      )
    );
  };

  const handleSendReply = (requestId: string, replyMessage: string) => {
    if (!replyMessage.trim()) return;

    const newResponse = {
      id: `resp-${Date.now()}`,
      from: "artist" as const,
      message: replyMessage,
      sentAt: new Date().toISOString(),
    };

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              responses: [...(req.responses || []), newResponse],
            }
          : req
      )
    );
  };

  const RequestCard = ({ request }: { request: BookingRequest }) => {
    const badge = getStatusBadge(request.status);
    const Icon = badge.icon;

    return (
      <Card
        className="bg-[#282828] border-gray-800 hover:border-[#1DB954]/50 transition-colors cursor-pointer"
        onClick={() => navigate(`/artiste/demandes/${request.id}`)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={request.organizerAvatar}
                alt={request.organizerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-medium">{request.organizerName}</p>
                <p className="text-sm text-gray-400">{request.eventType}</p>
              </div>
            </div>
            <Badge className={badge.color}>
              <Icon className="size-3 mr-1" />
              {badge.label}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="size-4" />
              <span>
                {format(new Date(request.eventDate), "dd MMMM yyyy", {
                  locale: fr,
                })}
                {request.eventTime && ` à ${request.eventTime}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="size-4" />
              <span>
                {request.location}, {request.city}
              </span>
            </div>
            {request.budget && (
              <div className="flex items-center gap-2 text-[#1DB954]">
                <DollarSign className="size-4" />
                <span>{request.budget}</span>
              </div>
            )}
          </div>

          <p className="text-gray-300 text-sm mt-3 line-clamp-2">{request.message}</p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
            <span className="text-xs text-gray-500">
              {format(new Date(request.receivedAt), "dd MMM à HH:mm", {
                locale: fr,
              })}
            </span>
            {request.responses && request.responses.length > 0 && (
              <Badge variant="outline" className="border-gray-700 text-gray-400">
                <MessageSquare className="size-3 mr-1" />
                {request.responses.length} message{request.responses.length > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const RequestsList = ({ requests }: { requests: BookingRequest[] }) => {
    if (requests.length === 0) {
      return (
        <div className="text-center py-12">
          <Inbox className="size-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Aucune demande dans cette catégorie</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Inbox className="size-8" />
          Demandes de réservation
        </h1>
        <p className="text-gray-400">Gérez vos demandes de booking</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-[#282828] border-gray-800">
          <TabsTrigger value="pending" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">
            En attente ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">
            Acceptées ({acceptedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="declined" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">
            Refusées ({declinedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="expired" className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black">
            Expirées ({expiredRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <RequestsList requests={pendingRequests} />
        </TabsContent>

        <TabsContent value="accepted">
          <RequestsList requests={acceptedRequests} />
        </TabsContent>

        <TabsContent value="declined">
          <RequestsList requests={declinedRequests} />
        </TabsContent>

        <TabsContent value="expired">
          <RequestsList requests={expiredRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
}