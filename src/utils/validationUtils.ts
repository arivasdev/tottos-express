type ValidationError = {
    [key: string]: {
        type: string;
        message: string;
    };
};

export const validateRequiredFields = <T>(values: T, requiredFields: (keyof T)[]): { values: T | {}; errors: ValidationError } => {
    const errors: ValidationError = {};

    requiredFields.forEach((key: keyof T) => {
        if (!values[key]) {
            errors[String(key)] = { type: 'required', message: `El campo ${String(key)} es requerido.` };
        }
    });

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors: errors,
    };
};