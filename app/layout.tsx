import "./globals.css";
import { RouteLoadingProvider } from "./components/route-loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yplam.es"),
  title: {
    default: "Yassin Pellicer Lamla | Software Engineer Portfolio",
    template: "%s | YPLAM",
  },
  description:
    "Portfolio of Yassin Pellicer Lamla, Software Engineer specialized in Computer Science. Explore projects, technical blog posts, experience, skills, and contact information.",
  applicationName: "YPLAM",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Yassin Pellicer Lamla | Software Engineer Portfolio",
    description:
      "Explore Yassin Pellicer Lamla's portfolio: software projects, technical articles, professional experience, skills, and contact details.",
    url: "https://yplam.es",
    siteName: "YPLAM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassin Pellicer Lamla | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio with projects, blog posts, experience, and contact information.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var storedTheme = window.localStorage.getItem("theme");
                  var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = storedTheme === "light" || storedTheme === "dark"
                    ? storedTheme
                    : (systemPrefersDark ? "dark" : "light");

                  document.documentElement.classList.toggle("dark", theme === "dark");
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (error) {}
              })();
            `,
          }}
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Over+the+Rainbow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
          rel="stylesheet"
        />
        {/* DevIcons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        <RouteLoadingProvider>{children}</RouteLoadingProvider>
      </body>
    </html>
  );
}
