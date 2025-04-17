import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Language } from "./LanguageContext";

// Flashcard mastery levels
export type MasteryLevel = "unknown" | "learning" | "mastered";

// Flashcard type
export type Flashcard = {
  id: string;
  word: string;
  translation: string;
  context: string;
  contextTranslation: string;
  masteryLevel: MasteryLevel;
  language: Language;
  createdAt: number;
  lastReviewedAt: number | null;
};

// Word list type
export type Word = {
  id: string;
  word: string;
  translation: string;
  masteryLevel: MasteryLevel;
  language: Language;
  createdAt: number;
  lastReviewedAt: number | null;
};

// Context type
type FlashcardContextType = {
  flashcards: Flashcard[];
  words: Word[];
  addFlashcard: (flashcard: Omit<Flashcard, "id" | "createdAt" | "lastReviewedAt">) => void;
  addWord: (word: Omit<Word, "id" | "createdAt" | "lastReviewedAt">) => void;
  updateFlashcardMastery: (id: string, masteryLevel: MasteryLevel) => void;
  updateWordMastery: (id: string, masteryLevel: MasteryLevel) => void;
  getFlashcardsByLanguage: (language: Language) => Flashcard[];
  getWordsByLanguage: (language: Language) => Word[];
  getWordsStats: () => { mastered: number; learning: number; unknown: number };
  extractWordsFromText: (text: string, translation: string, language: Language) => Omit<Word, "id" | "createdAt" | "lastReviewedAt">[];
};

const FlashcardContext = createContext<FlashcardContextType>({
  flashcards: [],
  words: [],
  addFlashcard: () => {},
  addWord: () => {},
  updateFlashcardMastery: () => {},
  updateWordMastery: () => {},
  getFlashcardsByLanguage: () => [],
  getWordsByLanguage: () => [],
  getWordsStats: () => ({ mastered: 0, learning: 0, unknown: 0 }),
  extractWordsFromText: () => [],
});

export const useFlashcards = () => useContext(FlashcardContext);

