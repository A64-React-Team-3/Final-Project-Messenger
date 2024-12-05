import { useContext } from "react";
import { LanguageContext } from "../store/language.contex";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Error: No context provider! - useLanguage hook");
  }
  return context;
};
