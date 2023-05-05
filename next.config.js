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
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/products',
                destination: '/products/all-products/newest',
                permanent: true
            },
            {
                source: '/products/:category',
                destination: '/products/:category/newest',
                permanent: true
            },
            {
                source: '/admin/products',
                destination: '/admin/products/all-products/newest/1',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
