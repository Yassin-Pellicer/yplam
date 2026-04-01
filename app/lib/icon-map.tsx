import {
  Award,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Gamepad2,
  Globe2,
  GraduationCap,
  LucideIcon,
  Map,
  Sparkles,
  Languages,
  BookText,
} from "lucide-react";

const carouselIconMap: Record<string, LucideIcon> = {
  Award,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  Sparkles,
  BookText,
};

const projectIconMap: Record<string, LucideIcon> = {
  "👨🏻‍🏫": GraduationCap,
  "🗺️": Map,
  "🎮": Gamepad2,
  "🗽": Languages,
  "🤖": Bot,
  "📚": BookOpen,
};

export const getCarouselIcon = (key: string): LucideIcon => carouselIconMap[key] ?? Sparkles;

export const getProjectIcon = (key: string): LucideIcon => projectIconMap[key] ?? BookOpen;
