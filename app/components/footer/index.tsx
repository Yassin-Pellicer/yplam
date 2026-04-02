import { useTranslation } from "next-i18next";

type FooterStyle = "black" | "default";

export const Footer = ({ style = "default" }: { style?: FooterStyle }) => {
  const { t } = useTranslation();

  const footerClass =
    style === "black"
      ? "bg-card text-muted-foreground"
      : "bg-background/80 backdrop-blur-md border-t border-border text-muted-foreground";

  return (
    <footer
      id="contacto"
      className={`py-6 w-full ${footerClass}`}
    >
      <div className="flex flex-col sm:flex-row gap-3 max-w-6xl mx-auto text-center sm:text-left justify-between items-center px-4">
        <p className="text-xs sm:text-sm hover:text-foreground! transition-colors duration-200">
          {t("sections.footer.copyright")}
        </p>
        <a
          href="mailto:yassinpellicerlamla@gmail.com"
          className="text-xs sm:text-sm hover:text-foreground! transition-colors duration-200"
        >
          {t("sections.footer.contact")}
        </a>
      </div>
    </footer>
  );
};
