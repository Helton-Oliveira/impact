import {useCallback, useState} from "react";

type FieldConfig<T> = {
    initial: T;
    validate?: (value: T) => string | null;
    onError?: (message: string | null) => void;
};

type FieldState<T> = {
    value: T;
    error: string | null;
    setValue: (v: T) => void;
    validate: () => boolean;
    reset: () => void;
};

type FormBuilderReturn<T extends Record<string, FieldConfig<any>>> = {
    form: { [K in keyof T]: FieldState<T[K]["initial"]> };
    validateAll: () => boolean;
    resetAll: () => void;
};

export default function useFormBuilder<T extends Record<string, FieldConfig<any>>>(
    fields: T
): FormBuilderReturn<T> {
    const [values, setValues] = useState<Record<keyof T, any>>(
        Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = fields[key as keyof T].initial;
            return acc;
        }, {} as Record<keyof T, any>)
    );

    const [errors, setErrors] = useState<Record<keyof T, string | null>>(
        Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = null;
            return acc;
        }, {} as Record<keyof T, string | null>)
    );

    const validateField = useCallback(
        (key: keyof T, value: any) => {
            const {validate, onError} = fields[key];
            const error = validate ? validate(value) : null;
            setErrors((prev) => ({...prev, [key]: error}));
            if (onError) onError(error);
            return !error;
        },
        [fields]
    );

    const validateAll = useCallback(() => {
        let isValid = true;
        const newErrors: Record<keyof T, string | null> = {} as any;

        (Object.keys(fields) as (keyof T)[]).forEach((key) => {
            const {validate, onError} = fields[key];
            const value = values[key];
            const error = validate ? validate(value) : null;
            newErrors[key] = error;
            if (onError) onError(error);
            if (error) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    }, [fields, values]);

    const resetAll = useCallback(() => {
        setValues(
            (Object.keys(fields) as (keyof T)[]).reduce((acc, key) => {
                acc[key] = fields[key].initial;
                return acc;
            }, {} as Record<keyof T, any>)
        );

        setErrors(
            (Object.keys(fields) as (keyof T)[]).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {} as Record<keyof T, string | null>)
        );
    }, [fields]);

    const form = (Object.keys(fields) as (keyof T)[]).reduce((acc, key) => {
        acc[key] = {
            value: values[key],
            error: errors[key],
            setValue: (v: any) => {
                setValues((prev) => ({...prev, [key]: v}));
                if (fields[key].validate) validateField(key, v);
            },
            validate: () => validateField(key, values[key]),
            reset: () => {
                setValues((prev) => ({...prev, [key]: fields[key].initial}));
                setErrors((prev) => ({...prev, [key]: null}));
            },
        } as FieldState<any>;

        return acc;
    }, {} as Record<keyof T, FieldState<any>>);

    return {form, validateAll, resetAll};
}
