import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { BriefcaseBusiness } from "lucide-react";

type ExperienceItem = {
  content: { paragraph: string; list: string[] };
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
};

export const Experience = () => {
  const { t } = useTranslation();

  const experiences = useMemo(
    () => {
      const rawExperiences = t("sections.experience.experiences", { returnObjects: true });
      return (Array.isArray(rawExperiences) ? rawExperiences : []) as ExperienceItem[];
    },
    [t]
  );

  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);

  useEffect(() => {
    if (experiences.length === 0) {
      setSelectedExperienceId(null);
      return;
    }

    const exists = experiences.some((exp) => exp.id === selectedExperienceId);
    if (!exists) {
      setSelectedExperienceId(experiences[0].id);
    }
  }, [experiences, selectedExperienceId]);

  const selectedExperience =
    experiences.find((exp) => exp.id === selectedExperienceId) ?? experiences[0] ?? null;

  return (
    <section id="1" className="">
      <div className="flex flex-row flex-wrap justify-between AI-align-center items-center mb-6 gap-6">
        <h2 className="sm:text-5xl text-4xl font-bold text-foreground! tracking-tighter flex items-center gap-4">
          <BriefcaseBusiness size={42} strokeWidth={1.2} />
          {t("sections.experience.title")}
        </h2>
      </div>
      <div className=" grid md:grid-cols-2 gap-4 items-center">
        <div className="max-w-6xl mx-auto space-y-4 w-full">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex flex-row">
              <div
                onClick={() => setSelectedExperienceId(exp.id)}
                key={index}
                className={`hover:cursor-pointer bg-card rounded-2xl sm:p-6 px-4 py-2 border border-border ${selectedExperienceId === exp.id ? "border-primary/20 shadow-lg ring-1 ring-primary/30" : ""
                  } hover:bg-muted/10 transition-all duration-300 hover:scale-[1.01] w-full`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <div>
                    <h3 className="tracking-tighter sm:text-2xl text-lg font-bold text-foreground! mb-2 mr-8">
                      {exp.position}
                    </h3>
                    <h4 className="sm:text-xl text-md text-foreground! mb-2">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-foreground! sm:text-lg text-sm font-medium shrink-0">
                    {exp.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full bg-card rounded-2xl p-8 border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 w-full">
            <div className="flex flex-col">
              <h3 className="text-3xl tracking-tight font-bold text-foreground! mb-2">
                {selectedExperience?.position}
              </h3>
              <div className="flex flex-row justify-between items-center align-center mb-2">
                <h4 className="text-xl text-foreground! ">
                  {selectedExperience?.period}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {selectedExperience?.company}
                </p>
              </div>
              <p className="text-foreground! text-lg tracking-tight font-bold">
                {selectedExperience?.description}
              </p>
              <hr className="text-foreground! mt-2" />
              <p className="text-foreground! text-md mt-6 tracking-tight">
                {selectedExperience?.content.paragraph}
              </p>
              {selectedExperience?.content.list.map((item: string, index: number) => (
                <li key={index} className="text-foreground! text-md mt-2 tracking-tight">
                  {item}
                </li>
              ))}
            </div>
          </div>
          <div
          ></div>
        </div>
      </div>
    </section>
  )
}
