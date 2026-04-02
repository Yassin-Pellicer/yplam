"use client";

import "../../lib/18n";
import "devicon/devicon.min.css";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { ArrowLeft, BookOpenText } from "lucide-react";

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

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useParams();

  const rawId = params?.id;
  const postId = useMemo(() => {
    if (Array.isArray(rawId)) return rawId[0];
    return rawId as string | undefined;
  }, [rawId]);

  const [markdown, setMarkdown] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [resolvedMarkdownId, setResolvedMarkdownId] = useState<string>("");

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

  if (!post) {
    return (
      <div className="dotted-bg select-none min-h-screen w-full flex flex-col">
        <Header style="black" />
      </div>
    );
  }

  const dateLocale = i18n.language?.startsWith("es") ? "es-ES" : "en-US";

  return (
    <div className="dotted-bg select-none min-h-screen w-full flex flex-col">
      <section className="flex flex-col items-center w-full flex-1">
        <Header style="black" />

        <div className="w-full border-b border-foreground/10 px-4 sm:px-12 pt-16 pb-8 flex-1">
          <div className="mx-auto w-full max-w-4xl border-x border-foreground/10 bg-background px-4 sm:px-8 py-8 min-h-full">
            <article className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
                <button
                  onClick={() => router.push("/blog")}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/10 text-secondary-foreground px-3 py-1.5 hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {i18n.language?.startsWith("es") ? "Volver" : "Back"}
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

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover border-b border-border max-h-[420px] w-full"
                />
              )}

              <div className="px-4 sm:px-6 py-5 border-b border-border">
                <h1 className="text-3xl tracking-tight font-bold mb-3 text-foreground!">{post.title}</h1>
                <p className="text-sm tracking-tight text-muted-foreground mb-4">{post.excerpt}</p>
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

              {markdown && (
                <div className="markdown px-4 sm:px-6 py-6 text-foreground!">
                  <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>{markdown}</ReactMarkdown>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>
      <Footer style="black" />
    </div>
  );
}
