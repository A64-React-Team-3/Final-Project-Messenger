import { useTheme } from '../../store/ThemeContext';

const ThemeSelector: React.FC = () => {
    const { theme, setTheme, availableThemes } = useTheme();

    return (
        <div className="dropdown">
            {/* Dropdown button */}
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>

            {/* Dropdown menu */}
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
            >
                {availableThemes.map((availableTheme) => (
                    <li key={availableTheme}>
                        <label
                            className={`btn btn-sm btn-block btn-ghost justify-start ${
                                theme === availableTheme ? 'btn-active' : ''
                            }`}
                        >
                            <input
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller hidden"
                                aria-label={availableTheme}
                                value={availableTheme}
                                checked={theme === availableTheme}
                                onChange={() => setTheme(availableTheme)}
                            />
                            {availableTheme.charAt(0).toUpperCase() +
                                availableTheme.slice(1)}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSelector;
