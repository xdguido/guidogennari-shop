import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
// import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

import SEO from '../next-seo.config';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <ThemeProvider defaultTheme="system">
            <DefaultSeo {...SEO} />
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
            {/* <Toaster /> */}
        </ThemeProvider>
    );
}
