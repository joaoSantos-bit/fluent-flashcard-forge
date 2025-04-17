
import { Button } from "@/components/ui/button";
import { useAppLanguage, AppLanguage } from "@/contexts/AppLanguageContext";

export function AppLanguageSelector() {
  const { appLanguage, setAppLanguage } = useAppLanguage();

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={appLanguage === "en" ? "default" : "outline"}
        className={`px-2 text-xs h-8 ${appLanguage === "en" ? "" : "opacity-70"}`}
        onClick={() => setAppLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant={appLanguage === "pt" ? "default" : "outline"}
        className={`px-2 text-xs h-8 ${appLanguage === "pt" ? "" : "opacity-70"}`}
        onClick={() => setAppLanguage("pt")}
      >
        PT
      </Button>
      <Button
        variant={appLanguage === "es" ? "default" : "outline"}
        className={`px-2 text-xs h-8 ${appLanguage === "es" ? "" : "opacity-70"}`}
        onClick={() => setAppLanguage("es")}
      >
        ES
      </Button>
    </div>
  );
}