export const FlashcardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [words, setWords] = useState<Word[]>([]);

  // Load flashcards and words from localStorage on mount
  useEffect(() => {
    if (user) {
      const userId = user.id;
      const savedFlashcards = localStorage.getItem(`flashcards-${userId}`);
      const savedWords = localStorage.getItem(`words-${userId}`);
      
      if (savedFlashcards) {
        setFlashcards(JSON.parse(savedFlashcards));
      } else {
        // Demo flashcards for new users
        const demoFlashcards: Flashcard[] = [
          {
            id: "1",
            word: "casa",
            translation: "house",
            context: "Eu moro em uma casa grande.",
            contextTranslation: "I live in a big house.",
            masteryLevel: "learning",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: null
          },
          {
            id: "2",
            word: "carro",
            translation: "car",
            context: "Eu tenho um carro azul.",
            contextTranslation: "I have a blue car.",
            masteryLevel: "unknown",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: null
          },
          {
            id: "3",
            word: "livro",
            translation: "book",
            context: "Eu gosto de ler um livro.",
            contextTranslation: "I like to read a book.",
            masteryLevel: "mastered",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: Date.now()
          }
        ];
        setFlashcards(demoFlashcards);
        localStorage.setItem(`flashcards-${userId}`, JSON.stringify(demoFlashcards));
      }
      
      if (savedWords) {
        setWords(JSON.parse(savedWords));
      } else {
        // Demo words for new users
        const demoWords: Word[] = [
          {
            id: "1",
            word: "casa",
            translation: "house",
            masteryLevel: "learning",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: null
          },
          {
            id: "2",
            word: "carro",
            translation: "car",
            masteryLevel: "unknown",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: null
          },
          {
            id: "3",
            word: "livro",
            translation: "book",
            masteryLevel: "mastered",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: Date.now()
          },
          {
            id: "4",
            word: "caneta",
            translation: "pen",
            masteryLevel: "learning",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: null
          },
          {
            id: "5",
            word: "água",
            translation: "water",
            masteryLevel: "mastered",
            language: "english",
            createdAt: Date.now(),
            lastReviewedAt: Date.now()
          }
        ];
        setWords(demoWords);
        localStorage.setItem(`words-${userId}`, JSON.stringify(demoWords));
      }
    } else {
      // Clear data if no user
      setFlashcards([]);
      setWords([]);
    }
  }, [user]);

  // Save flashcards and words to localStorage whenever they change
  useEffect(() => {
    if (user && flashcards.length > 0) {
      localStorage.setItem(`flashcards-${user.id}`, JSON.stringify(flashcards));
    }
  }, [flashcards, user]);

  useEffect(() => {
    if (user && words.length > 0) {
      localStorage.setItem(`words-${user.id}`, JSON.stringify(words));
    }
  }, [words, user]);

  // Add a new flashcard
  const addFlashcard = (flashcard: Omit<Flashcard, "id" | "createdAt" | "lastReviewedAt">) => {
    const newFlashcard: Flashcard = {
      ...flashcard,
      id: Date.now().toString(),
      createdAt: Date.now(),
      lastReviewedAt: null
    };
    
    setFlashcards(prev => [...prev, newFlashcard]);
  };

  // Add a new word
  const addWord = (word: Omit<Word, "id" | "createdAt" | "lastReviewedAt">) => {
    // Check if word already exists in same language
    const exists = words.some(w => 
      w.word.toLowerCase() === word.word.toLowerCase() && 
      w.language === word.language
    );
    
    if (!exists) {
      const newWord: Word = {
        ...word,
        id: Date.now().toString(),
        createdAt: Date.now(),
        lastReviewedAt: null
      };
      
      setWords(prev => [...prev, newWord]);
    }
  };

  // Update flashcard mastery level
  const updateFlashcardMastery = (id: string, masteryLevel: MasteryLevel) => {
    setFlashcards(prev => 
      prev.map(card => 
        card.id === id 
          ? { ...card, masteryLevel, lastReviewedAt: Date.now() } 
          : card
      )
    );
    
    // Also update the corresponding word if it exists
    const flashcard = flashcards.find(f => f.id === id);
    if (flashcard) {
      updateWordMastery(
        words.find(w => 
          w.word.toLowerCase() === flashcard.word.toLowerCase() && 
          w.language === flashcard.language
        )?.id || "",
        masteryLevel
      );
    }
  };

  // Update word mastery level
  const updateWordMastery = (id: string, masteryLevel: MasteryLevel) => {
    if (!id) return;
    
    setWords(prev => 
      prev.map(word => 
        word.id === id 
          ? { ...word, masteryLevel, lastReviewedAt: Date.now() } 
          : word
      )
    );
  };

  // Get flashcards by language
  const getFlashcardsByLanguage = (language: Language) => {
    return flashcards.filter(card => card.language === language);
  };

  // Get words by language
  const getWordsByLanguage = (language: Language) => {
    return words.filter(word => word.language === language);
  };

  // Get statistics about words mastery levels
  const getWordsStats = () => {
    const mastered = words.filter(word => word.masteryLevel === "mastered").length;
    const learning = words.filter(word => word.masteryLevel === "learning").length;
    const unknown = words.filter(word => word.masteryLevel === "unknown").length;
    
    return { mastered, learning, unknown };
  };

  // Extract unique words from a text
  const extractWordsFromText = (text: string, translation: string, language: Language): Omit<Word, "id" | "createdAt" | "lastReviewedAt">[] => {
    // Simple word extraction for demo purposes
    // In a real app, this would use a proper NLP library
    
    // Split text into words, convert to lowercase, and remove punctuation
    const textWords = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/);
    
    // Remove duplicates
    const uniqueWords = [...new Set(textWords)];
    
    // Create word objects (fixing the type issue)
    return uniqueWords.map(word => ({
      word,
      translation: word, // This is a placeholder, in a real app we'd translate properly
      masteryLevel: "unknown" as MasteryLevel,
      language,
    }));
  };

  return (
    <FlashcardContext.Provider
      value={{
        flashcards,
        words,
        addFlashcard,
        addWord,
        updateFlashcardMastery,
        updateWordMastery,
        getFlashcardsByLanguage,
        getWordsByLanguage,
        getWordsStats,
        extractWordsFromText
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};
