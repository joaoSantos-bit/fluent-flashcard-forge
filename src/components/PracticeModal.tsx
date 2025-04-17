
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Flashcard, useFlashcards } from "@/contexts/FlashcardContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FlashcardItem } from "./FlashcardItem";
import { CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAppLanguage } from "@/contexts/AppLanguageContext";

type PracticeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PracticeModal({ open, onOpenChange }: PracticeModalProps) {
  const { flashcards, getFlashcardsByLanguage } = useFlashcards();
  const { targetLanguage } = useLanguage();
  const { t } = useAppLanguage();
  const [practiceCards, setPracticeCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (open) {
      // Get flashcards that are not mastered
      const cards = getFlashcardsByLanguage(targetLanguage).filter(
        card => card.masteryLevel !== "mastered"
      );
      // Shuffle the cards
      const shuffled = [...cards].sort(() => 0.5 - Math.random());
      setPracticeCards(shuffled);
      setCurrentCardIndex(0);
      setIsFinished(false);
      setShowAnswer(false);
    }
  }, [open, getFlashcardsByLanguage, targetLanguage]);

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < practiceCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("practice.title")}</DialogTitle>
          <DialogDescription>
            {t("practice.description")}
          </DialogDescription>
        </DialogHeader>

        {practiceCards.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              {t("practice.noCards")}
            </p>
            <Button onClick={handleClose}>{t("practice.close")}</Button>
          </div>
        ) : isFinished ? (
          <div className="text-center py-10">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("practice.complete")}</h3>
            <p className="text-gray-500 mb-6">
              {t("practice.completeMessage")}
            </p>
            <Button onClick={handleClose}>{t("practice.finish")}</Button>
          </div>
        ) : (
          <div className="py-4">
            <div className="mb-4 text-center text-sm text-gray-500">
              {t("practice.card")} {currentCardIndex + 1} {t("practice.of")} {practiceCards.length}
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-center text-sm font-medium">
                {Math.round((currentCardIndex + 1) / practiceCards.length * 100)}%
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNext}
                disabled={currentCardIndex === practiceCards.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-6">
              <FlashcardItem 
                flashcard={practiceCards[currentCardIndex]} 
                onNext={handleNext} 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="bg-red-50 hover:bg-red-100 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:border-red-900"
                onClick={() => {
                  setShowAnswer(true);
                }}
              >
                {t("practice.dontKnow")}
              </Button>
              
              <Button
                variant="outline"
                className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 dark:border-yellow-900"
                onClick={() => {
                  setShowAnswer(true);
                }}
              >
                {t("practice.notSure")}
              </Button>
              
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  handleNext();
                }}
              >
                {t("practice.mastered")}
              </Button>
            </div>

            {showAnswer && (
              <div className="mt-4">
                <Button 
                  className="w-full"
                  onClick={handleNext}
                >
                  {t("practice.next")}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
