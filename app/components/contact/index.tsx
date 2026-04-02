import { useTranslation } from "next-i18next";
import { Github, Linkedin, Mail, Download, PhoneCall } from "lucide-react";

export const Contact = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language;
  const curriculumUrl = language === "es" ? "/curriculum.pdf" : "/curriculum_english.pdf";

  return (
    <section id="4" className="contact-surface w-full max-w-6xl bg-background border-border flex flex-col">
      <h2 className="text-5xl font-bold text-foreground! mb-4 tracking-tighter flex items-center gap-4">
        <PhoneCall size={42} strokeWidth={1.2} />
        {t("sections.contact.title")}
      </h2>
      <div className=" mt-8 w-full border-y border-border py-6">
        <div className=" justify-center flex flex-row mx-auto items-center w-60! sm:justify-between gap-3">
          <div className="flex flex-row gap-4">
            <a
              href="https://github.com/Yassin-Pellicer"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full border border-border bg-card text-foreground! flex items-center justify-center hover:bg-secondary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/yassin-pellicer/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full border border-border bg-card text-foreground! flex items-center justify-center hover:bg-secondary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:yassinpellicerlamla@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full border border-border bg-card text-foreground! flex items-center justify-center hover:bg-secondary/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={curriculumUrl}
              download
              className="h-11 px-4 rounded-full border border-border bg-card text-foreground! inline-flex items-center justify-center gap-2 hover:bg-secondary/10 transition-colors font-semibold text-sm"
              aria-label={t("sections.contact.cv")}
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
