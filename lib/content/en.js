// English content. This is a thin re-export of the existing lib/config.js —
// nothing about lib/config.js changed, so every existing English page keeps
// working exactly as before. This file exists so locale-aware code (shared
// components, Hebrew pages) can pick "en" or "he" content generically.
export * from "@/lib/config";
