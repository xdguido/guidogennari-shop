import { DefaultSeoProps } from 'next-seo';

const siteName = 'Guido Gennari | Web developer';

const config: DefaultSeoProps = {
    // title: undefined,
    // titleTemplate: '%s | Guido Gennari',
    defaultTitle: siteName,
    description: 'Guido Gennari personal website. Work and socials.',
    canonical: 'https://guidogennari.vercel.app/',
    additionalMetaTags: [
        { property: 'author', content: 'guido gennari' },
        {
            property: 'keywords',
            content: 'web-developer react app portfolio socials'
        }
    ],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://guidogennari.vercel.app/',
        siteName: siteName,
        images: [
            {
                url: `https://og-image.vercel.app/${encodeURI(
                    siteName
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
                alt: siteName,
                type: 'image/png'
            }
        ]
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image'
    }
};

export default config;
