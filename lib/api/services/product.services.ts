import type { Product } from '@prisma/client';
import { productProviders } from '../providers';
import { CategoryNode, SortOption } from '@lib/types';
import categoryServices from './category.services';

const getFiltered = async (
    skipNumber: number,
    takeNumber: number,
    sort: SortOption,
    categorySlug: string
) => {
    const categoryNode = await categoryServices.getOne(categorySlug);
    const categoryBranch = await categoryServices.getBranch(categoryNode);
    const count = await productServices.getCount(categoryBranch);
    const products = await productProviders.getFiltered(
        skipNumber,
        takeNumber,
        sort,
        categoryBranch
    );
    return { products, categoryNode, count };
};

const getCount = async (categoryBranch: CategoryNode[]) => {
    return await productProviders.getCount(categoryBranch);
};

const getOne = async (productSlug: string) => {
    return await productProviders.getOne(productSlug);
};

const create = async (productData: Product) => {
    return await productProviders.create(productData);
};

const edit = async (productData: Product) => {
    return await productProviders.edit(productData);
};

const productServices = { getFiltered, getCount, getOne, create, edit };
export default productServices;
