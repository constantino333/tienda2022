import React, {useState} from "react";
import Layout from "../components/Layout"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client'

const NEW_USER = gql`
    mutation NewUser($input: UserInput) {
        newUser(input: $input) {
            name,
            lastname,
            email
        }
    }
`;

export default function Registro() {

    // Mutation para crear nuevos usuarios
    const [newUser] = useMutation(NEW_USER);

    // routing
    const router = useRouter();

    // Validación del formulario
    const formik = useFormik({
        initialValues:{
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            lastname: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().email('Debe ser un email').required('El email es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria'),
        }),
        onSubmit: async valores => {

            const { name, lastname, email, password } = valores;

            try{
                const {data} = await newUser({
                    variables: {
                        input: {
                            name,
                            lastname,
                            email,
                            password
                        }
                    }
                });
                
                // Redirigir al usuario al login después de haberse registrado
                router.push('/login');
            } catch(error) {
                console.log(error);
            }
        }
    });

    return (
        <Layout>
            <Head>
                <title>Registro</title>
            </Head>
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-group mb-4'>
                                <input type='text' name='name' id='name' className='form-control' placeholder='Nombre' value={formik.values.name} onChange={formik.handleChange} />
                                { formik.errors.name ? (
                                    <div className="alert alert-danger" role="alert">{formik.errors.name}</div>
                                ) : null }
                            </div>
                            <div className='form-group mb-4'>
                                <input type='text' name='lastname' id='lastname' className='form-control' placeholder='Apellido' value={formik.values.lastname} onChange={formik.handleChange} />
                                { formik.errors.lastname ? (
                                    <div className="alert alert-danger" role="alert">{formik.errors.lastname}</div>
                                ) : null }
                            </div>
                            <div className='form-group mb-4'>
                                <input type='text' name='email' id='email' className='form-control' placeholder='Email' value={formik.values.email} onChange={formik.handleChange} />
                                { formik.errors.email ? (
                                    <div className="alert alert-danger" role="alert">{formik.errors.email}</div>
                                ) : null }
                            </div>
                            <div className='form-group mb-4'>
                                <input type='password' name='password' id='password' className='form-control' placeholder='Contraseña' value={formik.values.password} onChange={formik.handleChange} />
                                { formik.errors.password ? (
                                    <div className="alert alert-danger" role="alert">{formik.errors.password}</div>
                                ) : null }
                            </div>
                            <input type='submit' className='btn btn-success' value='Registrarse' />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}