import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LAdmin from '../../components/layouts/LAdmin'
import { useQuery, useMutation, gql } from '@apollo/client'
import Swal from 'sweetalert2'

const GET_PRODUCT_USER = gql`
    query getProductUser {
        getProductUser{
            id
            name
            image
            stock
            price
            created
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

export default function Productos() {

    // Consulta de apollo
    const { data, loading, error } = useQuery(GET_PRODUCT_USER);

    // Mutation para eliminar el producto
    const [deleteProduct] = useMutation(DELETE_PRODUCT);


    if(loading) return "Cargando...";

    const eliminarProducto = id => {
        Swal.fire({
            title: '¿Quieres eliminar este producto?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar',
          }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    // Eliminmar por ID
                    const {data} = await deleteProduct({
                        variables:{
                            id
                        }
                    });
                    console.log(data);

                    // Mostrar alerta después de eliminar
                    Swal.fire(
                        'Eliminado!',
                        'Haz eliminado el producto.',
                        'success'
                    )
                } catch (error) {
                    console.log(error);   
                }
            }
          })
    }

    return (
        <LAdmin>
            <div className="row justify-content-between">
                
                <div className='col-3'>
                    <h1>Productos</h1>
                </div>
                <div className='col-3 text-end'>
                    <Link href='agregar-producto'><button className="btn btn-success">Agregar Producto</button></Link>
                </div>
            </div>

            <div className='row align-items-center mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Creado</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getProductUser.map( product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.image} alt="" height='100'></img></td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                                <td>{product.created}</td>
                                <td>
                                    <button type='button' className='btn btn-danger' onClick={() => eliminarProducto(product.id) }>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </LAdmin>
    )
}
