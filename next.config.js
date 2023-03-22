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
    },
    async redirects() {
        return [
            {
                source: '/products',
                destination: '/products/newest',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
