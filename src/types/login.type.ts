export type FormValues = {
    email : string;
    password: string;
    remember_me: boolean;
}

export type ValidationError = {
    email?: {
        type: string;
        message: string;
    };
    password?: {
        type: string;
        message: string;
    };
};

export enum LoginError {
    INVALID_GRANT = 'Invalid login credentials',
    UNKNOWN = 'unknown',
}