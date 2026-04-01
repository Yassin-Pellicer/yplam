"use client";

import "../../lib/18n";
import "devicon/devicon.min.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { InViewSection } from "@/app/components/motion";

export default function Portfolio() {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [markdown, setMarkdown] = useState("");
  const [post, setPost] = useState<{
    id: string;
    title: string;
    date: string;
    excerpt: string;
    link: string;
    tags: string[];
    image: string;
    technologies: string[];
  } | null>(null);

  useEffect(() => {
    console.log(id);
    if (!id) return;
    const post = t(`posts.${id}`, { returnObjects: true }) as {
      id: string;
      title: string;
      date: string;
      excerpt: string;
      link: string;
      tags: string[];
      image: string;
      technologies: string[];
    };
    setPost(post);
  }, [id, t]);

  useEffect(() => {
    console.log(`fetching /markdown/${i18n.language}/${id}.md`);
    fetch(`/markdown/${i18n.language}/${id}.md`)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [id, i18n.language]);

  if (!post) {
    return <div className="flex justify-center flex-col items-center bg-white select-none"></div>;
  }

  return (
    <div className="flex justify-center flex-col items-center bg-[#f5f5f5] select-none">
      <section className="flex flex-col h-full items-center min-h-screen">
        <Header style="black" />
        <div className="sm:pt-14 h-full pt-12">
          <div className="w-full bg-white">
            <div className="flex md:flex-row flex-col w-full max-w-[1000px] mx-auto">
              <InViewSection>
                <div className="w-full">
                  <div className="flex flex-row">
                    <div className="flex flex-col w-max-[1200px] w-full h-fit">
                      <article className="flex flex-col bg-white text-gray-800 backdrop-blur-md tracking-tight border-x border-gray-300">
                        <button
                          onClick={() => router.push("/blog")}
                          className="absolute top-4 left-4"
                        >
                          <span className="hover:cursor-pointer material-symbols-outlined bg-white rounded-full p-1 hover:bg-blue-600 hover:text-foreground! transition duration-100" style={{ fontSize: "24px" }}>
                            arrow_back
                          </span>
                        </button>
                        {post.image && <img src={post.image} className=" object-cover border-b border-gray-300 max-h-[500px]"></img>}
                        <div className="flex flex-col justify-between px-4 py-2 h-full">
                          <div>
                            <h3 className="text-3xl mt-2 tracking-tighter font-bold mb-2">
                              {post.title}
                            </h3>
                            <p className="text-sm tracking-tight mb-4">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              <div className="flex flex-row items-center align-center w-full justify-between">
                                <div className="flex items-center align-center flex-wrap gap-1">
                                  {post.tags.map((tag: string, i: number) => (
                                    <span
                                      key={i}
                                      className="bg-blue-700/60 text-xs text-foreground! px-2 h-fit py-0.5 rounded-full"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {post.technologies.map((tag: string, i: number) => (
                                    <span
                                      key={i}
                                      className={`${tag}  text-xl text-gray-600 rounded-full`}
                                    >
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between mt-auto">
                            <p className="flex items-center gap-1 text-xs ">
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                              >
                                calendar_month
                              </span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        {markdown && (
                          <div className="markdown px-4 border-t mt-4 mb-8 border-gray-300">
                            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                              {markdown}
                            </ReactMarkdown>
                          </div>
                        )}
                      </article>
                    </div>
                  </div>
                </div>
              </InViewSection>
            </div>
          </div>
        </div>
      </section>
      <Footer style={"black"} />
    </div>
  );
}