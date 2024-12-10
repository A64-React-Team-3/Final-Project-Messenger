import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

import { Themes } from '../common/constants';

interface ThemeContextType {
    theme: Themes;
    setTheme: (theme: Themes) => void;
    availableThemes: Themes[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const AVAILABLE_THEMES: Themes[] = Object.values(Themes);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Themes>(() => {
        return (localStorage.getItem('theme') as Themes) || 'light';
    });

    const setTheme = (newTheme: Themes) => {
        if (AVAILABLE_THEMES.includes(newTheme)) {
            setThemeState(newTheme);
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        } else {
            console.warn(`Theme "${newTheme}" is not a valid theme.`);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme, availableThemes: AVAILABLE_THEMES }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
