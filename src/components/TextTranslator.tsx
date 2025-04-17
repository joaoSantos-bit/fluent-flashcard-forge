
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useFlashcards } from "@/contexts/FlashcardContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppLanguage } from "@/contexts/AppLanguageContext";
import { Volume2 } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { WordExtractor } from "./WordExtractor";

type ExtractedWord = {
  word: string;
  translation: string;
  isKnown: boolean;
};

export function TextTranslator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [extractedWords, setExtractedWords] = useState<ExtractedWord[]>([]);
  const [showWordExtractor, setShowWordExtractor] = useState(false);
  const { extractWordsFromText, addWord } = useFlashcards();
  const { targetLanguage } = useLanguage();
  const { t } = useAppLanguage();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to translate.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);

    try {
      // Simulate API call to translation service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock translation for demo
      const mockTranslations: Record<string, string> = {
        "Olá, como você está? Eu estou aprendendo português.": 
          targetLanguage === "english" ? "Hello, how are you? I am learning Portuguese." 
          : targetLanguage === "spanish" ? "Hola, ¿cómo estás? Estoy aprendiendo portugués."
          : targetLanguage === "french" ? "Bonjour, comment ça va? J'apprends le portugais."
          : targetLanguage === "german" ? "Hallo, wie geht es dir? Ich lerne Portugiesisch."
          : "Ciao, come stai? Sto imparando il portoghese.",
          
        "Eu gosto de comer frutas e beber água todos os dias.": 
          targetLanguage === "english" ? "I like to eat fruits and drink water every day." 
          : targetLanguage === "spanish" ? "Me gusta comer frutas y beber agua todos los días."
          : targetLanguage === "french" ? "J'aime manger des fruits et boire de l'eau tous les jours."
          : targetLanguage === "german" ? "Ich esse gerne Obst und trinke jeden Tag Wasser."
          : "Mi piace mangiare frutta e bere acqua ogni giorno.",
          
        "O clima está muito bom hoje, vamos à praia.": 
          targetLanguage === "english" ? "The weather is very good today, let's go to the beach." 
          : targetLanguage === "spanish" ? "El clima está muy bueno hoy, vamos a la playa."
          : targetLanguage === "french" ? "Le temps est très bon aujourd'hui, allons à la plage."
          : targetLanguage === "german" ? "Das Wetter ist heute sehr gut, lass uns an den Strand gehen."
          : "Il tempo è molto bello oggi, andiamo in spiaggia."
      };
      
      // Default mock translation for any text not in our dictionary
      const translation = mockTranslations[sourceText] || 
        `[Translated to ${targetLanguage}] ${sourceText}`;
      
      setTranslatedText(translation);
      
      // Extract words from source text for the word selection process
      const rawExtractedWords = extractWordsFromText(sourceText, translation, targetLanguage);
      
      // Format for the word extractor component
      const formattedWords = rawExtractedWords.map(word => ({
        word: word.word,
        translation: word.translation,
        isKnown: false
      }));
      
      setExtractedWords(formattedWords);
      setShowWordExtractor(true);
      
      toast({
        title: "Translation completed",
        description: `Extracted ${formattedWords.length} words from your text.`,
      });
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "There was an error translating your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const playAudio = (text: string, isPortuguese = true) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set the language based on the text source
    if (isPortuguese) {
      utterance.lang = 'pt-BR'; // Portuguese (Brazil)
    } else {
      // Set language based on target language
      switch (targetLanguage) {
        case 'english':
          utterance.lang = 'en-US';
          break;
        case 'spanish':
          utterance.lang = 'es-ES';
          break;
        case 'french':
          utterance.lang = 'fr-FR';
          break;
        case 'german':
          utterance.lang = 'de-DE';
          break;
        case 'italian':
          utterance.lang = 'it-IT';
          break;
        default:
          utterance.lang = 'en-US';
      }
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleCloseWordExtractor = () => {
    setShowWordExtractor(false);
    setExtractedWords([]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>{t("translator.title")}</CardTitle>
          <LanguageSelector className="mt-2 sm:mt-0" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showWordExtractor ? (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">{t("translator.sourceText")}</label>
                {sourceText && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => playAudio(sourceText, true)}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Textarea
                placeholder={t("translator.placeholder")}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>
            
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              className="w-full"
            >
              {isTranslating ? t("translator.translating") : t("translator.extractWords")}
            </Button>
            
            {translatedText && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">{t("translator.translation")}</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => playAudio(translatedText, false)}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[6rem]">
                  {translatedText}
                </div>
              </div>
            )}
          </>
        ) : (
          <WordExtractor 
            words={extractedWords} 
            onClose={handleCloseWordExtractor} 
          />
        )}
      </CardContent>
    </Card>
  );
}
