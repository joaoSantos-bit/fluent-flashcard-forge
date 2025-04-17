
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppLanguage } from "@/contexts/AppLanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { targetLanguage, setTargetLanguage, availableLanguages } = useLanguage();
  const { t } = useAppLanguage();

  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-2 text-sm font-medium">{t("translator.targetLanguage")}</span>
      <Select
        value={targetLanguage}
        onValueChange={(value) => setTargetLanguage(value as any)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("translator.selectLanguage")} />
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
