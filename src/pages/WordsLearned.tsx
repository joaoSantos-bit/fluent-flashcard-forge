
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Word, useFlashcards, MasteryLevel } from "@/contexts/FlashcardContext";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useAppLanguage } from "@/contexts/AppLanguageContext";
import { Search, BookCheck, BookText, BookX, Volume2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const WordsLearned = () => {
  const { isAuthenticated } = useAuth();
  const { words, getWordsByLanguage, getWordsStats, updateWordMastery } = useFlashcards();
  const { targetLanguage, availableLanguages } = useLanguage();
  const { t } = useAppLanguage();
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<Language>(targetLanguage);
  const [statusFilter, setStatusFilter] = useState<"all" | "mastered" | "learning" | "unknown">("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let filtered = filterLanguage 
      ? getWordsByLanguage(filterLanguage) 
      : words;
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(word => word.masteryLevel === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredWords(filtered);
  }, [words, searchTerm, filterLanguage, statusFilter, getWordsByLanguage]);

  const stats = getWordsStats();

  const handleMasteryChange = (wordId: string, masteryLevel: MasteryLevel) => {
    updateWordMastery(wordId, masteryLevel);
  };

  const playAudio = (text: string, isSourceLanguage = true) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isSourceLanguage ? 'pt-BR' : 'en-US'; 
    window.speechSynthesis.speak(utterance);
  };

  const getMasteryBadge = (masteryLevel: MasteryLevel) => {
    switch (masteryLevel) {
      case "mastered":
        return <Badge className="bg-green-500">{t("words.mastered")}</Badge>;
      case "learning":
        return <Badge className="bg-yellow-500">{t("words.learning")}</Badge>;
      case "unknown":
        return <Badge className="bg-red-500">{t("words.unknown")}</Badge>;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{t("words.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("words.subtitle")}
          </p>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                <BookCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("words.mastered")}</p>
                <p className="text-xl font-bold">{stats.mastered} {t("words.words")}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-3">
                <BookText className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("words.learning")}</p>
                <p className="text-xl font-bold">{stats.learning} {t("words.words")}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
                <BookX className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("words.unknown")}</p>
                <p className="text-xl font-bold">{stats.unknown} {t("words.words")}</p>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t("words.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select
                value={filterLanguage}
                onValueChange={(value) => setFilterLanguage(value as Language)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("words.filterByLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as any)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={t("words.filterByStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("words.allStatuses")}</SelectItem>
                  <SelectItem value="mastered">{t("words.mastered")}</SelectItem>
                  <SelectItem value="learning">{t("words.learning")}</SelectItem>
                  <SelectItem value="unknown">{t("words.unknown")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Words Table */}
          {filteredWords.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Table>
                <TableCaption>{t("words.tableCaption")}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("words.word")}</TableHead>
                    <TableHead>{t("words.translation")}</TableHead>
                    <TableHead>{t("words.status")}</TableHead>
                    <TableHead className="text-right">{t("words.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWords.map((word) => (
                    <TableRow key={word.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {word.word}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 ml-1" 
                            onClick={() => playAudio(word.word, true)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {word.translation}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 ml-1" 
                            onClick={() => playAudio(word.translation, false)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{getMasteryBadge(word.masteryLevel)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMasteryChange(word.id, "unknown")}
                            className={word.masteryLevel === "unknown" ? "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-900" : ""}
                          >
                            {t("words.markUnknown")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMasteryChange(word.id, "learning")}
                            className={word.masteryLevel === "learning" ? "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-900" : ""}
                          >
                            {t("words.markLearning")}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMasteryChange(word.id, "mastered")}
                            className={word.masteryLevel === "mastered" ? "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-900" : ""}
                          >
                            {t("words.markMastered")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== "all" || filterLanguage
                  ? t("words.noWordsMatch")
                  : t("words.noWordsYet")}
              </p>
              {(searchTerm || statusFilter !== "all" || filterLanguage) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setFilterLanguage(targetLanguage);
                  }}
                >
                  {t("words.clearFilters")}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default WordsLearned;
