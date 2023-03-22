/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    // i18n: {
    //     locales: ['en', 'es'],
    //     defaultLocale: 'en',
    //     localeDetection: false
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
                port: '',
                pathname: '/img/**'
            }
        ]
    }
};

module.exports = nextConfig;
