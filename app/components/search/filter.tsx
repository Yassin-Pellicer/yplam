import { useState, useRef, useEffect } from "react";
import { useSearchStore } from "./context";
import { X, Filter, ChevronDown } from "lucide-react";
import { useTranslation } from "next-i18next";

export default function FilterMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchContext = useSearchStore();

  const { t, i18n } = useTranslation();
  const allTags = t("allTags", { returnObjects: true }) as string[];
  const allTechnologies = t("allTechnologies", { returnObjects: true }) as [string, string][];
  const isSpanish = i18n.language?.startsWith("es");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasActiveFilters =
    searchContext.tags.length > 0 || searchContext.technologies.length > 0;
  const activeFiltersCount =
    searchContext.tags.length + searchContext.technologies.length;

  const clearAllFilters = () => {
    searchContext.setTags([]);
    searchContext.setTechnologies([]);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-2 py-1 border rounded text-sm transition-colors ${
          hasActiveFilters
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:bg-secondary/10/40"
        }`}
      >
        <Filter className="w-4 h-4 mr-1" />
        {isSpanish ? "Filtros" : "Filter"}
        {activeFiltersCount > 0 && (
          <span className="ml-1 px-1 text-xs bg-primary text-primary-foreground rounded-full">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg shadow-lg z-50"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground!">{isSpanish ? "Filtros" : "Filters"}</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  {isSpanish ? "Limpiar" : "Clear all"}
                </button>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground! mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allTags.map((tag) => {
                  const isSelected = searchContext.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => searchContext.toggleTag(tag)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/10 text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      #{tag}
                      {isSelected && <X className="w-3 h-3 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground! mb-2">
                {isSpanish ? "Tecnologías" : "Technologies"}
              </h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allTechnologies.map((tech) => {
                  const isSelected = searchContext.technologies.some(
                    (selectedTech) => selectedTech[0] === tech[0] && selectedTech[1] === tech[1]
                  );
                  return (
                    <button
                      key={`${tech[0]}-${tech[1]}`}
                      onClick={() => searchContext.toggleTechnology(tech)}
                      className={`inline-flex items-center px-2 py-1 rounded text-xs transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/10 text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      <span className={`${tech[0]} text-sm mr-1`}></span>
                      {tech[1]}
                      {isSelected && <X className="w-3 h-3 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="pt-3 border-t border-border">
                <h4 className="text-sm font-medium text-foreground! mb-2">
                  {isSpanish ? "Filtros activos" : "Active Filters"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {searchContext.tags.map((tag) => (
                    <span
                      key={`active-tag-${tag}`}
                      className="inline-flex items-center px-2 py-1 bg-primary/15 text-primary rounded-full text-xs"
                    >
                      #{tag}
                      <button
                        onClick={() => searchContext.toggleTag(tag)}
                        className="ml-1 hover:text-primary/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {searchContext.technologies.map((tech) => (
                    <span
                      key={`active-tech-${tech[0]}-${tech[1]}`}
                      className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary-foreground rounded text-xs"
                    >
                      <span className={`${tech[0]} text-sm mr-1`}></span>
                      {tech[1]}
                      <button
                        onClick={() => searchContext.toggleTechnology(tech)}
                        className="ml-1 hover:text-foreground!"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
