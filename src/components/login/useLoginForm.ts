import { useEffect } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { FormValues, ValidationError, LoginError } from '@/types/login.type';
import { supabase } from '@/supabaseClient';
import { setLocalStorage, getLocalStorage } from '@/utils/handleLocalStorage';
import { useUserStore } from '@/store/user.store';
import { getUserById } from '@/services/user.services';

export function useLoginForm() {
    const store = useUserStore();

    useEffect(() => {
        const remember_me = getLocalStorage('remember_me');
        const email = getLocalStorage('email') || '';

        if (remember_me) {
            setValue('email', email);
            setValue('remember_me', remember_me === 'true');
        }
    }, []);


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

    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm<FormValues>({ resolver });

    const onSubmit = handleSubmit(async ({ email, password, remember_me }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email, password
            })

            if (error?.message === LoginError.INVALID_GRANT) {
                setError('email', {
                    type: 'invalid',
                    message: 'El email o la contraseña no son válidos.'
                })
                return;
            }

            setLocalStorage('remember_me', remember_me.toString());
            setLocalStorage('email', remember_me ? email : '');

            if (data?.user?.id) {
                getUserById(data.user.id).then((user) => {
                    store.setUser(user);
                })
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    });

    return { register, onSubmit, errors };
}

