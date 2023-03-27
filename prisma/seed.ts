import { Category, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghijk', 4);

const createProductsWithCategories = async () => {
    const categories = await createCategoryTree();
    const randomizeCategories = [
        ...categories.furnitureCategories,
        ...categories.outdoorCategories
    ];

    const productsPromises = Array.from({ length: 500 }).map(() => {
        const productName = faker.commerce.product();
        const productSlug = slugify(productName, { remove: /[*+~.()'"!?:@]/g, lower: true });
        const id = nanoid();
        return prisma.product.create({
            data: {
                name: productName,
                slug: `${productSlug}-${id}`,
                price: faker.datatype.float({ min: 10, max: 1500, precision: 0.01 }),
                description: faker.commerce.productDescription(),
                category: {
                    connect: {
                        id: randomizeCategories[
                            Math.floor(Math.random() * randomizeCategories.length)
                        ].id
                    }
                }
            }
        });
    });
    await prisma.$transaction(productsPromises);
};

const createCategoryTree = async () => {
    const globalCategory = await createGlobalCategory();
    // 1st order categories.
    const furnitureCategory = await createSubCategory('Furniture', globalCategory);
    const outdoorCategory = await createSubCategory('Outdoor products', globalCategory);

    //2nd order categories of furnitureCategory.
    const furnitureCategoriesData = [
        'Tables & desks',
        'Wardrobes',
        'Cabinets & cupboards',
        'TV & media furniture',
        'Chairs'
    ];
    const furnitureCategoriesPromises = furnitureCategoriesData.map((category) => {
        const categoryName = category;
        const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
        return prisma.category.create({
            data: {
                name: categoryName,
                slug: categorySlug,
                parent: { connect: { id: furnitureCategory.id } }
            }
        });
    });
    const furnitureCategories = await prisma.$transaction(furnitureCategoriesPromises);

    //2nd order categories of outdoorCategory.
    const outdoorCategoriesData = [
        'Outdoor furniture',
        'Outdoor storage',
        'Outdoor flooring',
        'Outdoor accessories',
        'Outdoor chairs'
    ];
    const outdoorCategoriesPromises = outdoorCategoriesData.map((category) => {
        const categoryName = category;
        const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
        return prisma.category.create({
            data: {
                name: categoryName,
                slug: categorySlug,
                parent: { connect: { id: outdoorCategory.id } }
            }
        });
    });
    const outdoorCategories = await prisma.$transaction(outdoorCategoriesPromises);
    return { furnitureCategories, outdoorCategories };
};

const createGlobalCategory = async () => {
    const categoryName = 'All products';
    const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
    return await prisma.category.create({
        data: { name: categoryName, slug: categorySlug }
    });
};

const createSubCategory = async (name: string, parent: Category) => {
    const categoryName = name;
    const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
    return await prisma.category.create({
        data: {
            name: categoryName,
            slug: categorySlug,
            parent: {
                connect: {
                    id: parent.id
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
