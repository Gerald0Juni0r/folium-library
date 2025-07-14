import { Loader2, BookOpen, Search as SearchIcon } from "lucide-react";
import { BookCard } from "./book-card";

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

interface SearchResultsProps {
  books: BookInfo[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  totalResults: number;
}

export function SearchResults({
  books,
  isLoading,
  error,
  searchQuery,
  totalResults,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-folium-sage" />
        <p className="text-muted-foreground">Searching for books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <SearchIcon className="h-8 w-8 text-destructive" />
        </div>
        <div className="text-center">
          <h3 className="font-serif font-semibold text-lg text-folium-ink dark:text-folium-cream mb-2">
            Search Error
          </h3>
          <p className="text-muted-foreground max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-folium-sage/10 flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-folium-sage" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="font-serif font-semibold text-xl text-folium-ink dark:text-folium-cream">
            Welcome to Folium
          </h3>
          <p className="text-muted-foreground max-w-md">
            Discover your next great read by searching for books by title,
            author, or keyword. Use the search bar above to get started.
          </p>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
          <SearchIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="font-serif font-semibold text-lg text-folium-ink dark:text-folium-cream mb-2">
            No Books Found
          </h3>
          <p className="text-muted-foreground max-w-md">
            We couldn't find any books matching "{searchQuery}". Try different
            keywords or check your spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="border-b border-folium-silver dark:border-folium-silver/30 pb-4">
        <h2 className="font-serif font-semibold text-xl text-folium-ink dark:text-folium-cream">
          Search Results
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Found {totalResults.toLocaleString()} book
          {totalResults !== 1 ? "s" : ""} for "{searchQuery}"
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
