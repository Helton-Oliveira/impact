import {useCallback, useState} from "react";

type FieldConfig<T> = {
    initial: T;
    validate?: (value: T) => string | null;
    onError?: (message: string | null) => void;
};

type FieldState<T> = {
    value: T;
    error: string | null;
    isValid: boolean;
    isTouched: boolean;
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

    const [touched, setTouched] = useState<Record<keyof T, boolean>>(
        Object.keys(fields).reduce((acc, key) => {
            acc[key as keyof T] = false;
            return acc;
        }, {} as Record<keyof T, boolean>)
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
            const {validate} = fields[key];
            const value = values[key];
            const error = validate ? validate(value) : null;

            newErrors[key] = error;

            if (error) isValid = false;
        });

        setErrors(newErrors);
        setTouched(
            (Object.keys(fields) as (keyof T)[]).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<keyof T, boolean>)
        );

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

        setTouched(
            (Object.keys(fields) as (keyof T)[]).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {} as Record<keyof T, boolean>)
        );
    }, [fields]);

    const form = (Object.keys(fields) as (keyof T)[]).reduce((acc, key) => {
        const currentError = errors[key];
        const currentTouched = touched[key];

        acc[key] = {
            value: values[key],
            error: currentError,
            isValid: currentTouched ? !currentError : false,
            isTouched: currentTouched,

            setValue: (v: any) => {
                setValues((prev) => ({...prev, [key]: v}));

                setTouched((prev) => ({...prev, [key]: true}));

                if (fields[key].validate) validateField(key, v);
            },

            validate: () => {
                setTouched((prev) => ({...prev, [key]: true}));
                return validateField(key, values[key]);
            },

            reset: () => {
                setValues((prev) => ({...prev, [key]: fields[key].initial}));
                setErrors((prev) => ({...prev, [key]: null}));
                setTouched((prev) => ({...prev, [key]: false}));
            },
        } as FieldState<any>;

        return acc;
    }, {} as Record<keyof T, FieldState<any>>);

    return {form, validateAll, resetAll};
}
