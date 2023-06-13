import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import CartProvider from '../lib/store/CartContext';
import ThemedToaster from '@components/ThemedToaster';
import '../styles/globals.css';

import SEO from '../next-seo.config';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <ThemeProvider>
            <DefaultSeo {...SEO} />
            <SessionProvider session={session}>
                <CartProvider>
                    <Component {...pageProps} />
                </CartProvider>
            </SessionProvider>
            <ThemedToaster />
        </ThemeProvider>
    );
}
