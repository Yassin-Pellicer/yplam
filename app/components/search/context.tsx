import { create } from "zustand";
import i18next from "i18next";

type SearchResult = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  tags: string[];
  image: string;
  technologies: string[];
};

type SearchState = {
  allPosts: SearchResult[];
  searchResults: SearchResult[];
  searchTerm: string;
  sortBy: string;
  tags: string[];
  technologies: [string, string][];
  setSearchTerm: (term: string) => void;
  setSortBy: (key: string) => void;
  setTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  refreshData: () => void;
  setTechnologies: (tags: [string, string][]) => void;
  toggleTechnology: (tag: [string, string]) => void;
  updateSearchResults: () => void;
};

function loadData() {
  const rawPosts = i18next.t("posts", { returnObjects: true }) as Record<
    string,
    SearchResult
  >;
  return {
    allPosts: Object.values(rawPosts).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  };
}

export const useSearchStore = create<SearchState>((set, get) => {
  const { allPosts } = loadData();

  return {
    allPosts,
    searchResults: allPosts,
    searchTerm: "",
    sortBy: "Latest",
    tags: [],
    technologies: [],

    setTags: (tags) => {
      set({ tags });
      get().updateSearchResults();
    },

    setTechnologies: (technologies) => {
      set({ technologies });
      get().updateSearchResults();
    },

    toggleTechnology: (technology) => {
      set((state) => {
        const exists = state.technologies.some(
          (t) => t[0] === technology[0] && t[1] === technology[1]
        );

        const newTechnologies = exists
          ? state.technologies.filter(
              (t) => !(t[0] === technology[0] && t[1] === technology[1])
            )
          : [...state.technologies, technology];

        return { technologies: newTechnologies };
      });

      get().updateSearchResults();
    },

    toggleTag: (tag) => {
      set((state) => {
        const newTags = state.tags.includes(tag)
          ? state.tags.filter((t) => t !== tag)
          : [...state.tags, tag];

        return { tags: newTags };
      });

      get().updateSearchResults();
    },

    setSortBy: (key) => {
      set((state) => {
        const results = [...state.searchResults].sort((a, b) => {
          if (key === "Oldest") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return { sortBy: key, searchResults: results };
      });
    },

    setSearchTerm: (term) => {
      set((state) => {
        if (term === "") {
          return { searchTerm: term, searchResults: state.allPosts };
        }
        return { searchTerm: term };
      });

      get().updateSearchResults();
    },

    refreshData: () => {
      const { allPosts } = loadData();
      set((state) => ({
        allPosts,
        searchResults:
          state.searchTerm === ""
            ? allPosts
            : allPosts.filter(
                (result) =>
                  result.title
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase()) ||
                  result.excerpt
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase())
              ),
      }));
    },

    updateSearchResults: () => {
      set((state) => {
        let filtered = state.allPosts;

        if (state.tags.length > 0) {
          filtered = filtered.filter((post) =>
            state.tags.every((tag) => post.tags.includes(tag))
          );
        }

        if (state.technologies.length > 0) {
          filtered = filtered.filter((post) =>
            state.technologies.every((selectedTech) =>
              post.technologies.some((postTech) => postTech === selectedTech[0])
            )
          );
        }

        if (state.searchTerm.trim() !== "") {
          filtered = filtered.filter(
            (result) =>
              result.title
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase()) ||
              result.excerpt
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
          );
        }

        return { searchResults: filtered };
      });
    },
  };
});

i18next.on("languageChanged", () => {
  useSearchStore.getState().refreshData();
});
