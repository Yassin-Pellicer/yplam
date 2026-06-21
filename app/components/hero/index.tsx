import { Dock, DockIcon } from "@/components/ui/dock";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const curriculumUrl = i18n.language === "es" ? "/curriculum.pdf" : "/curriculum_english.pdf";

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="flex items-center align-center sm:pt-24 pt-24 sm:py-12 py-8 w-full">
      <div className="flex flex-col items-center max-w-6xl mx-auto text-center">
        <p className="font-bold text-lg md:text-xl text-foreground! mb-8">
          {isClient ? t("hero.greeting") : ""}
        </p>

        <div className="flex flex-col items-center justify-center gap-6 mb-4">
          <img
            src="/yo.jpg"
            alt="Yassin Pellicer Lamla"
            className="w-42 h-42 mb-4 rounded-full object-cover border-white shadow-lg"
          />
          <h1
            className="hero-rainbow-name text-6xl md:text-8xl text-foreground! text-center"
          >
            Yassin Pellicer <br></br>Lamla
          </h1>
        </div>

        <p className="text-xl md:text-2xl font-bold text-foreground! mb-8 w-2/3 sm:h-18 h-22">
          {isClient ? (
            <>
              <TypingAnimation className="leading-normal!">
                {t("hero.title")}
              </TypingAnimation>
              <br />
            </>
          ) : (
            <>&nbsp;</>
          )}
        </p>

        <Dock
          iconSize={48}
          iconMagnification={64}
          iconDistance={120}
          className="mx-auto mt-0 h-20 gap-3 rounded-full border border-border/70 bg-background/70 px-4 py-3 shadow-lg"
        >
          <DockIcon className="rounded-full backdrop-blur-md transition-colors hover:bg-foreground/5">
            <a
              href="https://github.com/Yassin-Pellicer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-full w-full items-center justify-center rounded-full"
            >
              <Github className="h-6 w-6 text-foreground!" />
            </a>
          </DockIcon>
          <DockIcon className="rounded-full backdrop-blur-md transition-colors hover:bg-foreground/5">
            <a
              href="https://www.linkedin.com/in/yassin-pellicer/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-full w-full items-center justify-center rounded-full"
            >
              <Linkedin className="h-6 w-6 text-foreground!" />
            </a>
          </DockIcon>
          <DockIcon className="rounded-full backdrop-blur-md transition-colors hover:bg-foreground/5">
            <a
              href="mailto:yassinpellicerlamla@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="flex h-full w-full items-center justify-center rounded-full"
            >
              <Mail className="h-6 w-6 text-foreground!" />
            </a>
          </DockIcon>
          <div className="mx-1 h-8 w-px bg-border/70" aria-hidden="true" />
          <DockIcon className="rounded-full backdrop-blur-md transition-colors hover:bg-foreground/5">
            <a
              href={curriculumUrl}
              download
              aria-label="Download CV"
              className="flex h-full w-full items-center justify-center rounded-full"
            >
              <Download className="h-6 w-6 text-foreground!" />
            </a>
          </DockIcon>
        </Dock>

        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
          className="flex gap-4 sm:mt-20 mt-8 text-foreground! hover:cursor-pointer transition-colors items-center space-x-2 p-3 rounded-full bg-foreground/10"
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
      </div>
    </section>
  );
};
