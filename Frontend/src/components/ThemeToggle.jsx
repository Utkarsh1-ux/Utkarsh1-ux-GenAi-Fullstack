import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
        >
            <span style={{ 
                display: 'inline-block',
                transform: theme === 'dark' ? 'rotate(-360deg) scale(1)' : 'rotate(0deg) scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}>
                {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span style={{ 
                display: 'inline-block',
                transition: 'opacity 0.3s' 
            }}>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
        </button>
    );
};

export default ThemeToggle;
