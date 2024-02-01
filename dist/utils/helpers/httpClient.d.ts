import { type RequestError, type ZodSchema } from './errorHelpers';
interface IRequestOptions {
    successMessage?: string;
    errorMessage?: string;
    schema?: ZodSchema;
    field?: string;
    headers?: any;
    transformRequest?: (data: any) => any;
    renameServerValidationErrors?: {
        [key: string]: string;
    };
}
declare const _default: {
    get: <T>(url: string, queryParams?: any, options?: IRequestOptions) => Promise<Result<T_1, RequestError>>;
    post: <T_2>(url: string, body: any, options?: IRequestOptions) => Promise<Result<T_1, RequestError>>;
    patch: <T_3>(url: string, body: any, options?: IRequestOptions) => Promise<Result<T_1, RequestError>>;
    put: <T_4>(url: string, body: any, options?: IRequestOptions) => Promise<Result<T_1, RequestError>>;
    delete: <T_5>(url: string, options?: IRequestOptions) => Promise<Result<T_1, RequestError>>;
};
export default _default;
