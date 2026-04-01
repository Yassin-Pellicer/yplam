import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

export const Hero = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

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
            className="text-6xl md:text-8xl text-foreground! text-center "
            style={{ fontFamily: "Over The Rainbow" }}
          >
            Yassin Pellicer <br></br>Lamla
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl font-bold text-foreground! mb-8">
          {isClient ? (
            <>
              {t("hero.title")}<br/>{t("hero.subtitle")}
            </>
          ) : (
            <>&nbsp;</> 
          )}
        </p>
        
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Yassin-Pellicer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-foreground/10 backdrop-blur-md rounded-full hover:bg-foreground/20 transition-all hover:scale-110"
          >
            <Github className="w-6 h-6 text-foreground!" />
          </a>
          <a
            href="https://www.linkedin.com/in/yassin-pellicer/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-foreground/10 backdrop-blur-md rounded-full hover:bg-foreground/20 transition-all hover:scale-110"
          >
            <Linkedin className="w-6 h-6 text-foreground!" />
          </a>
          <a
            href="mailto:yassinpellicerlamla@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-foreground/10 backdrop-blur-md rounded-full hover:bg-foreground/20 transition-all hover:scale-110"
          >
            <Mail className="w-6 h-6 text-foreground!" />
          </a>
        </div>
        
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
          {isClient ? t("hero.cta") : ""}
        </button>
      </div>
    </section>
  );
};