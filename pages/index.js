import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
    return (
        <Layout>
            Desde index
            <Login />
        </Layout>
    )
}

function Login(){
    const { data: session, status } = useSession()

    // fix flash unauthenticated flashback
    if (status === 'loading') {
        return null
    }
    if (session == null) {
        // return <Button onClick={() => signIn()}>{t('signIn')}</Button>
        return <button onClick={() => signIn()}>Login</button>
    }
    return (
        <>
        <span>{session.user?.name}</span><br/>
        {/* <Button onClick={() => signOut()} >  {t('signOut')} </Button> */}
        <button onClick={() => signOut()}>Cerrar</button>
        </>
    )
}