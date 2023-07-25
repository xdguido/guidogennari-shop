import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Button from './Button';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <Button
            className="btn-outline btn-sm bg-base-contrast text-base normal-case"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? (
                <span className="flex items-center gap-3">
                    <FiSun className="h-5 w-5" /> Light
                </span>
            ) : (
                <span className="flex items-center gap-3">
                    <FiMoon className="h-5 w-5" /> Dark
                </span>
            )}
        </Button>
    );
}
