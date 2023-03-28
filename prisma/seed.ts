import { Category, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghijk', 4);

const createProductsWithCategories = async () => {
    const {
        furnitureCategories,
        outdoorCategories,
        workCategories,
        kitchenCategories,
        storageCategories
    } = await createCategoryTree();
    const randomizeCategories = [
        ...furnitureCategories,
        ...outdoorCategories,
        ...workCategories,
        ...kitchenCategories,
        ...storageCategories
    ];

    const productsPromises = Array.from({ length: 500 }).map(() => {
        const randomCategory =
            randomizeCategories[Math.floor(Math.random() * randomizeCategories.length)];
        const randomImage = [
            'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg'
        ];
        const productName = `${randomCategory.name} example`;
        const productSlug = slugify(productName, { remove: /[*+~.()'"!?:@]/g, lower: true });
        const id = nanoid();
        return prisma.product.create({
            data: {
                name: productName,
                slug: `${productSlug}-${id}`,
                price: faker.datatype.float({ min: 10, max: 1500, precision: 0.01 }),
                description: faker.commerce.productDescription(),
                imageSrc: randomImage[Math.floor(Math.random() * randomImage.length)],
                category: {
                    connect: {
                        id: randomCategory.id
                    }
                }
            }
        });
    });
    await prisma.$transaction(productsPromises);
};

const createCategoryTree = async () => {
    const globalCategory = await createGlobalCategory();
    const furnitureCategory = await createCategory(globalCategory, 'Furniture');
    const outdoorCategory = await createCategory(globalCategory, 'Outdoor products');
    const storageCategory = await createCategory(globalCategory, 'Storage & organisation');
    const kitchenCategory = await createCategory(globalCategory, 'Kitchen & appliances');
    const workCategory = await createCategory(globalCategory, 'Working from home');

    const [
        storageCategories,
        kitchenCategories,
        workCategories,
        furnitureCategories,
        outdoorCategories
    ] = await Promise.all([
        createCategories(storageCategory, [
            'Storage & organisers',
            'Bookcases & shelving units',
            'Clothes stands & shoe racks',
            'Storage solution systems',
            'Chest of drawers & drawer units',
            'Wall shelves'
        ]),
        createCategories(kitchenCategory, [
            'Kitchen cabinets',
            'Interior organisers',
            'Appliances',
            'Kitchen wall storage',
            'Kitchen islands & trolleys',
            'Kitchen doors & drawer fronts',
            'Kitchenettes'
        ]),
        createCategories(workCategory, [
            'Desks & computer desks',
            'Desk chairs',
            'Paper & media organisers',
            'Room dividers',
            'Desk dividers'
        ]),
        createCategories(furnitureCategory, [
            'Tables & desks',
            'Wardrobes',
            'Cabinets & cupboards',
            'TV & media furniture',
            'Chairs'
        ]),
        createCategories(outdoorCategory, [
            'Outdoor furniture',
            'Outdoor storage',
            'Outdoor flooring',
            'Outdoor accessories',
            'Outdoor chairs'
        ])
    ]);

    return {
        furnitureCategories,
        outdoorCategories,
        workCategories,
        kitchenCategories,
        storageCategories
    };
};

const createGlobalCategory = async () => {
    const categoryName = 'All products';
    const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
    return await prisma.category.create({
        data: { name: categoryName, slug: categorySlug }
    });
};

const createCategories = async (parentCategory: Category, categoryData: string[]) => {
    const categories = [];
    for (const category of categoryData) {
        const createdCategory = await createCategory(parentCategory, category);
        categories.push(createdCategory);
    }
    return categories;
};

const createCategory = async (parentCategory: Category, name: string) => {
    const categoryName = name;
    const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
    return await prisma.category.create({
        data: {
            name: categoryName,
            slug: categorySlug,
            parent: {
                connect: {
                    id: parentCategory.id
                }
            }
        }
    });
};

const prisma = new PrismaClient();
const main = async () => {
    await createProductsWithCategories();
};
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
