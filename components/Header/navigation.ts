export const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '/woman/featured/new-arrivals',
                    imageSrc:
                        'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.'
                },
                {
                    name: 'Basic Tees',
                    href: '/woman/featured/basic-tees',
                    imageSrc:
                        'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt:
                        'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
                }
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '/woman/clothing/tops' },
                        { name: 'Dresses', href: '/woman/clothing/dresses' },
                        { name: 'Pants', href: '/woman/clothing/pants' },
                        { name: 'Denim', href: '/woman/clothing/denim' },
                        { name: 'Sweaters', href: '/woman/clothing/sweaters' },
                        { name: 'T-Shirts', href: '/woman/clothing/t-shirts' },
                        { name: 'Jackets', href: '/woman/clothing/jackets' },
                        { name: 'Activewear', href: '/woman/clothing/activewear' },
                        { name: 'Browse All', href: '/woman/clothing/browse-all' }
                    ]
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '/woman/accessories/watches' },
                        { name: 'Wallets', href: '/woman/accessories/wallets' },
                        { name: 'Bags', href: '/woman/accessories/bags' },
                        { name: 'Sunglasses', href: '/woman/accessories/sunglasses' },
                        { name: 'Hats', href: '/woman/accessories/hats' },
                        { name: 'Belts', href: '/woman/accessories/belts' }
                    ]
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '/woman/brands/full-nelson' },
                        { name: 'My Way', href: '/woman/brands/my-way' },
                        { name: 'Re-Arranged', href: '/woman/brands/re-arranged' },
                        { name: 'Counterfeit', href: '/woman/brands/counterfeit' },
                        { name: 'Significant Other', href: '/woman/brands/significant-other' }
                    ]
                }
            ]
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '/men/featured/new-arrival',
                    imageSrc:
                        'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt:
                        'Drawstring top with elastic loop closure and textured interior padding.'
                },
                {
                    name: 'Artwork Tees',
                    href: '/men/featured/artwork-tees',
                    imageSrc:
                        'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
                }
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '/men/clothing/tops' },
                        { name: 'Dresses', href: '/men/clothing/dresses' },
                        { name: 'Pants', href: '/men/clothing/pants' },
                        { name: 'Denim', href: '/men/clothing/denim' },
                        { name: 'Sweaters', href: '/men/clothing/sweaters' },
                        { name: 'T-Shirts', href: '/men/clothing/t-shirts' },
                        { name: 'Jackets', href: '/men/clothing/jackets' },
                        { name: 'Activewear', href: '/men/clothing/activewear' },
                        { name: 'Browse All', href: '/men/clothing/browse-all' }
                    ]
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '/men/accessories/watches' },
                        { name: 'Wallets', href: '/men/accessories/wallets' },
                        { name: 'Bags', href: '/men/accessories/bags' },
                        { name: 'Sunglasses', href: '/men/accessories/sunglasses' },
                        { name: 'Hats', href: '/men/accessories/hats' },
                        { name: 'Belts', href: '/men/accessories/belts' }
                    ]
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '/men/brands/full-nelson' },
                        { name: 'My Way', href: '/men/brands/my-way' },
                        { name: 'Re-Arranged', href: '/men/brands/re-arranged' },
                        { name: 'Counterfeit', href: '/men/brands/counterfeit' },
                        { name: 'Significant Other', href: '/men/brands/significant-other' }
                    ]
                }
            ]
        }
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' }
    ]
};

export const profileNav = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Settings', href: '/settings' }
];
