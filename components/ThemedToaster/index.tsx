import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export default function ThemedToaster() {
    const { theme } = useTheme();
    const getTheme = (theme: string) => {
        switch (theme) {
            case 'dark':
                return 'dark';
            default:
                return 'light';
        }
    };
    const toastTheme = getTheme(theme);
    return <Toaster theme={toastTheme} />;
}
