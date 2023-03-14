import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const createProductsWithCategories = async () => {
    const categories = await createCategoryTree();

    const productsPromises = Array.from({ length: 100 }).map(() => {
        return prisma.product.create({
            data: {
                name: `Product ${faker.random.numeric(5)}`,
                price: faker.datatype.float({ min: 10, max: 1999, precision: 0.01 }),
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
        return prisma.category.create({
            data: { name: `1st Order Category ${faker.random.numeric(5)}` }
        });
    });
    const firstOrderCategories = await prisma.$transaction(firstOrderCategoriesPromises);

    const secondOrderCategoriesPromises = Array.from({ length: 20 }).map(() => {
        return prisma.category.create({
            data: {
                name: `2nd Order Category ${faker.random.numeric(5)}`,
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
