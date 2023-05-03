import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { v2 as cloudinary } from 'cloudinary';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
    async function createImageUpload() {
        const timestamp = new Date().getTime();
        const signature = await cloudinary.utils.api_sign_request(
            {
                timestamp
            },
            process.env.CLOUDINARY_SECRET
        );
        return { timestamp, signature };
    }
    const data = await createImageUpload();
    return res.status(200).json(data);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
