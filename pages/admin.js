import React from 'react'
import LAdmin from '../components/layouts/LAdmin';
import  { useSession, getSession } from "next-auth/react";


export async function getServerSideProps(context) {
    //validar sesión
    const session = await getSession(context);
  
    if(session === null){
      return {
        redirect : {
          destination : '/api/auth/signin',
          permanent : false
        },
      }
    }
  
    return {
      props: {session}
    }
}

export default function Admin() {

    return (
        <LAdmin>
            Aquí
        </LAdmin>
    )
}
