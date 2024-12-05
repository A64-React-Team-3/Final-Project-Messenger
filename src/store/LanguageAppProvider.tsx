import { useState } from "react";
import { Language } from "../common/types/LanguageType";
import { Translations } from "../common/translations";
import { LanguageContext } from "./language.contex";
type LanguageProviderProps = {
  children: React.ReactNode;
};
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}): JSX.Element => {
  const [language, setLanguage] = useState<Language>("EN");

  const translate = (key: Translations): string => {
    const translationKey = `${key}_${language}` as keyof typeof Translations;
    return Translations[translationKey] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
