import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Carousel } from "../carousel";
import { User } from "lucide-react";

export const About = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="py-10" style={{ minHeight: "400px" }} />;
  }

  const items = t("carousel.items", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;

  return (
    <section id="0" className="py-10 w-full rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="flex flex-row gap-4 text-5xl font-bold text-foreground! tracking-tighter items-center">
          <User size={42}></User>{t("sections.about.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl text-foreground!">
              {t("sections.about.description")}
            </p>
            <p className="text-lg text-foreground/60 leading-relaxed">
              {t("sections.about.personal")}
            </p>
          </div>
          <Carousel items={items} />
        </div>
      </div>
    </section>
  );
};
