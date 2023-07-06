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
            className="btn-ghost btn-sm normal-case text-base"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? (
                <span className="flex gap-3 items-center">
                    <FiSun className="w-5 h-5" /> Light
                </span>
            ) : (
                <span className="flex gap-3 items-center">
                    <FiMoon className="w-5 h-5" /> Dark
                </span>
            )}
        </Button>
    );
}
