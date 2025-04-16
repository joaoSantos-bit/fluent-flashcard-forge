
import React, { createContext, useState, useContext, useEffect } from "react";

// Supported languages
export type Language = "english" | "spanish" | "french" | "german" | "italian";

type LanguageContextType = {
  sourceLanguage: "portuguese";
  targetLanguage: Language;
  setTargetLanguage: (lang: Language) => void;
  availableLanguages: { value: Language; label: string }[];
};

const LanguageContext = createContext<LanguageContextType>({
  sourceLanguage: "portuguese",
  targetLanguage: "english",
  setTargetLanguage: () => {},
  availableLanguages: [],
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetLanguage, setTargetLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("targetLanguage");
    return (saved as Language) || "english";
  });

  // List of available languages
  const availableLanguages = [
    { value: "english" as Language, label: "English" },
    { value: "spanish" as Language, label: "Spanish" },
    { value: "french" as Language, label: "French" },
    { value: "german" as Language, label: "German" },
    { value: "italian" as Language, label: "Italian" },
  ];

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("targetLanguage", targetLanguage);
  }, [targetLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        sourceLanguage: "portuguese",
        targetLanguage,
        setTargetLanguage,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
