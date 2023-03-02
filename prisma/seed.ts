import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const products = Array.from({ length: 100 }).map(() => ({
    name: faker.commerce.product(),
    price: faker.datatype.float({ min: 1000, max: 9999, precision: 0.01 })
}));

const prisma = new PrismaClient();
async function main() {
    await prisma.product.createMany({ data: products });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
