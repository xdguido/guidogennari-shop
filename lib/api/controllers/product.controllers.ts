import type { NextApiRequest, NextApiResponse } from 'next';
import type { Product } from '@prisma/client';
import { productServices } from '../services';
import { SortOption } from '@lib/types';

const getFiltered = async (req: NextApiRequest, res: NextApiResponse) => {
    const { sort, page, category } = req.query as {
        sort?: SortOption;
        page?: string;
        category?: string;
    };
    const skipNumber = Number(page);
    const takeNumber = 12;

    const data = await productServices.getFiltered(skipNumber, takeNumber, sort, category);
    return res.json(data);
};

const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
    const { productSlug } = req.query as {
        productSlug?: string;
    };
    const product: Product = await productServices.getOne(productSlug);
    return res.json(product);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const product: Product = await productServices.create(body);
    return res.status(201).json(product);
};

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const product: Product = await productServices.edit(body);
    return res.json(product);
};

const productControllers = { getFiltered, getOne, create, edit };
export default productControllers;
