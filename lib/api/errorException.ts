type ErrorConfig = {
    status: number;
    clientString: { [key: string]: string };
};

export enum ErrorCode {
    // status 400-499
    Unauthenticated = 'Unauthenticated',
    Forbidden = 'Forbidden',
    Duplicated = 'Duplicated',
    UnverifiedAccount = 'UnverifiedAccount',
    InvalidCredentials = 'InvalidCredentials',
    InvalidInput = 'InvalidInput',
    RequestLimit = 'RequestLimit',
    NotFound = 'NotFound',
    MethodNotAllowed = 'MethodNotAllowed',

    // status 500-599
    UnknownError = 'UnknownError'
}

const errorConfigMap: Record<ErrorCode, ErrorConfig> = {
    [ErrorCode.InvalidCredentials]: {
        status: 400,
        clientString: {
            en: 'Invalid credentials',
            es: 'Credenciales inválidas'
        }
    },
    [ErrorCode.InvalidInput]: {
        status: 400,
        clientString: {
            en: 'Invalid input',
            es: 'Entrada inválida'
        }
    },
    [ErrorCode.Duplicated]: {
        status: 400,
        clientString: {
            en: 'Duplicated content',
            es: 'Contenido duplicado'
        }
    },
    [ErrorCode.Unauthenticated]: {
        status: 401,
        clientString: {
            en: 'Unauthenticated, login required',
            es: 'No autenticado, accesso requerido'
        }
    },
    [ErrorCode.UnverifiedAccount]: {
        status: 401,
        clientString: {
            en: 'Unverified account',
            es: 'Cuenta no verificada'
        }
    },
    [ErrorCode.Forbidden]: {
        status: 403,
        clientString: {
            en: 'Access denied',
            es: 'Accesso no permitido'
        }
    },
    [ErrorCode.NotFound]: {
        status: 404,
        clientString: {
            en: 'Content not found',
            es: 'Contenido no encontrado'
        }
    },
    [ErrorCode.MethodNotAllowed]: {
        status: 405,
        clientString: {
            en: 'Method not allowed',
            es: 'Metodo no permitido'
        }
    },
    [ErrorCode.RequestLimit]: {
        status: 429,
        clientString: {
            en: 'Request limit exceeded, try again later',
            es: 'Límite de solicitudes excedido, intenta mas tarde'
        }
    },
    [ErrorCode.UnknownError]: {
        status: 500,
        clientString: {
            en: 'Something went wrong',
            es: 'Algo salio mal'
        }
    }
};

export class Exception extends Error {
    status: number;
    metaData: string;
    clientString: { [key: string]: string };

    constructor(code: ErrorCode, cause?: string, metaData?: string) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.cause = process.env.NODE_ENV === 'production' ? null : cause;
        this.metaData = metaData;
        const errorConfig = errorConfigMap[code] || errorConfigMap[ErrorCode.UnknownError];
        this.status = errorConfig.status;
        this.clientString = errorConfig.clientString;
    }
}
