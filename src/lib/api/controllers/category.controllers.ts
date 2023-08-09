import type { NextApiRequest, NextApiResponse } from 'next';
import categoryServices from '../services/category.services';

const getTree = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await categoryServices.getTree();
    return res.json(data);
};

const categoryControllers = { getTree };
export default categoryControllers;
