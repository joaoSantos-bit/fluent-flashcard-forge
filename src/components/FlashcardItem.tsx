
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flashcard, MasteryLevel, useFlashcards } from "@/contexts/FlashcardContext";
import { Check, HelpCircle, X, ChevronRight, Volume2 } from "lucide-react";

type FlashcardItemProps = {
  flashcard: Flashcard;
  onNext: () => void;
};

export function FlashcardItem({ flashcard, onNext }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const { updateFlashcardMastery } = useFlashcards();

  const handleUpdateMastery = (level: MasteryLevel) => {
    updateFlashcardMastery(flashcard.id, level);
    setIsFlipped(false);
    setShowAnswer(false);
    onNext();
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = (text: string, isPortuguese = true) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isPortuguese ? 'pt-BR' : 'en-US'; // Set Portuguese for source words
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flashcard">
        <div className={`flashcard-inner ${isFlipped ? "animate-flip" : "animate-flip-back"}`}>
          <Card
            className={`flex flex-col items-center justify-center w-full p-8 h-64 rounded-xl shadow-lg border-2 ${
              isFlipped ? "hidden" : "flashcard-front"
            }`}
          >
            <div className="flex justify-end w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playAudio(flashcard.word, true)}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
            <h3 className="text-3xl font-bold mb-4">{flashcard.word}</h3>
            <p className="text-gray-500 text-center mb-6">
              {flashcard.context}
            </p>
            {!showAnswer && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowAnswer(true)}>
                  Show Answer
                </Button>
                <Button onClick={handleFlip}>Flip Card</Button>
              </div>
            )}
            
            {showAnswer && (
              <div className="mt-4">
                <p className="text-xl font-medium mb-2">{flashcard.translation}</p>
                <p className="text-gray-500 text-center italic">
                  {flashcard.contextTranslation}
                </p>
                <div className="flex justify-center space-x-2 mt-4">
                  <Button
                    variant="destructive"
                    className="flex items-center"
                    onClick={() => handleUpdateMastery("unknown")}
                  >
                    <X className="mr-1 h-4 w-4" />
                    I don't know
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => handleUpdateMastery("learning")}
                  >
                    <HelpCircle className="mr-1 h-4 w-4" />
                    Not sure
                  </Button>
                  
                  <Button
                    variant="default"
                    className="flex items-center"
                    onClick={() => handleUpdateMastery("mastered")}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Mastered
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          <Card
            className={`flex flex-col items-center justify-center w-full p-8 h-64 rounded-xl shadow-lg border-2 ${
              isFlipped ? "flashcard-back" : "hidden"
            }`}
          >
            <div className="flex justify-end w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playAudio(flashcard.translation, false)}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
            <h3 className="text-3xl font-bold mb-4">{flashcard.translation}</h3>
            <p className="text-gray-500 text-center mb-6">
              {flashcard.contextTranslation}
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleFlip}>
                Flip Back
              </Button>
              <Button onClick={onNext} className="flex items-center">
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {!isFlipped && !showAnswer && (
        <div className="flex justify-center space-x-2 mt-6">
          <Button
            variant="destructive"
            className="flex items-center"
            onClick={() => handleUpdateMastery("unknown")}
          >
            <X className="mr-1 h-4 w-4" />
            I don't know
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => handleUpdateMastery("learning")}
          >
            <HelpCircle className="mr-1 h-4 w-4" />
            Not sure
          </Button>
          
          <Button
            variant="default"
            className="flex items-center"
            onClick={() => handleUpdateMastery("mastered")}
          >
            <Check className="mr-1 h-4 w-4" />
            Mastered
          </Button>
        </div>
      )}
    </div>
  );
}
