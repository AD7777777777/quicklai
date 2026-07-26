// Selects the right content module by locale. Used by Hebrew pages and by
// locale-aware shared components instead of importing "@/lib/config" directly.
import * as en from "@/lib/content/en";
import * as he from "@/lib/content/he";

export function getContent(locale) {
  return locale === "he" ? he : en;
}
