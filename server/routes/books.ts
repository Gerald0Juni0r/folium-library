import { RequestHandler } from "express";

interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
      };
      categories?: string[];
      publishedDate?: string;
      pageCount?: number;
      averageRating?: number;
      language?: string;
      previewLink?: string;
    };
  }>;
}

export const searchBooks: RequestHandler = async (req, res) => {
  try {
    const {
      q,
      category,
      language,
      publishedDate,
      startIndex = 0,
      maxResults = 12,
    } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Build the search query
    let searchQuery = encodeURIComponent(q);

    // Add filters
    const filters = [];
    if (category && category !== "all") {
      filters.push(`subject:${category}`);
    }
    if (language && language !== "all") {
      filters.push(`langRestrict=${language}`);
    }

    if (filters.length > 0) {
      searchQuery += "+" + filters.join("+");
    }

    // Handle published date filter
    let dateFilter = "";
    if (publishedDate && publishedDate !== "all") {
      const now = new Date().getFullYear();
      switch (publishedDate) {
        case "2020-":
          dateFilter = "&orderBy=newest";
          break;
        case "2010-2020":
          dateFilter = "&orderBy=newest";
          break;
        case "2000-2010":
          dateFilter = "&orderBy=newest";
          break;
        case "1990-2000":
          dateFilter = "&orderBy=newest";
          break;
        case "-1990":
          dateFilter = "&orderBy=newest";
          break;
      }
    }

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}${dateFilter}&printType=books`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data: GoogleBooksResponse = await response.json();

    // Transform the data to match our interface
    const books =
      data.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace(
          "http:",
          "https:",
        ),
        categories: item.volumeInfo.categories,
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        averageRating: item.volumeInfo.averageRating,
        language: item.volumeInfo.language,
        previewLink: item.volumeInfo.previewLink,
      })) || [];

    res.json({
      books,
      totalItems: data.totalItems || 0,
      currentPage: Math.floor(Number(startIndex) / Number(maxResults)) + 1,
      totalPages: Math.ceil((data.totalItems || 0) / Number(maxResults)),
    });
  } catch (error) {
    console.error("Books search error:", error);
    res.status(500).json({
      error: "Failed to search books. Please try again later.",
    });
  }
};
