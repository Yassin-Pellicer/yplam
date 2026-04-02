"use client";

import "../lib/18n";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useSearchStore } from "../components/search/context";
import { useRouteLoading } from "../components/route-loading";
import Search from "../components/search";
import { InViewSection } from "../components/motion";
import { Github, Linkedin, Mail, Download, SearchX, Clock3 } from "lucide-react";

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

export default function BlogPage() {
  const searchContext = useSearchStore();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { startRouteLoading } = useRouteLoading();

  const language = i18n.language;
  const curriculumUrl = language === "es" ? "/curriculum.pdf" : "/curriculum_english.pdf";
  const dateLocale = language?.startsWith("es") ? "es-ES" : "en-US";
  const readMoreLabel = language?.startsWith("es") ? "Leer más" : "Read More";
  const noResultsTitle = language?.startsWith("es")
    ? "No hemos encontrado publicaciones con esos filtros"
    : "No posts found with those filters";
  const noResultsDescription = language?.startsWith("es")
    ? "Prueba con otros términos o ajusta los filtros para encontrar resultados."
    : "Try a different search term or adjust filters to find matching posts.";
  const recentPostsTitle = language?.startsWith("es") ? "Publicaciones recientes" : "Recent Posts";
  const profileRole = language?.startsWith("es")
    ? "Software Engineer | Especializado en Ciencias de la Computación"
    : "Software Engineer | Specialized in Computer Science";

  const openPost = (post: SearchResult) => {
    const route = post.link?.startsWith("/blog/") ? post.link : `/blog/${post.id}`;
    startRouteLoading();
    router.push(route);
  };

  const fallbackTags = searchContext.tags.length > 0 ? searchContext.tags : (t("allTags", { returnObjects: true }) as string[]).slice(0, 5);
  const fallbackTechnologies =
    searchContext.technologies.length > 0
      ? searchContext.technologies.map((tech) => tech[0])
      : (t("allTechnologies", { returnObjects: true }) as [string, string][]).slice(0, 5).map((tech) => tech[0]);

  return (
    <div className="wave-two-bg dotted-bg select-none min-h-screen w-full flex flex-col">
      <section className="flex flex-col items-center w-full flex-1">
        <Header style="black" />

        <div className="w-full border-border px-4 sm:px-12 pt-14 flex-1 flex">
          <div className="mx-auto w-full max-w-[1400px] border-b border-x border-border bg-background px-4 sm:px-8 py-8 min-h-full flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_260px] gap-4 items-start">
              <aside className="rounded-2xl border border-border bg-card p-4 h-fit xl:sticky xl:top-20">
                <div className="flex items-center gap-3">
                  <img
                    src="/yo.jpg"
                    alt="Yassin Pellicer Lamla"
                    className="w-14 h-14 rounded-full border border-border object-cover"
                  />
                  <div>
                    <b className="text-foreground! text-sm">Yassin Pellicer Lamla</b>
                    <p className="text-xs text-muted-foreground">{profileRole}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Alzira, Comunitat Valenciana</p>
                <div className="flex mt-4 gap-2">
                  <a
                    href="https://github.com/Yassin-Pellicer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full border border-border bg-secondary/10 text-secondary-foreground flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yassin-pellicer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full border border-border bg-secondary/10 text-secondary-foreground flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:yassinpellicerlamla@gmail.com"
                    className="h-9 w-9 rounded-full border border-border bg-secondary/10 text-secondary-foreground flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={curriculumUrl}
                    download
                    className="h-9 px-3 rounded-full border border-border bg-secondary/10 text-secondary-foreground inline-flex items-center justify-center gap-1 hover:bg-accent transition-colors text-xs font-semibold"
                    aria-label={t("sections.contact.cv")}
                  >
                    <Download className="w-4 h-4" />
                    CV
                  </a>
                </div>
              </aside>

              <main className="min-w-0 rounded-2xl border border-border bg-card overflow-hidden">
                <Search />
                <InViewSection
                  triggerKey={`${searchContext.searchTerm}-${searchContext.tags.join(",")}-${searchContext.technologies
                    .map((tech) => tech.join("-"))
                    .join("|")}`}
                >
                  <div className="divide-y divide-border">
                    {searchContext.searchResults.length === 0 ? (
                      <article className="px-5 py-8 text-center">
                        <div className="inline-flex h-16 w-16 rounded-full bg-secondary/10 items-center justify-center mb-4">
                          <SearchX className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl tracking-tight font-bold mb-2 text-foreground!">{noResultsTitle}</h3>
                        <p className="text-sm tracking-tight text-muted-foreground mb-5 max-w-2xl mx-auto">
                          {noResultsDescription}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {fallbackTags.slice(0, 4).map((tag, i) => (
                            <span
                              key={`fallback-tag-${i}`}
                              className="bg-secondary/10 text-secondary-foreground text-xs px-2 h-fit py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                          {fallbackTechnologies.slice(0, 4).map((tech, i) => (
                            <span key={`fallback-tech-${i}`} className={`${tech} text-lg text-muted-foreground`}></span>
                          ))}
                        </div>
                      </article>
                    ) : (
                      searchContext.searchResults.map((post) => (
                        <article
                          key={post.id}
                          className="px-5 py-4 hover:bg-secondary/10 transition-colors cursor-pointer"
                          onClick={() => openPost(post)}
                        >
                          <div className="flex flex-col gap-3">
                            <h3 className="text-xl tracking-tight font-bold text-foreground!">{post.title}</h3>
                            <p className="text-sm tracking-tight text-muted-foreground">{post.excerpt}</p>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center flex-wrap gap-1">
                                {post.tags.map((tag: string, i: number) => (
                                  <span
                                    key={i}
                                    className="bg-secondary/10 text-secondary-foreground text-xs px-2 h-fit py-0.5 rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {post.technologies.map((tech: string, i: number) => (
                                  <span key={i} className={`${tech} text-lg text-muted-foreground rounded-full`}></span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
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
                                className="flex items-center gap-1 font-bold rounded-xl text-sm text-primary hover:text-primary/80 transition-colors"
                              >
                                {readMoreLabel}
                                <span className="material-symbols-outlined">arrow_right_alt</span>
                              </button>
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </InViewSection>
              </main>

              <aside className="rounded-2xl border border-border bg-card p-4 h-fit xl:sticky xl:top-20">
                <h3 className="text-lg font-bold mb-3 text-foreground! tracking-tight">{recentPostsTitle}</h3>
                <div className="space-y-3">
                  {searchContext.allPosts.slice(0, 5).map((post, index) => (
                    <button
                      key={`${post.id}-${index}`}
                      onClick={() => openPost(post)}
                      className="flex items-start gap-3 group cursor-pointer w-full text-left hover:bg-secondary/10 rounded-lg p-1 transition-colors"
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-12 rounded-md object-cover border border-border group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground! group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock3 className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString(dateLocale, {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <Footer style="black" />
    </div>
  );
}
