"use client";

import "../../lib/18n";
import { useEffect, useMemo, useRef, useState, type ReactElement, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { useRouteLoading } from "@/app/components/route-loading";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, BookOpenText, Clock3 } from "lucide-react";

type Post = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
  tags: string[];
  image: string;
  technologies: string[];
};

type MarkdownOutlineItem = {
  id: string;
  title: string;
  level: number;
};

type MarkdownOutlineGroup = {
  parent: MarkdownOutlineItem;
  children: MarkdownOutlineItem[];
};

function toPlainText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(toPlainText).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return toPlainText((children as ReactElement<{ children?: ReactNode }>).props.children);
  }

  return "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractMarkdownOutline(markdown: string): MarkdownOutlineItem[] {
  const outline: MarkdownOutlineItem[] = [];
  const counts = new Map<string, number>();
  let inCodeFence = false;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    if (/^```/.test(line) || /^~~~/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const title = match[2]
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .trim();

    const base = slugify(title) || "section";
    const currentCount = counts.get(base) ?? 0;
    counts.set(base, currentCount + 1);

    outline.push({
      id: currentCount === 0 ? base : `${base}-${currentCount + 1}`,
      title,
      level,
    });
  }

  return outline;
}

function groupMarkdownOutline(outline: MarkdownOutlineItem[]): MarkdownOutlineGroup[] {
  const groups: MarkdownOutlineGroup[] = [];
  let currentGroup: MarkdownOutlineGroup | null = null;

  for (const item of outline) {
    if (item.level === 2 || !currentGroup) {
      currentGroup = { parent: item, children: [] };
      groups.push(currentGroup);
      continue;
    }

    currentGroup.children.push(item);
  }

  return groups;
}

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { startRouteLoading } = useRouteLoading();
  const params = useParams();

  const rawId = params?.id;
  const postId = useMemo(() => {
    if (Array.isArray(rawId)) return rawId[0];
    return rawId as string | undefined;
  }, [rawId]);

  const [markdown, setMarkdown] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [resolvedMarkdownId, setResolvedMarkdownId] = useState<string>("");
  const [activeOutlineId, setActiveOutlineId] = useState<string>("");
  const clickedOutlineIdRef = useRef<string | null>(null);
  const scrollLockTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    if (!postId) return;
    const posts = t("posts", { returnObjects: true }) as Record<string, Post>;
    const normalizedPostId = String(postId).replace(/^\/+|\/+$/g, "");

    const direct = posts?.[normalizedPostId];

    const byId = Object.values(posts ?? {}).find(
      (candidate) => candidate?.id === normalizedPostId
    );

    const byLink = Object.values(posts ?? {}).find((candidate) => {
      const slug = candidate?.link?.replace(/^\/blog\//, "").replace(/^\/+|\/+$/g, "");
      return slug === normalizedPostId;
    });

    const nextPost = direct ?? byId ?? byLink ?? null;
    setPost(nextPost);
    setResolvedMarkdownId(nextPost?.id ?? normalizedPostId);
  }, [postId, t]);

  useEffect(() => {
    if (!resolvedMarkdownId) return;
    fetch(`/markdown/${i18n.language}/${resolvedMarkdownId}.md`)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch(() => setMarkdown(""));
  }, [resolvedMarkdownId, i18n.language]);

  const dateLocale = i18n.language?.startsWith("es") ? "es-ES" : "en-US";
  const outline = useMemo(() => extractMarkdownOutline(markdown), [markdown]);
  const outlineGroups = useMemo(() => groupMarkdownOutline(outline), [outline]);
  const renderedHeadingCounts = new Map<string, number>();
  const resolveHeadingId = (headingText: string, level: number) => {
    const key = `${level}:${headingText}`;
    const occurrence = renderedHeadingCounts.get(key) ?? 0;
    renderedHeadingCounts.set(key, occurrence + 1);

    return (
      outline.filter((item) => item.level === level && item.title === headingText)[occurrence]?.id ??
      slugify(headingText)
    );
  };
  const markdownComponents = {
    h2: ({ children }: { children?: ReactNode }) => {
      const headingText = toPlainText(children);
      const id = resolveHeadingId(headingText, 2);

      return (
        <h2 id={id} className="scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight text-foreground!">
          {children}
        </h2>
      );
    },
    h3: ({ children }: { children?: ReactNode }) => {
      const headingText = toPlainText(children);
      const id = resolveHeadingId(headingText, 3);

      return (
        <h3 id={id} className="scroll-mt-24 text-xl sm:text-2xl font-semibold tracking-tight text-foreground!">
          {children}
        </h3>
      );
    },
  };

  useEffect(() => {
    if (outline.length === 0) {
      setActiveOutlineId("");
      return;
    }

    const headings = outline
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headings.length === 0) {
      setActiveOutlineId("");
      return;
    }

    const updateActiveHeading = () => {
      if (clickedOutlineIdRef.current) return;

      const readMarker = window.scrollY + 116;
      const currentHeading =
        headings.find((heading, index) => {
          const nextHeading = headings[index + 1];
          const sectionTop = heading.offsetTop - 4;
          const nextSectionTop = nextHeading?.offsetTop ?? Number.POSITIVE_INFINITY;

          return readMarker >= sectionTop && readMarker < nextSectionTop;
        }) ?? headings[0];

      setActiveOutlineId(currentHeading.id);
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [outline, resolvedMarkdownId]);

  useEffect(() => {
    return () => {
      if (scrollLockTimeoutRef.current) {
        window.clearTimeout(scrollLockTimeoutRef.current);
      }
    };
  }, []);

  const rawPosts = useMemo(
    () => t("posts", { returnObjects: true }) as Record<string, Post>,
    [t]
  );
  const allPosts = useMemo(
    () =>
      Object.values(rawPosts ?? {})
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [rawPosts]
  );
  const openPost = (targetPost: Post) => {
    const route = targetPost.link?.startsWith("/blog/") ? targetPost.link : `/blog/${targetPost.id}`;
    startRouteLoading();
    router.push(route);
  };

  const scrollToOutlineItem = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    clickedOutlineIdRef.current = id;
    setActiveOutlineId(id);
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 96,
      behavior: "smooth",
    });
    window.history.replaceState(null, "", `#${id}`);

  };

  if (!post) {
    return (
      <div className="dotted-bg min-h-screen w-full flex flex-col">
        <Header style="black" />
      </div>
    );
  }

  return (
    <div className="wave-two-bg blog-page-shell dotted-bg min-h-screen w-full flex flex-col">
      <section className="flex flex-col items-center w-full flex-1">
        <Header style="black" />

        <div className="w-full pt-10 flex-1">
          <div className="w-full bg-background border-b border-border backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[1400px] bg-background pt-4 min-h-full flex-1">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <button
                onClick={() => {
                  startRouteLoading();
                  router.push("/blog");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/10 text-secondary-foreground px-3 py-1.5 hover:bg-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("blog.back")}
              </button>
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <BookOpenText className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="px-4 sm:px-6 py-6">
              <h1 className="text-3xl sm:text-4xl tracking-tight font-bold mb-3 text-foreground!">
                {post.title}
              </h1>
              <p className="text-sm sm:text-base tracking-tight text-muted-foreground mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 items-center justify-between">
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
                    <span key={i} className={`${tech} text-xl text-muted-foreground rounded-full`}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="bg-background mx-auto w-full max-w-[1400px] min-h-full border-border border-b">
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px]">
              <article className="flex flex-col border-x border-border bg-card overflow-hidden shadow-sm select-text">

                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover border-b border-border max-h-[440px] w-full"
                  />
                )}

                {markdown && (
                  <div className="markdown px-4 sm:px-6 py-6 text-foreground! max-w-[800px] mx-auto select-text">
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      components={markdownComponents}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                )}

              </article>

              <div className="flex flex-col divide-y divide-foreground/10 self-start xl:sticky xl:top-14 xl:z-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:pr-1 bg-background/70 border-r border-border">
                <section className="p-4">
                  <h3 className="text-lg font-bold mb-3 text-foreground! tracking-tight border-foreground/10">
                    {t("blog.topics")}
                  </h3>
                  {outlineGroups.length > 0 ? (
                    <nav className="">
                      {outlineGroups.map((group) => (
                        <div key={group.parent.id} className="pl-3 border-l border-border/60">
                          <a
                            href={`#${group.parent.id}`}
                            onClick={(event) => {
                              event.preventDefault();
                              scrollToOutlineItem(group.parent.id);
                            }}
                            aria-current={activeOutlineId === group.parent.id ? "location" : undefined}
                            className={`block py-1.5 text-sm font-medium transition-colors hover:text-primary ${
                              activeOutlineId === group.parent.id
                                ? "text-primary underline decoration-primary decoration-2 underline-offset-4"
                                : "text-foreground!"
                            }`}
                          >
                            {group.parent.title}
                          </a>
                          {group.children.length > 0 && (
                            <div className="mt-1 ml-2 space-y-1 border-l border-dashed border-border/50 pl-3">
                              {group.children.map((child) => (
                                <a
                                  key={child.id}
                                  href={`#${child.id}`}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    scrollToOutlineItem(child.id);
                                  }}
                                  aria-current={activeOutlineId === child.id ? "location" : undefined}
                                  className={`block py-1 text-sm transition-colors hover:text-primary ${
                                    activeOutlineId === child.id
                                      ? "text-primary underline decoration-primary decoration-2 underline-offset-4"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {child.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {t("blog.noHeadings")}
                    </p>
                  )}
                </section>

                <aside className="p-4 h-fit self-start xl:sticky xl:top-18 xl:z-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:pr-4">
                  <h3 className="text-lg font-bold mb-3 text-foreground! tracking-tight">{t("blog.recentPosts")}</h3>
                  <div className="space-y-3">
                    {allPosts.slice(0, 5).map((post, index) => (
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
        </div>
      </section>
      <Footer style="black" />
    </div>
  );
}
