import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { Computer } from "lucide-react";

type Project = {
  indev?: boolean;
  route: string;
  title: string;
  icon?: string;
  technologies: string[];
  date: string;
  description: string;
  content: string;
  link: string;
  gallery?: {
    images: string[];
    videos: string[];
    maxH: number;
  };
  projects?: string;
};

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const blogMap: Record<string, string> = {
  lineart: "lineart",
  "computer-vision": "traffic",
  "vocabulary-app": "vocab",
  portfolio: "portfolio",
  pinpoint: "portfolio",
  tutorgo: "portfolio",
  "up-and-down-english": "portfolio",
};

const resolveBlogId = (project: Project) => {
  const explicit = project.projects ? normalizeKey(project.projects) : "";
  const titleKey = normalizeKey(project.title);

  if (explicit && blogMap[explicit]) return blogMap[explicit];

  if (titleKey.includes("pinpoint")) return "portfolio";
  if (titleKey.includes("tutorgo")) return "portfolio";
  if (titleKey.includes("up-and-down")) return "portfolio";

  return "portfolio";
};

const Projects = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const projects = t("sections.projects.items", { returnObjects: true }) as Project[];

  return (
    <section id="3">
      <h2 className="flex flex-row gap-4 items-center sm:text-5xl text-4xl font-bold text-foreground! tracking-tighter mb-6">
        <Computer size={42} strokeWidth={1.2} />
        {t("sections.projects.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => {
          const blogId = resolveBlogId(project);

          return (
            <article
              key={`${project.title}-${index}`}
              onClick={() => router.push(`/blog/${blogId}`)}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer min-h-[420px] flex flex-col"
            >
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                {project.indev && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-background shadow-sm text-foreground! border border-primary/40 rounded-full px-3 py-1 text-xs font-bold tracking-tight">
                    <span className="relative h-2 w-2 rounded-full bg-primary animate-pulse">
                      <span className="absolute h-2 w-2 rounded-full bg-primary animate-[ping_0.75s_infinite]"></span>
                    </span>
                    {t("sections.projects.inDevelopment")}
                  </div>
                )}
                <img
                  src={project.gallery?.images?.[0] ?? project.route}
                  alt={project.title}
                  className="h-full w-full object-cover saturate-75"
                />
              </div>

              <div className="flex flex-col h-full border-t border-border">
                <div className="border-b border-border/70 px-4 py-3">
                  <div className="flex items-center justify-center gap-2 min-h-[5rem]">
                    <h3 className="text-xl font-bold tracking-tight leading-tight text-foreground!">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="border-b border-border/70 px-4 py-3">
                  <p className="text-sm text-muted-foreground leading-relaxed min-h-[2.25rem]">
                    {project.description}
                  </p>
                </div>

                <div className="px-4 pt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      calendar_month
                    </span>
                    {project.date}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <i key={techIndex} className={`${tech} text-base text-muted-foreground`}></i>
                    ))}
                  </div>
                </div>

                <div className="mt-auto px-4 pb-4 pt-4">
                  <div className="text-sm font-bold text-primary flex items-center gap-1">
                    {i18n.language?.startsWith("es") ? "Ver artículo" : "Read article"}
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
