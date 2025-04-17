
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { TextTranslator } from "@/components/TextTranslator";
import { PracticeModal } from "@/components/PracticeModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Brain, BookOpen, BookCheck, BarChart, ArrowRight } from "lucide-react";
import { useAppLanguage } from "@/contexts/AppLanguageContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const { t } = useAppLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl mb-8">
                {t("hero.subtitle")}
              </p>
              
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="text-primary font-semibold"
                    onClick={() => setIsPracticeOpen(true)}
                  >
                    {t("hero.startPractice")}
                  </Button>
                  <Link to="/words-learned">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/20 hover:text-white"
                    >
                      {t("hero.viewProgress")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login">
                    <Button size="lg" variant="secondary" className="text-primary font-semibold">
                      {t("hero.getStarted")}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/20 hover:text-white"
                    >
                      {t("hero.createAccount")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t("features.howItWorks")}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("features.translateText")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("features.translateDescription")}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BookCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("features.createFlashcards")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("features.createDescription")}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("features.practiceDaily")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("features.practiceDescription")}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("features.trackProgress")}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("features.trackDescription")}
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
                  {t("hero.startPractice")}
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
              <div className="flex flex-col items-start mb-8">
                <h2 className="text-3xl font-bold">{t("translator.title")}</h2>
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
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>

      <PracticeModal open={isPracticeOpen} onOpenChange={setIsPracticeOpen} />
    </div>
  );
}

export default Index;
