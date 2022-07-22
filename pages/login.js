import React, { useState } from "react"
import Layout from "../components/Layout"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'

const AUTENTICAR_USER = gql`
    mutation Mutation($input: AuthenticateInput) {
            authenticateUser(input: $input) {
            token
        }
    }
`;

export default function Login() {
    // routing
    const router = useRouter();

    const [mensaje, guardarMensaje] = useState(null);

    // Mutation para autenticar usuarios
    const [authenticateUser] = useMutation(AUTENTICAR_USER);

    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('El email es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria')
        }),
        onSubmit: async valores => {
            const { email, password } = valores;

            try{
                const {data} = await authenticateUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });
                
                console.log(data);
                guardarMensaje('Autenticando');

                // Guardar el Token en Local Storage
                const {token} = data.authenticateUser;
                localStorage.setItem('token', token);

                // Redireccionar hacia el administrador
                router.push('/admin');

            } catch(error) {
                guardarMensaje(error.message);
                
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    });

    const mostrarMensaje = () => {
        return {mensaje};
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            {mensaje}
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-group mb-4'>
                                <input type='text' name='email' id='email' className='form-control' placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
                                { formik.errors.email ? (
                                    <div className="alert alert-danger" role="alert">{formik.errors.email}</div>
                                ) : null }
                            </div>
                            <div className='form-group mb-4'>
                                <input type='password' name='password' id='password' className='form-control' placeholder='Contraseña' onChange={formik.handleChange} value={formik.values.password} />
                                { formik.errors.password ? (
                                    <div className="alert alert-danger" role="alert">{formik.errors.password}</div>
                                ) : null }
                            </div>
                            <input type='submit' className='btn btn-success' value='Iniciar sesión' />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}