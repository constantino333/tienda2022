import React from 'react'
import Head from 'next/head'

export default function Layout({children}) {
  return (
    <>
        <Head>
        </Head>

        <h1>Desde Layout</h1>
        {children}
    </>
  )
}
