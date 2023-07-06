import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ErrorCode, Exception } from '../errorException';

/**
 * Validates whether the user associated with the provided request has an 'admin' role.
 * Throws an exception if the user is not authenticated or does not have the 'admin' role.
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @throws {Exception} Throws an exception with the corresponding error code and message if validation fails.
 */
const validateAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        throw new Exception(ErrorCode.Unauthenticated, { message: 'Please login' });
    }
    if (session.user.role !== 'admin') {
        throw new Exception(ErrorCode.Forbidden, { message: 'Not allowed' });
    }
};

const authMiddleware = { validateAdmin };
export default authMiddleware;
