import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const DynamicToaster = dynamic(() => import('sonner').then((mod) => mod.Toaster), {
    ssr: false
});

export default function ThemedToaster() {
    const { theme } = useTheme();
    const toastTheme = theme === 'dark' ? 'dark' : 'light';

    return <DynamicToaster theme={toastTheme} />;
}
