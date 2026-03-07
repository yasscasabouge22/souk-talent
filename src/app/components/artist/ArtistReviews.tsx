import { useState } from "react";
import {
  Star,
  MessageSquare,
  Reply,
  Send,
  Filter,
  TrendingUp,
  Users,
  Clock,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Review {
  id: string;
  organizerName: string;
  organizerInitials: string;
  date: Date;
  rating: {
    overall: number;
    professionalism: number;
    quality: number;
    communication: number;
    value: number;
  };
  eventType: string;
  comment: string;
  artistResponse?: {
    text: string;
    date: Date;
  };
  likes: number;
}

const mockReviews: Review[] = [
  {
    id: "1",
    organizerName: "Sarah Bennani",
    organizerInitials: "SB",
    date: new Date(2026, 0, 8),
    rating: {
      overall: 5,
      professionalism: 5,
      quality: 5,
      communication: 5,
      value: 5,
    },
    eventType: "Mariage",
    comment: "Prestation exceptionnelle ! DJ Mehdi a su créer une ambiance incroyable tout au long de la soirée. Tous nos invités ont adoré. Très professionnel et à l'écoute de nos demandes. Je recommande vivement !",
    likes: 12,
  },
  {
    id: "2",
    organizerName: "Karim Alaoui",
    organizerInitials: "KA",
    date: new Date(2026, 0, 5),
    rating: {
      overall: 4.5,
      professionalism: 5,
      quality: 4,
      communication: 5,
      value: 4,
    },
    eventType: "Corporate",
    comment: "Très bon DJ, belle sélection musicale adaptée à notre événement corporate. Quelques petits soucis techniques en début de soirée mais vite résolus. Dans l'ensemble, très satisfait de la prestation.",
    artistResponse: {
      text: "Merci beaucoup Karim ! Ravi d'avoir pu contribuer au succès de votre événement. Concernant les soucis techniques, nous avons depuis amélioré notre équipement. Au plaisir de collaborer à nouveau !",
      date: new Date(2026, 0, 6),
    },
    likes: 8,
  },
  {
    id: "3",
    organizerName: "Fatima El Amrani",
    organizerInitials: "FE",
    date: new Date(2025, 11, 20),
    rating: {
      overall: 5,
      professionalism: 5,
      quality: 5,
      communication: 4,
      value: 5,
    },
    eventType: "Soirée privée",
    comment: "DJ Mehdi a assuré l'ambiance de ma soirée d'anniversaire. Mix parfait entre classiques et nouveautés. Tout le monde a dansé jusqu'au bout de la nuit ! Un vrai professionnel.",
    likes: 15,
  },
  {
    id: "4",
    organizerName: "Omar Tazi",
    organizerInitials: "OT",
    date: new Date(2025, 11, 15),
    rating: {
      overall: 4,
      professionalism: 4,
      quality: 4,
      communication: 4,
      value: 4,
    },
    eventType: "Mariage",
    comment: "Bonne prestation dans l'ensemble. Le DJ était ponctuel et professionnel. La playlist était bien mais aurait pu être un peu plus variée selon moi. Prix correct pour la qualité du service.",
    likes: 5,
  },
];

export function ArtistReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Calcul des statistiques
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, r) => acc + r.rating.overall, 0) / totalReviews;
  const responseRate = (reviews.filter(r => r.artistResponse).length / totalReviews) * 100;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.floor(r.rating.overall) === rating).length;
    const percentage = (count / totalReviews) * 100;
    return { rating, count, percentage };
  });

  const handleReply = (reviewId: string) => {
    if (!replyText.trim()) {
      toast.error("Veuillez écrire une réponse");
      return;
    }

    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              artistResponse: {
                text: replyText,
                date: new Date(),
              },
            }
          : review
      )
    );

    toast.success("Réponse publiée avec succès !");
    setReplyingTo(null);
    setReplyText("");
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true;
    const rating = Math.floor(review.rating.overall);
    return rating.toString() === filterRating;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="size-8" />
          Commentaires & Avis
        </h1>
        <p className="text-gray-400">
          Consultez les retours de vos clients et répondez pour renforcer votre réputation
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Note moyenne</p>
                <p className="text-3xl font-bold text-white flex items-center gap-2">
                  {averageRating.toFixed(1)}
                  <Star className="size-6 fill-[#1DB954] text-[#1DB954]" />
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <Star className="size-6 text-[#1DB954]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total avis</p>
                <p className="text-3xl font-bold text-white">{totalReviews}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="size-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Taux de réponse</p>
                <p className="text-3xl font-bold text-white">{responseRate.toFixed(0)}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Reply className="size-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#282828] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Tendance</p>
                <p className="text-3xl font-bold text-[#1DB954] flex items-center gap-1">
                  +12%
                  <TrendingUp className="size-5" />
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <TrendingUp className="size-6 text-[#1DB954]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution des notes */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Distribution des notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-white font-medium">{rating}</span>
                  <Star className="size-4 fill-[#1DB954] text-[#1DB954]" />
                </div>
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1DB954] transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-gray-400 text-sm w-16 text-right">
                  {count} avis
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filtres et liste des commentaires */}
      <Card className="bg-[#282828] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Tous les avis ({filteredReviews.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-400" />
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-40 bg-[#191414] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#191414] border-gray-700">
                  <SelectItem value="all" className="text-white">
                    Toutes les notes
                  </SelectItem>
                  <SelectItem value="5" className="text-white">
                    5 étoiles
                  </SelectItem>
                  <SelectItem value="4" className="text-white">
                    4 étoiles
                  </SelectItem>
                  <SelectItem value="3" className="text-white">
                    3 étoiles
                  </SelectItem>
                  <SelectItem value="2" className="text-white">
                    2 étoiles
                  </SelectItem>
                  <SelectItem value="1" className="text-white">
                    1 étoile
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="size-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucun avis pour ce filtre</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 bg-[#191414] rounded-lg border border-gray-700"
                >
                  {/* Header du commentaire */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-semibold flex-shrink-0">
                      {review.organizerInitials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-semibold">
                            {review.organizerName}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <Clock className="size-3" />
                            {format(review.date, "d MMMM yyyy", { locale: fr })}
                            <span>•</span>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {review.eventType}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-5 ${
                                i < Math.floor(review.rating.overall)
                                  ? "fill-[#1DB954] text-[#1DB954]"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-white font-semibold">
                            {review.rating.overall.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Notes détaillées */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs">
                          <p className="text-gray-500">Professionnalisme</p>
                          <p className="text-white font-medium">
                            {review.rating.professionalism}/5
                          </p>
                        </div>
                        <div className="text-xs">
                          <p className="text-gray-500">Qualité</p>
                          <p className="text-white font-medium">{review.rating.quality}/5</p>
                        </div>
                        <div className="text-xs">
                          <p className="text-gray-500">Communication</p>
                          <p className="text-white font-medium">
                            {review.rating.communication}/5
                          </p>
                        </div>
                        <div className="text-xs">
                          <p className="text-gray-500">Rapport qualité/prix</p>
                          <p className="text-white font-medium">{review.rating.value}/5</p>
                        </div>
                      </div>

                      {/* Commentaire */}
                      <p className="text-gray-300 leading-relaxed">{review.comment}</p>

                      {/* Footer avec actions */}
                      <div className="flex items-center gap-4 mt-4">
                        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#1DB954] transition-colors">
                          <ThumbsUp className="size-4" />
                          {review.likes}
                        </button>
                        {!review.artistResponse && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                            onClick={() => setReplyingTo(review.id)}
                          >
                            <Reply className="size-4 mr-2" />
                            Répondre
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Réponse de l'artiste */}
                  {review.artistResponse && (
                    <div className="ml-16 mt-4 p-4 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply className="size-4 text-[#1DB954]" />
                        <span className="text-sm font-semibold text-[#1DB954]">
                          Votre réponse
                        </span>
                        <span className="text-xs text-gray-400">
                          •{" "}
                          {format(review.artistResponse.date, "d MMMM yyyy", {
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {review.artistResponse.text}
                      </p>
                    </div>
                  )}

                  {/* Formulaire de réponse */}
                  {replyingTo === review.id && (
                    <div className="ml-16 mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <Label className="text-gray-300 mb-2 block">Votre réponse</Label>
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Remerciez votre client et répondez à son commentaire..."
                        className="bg-[#191414] border-gray-700 text-white mb-3 min-h-24"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                        >
                          Annuler
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#1DB954] hover:bg-[#1ED760] text-black"
                          onClick={() => handleReply(review.id)}
                        >
                          <Send className="size-4 mr-2" />
                          Publier la réponse
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}
