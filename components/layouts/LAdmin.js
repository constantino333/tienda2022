import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Admin({children}) {
  return (
    <>

        <Head>
            <title>Administrador</title>
        </Head>

        <div className="contenedor">
            <div className='sidebar'>
                <Link href="/admin/productos">
                    <a>
                    <div className="menu-sidebar-element">
                        <b>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                            </svg>
                        </b>
                        <span>Productos</span>
                    </div>
                    </a>
                </Link>
            </div>
            <div className='derecho'>
                {children}
            </div>
        </div>
    </>
  )
}
