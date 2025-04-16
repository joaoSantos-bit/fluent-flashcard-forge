
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function LanguageSelector() {
  const { targetLanguage, setTargetLanguage, availableLanguages } = useLanguage();

  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm font-medium">Target Language:</span>
      <Select
        value={targetLanguage}
        onValueChange={(value) => setTargetLanguage(value as any)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
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
