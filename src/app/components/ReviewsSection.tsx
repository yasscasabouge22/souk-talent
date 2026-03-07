import { Star, MessageCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Review } from "../data/mockData";
import { useState } from "react";

interface ReviewsSectionProps {
  reviews: Review[];
  overallRating: number;
  reviewsCount: number;
}

export function ReviewsSection({ reviews, overallRating, reviewsCount }: ReviewsSectionProps) {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  // Calculer la moyenne des notes
  const avgMusique = reviews.reduce((acc, r) => acc + r.ratings.musique, 0) / reviews.length;
  const avgProfessionnalisme = reviews.reduce((acc, r) => acc + r.ratings.professionnalisme, 0) / reviews.length;
  const avgPerformance = reviews.reduce((acc, r) => acc + r.ratings.performanceScenique, 0) / reviews.length;

  const toggleReview = (id: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedReviews(newExpanded);
  };

  const RatingBar = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center gap-4">
      <span className="text-white min-w-[180px]">{label}</span>
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1DB954] rounded-full transition-all duration-500"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-white min-w-[3rem] text-right font-semibold">{value.toFixed(1)}</span>
    </div>
  );

  return (
    <Card className="bg-[#282828] border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-2xl">
          <span className="text-3xl">🤝</span>
          <Star className="size-6 fill-[#1DB954] text-[#1DB954]" />
          <span className="text-[#1DB954]">{overallRating.toFixed(1)}</span>
          <span className="text-gray-400 text-lg">· {reviewsCount} COMMENTAIRES</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Rating Bars */}
        <div className="space-y-4">
          <RatingBar label="Musique" value={avgMusique} />
          <RatingBar label="Professionnalisme" value={avgProfessionnalisme} />
          <RatingBar label="Performance scénique" value={avgPerformance} />
        </div>

        {/* Reviews List */}
        <div className="space-y-6 mt-8">
          {reviews.map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const shouldTruncate = review.comment.length > 120;
            const displayComment = isExpanded || !shouldTruncate 
              ? review.comment 
              : review.comment.substring(0, 120) + "...";

            return (
              <div key={review.id} className="border-t border-gray-700 pt-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.organizerAvatar}
                    alt={review.organizerName}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg">{review.organizerName}</h4>
                    <p className="text-gray-400 text-sm mb-3">{review.date}</p>
                    <p className="text-gray-300 leading-relaxed">
                      {displayComment}
                    </p>
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleReview(review.id)}
                        className="flex items-center gap-1 mt-2 text-[#1DB954] hover:text-[#1ED760] text-sm font-medium transition-colors"
                      >
                        <span className="text-xl">👉</span>
                        {isExpanded ? "Voir moins" : "Voir le détail"}
                        <ChevronRight className={`size-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show All Reviews Button */}
        {reviewsCount > reviews.length && (
          <div className="text-center pt-4">
            <button className="text-[#1DB954] hover:text-[#1ED760] font-medium flex items-center gap-2 mx-auto transition-colors">
              <MessageCircle className="size-5" />
              Voir tous les {reviewsCount} commentaires
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
