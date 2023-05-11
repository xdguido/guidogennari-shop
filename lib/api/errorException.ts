type ErrorConfig = {
    status: number;
    clientString: { [key: string]: string };
};

export enum ErrorCode {
    // status 400-499
    InvalidInput = 'InvalidInput', // 400
    InvalidFileFormat = 'InvalidFileFormat', // 400
    InvalidCredentials = 'InvalidCredentials', // 401
    Unauthenticated = 'Unauthenticated', // 401
    UnverifiedAccount = 'UnverifiedAccount', // 401
    Forbidden = 'Forbidden', // 403
    NotFound = 'NotFound', // 404
    MethodNotAllowed = 'MethodNotAllowed', // 405
    Duplicated = 'Duplicated', // 409
    RequestLimit = 'RequestLimit', // 429

    // status 500-599
    UnknownError = 'UnknownError', // 500
    ServerError = 'ServerError', // 500
    DatabaseError = 'DatabaseError', // 500
    NetworkError = 'NetworkError' // 500
}

const errorConfigMap: Record<ErrorCode, ErrorConfig> = {
    [ErrorCode.InvalidFileFormat]: {
        status: 400,
        clientString: {
            en: 'Invalid file format',
            es: 'Formato de archivo inválido'
        }
    },
    [ErrorCode.InvalidInput]: {
        status: 400,
        clientString: {
            en: 'Invalid input',
            es: 'Entrada inválida'
        }
    },
    [ErrorCode.Unauthenticated]: {
        status: 401,
        clientString: {
            en: 'User is not authenticated',
            es: 'El usuario no está autenticado'
        }
    },
    [ErrorCode.InvalidCredentials]: {
        status: 401,
        clientString: {
            en: 'Invalid credentials',
            es: 'Credenciales inválidas'
        }
    },
    [ErrorCode.UnverifiedAccount]: {
        status: 401,
        clientString: {
            en: 'User account is not verified',
            es: 'La cuenta de usuario no está verificada'
        }
    },
    [ErrorCode.Forbidden]: {
        status: 403,
        clientString: {
            en: 'User does not have permission to access this resource',
            es: 'El usuario no tiene permiso para acceder a este recurso'
        }
    },
    [ErrorCode.Duplicated]: {
        status: 409,
        clientString: {
            en: 'Duplicated content',
            es: 'Contenido duplicado'
        }
    },
    [ErrorCode.RequestLimit]: {
        status: 429,
        clientString: {
            en: 'Request limit exceeded',
            es: 'Límite de solicitudes excedido'
        }
    },
    [ErrorCode.NotFound]: {
        status: 404,
        clientString: {
            en: 'Resource not found',
            es: 'Recurso no encontrado'
        }
    },
    [ErrorCode.MethodNotAllowed]: {
        status: 405,
        clientString: {
            en: 'Method not allowed',
            es: 'Método no permitido'
        }
    },
    [ErrorCode.UnknownError]: {
        status: 500,
        clientString: {
            en: 'Unknown error occurred',
            es: 'Ocurrió un error desconocido'
        }
    },
    [ErrorCode.ServerError]: {
        status: 500,
        clientString: {
            en: 'Server error occurred',
            es: 'Ocurrió un error en el servidor'
        }
    },
    [ErrorCode.DatabaseError]: {
        status: 500,
        clientString: {
            en: 'Database error occurred',
            es: 'Ocurrió un error en la base de datos'
        }
    },
    [ErrorCode.NetworkError]: {
        status: 500,
        clientString: {
            en: 'Network error occurred',
            es: 'Ocurrió un error de red'
        }
    }
};

export class Exception extends Error {
    status: number;
    clientString: { [key: string]: string };
    metaData?: string;

    constructor(code: ErrorCode, metaData?: string) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.metaData = metaData;
        const errorConfig = errorConfigMap[code] || errorConfigMap[ErrorCode.UnknownError];
        this.status = errorConfig.status;
        this.clientString = errorConfig.clientString;

        if (process.env.NODE_ENV === 'production') {
            // Override the `stack` property with an empty string to hide the call stack in a production environment
            Object.defineProperty(this, 'stack', {
                value: '',
                writable: true,
                configurable: true
            });
        } else {
            // Capture the call stack using `Error.captureStackTrace` to show it in a development environment
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
