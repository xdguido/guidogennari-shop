import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import toast, { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import '../styles/globals.css';

import SEO from '../next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
    const { locale } = useRouter();
    return (
        <ThemeProvider defaultTheme="system">
            <DefaultSeo {...SEO} />
            <SWRConfig
                value={{
                    errorRetryCount: 0,
                    onError: (error, key) => {
                        // switch (locale) {
                        //     case 'es':
                        //         if (navigator.onLine) {
                        //             return toast.error(error.clientString.es);
                        //         }
                        //         return toast.error('Sin conexion de internet');
                        //     default:
                        //         if (navigator.onLine) {
                        //             return toast.error(error.clientString.en);
                        //         }
                        //         return toast.error('No internet connection');
                        // }
                    }
                }}
            >
                <Component {...pageProps} />
            </SWRConfig>
            <Toaster />
        </ThemeProvider>
    );
}
