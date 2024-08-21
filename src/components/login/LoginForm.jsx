import React from 'react';
import { useLoginForm } from './useLoginForm';

export function LoginForm() {
    const { onSubmit, register, errors } = useLoginForm();

    return (
        <section className="bg-gray-50 dark:bg-gray-900 flex h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-lg">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 sm:w-full md:p-8 lg:p-10">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicie sesión en su cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6 mt-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                                <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" {...register("email")} />
                                {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("password")} />
                                {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5 mr-3">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" {...register("remember_me")} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300" >Remember me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className='mt-6 w-full text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}