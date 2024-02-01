import type { Method, AxiosRequestConfig } from 'axios';
import { setNotificationAction } from '$lib/stores/notify';
import {
	type ServerError,
	type RequestError,
	type ValidationResult,
	type ZodSchema,
	validateData,
	convertServerErrorToRequestError
} from './errorHelpers';
import { handleAsync } from '.';
import { Err, Ok } from 'ts-results-es';
import axiosClient from './axios';

interface IRequestOptions {
	successMessage?: string;
	errorMessage?: string;
	schema?: ZodSchema;
	field?: string;
	headers?: any;
	transformRequest?: (data) => any;
	renameServerValidationErrors?: { [key: string]: string };
}

const request = async <T>(
	method: Method,
	url: string,
	body?: any,
	options?: IRequestOptions
): Promise<ValidationResult<T>> => {
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

	const config: AxiosRequestConfig = {
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
			const serverError: ServerError = error.response.data;
			const requestError: RequestError = convertServerErrorToRequestError(
				serverError,
				options.renameServerValidationErrors
			);
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
	get: <T>(url: string, queryParams?: any, options?: IRequestOptions) => {
		return request<T>('get', url, queryParams, options);
	},
	post: <T>(url: string, body: any, options?: IRequestOptions) => {
		return request<T>('post', url, body, options);
	},
	patch: <T>(url: string, body: any, options?: IRequestOptions) => {
		return request<T>('patch', url, body, options);
	},
	put: <T>(url: string, body: any, options?: IRequestOptions) => {
		return request<T>('put', url, body, options);
	},
	delete: <T>(url: string, options?: IRequestOptions) => {
		return request<T>('delete', url, undefined, options);
	}
};
