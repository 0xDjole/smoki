export { default as errors } from './errors';
import { z } from 'zod';
import { type Result } from 'ts-results-es';
export type ServerError = {
    error: string;
    reason: string;
    code: string;
    status_code: number;
    validation_errors: {
        field: string;
        code: string;
    }[];
};
export type ValidationError = {
    field: string;
    message: string;
};
export type RequestError = {
    validationErrors: ValidationError[];
};
export type ValidationResult<T> = Result<T, RequestError>;
export type ZodSchema = z.ZodObject<any>;
export declare const transformErrors: (zodError: z.ZodError) => ValidationError[];
export declare const validateData: <T>(schema: any, data: any) => Result<T_1, RequestError>;
export declare const convertServerErrorToRequestError: (serverError: ServerError, renameRules?: {
    [key: string]: string;
} | undefined) => RequestError;
export declare const handleValidationErrors: (validationErrors: ValidationError[], dataStatus: {
    [field: string]: {
        errors: string[];
    };
}, renameRules?: {
    [field: string]: string;
} | undefined) => {
    [field: string]: {
        errors: string[];
    };
};
export declare const clearErrors: (statusObj: any, field?: string) => any;
