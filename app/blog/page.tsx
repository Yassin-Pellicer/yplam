"use client";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import "../lib/18n";
import "devicon/devicon.min.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { useSearchStore } from "../components/search/context";
import Search from "../components/search";
import { InView } from "react-intersection-observer";
import { InViewSection } from "../components/motion";

export default function Portfolio() {

  const searchContext = useSearchStore();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex justify-center flex-col items-center bg-white select-none">
      <section className="flex flex-col h-full items-center min-h-screen">
        <Header style="black" />

        <div className="sm:py-14 h-full py-12">
          <div className="w-full bg-white">
            <div className="flex md:flex-row flex-col w-full max-w-[1400px] mx-auto">
              <div className="flex w-full flex-col md:w-1/3  md:border-0 border-b-1 border-gray-300 self-start">
                <div className="flex flex-col w-full overflow-hidden  bg-white mb-4">
                  <img
                    src="/blog/blog.png"
                    alt="Background"
                    className="h-40 w-full object-cover"
                  />
                  <div className="flex flex-col -mt-10 px-4 md:pb-4">
                    <img
                      src="/yo.jpg"
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-white object-cover"
                    />
                    <b className="mt-2 text-lg text-foreground">Yassin Pellicer Lamla</b>
                    <p className="text-sm text-gray-800">
                      Software Engineer | Especializado en Ciencias de la Computación
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Alzira, Comunitat Valenciana
                    </p>
                    <div className="flex mt-3 space-x-3">
                      <a
                        href="https://github.com/Yassin-Pellicer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                      >
                        <Github className="w-4 h-4 text-foreground!" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/yassin-pellicer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                      >
                        <Linkedin className="w-4 h-4 text-foreground!" />
                      </a>
                      <a
                        href="mailto:yassinpellicerlamla@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                      >
                        <Mail className="w-4 h-4 text-foreground!" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:border-x md:border-0 border-b border-gray-300 flex flex-col w-full">
                <div className="grid md:grid-cols-1 divide-y divide-gray-200 w-full">
                  <Search />
                  <InViewSection triggerKey={searchContext.searchResults}>
                    <div className="grid md:grid-cols-1 divide-y divide-gray-200 w-full">
                      {searchContext.searchResults.length === 0 ? (
                        <article
                          key={searchContext.allPosts[0].title}
                          className="flex md:flex-col pt-2 flex-row bg-white text-gray-800 hover:cursor-pointer transition-all duration-50 w-full"
                          onClick={() => router.push(`/blog/${searchContext.allPosts[0].id}`)}
                        >
                          <div className="flex flex-col w-full justify-between px-4 py-2 h-full">
                            <div className="text-center">
                              <span className="material-symbols-outlined items-center" style={{ fontSize: "50px" }}>close</span>
                              <h3 className="text-2xl tracking-tighter text-center mt-4 font-bold mb-2">
                                No hemos encontrado ninguna publicación así 🤔
                              </h3>
                              <p className="text-sm tracking-tight mb-4 mx-12 ">Intenta ajustar la búsqueda con otros términos o cambiar los filtros ¡También puedes pedirle a Yassin que escriba un post de esa misma temática!</p>
                              <div className="flex flex-wrap gap-1 mb-4">
                                <div className="flex flex-row items-center justify-between w-full">
                                  <div className="flex items-center flex-wrap gap-1">
                                    {searchContext.tags?.map((tag: string, i: number) => (
                                      <span
                                        key={i}
                                        className="bg-blue-700/60 text-xs text-foreground! px-2 h-fit py-0.5 rounded-full"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {searchContext.technologies.map((tech: [string, string], i: number) => (
                                      <span
                                        key={i}
                                        className={`${tech[0]} text-xl text-gray-600 rounded-full`}
                                      ></span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      ) : (
                        searchContext.searchResults.map((post) => {
                          return (
                            <article
                              key={post.title}
                              className="flex md:flex-col pt-2 flex-row bg-white text-gray-800 hover:cursor-pointer transition-all duration-50 w-full"
                              onClick={() => router.push(`/blog/${post.id}`)}
                            >
                              <div className="flex flex-col w-full justify-between px-4 py-2 h-full">
                                <div>
                                  <h3 className="text-xl tracking-tighter font-bold mb-2">
                                    {post.title}
                                  </h3>
                                  <p className="text-sm tracking-tight mb-4">{post.excerpt}</p>
                                  <div className="flex flex-wrap gap-1 mb-4">
                                    <div className="flex flex-row items-center justify-between w-full">
                                      <div className="flex items-center flex-wrap gap-1">
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
                                            className={`${tag} text-xl text-gray-600 rounded-full`}
                                          ></span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-row items-center justify-between mt-auto">
                                  <p className="flex items-center gap-1 text-xs">
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
                                  <a
                                    href={post.link}
                                    className="flex items-center gap-1 font-bold rounded-xl text-sm transition-all"
                                  >
                                    Read More{" "}
                                    <span className="material-symbols-outlined">
                                      arrow_right_alt
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </article>
                          );
                        })
                      )}
                    </div>
                  </InViewSection>
                </div>
              </div>

              <div className="flex w-full flex-col md:w-1/3 self-start h-fit">
                <div className="bg-white p-4">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">Recent Posts</h3>
                  <div className="space-y-3">
                    {searchContext.searchResults.slice(0, 5).map((post, index) => (
                      <div key={index} className="flex gap-3 group cursor-pointer">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-12 h-12 object-cover border border-gray-300 group-hover:scale-105 transition-transform"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer style={"black"} />
    </div>
  );
}