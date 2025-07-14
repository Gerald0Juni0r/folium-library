import { useState } from "react";
import { Heart, BookmarkPlus, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface BookInfo {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  thumbnail?: string;
  categories?: string[];
  publishedDate?: string;
  pageCount?: number;
  averageRating?: number;
  language?: string;
  previewLink?: string;
}

interface BookCardProps {
  book: BookInfo;
}

export function BookCard({ book }: BookCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(
      isSaved ? "Book removed from library" : "Book saved to library",
    );
  };

  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return "Unknown Author";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" & ");
    return `${authors[0]} & ${authors.length - 1} others`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Card className="group h-full bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex gap-4 h-full">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <div className="w-20 h-28 md:w-24 md:h-32 rounded-md overflow-hidden bg-folium-parchment dark:bg-folium-silver/20 border border-folium-silver dark:border-folium-silver/30">
              {book.thumbnail ? (
                <img
                  src={book.thumbnail.replace("&edge=curl", "")}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookmarkPlus className="h-6 w-6 text-folium-sepia dark:text-folium-sepia" />
                </div>
              )}
            </div>
          </div>

          {/* Book Info */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Title and Author */}
            <div className="mb-2">
              <h3 className="font-serif font-semibold text-folium-ink dark:text-folium-cream line-clamp-2 text-sm md:text-base leading-tight">
                {book.title}
              </h3>
              <p className="text-folium-sepia dark:text-folium-parchment text-xs md:text-sm mt-1">
                {formatAuthors(book.authors)}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-1 mb-2">
              {book.publishedDate && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-folium-parchment dark:bg-folium-silver/20 text-folium-sepia dark:text-folium-parchment border-0"
                >
                  {new Date(book.publishedDate).getFullYear()}
                </Badge>
              )}
              {book.categories && book.categories[0] && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-folium-sage/20 text-folium-sage dark:bg-folium-sage/30 dark:text-folium-sage border-0"
                >
                  {book.categories[0]}
                </Badge>
              )}
              {book.averageRating && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-folium-azure/20 text-folium-azure dark:bg-folium-azure/30 dark:text-folium-azure border-0 flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  {book.averageRating.toFixed(1)}
                </Badge>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 mb-3 flex-1">
                {truncateText(book.description.replace(/<[^>]*>/g, ""), 120)}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <Button
                onClick={handleSave}
                size="sm"
                variant={isSaved ? "default" : "outline"}
                className={`flex-1 text-xs ${
                  isSaved
                    ? "bg-folium-sage hover:bg-folium-sage/90 text-white"
                    : "bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                }`}
              >
                <Heart
                  className={`h-3 w-3 mr-1 ${isSaved ? "fill-current" : ""}`}
                />
                {isSaved ? "Saved" : "Save"}
              </Button>
              {book.previewLink && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                  onClick={() => window.open(book.previewLink, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
