import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorCode, Exception } from '~/lib/api/errorException';

export function errorHandler(err: Exception | Error, _: NextApiRequest, res: NextApiResponse) {
    if (err instanceof Exception) {
        return res.status(err.status).send(err);
    }
    console.error(err);
    const unknownErr = new Exception(ErrorCode.ServerError, { error: err.name });
    return res.status(500).send(unknownErr);
}

export function noMatchHandler(_: NextApiRequest, res: NextApiResponse) {
    const matchErr = new Exception(ErrorCode.MethodNotAllowed);
    return res.status(matchErr.status).send(matchErr);
}
