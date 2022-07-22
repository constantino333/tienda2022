import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LAdmin from '../../components/layouts/LAdmin';
import { useQuery, useMutation, gql } from '@apollo/client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";


const NEW_PRODUCT = gql`
    mutation NewProduct($input: ProductInput) {
        newProduct(input: $input) {
            id
            name
            price
            image
            created
        }
    }
`;

const GET_USER = gql`
    query GetUser {
        getUser {
            id
            name
            lastname
        }
    }
`;

export default function AgregarProducto() {
    // routing
    const router = useRouter();

    const [file, setFile] = useState();
    const [uploadedFile, setUploadedFile] = useState();
    const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

    // Mutation para crear nuevos productos
    const [newProduct] = useMutation(NEW_PRODUCT);

    const { data, loading, error } = useQuery(GET_USER, {
        update(cache, {data: { data }}){
            const { getUser } = cache.readQuery({ query: GET_USER })

            cache.writequery({
                query: GET_USER,
                data:{
                    getUser
                }
            })
        }
    });


    // Validación del formulario
    const formik = useFormik({
        initialValues:{
            name: '',
            stock: '',
            price: '',
            image: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            stock: Yup.number().required('El stock es obligatorio'),
            price: Yup.number().required('El precio es obligatorio')
        }),
        onSubmit: async valores => {
            const { name, stock, price, image } = valores;

            const nameRamdon = makeid(20);
            const typeOfFile = type(file.type);
            image = BUCKET_URL + id + "/" + nameRamdon + "." + typeOfFile;

            try{
                const {data} = await newProduct({
                    variables: {
                        input: {
                            name,
                            stock,
                            price,
                            image
                        }
                    }
                });

                uploadFile(file, nameRamdon, typeOfFile);
            } catch(error) {
                console.log(error);
            }
        }
    });

    if(loading) return null;
    const { id, name } = data.getUser;

    console.log(name);

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    

    const uploadFile = async (file, nameRamdon, typeOfFile) => {
        
        nameRamdon = id+"/"+nameRamdon+"."+typeOfFile+"";

        let { data } = await axios.post("/api/s3/uploadFile", {
            name: nameRamdon,
            type: file.type,
        });

        const url = data.url;
        let { data: newData } = await axios.put(url, file, {
            headers: {
                "Content-type": file.type,
                "Access-Control-Allow-Origin": "*",
            },
        });

        setUploadedFile(BUCKET_URL + file.name);
        setFile(null);

        router.push('productos');
    };

    


    return (
        <LAdmin>
            <div className="row justify-content-between">
                
                <div className='col-12'>
                    <h1>Agregar Producto {id}</h1>
                </div>
            </div>
            <div className='row mt-5'>
                <form onSubmit={formik.handleSubmit}>

                    <div className='form-group'>
                        <input type='file' name='image' id='image' className='form-control' placeholder='Imagen' value='' onChange={(e) => selectFile(e)}/>
                        { formik.errors.image ? (
                            <div className="alert alert-danger" role="alert">{formik.errors.image}</div>
                        ) : null }
                    </div>

                    <div className='form-group'>
                        <input type='text' name='name' id='name' className='form-control' placeholder='Nombre' value={formik.values.name} onChange={formik.handleChange} />
                        { formik.errors.name ? (
                            <div className="alert alert-danger" role="alert">{formik.errors.name}</div>
                        ) : null }
                    </div>
                    <div className='form-group'>
                        <input type='number' name='stock' id='stock' className='form-control' placeholder='Stock' value={formik.values.stock} onChange={formik.handleChange} />
                        { formik.errors.stock ? (
                            <div className="alert alert-danger" role="alert">{formik.errors.stock}</div>
                        ) : null }
                    </div>
                    <div className='form-group'>
                        <input type='number' name='price' id='price' className='form-control' placeholder='Precio' value={formik.values.price} onChange={formik.handleChange} />
                        { formik.errors.price ? (
                            <div className="alert alert-danger" role="alert">{formik.errors.price}</div>
                        ) : null }
                    </div>
                    <input type='submit' className='btn btn-success' value='Agregar' />
                </form>
            </div>
        </LAdmin>
    )
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function type(type){
    if(type == "image/jpeg" || type == "image/jpg"){
        return "jpg";
    }
}

