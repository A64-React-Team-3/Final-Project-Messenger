import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

export type Theme = 'light' | 'dark' | 'cupcake' | 'synthwave' | 'emerald' | 'corporate' | 'forest';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const AVAILABLE_THEMES: Theme[] = [
    'light',
    'dark',
    'cupcake',
    'synthwave',
    'emerald',
    'corporate',
    'forest',
];

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'light';
    });

    const setTheme = (newTheme: Theme) => {
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
