import { useTranslation } from "react-i18next";
import { BadgeCheck, Wrench } from "lucide-react";

export const AbsCerts = () => {
  const { t } = useTranslation();

  const rawSkills = t("sections.skills.items", { returnObjects: true });
  const skills = (Array.isArray(rawSkills) ? rawSkills : []) as Array<{
    id: number;
    name: string;
    icon: string;
    level: string;
    description: string;
    color: string;
  }>;

  const rawCerts = t("sections.certifications.items", { returnObjects: true });
  const certs = (Array.isArray(rawCerts) ? rawCerts : []) as Array<{
    id: number;
    name: string;
    icon: string;
    level: string;
    description: string;
    color: string;
    link: string;
    platform: string;
    date: string;
  }>;

  return (
    <>
      <section id="2" className="flex-col">
        <h2 className="sm:text-5xl text-4xl font-bold text-foreground! tracking-tighter mb-6 flex items-center gap-4">
          <Wrench size={42} strokeWidth={1.2} />
          {t("sections.skills.title")}
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="bg-card rounded-2xl sm:p-6 p-4 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-2 flex-wrap">
                      <i className={`${skill.icon} text-foreground! text-3xl`}></i>
                      <h3 className="sm:text-xl font-bold text-foreground! tracking-tight">
                        {skill.name}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  <span className="bg-secondary/40 text-secondary-foreground text-xs sm:text-sm rounded-full py-1.5 px-3 flex w-fit">
                    {skill.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="habilidades" className="flex-col sm:py-10 py-8">
        <h2 className="sm:text-5xl text-4xl font-bold text-foreground! tracking-tighter mb-6 flex items-center gap-4">
          <BadgeCheck size={42} strokeWidth={1.2} />
          {t("sections.certifications.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((skill, index) => {
            return (
              <a
                key={index}
                href={skill.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl p-6 border border-border hover:scale-[1.01] hover:shadow-md transition-all duration-200 bg-card text-foreground! block"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <i className={`${skill.icon} text-3xl`}></i>
                    <h3 className="text-xl font-bold tracking-tight">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p className="font-semibold">🏫 {skill.platform}</p>
                    <p className="font-semibold">🗓️ {skill.date}</p>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground pb-14">
                    {skill.description}
                  </p>
                </div>
                <div className="absolute bottom-5 left-6 flex flex-row items-center justify-center gap-2 bg-secondary/40 w-fit rounded-full px-3 py-1.5 text-secondary-foreground font-bold text-xs sm:text-sm tracking-tight border border-border">
                  <div className="relative h-3 w-3 rounded-full bg-primary animate-pulse">
                    <div className="absolute h-3 w-3 rounded-full bg-primary animate-[ping_0.75s_infinite]"></div>
                  </div>
                  {t("sections.certifications.cta")}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    open_in_new
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
};
