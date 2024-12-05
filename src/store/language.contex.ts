import React, { createContext, useState, useContext, ReactNode } from "react";
import { Translations } from "../common/translations.ts";
import { Language } from "../common/types/LanguageType.ts";

type LanguageContextProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: Translations) => string;
};

export const LanguageContext = createContext<LanguageContextProps | null>(null);
