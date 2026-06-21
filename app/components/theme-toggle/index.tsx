"use client";

import { useEffect, useState } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

type Theme = "light" | "dark";

const getTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("theme", theme);
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const isDark = theme === "dark";

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <AnimatedThemeToggler
      type="button"
      theme={theme}
      onThemeChange={handleThemeChange}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground! transition-colors hover:bg-secondary/10 [&>svg]:h-4 [&>svg]:w-4"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    />
  );
};
