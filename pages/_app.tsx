import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
// import { SWRConfig } from 'swr';
// import { useRouter } from 'next/router';
import '../styles/globals.css';

import SEO from '../next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme="system">
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <Toaster />
        </ThemeProvider>
    );
}
