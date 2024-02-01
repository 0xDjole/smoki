import { setNotificationAction } from '../../stores/notify';
import { validateData, convertServerErrorToRequestError } from './errorHelpers';
import { handleAsync } from '.';
import { Err, Ok } from 'ts-results-es';
import axiosClient from './axios';
const request = async (method, url, body, options) => {
    if (options?.schema) {
        let schema = options.schema;
        if (options?.field) {
            schema = schema.pick({ [options.field]: true });
        }
        const clientValidation = validateData(schema, body);
        if (clientValidation.error) {
            return clientValidation;
        }
        if (options.field) {
            return null;
        }
    }
    if (options?.transformRequest) {
        body = options.transformRequest(body);
    }
    const config = {
        method,
        url,
        data: body,
        headers: options?.headers
    };
    const [error, response] = await handleAsync(axiosClient(config));
    if (error) {
        if (options?.errorMessage) {
            setNotificationAction({
                message: options.errorMessage,
                type: 'error'
            });
        }
        if (error.response && error.response.data) {
            const serverError = error.response.data;
            const requestError = convertServerErrorToRequestError(serverError, options.renameServerValidationErrors);
            return Err(requestError);
        }
        return Err({
            validationErrors: [{ field: 'general', message: 'An unknown error occurred' }]
        });
    }
    if (options?.successMessage) {
        setNotificationAction({
            message: options.successMessage,
            type: 'success'
        });
    }
    return Ok(response.data);
};
export default {
    get: (url, queryParams, options) => {
        return request('get', url, queryParams, options);
    },
    post: (url, body, options) => {
        return request('post', url, body, options);
    },
    patch: (url, body, options) => {
        return request('patch', url, body, options);
    },
    put: (url, body, options) => {
        return request('put', url, body, options);
    },
    delete: (url, options) => {
        return request('delete', url, undefined, options);
    }
};
