import { Filter, Calendar, Globe, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    category: string;
    language: string;
    publishedDate: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  filters,
  onFilterChange,
  onClearFilters,
}: SidebarProps) {
  const categories = [
    { value: "", label: "All Categories" },
    { value: "fiction", label: "Fiction" },
    { value: "biography", label: "Biography" },
    { value: "history", label: "History" },
    { value: "science", label: "Science" },
    { value: "technology", label: "Technology" },
    { value: "philosophy", label: "Philosophy" },
    { value: "poetry", label: "Poetry" },
    { value: "art", label: "Art" },
    { value: "business", label: "Business" },
    { value: "self-help", label: "Self Help" },
  ];

  const languages = [
    { value: "", label: "All Languages" },
    { value: "en", label: "English" },
    { value: "pt", label: "Portuguese" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" },
  ];

  const publishedDates = [
    { value: "", label: "Any Time" },
    { value: "2020-", label: "Since 2020" },
    { value: "2010-2020", label: "2010-2020" },
    { value: "2000-2010", label: "2000-2010" },
    { value: "1990-2000", label: "1990-2000" },
    { value: "-1990", label: "Before 1990" },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="md:hidden mb-4 bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? "block" : "hidden md:block"}
          w-full md:w-80 space-y-4
        `}
      >
        <Card className="bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-folium-ink dark:text-folium-cream">
              <Filter className="h-5 w-5 mr-2 text-folium-sage" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-folium-ink dark:text-folium-cream">
                <Tag className="h-4 w-4 mr-2 text-folium-sage" />
                Category
              </Label>
              <Select
                value={filters.category}
                onValueChange={(value) => onFilterChange("category", value)}
              >
                <SelectTrigger className="bg-background border-folium-silver dark:border-folium-silver/30">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

            {/* Language Filter */}
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-folium-ink dark:text-folium-cream">
                <Globe className="h-4 w-4 mr-2 text-folium-sage" />
                Language
              </Label>
              <Select
                value={filters.language}
                onValueChange={(value) => onFilterChange("language", value)}
              >
                <SelectTrigger className="bg-background border-folium-silver dark:border-folium-silver/30">
                  <SelectValue placeholder="Select language..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

            {/* Publication Date Filter */}
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-folium-ink dark:text-folium-cream">
                <Calendar className="h-4 w-4 mr-2 text-folium-sage" />
                Publication Date
              </Label>
              <Select
                value={filters.publishedDate}
                onValueChange={(value) =>
                  onFilterChange("publishedDate", value)
                }
              >
                <SelectTrigger className="bg-background border-folium-silver dark:border-folium-silver/30">
                  <SelectValue placeholder="Select date range..." />
                </SelectTrigger>
                <SelectContent>
                  {publishedDates.map((date) => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

            {/* Clear Filters */}
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="w-full bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
