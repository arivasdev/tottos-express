import { useForm, Resolver } from 'react-hook-form';
import { FormValues, ValidationError, LoginError } from '@/types/login.type';
import { supabase } from '@/supabaseClient';

export function useLoginForm() {

    const resolver: Resolver<FormValues> = async (values) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
        const errors: ValidationError = {};

        if (!values.email) {
            errors.email = { type: 'required', message: 'El email es requerido.' };
        } else if (!emailRegex.test(values.email)) {
            errors.email = { type: 'invalid', message: 'El email no es válido.' };
        }

        if (!values.password) {
            errors.password = { type: 'required', message: 'La contraseña es requerida.' };
        }

        return {
            values: Object.keys(errors).length === 0 ? values : {},
            errors: errors,
        };
    };

    const { register, handleSubmit, formState: { errors },setError } = useForm<FormValues>({ resolver });

    const onSubmit = handleSubmit(async ({ email, password }) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email, password
            })
            
            if(error?.message === LoginError.INVALID_GRANT){
                setError('email', {
                    type: 'invalid',
                    message: 'El email o la contraseña no son válidos.'
                })
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    });

    return { register, onSubmit, errors };
}

