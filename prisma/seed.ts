import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghijk', 4);

const createProductsWithCategories = async () => {
    const categories = await createCategoryTree();

    const productsPromises = Array.from({ length: 100 }).map(() => {
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
                        name: categories[Math.floor(Math.random() * categories.length)].name
                    }
                }
            }
        });
    });
    await prisma.$transaction(productsPromises);
};

const createCategoryTree = async () => {
    const firstOrderCategoriesPromises = Array.from({ length: 5 }).map(() => {
        const categoryName = `1st Order Category ${faker.random.numeric(4)}`;
        const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
        return prisma.category.create({
            data: { name: categoryName, slug: categorySlug }
        });
    });
    const firstOrderCategories = await prisma.$transaction(firstOrderCategoriesPromises);

    const secondOrderCategoriesPromises = Array.from({ length: 20 }).map(() => {
        const categoryName = `2nd Order Category ${faker.random.numeric(4)}`;
        const categorySlug = slugify(categoryName, { remove: /[*+~.()'"!?:@]/g, lower: true });
        return prisma.category.create({
            data: {
                name: categoryName,
                slug: categorySlug,
                parent: {
                    connect: {
                        name: firstOrderCategories[
                            Math.floor(Math.random() * firstOrderCategories.length)
                        ].name
                    }
                }
            }
        });
    });
    const secondOrderCategories = await prisma.$transaction(secondOrderCategoriesPromises);
    return [...firstOrderCategories, ...secondOrderCategories];
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
