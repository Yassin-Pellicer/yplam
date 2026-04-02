"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { BookText } from "lucide-react";

export const LatestOnBlog = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

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

  const rawPosts = t("posts", { returnObjects: true }) as Record<string, SearchResult> | SearchResult[];
  const posts = Object.values(rawPosts ?? {}).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const readMoreLabel = i18n.language?.startsWith("es") ? "Leer más" : "Read More";
  const dateLocale = i18n.language?.startsWith("es") ? "es-ES" : "en-US";

  const openPost = (post: SearchResult) => {
    const route = post.link?.startsWith("/blog/") ? post.link : `/blog/${post.id}`;
    router.push(route);
  };

  const renderCard = (post: SearchResult, index: number, isDesktop: boolean) => {
    const faded = isDesktop ? index > 1 : index === 1;
    const visibilityClass = isDesktop ? "hidden md:flex" : "md:hidden flex";

    return (
      <article
        key={`${isDesktop ? "desktop" : "mobile"}-${post.id}`}
        onClick={() => openPost(post)}
        className={`${visibilityClass} text-foreground! rounded-xl flex-col hover:cursor-pointer transition-all duration-300 w-full border border-border bg-card shadow-sm hover:shadow-md ${
          faded
            ? "[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0)_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%] [mask-position:top]"
            : ""
        }`}
      >
        <div className="flex flex-col w-full justify-between px-4 py-3 h-full">
          <div>
            <img
              src={post.image}
              alt={post.title}
              className="rounded-xl mb-4 h-48 w-full object-cover saturate-75"
            />
            <h3 className="text-xl tracking-tighter font-bold mb-2">
              {post.title}
            </h3>
            <p className="text-sm tracking-tight mb-4 text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              <div className="flex flex-row items-center justify-between w-full gap-2">
                <div className="flex items-center flex-wrap gap-1">
                  {(post.tags ?? []).map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-secondary/10 text-secondary-foreground text-xs px-2 h-fit py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(post.technologies ?? []).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className={`${tech} text-lg text-muted-foreground rounded-full`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mt-auto pt-1">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                calendar_month
              </span>
              {new Date(post.date).toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openPost(post);
              }}
              className="flex items-center gap-1 font-bold rounded-xl text-sm transition-all text-primary hover:text-primary/80 hover:cursor-pointer"
            >
              {readMoreLabel}
              <span className="material-symbols-outlined">
                arrow_right_alt
              </span>
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="2">
      <h2 className="sm:text-5xl text-4xl font-bold text-foreground! tracking-tighter mb-6 flex items-center gap-4">
        <BookText size={42} strokeWidth={1.2} />
        {t("blog.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {posts.slice(0, 2).map((post, index) => renderCard(post, index, false))}
        {posts.slice(0, 4).map((post, index) => renderCard(post, index, true))}
      </div>
    </section>
  );
};
