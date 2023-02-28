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
            className="btn-ghost btn-square"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? <FiSun className=" w-5 h-5" /> : <FiMoon className=" w-5 h-5" />}
        </Button>
    );
}
