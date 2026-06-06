// editorStore.ts — persist editor preferences
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EditorPrefs {
  fontSize: number;
  theme: "vs-dark" | "vs-light" | "hc-black";
  fontFamily: string;
  wordWrap: "on" | "off";
  minimap: boolean;
  setFontSize: (size: number) => void;
  setTheme: (theme: EditorPrefs["theme"]) => void;
  setWordWrap: (v: EditorPrefs["wordWrap"]) => void;
  setMinimap: (v: boolean) => void;
}

export const useEditorStore = create<EditorPrefs>()(
  persist(
    (set) => ({
      fontSize: 14,
      theme: "vs-dark",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      wordWrap: "on",
      minimap: false,
      setFontSize: (fontSize) => set({ fontSize }),
      setTheme: (theme) => set({ theme }),
      setWordWrap: (wordWrap) => set({ wordWrap }),
      setMinimap: (minimap) => set({ minimap }),
    }),
    { name: "codesahayak_editor_prefs" }   // persists to localStorage
  )
);
