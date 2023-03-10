import type { Product } from '@prisma/client';

export const fakeProducts: Product[] = [
    {
        id: 1,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Earthen Bottle',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 500,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'
    },
    {
        id: 2,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Nomad Tumbler',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 355,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'
    },
    {
        id: 3,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Focus Paper Refill',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 123,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'
    },
    {
        id: 4,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Machined Mechanical Pencil',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 122,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg'
    },
    {
        id: 5,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Earthen Bottle',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 903,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'
    },
    {
        id: 6,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Nomad Tumbler',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 67,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'
    },
    {
        id: 7,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Focus Paper Refill',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 78,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'
    },
    {
        id: 8,
        createdAt: new Date('2020-05-12T23:50:21.817Z'),
        internalId: '1',
        name: 'Machined Mechanical Pencil',
        description: 'Product description',
        visibility: true,
        stock: true,
        price: 35,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg'
    }
    // More products...
];
