import { useTranslation } from "next-i18next";
import { useMemo } from "react";

export default function useSearch() {
  const { t } = useTranslation();

  const total = useMemo(() => {
    const value = t("postCounter");
    return typeof value === "number" ? String(value) : String(value ?? "0");
  }, [t]);

  return {
    total,
  };
}
