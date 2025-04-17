
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useFlashcards } from "@/contexts/FlashcardContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppLanguage } from "@/contexts/AppLanguageContext";

type ExtractedWord = {
  word: string;
  translation: string;
  isKnown: boolean;
};

type WordExtractorProps = {
  words: ExtractedWord[];
  onClose: () => void;
};

export function WordExtractor({ words, onClose }: WordExtractorProps) {
  const [extractedWords, setExtractedWords] = useState<ExtractedWord[]>(words);
  const { addWord } = useFlashcards();
  const { targetLanguage } = useLanguage();
  const { t } = useAppLanguage();

  const toggleWordKnown = (index: number) => {
    setExtractedWords(prev => 
      prev.map((word, i) => 
        i === index ? { ...word, isKnown: !word.isKnown } : word
      )
    );
  };

  const handleSaveWords = () => {
    const knownWords = extractedWords.filter(word => word.isKnown);
    const unknownWords = extractedWords.filter(word => !word.isKnown);
    
    // Add known words as "mastered"
    knownWords.forEach(word => {
      addWord({
        word: word.word,
        translation: word.translation,
        masteryLevel: "mastered",
        language: targetLanguage,
      });
    });
    
    // Add unknown words as "unknown"
    unknownWords.forEach(word => {
      addWord({
        word: word.word,
        translation: word.translation,
        masteryLevel: "unknown",
        language: targetLanguage,
      });
    });
    
    toast({
      title: "Words saved",
      description: `Added ${knownWords.length} known words and ${unknownWords.length} flashcards for learning.`,
    });
    
    onClose();
  };

  const markAllAsKnown = () => {
    setExtractedWords(prev => prev.map(word => ({ ...word, isKnown: true })));
  };

  const markAllAsUnknown = () => {
    setExtractedWords(prev => prev.map(word => ({ ...word, isKnown: false })));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("translator.extractedWords")}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("translator.markWords")}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="sm" onClick={markAllAsKnown}>
            {t("translator.markAllKnown")}
          </Button>
          <Button variant="outline" size="sm" onClick={markAllAsUnknown}>
            {t("translator.markAllUnknown")}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1">
          {extractedWords.map((word, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 p-2 border rounded-md transition-colors ${
                word.isKnown ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900" : 
                              "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900"
              }`}
            >
              <Checkbox 
                id={`word-${index}`} 
                checked={word.isKnown} 
                onCheckedChange={() => toggleWordKnown(index)}
              />
              <div className="flex-1">
                <label 
                  htmlFor={`word-${index}`} 
                  className="text-sm font-medium cursor-pointer"
                >
                  {word.word}
                </label>
                <p className="text-xs text-muted-foreground">{word.translation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>{t("practice.cancel")}</Button>
        <Button onClick={handleSaveWords}>
          {t("translator.saveWords")}
        </Button>
      </CardFooter>
    </Card>
  );
}
