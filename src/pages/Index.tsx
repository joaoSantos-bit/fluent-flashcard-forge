
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { TextTranslator } from "@/components/TextTranslator";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PracticeModal } from "@/components/PracticeModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Brain, BookOpen, BookCheck, BarChart, ArrowRight } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Learn Portuguese with Smart Flashcards
              </h1>
              <p className="text-xl mb-8">
                Translate texts, create personalized flashcards, and track your progress
                with our intelligent language learning system.
              </p>
              
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="text-primary font-semibold"
                    onClick={() => setIsPracticeOpen(true)}
                  >
                    Start Practice
                  </Button>
                  <Link to="/words-learned">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      View My Progress
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login">
                    <Button size="lg" variant="secondary" className="text-primary font-semibold">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Translate Text</h3>
                <p className="text-gray-600">
                  Paste Portuguese text and get translations in your target language.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BookCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Create Flashcards</h3>
                <p className="text-gray-600">
                  We identify new words and create flashcards with context sentences.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Practice Daily</h3>
                <p className="text-gray-600">
                  Review your flashcards to improve retention and master new vocabulary.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">4. Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your learning with statistics on mastered words and review sessions.
                </p>
              </div>
            </div>
            
            {isAuthenticated && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={() => setIsPracticeOpen(true)}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Translator section */}
        {isAuthenticated && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Text Translator</h2>
                <LanguageSelector />
              </div>
              
              <div className="max-w-3xl mx-auto">
                <TextTranslator />
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 FluenFlash - Language Learning with Flashcards</p>
        </div>
      </footer>

      <PracticeModal open={isPracticeOpen} onOpenChange={setIsPracticeOpen} />
    </div>
  );
};

export default Index;
