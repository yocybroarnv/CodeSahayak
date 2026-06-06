// fontLoader.ts — handles fonts not on standard Google Fonts CDN
import { getLang } from "./lang_engine_v3";

const FONT_OVERRIDES: Record<string, string> = {
  // Meitei Mayek — use jsDelivr npm mirror as fallback
  "Noto Sans Meetei Mayek":
    "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-meetei-mayek@5/index.css",
  // Noto Sans Ol Chiki — same issue
  "Noto Sans Ol Chiki":
    "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-ol-chiki@5/index.css",
  // Noto Nastaliq Urdu
  "Noto Nastaliq Urdu":
    "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap",
};

const GOOGLE_FONTS_BASE = "https://fonts.googleapis.com/css2?family=";
const loaded = new Set<string>();

export function loadFont(fontFamily: string): void {
  if (loaded.has(fontFamily)) return;
  loaded.add(fontFamily);

  const url = FONT_OVERRIDES[fontFamily]
    ?? `${GOOGLE_FONTS_BASE}${encodeURIComponent(fontFamily)}:wght@400;500;600&display=swap`;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

export function preloadFontsForLangs(langIds: string[]): void {
  langIds.forEach(id => {
    try {
      const lang = getLang(id);
      if (lang && lang.fontFamily) {
        loadFont(lang.fontFamily);
      }
    } catch (e) {
      console.warn("Failed to load font for lang:", id, e);
    }
  });
}
