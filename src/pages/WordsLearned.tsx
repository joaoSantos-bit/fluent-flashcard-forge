
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Word, useFlashcards } from "@/contexts/FlashcardContext";
import { WordCard } from "@/components/WordCard";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Search, BookCheck, BookText, BookX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WordsLearned = () => {
  const { isAuthenticated } = useAuth();
  const { words, getWordsByLanguage, getWordsStats } = useFlashcards();
  const { targetLanguage, availableLanguages } = useLanguage();
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

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Words Learned</h1>
          <p className="text-gray-600 mb-8">
            Track your progress and review your vocabulary
          </p>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <BookCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Mastered</p>
                <p className="text-xl font-bold">{stats.mastered} words</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <BookText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Learning</p>
                <p className="text-xl font-bold">{stats.learning} words</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <BookX className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unknown</p>
                <p className="text-xl font-bold">{stats.unknown} words</p>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search words..."
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
                  <SelectValue placeholder="Filter by language" />
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
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="mastered">Mastered</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Words List */}
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all" || filterLanguage
                  ? "No words match your current filters."
                  : "You haven't learned any words yet. Start by translating some text!"}
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
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WordsLearned;
