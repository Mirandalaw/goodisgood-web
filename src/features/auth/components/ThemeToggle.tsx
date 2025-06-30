interface Props {
    theme: 'light' | 'dark';
    setTheme: (value: 'light' | 'dark') => void;
}

export default function ThemeToggle({ theme, setTheme }: Props) {
    return (
        <button
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="테마 전환"
        >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
    );
}
