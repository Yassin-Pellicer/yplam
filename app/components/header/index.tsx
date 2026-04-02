"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";
import { useRouteLoading } from "../route-loading";

export const Header = ({ style = "" }: { style?: string }) => {
  const { i18n, t } = useTranslation();
  const rawSections = t("navigation.sections", { returnObjects: true });
  const sections = Array.isArray(rawSections) ? rawSections : [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOverlay, setMenuOverlay] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { startRouteLoading } = useRouteLoading();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    setIsScrolled(window.scrollY > 50);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const blogSectionId = String(sections.length - 1);

    if (section === blogSectionId) {
      if (pathname !== "/blog") {
        startRouteLoading();
        router.push("/blog");
      }
      setMenuOverlay(false);
      return;
    }

    if (pathname !== "/") {
      startRouteLoading();
      router.push("/");
      setTimeout(
        () => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }),
        400
      );
      setMenuOverlay(false);
      return;
    }

    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setMenuOverlay(false);
  };

  const isSolidHeader = style === "black" || isScrolled;

  return (
    <>
      <header
        className={`flex fixed top-0 w-full justify-between items-center align-center h-14! z-50 transition-all duration-300 px-4 py-3 sm:px-8 border-b
    ${style === "black"
            ? "bg-card/95 backdrop-blur-md text-foreground! border-border shadow-sm"
            : isScrolled
              ? "bg-background/85 backdrop-blur-md text-foreground! border-border"
              : "bg-transparent text-foreground! border-transparent"
          }`}
      >
        <img
          src="/yo.jpg"
          alt="Logo"
          onClick={() => {
            if (pathname !== "/") {
              startRouteLoading();
              router.push("/");
            }
          }}
          className={`h-8 w-8 rounded-full sm:h-8 sm:w-8 transition-opacity duration-300 cursor-pointer ${isSolidHeader ? "opacity-100" : "opacity-0"
            }`}
        />
        <nav className="hidden lg:flex gap-8 items-center">
          {sections.map((section, index) => (
            <button
              key={`${section}-${index}`}
              onClick={() => { scrollToSection(index.toString()); }}
              className="px-4 py-2 rounded-2xl transition-colors text-foreground! hover:bg-secondary/10 hover:text-foreground! hover:cursor-pointer"
            >
              {section}
            </button>
          ))}

          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
            }
            className="material-symbols-outlined h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary/10 transition-colors hover:cursor-pointer text-foreground!"
            aria-label="Change language"
          >
            translate
          </button>
          <ThemeToggle />
        </nav>

        <div className="lg:hidden flex items-center">
          <span
            className="material-symbols-outlined hover:cursor-pointer text-foreground! rounded-full p-1 hover:bg-secondary/10 transition-colors"
            style={{ fontSize: "28px" }}
            onClick={() => setMenuOverlay(!menuOverlay)}
          >
            menu
          </span>
        </div>
      </header>

      {menuOverlay && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 dark:bg-black/60 backdrop-blur-[2px]"
          onClick={() => setMenuOverlay(false)}
        >
          <div
            className="ml-auto h-full w-full max-w-sm bg-card text-foreground! border-l border-border shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 pt-2 pb-4 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
                  }
                  className="material-symbols-outlined h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary/10/50 transition-colors hover:cursor-pointer text-foreground!"
                  aria-label="Change language"
                >
                  translate
                </button>
                <ThemeToggle />
              </div>
              <button
                onClick={() => setMenuOverlay(false)}
                className="material-symbols-outlined h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary/10/50 transition-colors text-foreground!"
                aria-label="Close menu"
              >
                close
              </button>
            </div>
            <div className="flex flex-col divide-y divide-border overflow-auto">
              {sections.map((section, index) => (
                <button
                  key={`${section}-${index}`}
                  onClick={() => scrollToSection(index.toString())}
                  className="text-foreground! text-lg text-left py-4 px-5 font-semibold hover:bg-secondary/10/40 transition-colors"
                >
                  {section}
                </button>
              ))}

            </div>
          </div>
        </div>
      )}
    </>
  );
};
