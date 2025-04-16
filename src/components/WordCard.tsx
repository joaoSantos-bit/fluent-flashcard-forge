
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Word, MasteryLevel, useFlashcards } from "@/contexts/FlashcardContext";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type WordCardProps = {
  word: Word;
};

export function WordCard({ word }: WordCardProps) {
  const { updateWordMastery } = useFlashcards();

  const handleMasteryChange = (masteryLevel: MasteryLevel) => {
    updateWordMastery(word.id, masteryLevel);
  };

  const getMasteryBadge = () => {
    switch (word.masteryLevel) {
      case "mastered":
        return <Badge className="bg-green-500">Mastered</Badge>;
      case "learning":
        return <Badge className="bg-yellow-500">Learning</Badge>;
      case "unknown":
        return <Badge className="bg-red-500">Unknown</Badge>;
      default:
        return null;
    }
  };

  const playAudio = (text: string, isPortuguese = true) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isPortuguese ? 'pt-BR' : 'en-US'; // Set Portuguese for source words
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{word.word}</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => playAudio(word.word, true)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-500">
              {word.translation} 
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 inline-flex" 
                onClick={() => playAudio(word.translation, false)}
              >
                <Volume2 className="h-3 w-3" />
              </Button>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {getMasteryBadge()}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${word.masteryLevel === "unknown" ? "bg-gray-100" : ""}`}
            onClick={() => handleMasteryChange("unknown")}
          >
            Unknown
          </Badge>
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${word.masteryLevel === "learning" ? "bg-gray-100" : ""}`}
            onClick={() => handleMasteryChange("learning")}
          >
            Learning
          </Badge>
          <Badge 
            variant="outline" 
            className={`cursor-pointer ${word.masteryLevel === "mastered" ? "bg-gray-100" : ""}`}
            onClick={() => handleMasteryChange("mastered")}
          >
            Mastered
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
