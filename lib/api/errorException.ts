type ErrorConfig = {
    status: number;
};

export enum ErrorCode {
    // status 400-499
    BadRequest = 'BadRequest', // 400
    InvalidCredentials = 'InvalidCredentials', // 400
    Unauthenticated = 'Unauthenticated', // 401
    UnverifiedAccount = 'UnverifiedAccount', // 401
    Forbidden = 'Forbidden', // 403
    NotFound = 'NotFound', // 404
    MethodNotAllowed = 'MethodNotAllowed', // 405
    Duplicated = 'Duplicated', // 409
    RequestLimit = 'RequestLimit', // 429

    // status 500-599
    ServerError = 'ServerError' // 500
}

const errorConfigMap: Record<ErrorCode, ErrorConfig> = {
    [ErrorCode.BadRequest]: {
        status: 400
    },
    [ErrorCode.Unauthenticated]: {
        status: 401
    },
    [ErrorCode.InvalidCredentials]: {
        status: 400
    },
    [ErrorCode.UnverifiedAccount]: {
        status: 401
    },
    [ErrorCode.Forbidden]: {
        status: 403
    },
    [ErrorCode.Duplicated]: {
        status: 409
    },
    [ErrorCode.RequestLimit]: {
        status: 429
    },
    [ErrorCode.NotFound]: {
        status: 404
    },
    [ErrorCode.MethodNotAllowed]: {
        status: 405
    },
    [ErrorCode.ServerError]: {
        status: 500
    }
};

export class Exception extends Error {
    status: number;
    metaData?: object;

    /**
     * Creates an instance of the Exception class.
     *
     * @param {ErrorCode} code - The error code for the exception.
     * @param {object | undefined} [metaData] - Optional metadata associated with the exception.
     */
    constructor(code: ErrorCode, metaData?: object) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.metaData = metaData;
        const errorConfig = errorConfigMap[code] || errorConfigMap[ErrorCode.ServerError];
        this.status = errorConfig.status;

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
