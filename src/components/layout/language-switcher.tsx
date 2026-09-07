"use client";

import * as React from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LanguageOption {
  code: string;
  label: string;
  native: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState<LanguageOption>(LANGUAGES[0]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        if ((window as any).google?.translate?.TranslateElement) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: LANGUAGES.map((l) => l.code).join(","),
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
    }

    const cookies = document.cookie.split("; ");
    const transCookie = cookies.find((c) => c.startsWith("googtrans="));
    if (transCookie) {
      const code = transCookie.split("/").pop();
      const match = LANGUAGES.find((l) => l.code === code);
      if (match) setSelectedLang(match);
    }
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: LanguageOption) => {
    setSelectedLang(lang);
    setIsOpen(false);

    try {
      localStorage.setItem("jsm_selected_lang", lang.code);
      window.dispatchEvent(new CustomEvent("jsm-language-change", { 
        detail: { lang: lang.code, label: lang.label, native: lang.native } 
      }));
    } catch {
      // ignore localStorage errors
    }

    if (lang.code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
    } else {
      const val = `/en/${lang.code}`;
      document.cookie = `googtrans=${val}; path=/;`;
      document.cookie = `googtrans=${val}; domain=.${window.location.hostname}; path=/;`;
    }

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <div id="google_translate_element" className="hidden" style={{ display: "none" }} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/90 bg-white/10 hover:bg-white/15 border border-white/10 transition-all press-scale cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={13} className="text-neutral-300" />
        <span className="font-medium">{selectedLang.native}</span>
        <ChevronDown size={11} className={cn("text-neutral-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-neutral-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 border-b border-white/10 mb-1 flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-[9px] text-emerald-400">12 Indian Langs</span>
          </div>
          <div className="max-h-60 overflow-y-auto space-y-0.5 custom-scrollbar">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer",
                    isSelected
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "text-neutral-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-[13px] leading-tight">{lang.native}</span>
                    <span className={cn("text-[10px]", isSelected ? "text-neutral-600" : "text-neutral-400")}>
                      {lang.label}
                    </span>
                  </div>
                  {isSelected && <Check size={13} className="text-black shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
