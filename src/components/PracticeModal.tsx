
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
import { CheckCircle2 } from "lucide-react";

type PracticeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PracticeModal({ open, onOpenChange }: PracticeModalProps) {
  const { flashcards, getFlashcardsByLanguage } = useFlashcards();
  const { targetLanguage } = useLanguage();
  const [practiceCards, setPracticeCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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
    }
  }, [open, getFlashcardsByLanguage, targetLanguage]);

  const handleNext = () => {
    if (currentCardIndex < practiceCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Practice Flashcards</DialogTitle>
          <DialogDescription>
            Review your flashcards to improve your vocabulary.
          </DialogDescription>
        </DialogHeader>

        {practiceCards.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              You have no flashcards to review at the moment. Add some from the translator!
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : isFinished ? (
          <div className="text-center py-10">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Practice Complete!</h3>
            <p className="text-gray-500 mb-6">
              You've reviewed all your flashcards. Come back later for more practice.
            </p>
            <Button onClick={handleClose}>Finish</Button>
          </div>
        ) : (
          <div className="py-4">
            <div className="mb-4 text-center text-sm text-gray-500">
              Card {currentCardIndex + 1} of {practiceCards.length}
            </div>
            <FlashcardItem 
              flashcard={practiceCards[currentCardIndex]} 
              onNext={handleNext} 
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
