export { default as errors } from './errors';
import { z } from 'zod';
import { Ok, Err } from 'ts-results-es';
import errorCodes from './errorCodes';
export const transformErrors = (zodError) => {
    const customErrors = [];
    zodError.issues.forEach((issue) => {
        const field = issue.path.join('.');
        const message = issue.message;
        if (!customErrors.some((customError) => customError.field === field && customError.message === message)) {
            customErrors.push({ field, message });
        }
    });
    return customErrors;
};
export const validateData = (schema, data) => {
    try {
        const parsedData = schema.parse(data);
        return Ok(parsedData);
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            return Err({ validationErrors: transformErrors(e) });
        }
        return Err({
            validationErrors: []
        });
    }
};
export const convertServerErrorToRequestError = (serverError, renameRules) => {
    return {
        validationErrors: serverError.validation_errors.map((validationError) => {
            const field = renameRules && renameRules[validationError.field]
                ? renameRules[validationError.field]
                : validationError.field;
            return {
                field: field,
                message: errorCodes[validationError.code] || 'Unknown error'
            };
        })
    };
};
export const handleValidationErrors = (validationErrors, dataStatus, renameRules) => {
    const newDataStatus = JSON.parse(JSON.stringify(dataStatus));
    validationErrors.forEach((validationError) => {
        const field = renameRules && renameRules[validationError.field]
            ? renameRules[validationError.field]
            : validationError.field;
        if (newDataStatus[field]) {
            newDataStatus[field].errors = [...newDataStatus[field].errors, validationError.message];
        }
        else {
            newDataStatus[field] = {
                errors: [validationError.message]
            };
        }
    });
    return newDataStatus;
};
export const clearErrors = (statusObj, field) => {
    const result = { ...statusObj };
    for (const key in result) {
        if (field) {
            if (field === key) {
                result[key].errors = [];
            }
        }
        else if (result[key].errors) {
            result[key].errors = [];
        }
    }
    return result;
};
