import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SearchResults } from "@/components/search-results";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

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

interface SearchResponse {
  books: BookInfo[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    language: "all",
    publishedDate: "all",
  });

  const searchBooks = async (
    query: string,
    page: number = 1,
    appendResults: boolean = false,
  ) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const startIndex = (page - 1) * 12;
      const params = new URLSearchParams({
        q: query,
        startIndex: startIndex.toString(),
        maxResults: "12",
        ...filters,
      });

      const response = await fetch(`/api/books/search?${params}`);

      if (!response.ok) {
        throw new Error("Failed to search books");
      }

      const data: SearchResponse = await response.json();

      if (appendResults) {
        setBooks((prev) => [...prev, ...data.books]);
      } else {
        setBooks(data.books);
      }

      setTotalResults(data.totalItems);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
      if (!appendResults) {
        setBooks([]);
        setTotalResults(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    searchBooks(searchQuery, 1, false);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      searchBooks(searchQuery, currentPage + 1, true);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: "",
      language: "",
      publishedDate: "",
    });
  };

  // Re-search when filters change
  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      searchBooks(searchQuery, 1, false);
    }
  }, [filters]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <SearchResults
              books={books}
              isLoading={isLoading && currentPage === 1}
              error={error}
              searchQuery={searchQuery}
              totalResults={totalResults}
            />

            {/* Load More Button */}
            {books.length > 0 && currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                >
                  {isLoading ? (
                    <>
                      <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load More Books (${totalResults - books.length} remaining)`
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
