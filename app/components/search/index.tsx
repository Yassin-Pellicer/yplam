import { useSearchStore } from "./context";
import useSearch from "./hooks";
import FilterMenu from "./filter";
import { Search as SearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";

export default function Search() {
  const hooks = useSearch();
  const searchContext = useSearchStore();
  const { t, i18n } = useTranslation();

  const isSpanish = i18n.language?.startsWith("es");

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="md:text-2xl text-xl font-bold tracking-tighter text-foreground!">
            {t("blog.title")}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mt-3">
          <div className="relative w-full lg:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              className="w-full pl-8 pr-2 py-2 border rounded-lg border-border bg-background text-sm text-foreground! placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25"
              placeholder={isSpanish ? "Buscar publicaciones..." : "Search posts..."}
              value={searchContext.searchTerm}
              onChange={(e) => searchContext.setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-2 items-center flex-wrap">
            <span className="border-border border px-2 rounded-full py-1 md:text-sm text-center text-xs text-muted-foreground lg:mr-6">
              {hooks.total} {isSpanish ? "Posts" : "Posts"}
            </span>

            <FilterMenu />

            <button
              onClick={() => searchContext.setSortBy("Latest")}
              className={`px-2 hover:cursor-pointer md:text-sm text-xs rounded py-1 transition duration-100 ${searchContext.sortBy === "Latest"
                  ? "bg-secondary/10 text-secondary-foreground border border-border"
                  : "text-muted-foreground hover:bg-secondary/10/40 border border-border"
                }`}
            >
              {isSpanish ? "Recientes" : "Latest"}
            </button>
            <button
              onClick={() => searchContext.setSortBy("Oldest")}
              className={`px-2 hover:cursor-pointer md:text-sm text-xs rounded py-1 transition duration-100 ${searchContext.sortBy === "Oldest"
                  ? "bg-secondary/10 text-secondary-foreground border border-border"
                  : "text-muted-foreground hover:bg-secondary/10/40 border border-border"
                }`}
            >
              {isSpanish ? "Antiguas" : "Oldest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
