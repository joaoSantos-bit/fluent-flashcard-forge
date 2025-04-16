
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { TextTranslator } from "@/components/TextTranslator";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PracticeModal } from "@/components/PracticeModal";
import { useAuth } from "@/contexts/AuthContext";
import { useFlashcards } from "@/contexts/FlashcardContext";
import { useState } from "react";
import { Brain, BookText, BookCheck, BookX } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { getWordsStats } = useFlashcards();
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const stats = getWordsStats();

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
              <p className="text-gray-600">
                Manage your language learning journey
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => setIsPracticeOpen(true)}>
                Start Practice
              </Button>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookCheck className="h-5 w-5 mr-2 text-green-500" />
                  Mastered Words
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.mastered}</p>
                <p className="text-sm text-gray-500">Words you know well</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookText className="h-5 w-5 mr-2 text-yellow-500" />
                  Learning Words
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.learning}</p>
                <p className="text-sm text-gray-500">Words you're currently practicing</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookX className="h-5 w-5 mr-2 text-red-500" />
                  Unknown Words
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.unknown}</p>
                <p className="text-sm text-gray-500">Words you need to learn</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Translate New Text</h2>
            <LanguageSelector />
          </div>
          
          <div className="mb-8">
            <TextTranslator />
          </div>
          
          {/* Practice Tips */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Language Learning Tips</h3>
            </div>
            
            <ul className="space-y-2 text-gray-700">
              <li>• Practice regularly, even if it's just for 5-10 minutes a day.</li>
              <li>• Try to use new words in sentences to remember them better.</li>
              <li>• Listen to native speakers to improve your pronunciation.</li>
              <li>• Read Portuguese texts aloud to practice speaking.</li>
              <li>• Focus on high-frequency words first for faster progress.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <PracticeModal open={isPracticeOpen} onOpenChange={setIsPracticeOpen} />
    </div>
  );
};

export default Dashboard;
