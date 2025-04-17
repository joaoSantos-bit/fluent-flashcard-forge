import React, { createContext, useContext, useState, useEffect } from "react";

export type AppLanguage = "en" | "pt" | "es";

type AppLanguageLabels = {
  [key: string]: {
    [key in AppLanguage]: string;
  };
};

export const appLabels: AppLanguageLabels = {
  "navbar.home": {
    en: "Home",
    pt: "Início",
    es: "Inicio"
  },
  "navbar.dashboard": {
    en: "Dashboard",
    pt: "Painel",
    es: "Panel"
  },
  "navbar.wordsLearned": {
    en: "Words Learned",
    pt: "Palavras Aprendidas",
    es: "Palabras Aprendidas"
  },
  "navbar.login": {
    en: "Login",
    pt: "Entrar",
    es: "Iniciar Sesión"
  },
  "navbar.register": {
    en: "Register",
    pt: "Cadastrar",
    es: "Registrarse"
  },
  "navbar.logout": {
    en: "Logout",
    pt: "Sair",
    es: "Salir"
  },
  "hero.title": {
    en: "Learn Portuguese with Smart Flashcards",
    pt: "Aprenda Português com Flashcards Inteligentes",
    es: "Aprende Portugués con Tarjetas Inteligentes"
  },
  "hero.subtitle": {
    en: "Translate texts, create personalized flashcards, and track your progress with our intelligent language learning system.",
    pt: "Traduza textos, crie flashcards personalizados e acompanhe seu progresso com nosso sistema inteligente de aprendizado de idiomas.",
    es: "Traduce textos, crea tarjetas personalizadas y sigue tu progreso con nuestro sistema inteligente de aprendizaje de idiomas."
  },
  "hero.startPractice": {
    en: "Start Practice",
    pt: "Iniciar Prática",
    es: "Comenzar Práctica"
  },
  "hero.viewProgress": {
    en: "View My Progress",
    pt: "Ver Meu Progresso",
    es: "Ver Mi Progreso"
  },
  "hero.getStarted": {
    en: "Get Started",
    pt: "Começar",
    es: "Comenzar"
  },
  "hero.createAccount": {
    en: "Create Account",
    pt: "Criar Conta",
    es: "Crear Cuenta"
  },
  "features.howItWorks": {
    en: "How It Works",
    pt: "Como Funciona",
    es: "Cómo Funciona"
  },
  "features.translateText": {
    en: "1. Translate Text",
    pt: "1. Traduza Texto",
    es: "1. Traduce Texto"
  },
  "features.translateDescription": {
    en: "Paste Portuguese text and get translations in your target language.",
    pt: "Cole texto em Português e obtenha traduções em seu idioma alvo.",
    es: "Pega texto en Portugués y obtén traducciones en tu idioma objetivo."
  },
  "features.createFlashcards": {
    en: "2. Create Flashcards",
    pt: "2. Crie Flashcards",
    es: "2. Crea Tarjetas"
  },
  "features.createDescription": {
    en: "We identify new words and create flashcards with context sentences.",
    pt: "Identificamos novas palavras e criamos flashcards com frases de contexto.",
    es: "Identificamos nuevas palabras y creamos tarjetas con oraciones de contexto."
  },
  "features.practiceDaily": {
    en: "3. Practice Daily",
    pt: "3. Pratique Diariamente",
    es: "3. Practica Diariamente"
  },
  "features.practiceDescription": {
    en: "Review your flashcards to improve retention and master new vocabulary.",
    pt: "Revise seus flashcards para melhorar a retenção e dominar novo vocabulário.",
    es: "Revisa tus tarjetas para mejorar la retención y dominar nuevo vocabulario."
  },
  "features.trackProgress": {
    en: "4. Track Progress",
    pt: "4. Acompanhe o Progresso",
    es: "4. Sigue tu Progreso"
  },
  "features.trackDescription": {
    en: "Monitor your learning with statistics on mastered words and review sessions.",
    pt: "Monitore seu aprendizado com estatísticas sobre palavras dominadas e sessões de revisão.",
    es: "Monitorea tu aprendizaje con estadísticas sobre palabras dominadas y sesiones de revisión."
  },
  "translator.title": {
    en: "Text Translator",
    pt: "Tradutor de Texto",
    es: "Traductor de Texto"
  },
  "translator.sourceText": {
    en: "Portuguese Text",
    pt: "Texto em Português",
    es: "Texto en Portugués"
  },
  "translator.placeholder": {
    en: "Enter your Portuguese text here...",
    pt: "Digite seu texto em Português aqui...",
    es: "Ingresa tu texto en Portugués aquí..."
  },
  "translator.extractWords": {
    en: "Extract Words",
    pt: "Extrair Palavras",
    es: "Extraer Palabras"
  },
  "translator.translation": {
    en: "Translation",
    pt: "Tradução",
    es: "Traducción"
  },
  "translator.targetLanguage": {
    en: "Target Language:",
    pt: "Idioma Alvo:",
    es: "Idioma Objetivo:"
  },
  "translator.extractedWords": {
    en: "Extracted Words",
    pt: "Palavras Extraídas",
    es: "Palabras Extraídas"
  },
  "translator.markWords": {
    en: "Mark words you already know. Words you don't know will be added as flashcards.",
    pt: "Marque as palavras que você já conhece. As que não conhece serão adicionadas como flashcards.",
    es: "Marca las palabras que ya conoces. Las que no conoces se añadirán como tarjetas."
  },
  "translator.markAllKnown": {
    en: "Mark All as Known",
    pt: "Marcar Todas como Conhecidas",
    es: "Marcar Todas como Conocidas"
  },
  "translator.markAllUnknown": {
    en: "Mark All as Unknown",
    pt: "Marcar Todas como Desconhecidas",
    es: "Marcar Todas como Desconocidas"
  },
  "translator.saveWords": {
    en: "Save Words",
    pt: "Salvar Palavras",
    es: "Guardar Palabras"
  },
  "practice.title": {
    en: "Practice Flashcards",
    pt: "Praticar Flashcards",
    es: "Practicar Tarjetas"
  },
  "practice.description": {
    en: "Review your flashcards to improve your vocabulary.",
    pt: "Revise seus flashcards para melhorar seu vocabulário.",
    es: "Revisa tus tarjetas para mejorar tu vocabulario."
  },
  "practice.card": {
    en: "Card",
    pt: "Cartão",
    es: "Tarjeta"
  },
  "practice.of": {
    en: "of",
    pt: "de",
    es: "de"
  },
  "practice.mastered": {
    en: "Mastered",
    pt: "Dominado",
    es: "Dominado"
  },
  "practice.notSure": {
    en: "Not Sure",
    pt: "Não Tenho Certeza",
    es: "No Estoy Seguro"
  },
  "practice.dontKnow": {
    en: "I Don't Know",
    pt: "Não Sei",
    es: "No Sé"
  },
  "practice.complete": {
    en: "Practice Complete!",
    pt: "Prática Completa!",
    es: "¡Práctica Completa!"
  },
  "practice.completeMessage": {
    en: "You've reviewed all your flashcards. Come back later for more practice.",
    pt: "Você revisou todos os seus flashcards. Volte mais tarde para mais prática.",
    es: "Has revisado todas tus tarjetas. Vuelve más tarde para más práctica."
  },
  "practice.finish": {
    en: "Finish",
    pt: "Finalizar",
    es: "Finalizar"
  },
  "practice.next": {
    en: "Next",
    pt: "Próximo",
    es: "Siguiente"
  },
  "practice.previous": {
    en: "Previous",
    pt: "Anterior",
    es: "Anterior"
  },
  "practice.noCards": {
    en: "You have no flashcards to review at the moment. Add some from the translator!",
    pt: "Você não tem flashcards para revisar no momento. Adicione alguns do tradutor!",
    es: "No tienes tarjetas para revisar en este momento. ¡Añade algunas desde el traductor!"
  },
  "practice.close": {
    en: "Close",
    pt: "Fechar",
    es: "Cerrar"
  },
  "translator.translating": {
    en: "Translating...",
    pt: "Traduzindo...",
    es: "Traduciendo..."
  },
  "translator.selectLanguage": {
    en: "Select Language",
    pt: "Selecionar Idioma",
    es: "Seleccionar Idioma"
  },
  "translator.cancel": {
    en: "Cancel",
    pt: "Cancelar",
    es: "Cancelar"
  },
  "footer.copyright": {
    en: "© 2025 FluenFlash - Language Learning with Flashcards",
    pt: "© 2025 FluenFlash - Aprendizado de Idiomas com Flashcards",
    es: "© 2025 FluenFlash - Aprendizaje de Idiomas con Tarjetas"
  },
  "words.title": {
    en: "Words Learned",
    pt: "Palavras Aprendidas",
    es: "Palabras Aprendidas"
  },
  "words.subtitle": {
    en: "Track your progress and review your vocabulary",
    pt: "Acompanhe seu progresso e revise seu vocabulário",
    es: "Sigue tu progreso y revisa tu vocabulario"
  },
  "words.mastered": {
    en: "Mastered",
    pt: "Dominadas",
    es: "Dominadas"
  },
  "words.learning": {
    en: "Learning",
    pt: "Aprendendo",
    es: "Aprendiendo"
  },
  "words.unknown": {
    en: "Unknown",
    pt: "Desconhecidas",
    es: "Desconocidas"
  },
  "words.searchPlaceholder": {
    en: "Search words...",
    pt: "Buscar palavras...",
    es: "Buscar palabras..."
  },
  "words.filterByLanguage": {
    en: "Filter by language",
    pt: "Filtrar por idioma",
    es: "Filtrar por idioma"
  },
  "words.filterByStatus": {
    en: "Filter by status",
    pt: "Filtrar por status",
    es: "Filtrar por estado"
  },
  "words.allStatuses": {
    en: "All Statuses",
    pt: "Todos os Status",
    es: "Todos los Estados"
  },
  "words.clearFilters": {
    en: "Clear Filters",
    pt: "Limpar Filtros",
    es: "Limpiar Filtros"
  },
  "words.noWordsMatch": {
    en: "No words match your current filters.",
    pt: "Nenhuma palavra corresponde aos seus filtros atuais.",
    es: "Ninguna palabra coincide con tus filtros actuales."
  },
  "words.noWordsYet": {
    en: "You haven't learned any words yet. Start by translating some text!",
    pt: "Você ainda não aprendeu nenhuma palavra. Comece traduzindo algum texto!",
    es: "Aún no has aprendido ninguna palabra. ¡Comienza traduciendo algún texto!"
  }
};

type AppLanguageContextType = {
  appLanguage: AppLanguage;
  setAppLanguage: (lang: AppLanguage) => void;
  t: (key: string) => string;
};

const AppLanguageContext = createContext<AppLanguageContextType>({
  appLanguage: "en",
  setAppLanguage: () => {},
  t: () => "",
});

export const useAppLanguage = () => useContext(AppLanguageContext);

export const AppLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem("appLanguage");
    return (saved as AppLanguage) || "en";
  });

  useEffect(() => {
    localStorage.setItem("appLanguage", appLanguage);
  }, [appLanguage]);

  const t = (key: string): string => {
    return appLabels[key]?.[appLanguage] || key;
  };

  return (
    <AppLanguageContext.Provider value={{ appLanguage, setAppLanguage, t }}>
      {children}
    </AppLanguageContext.Provider>
  );
};
