import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider as AuthProvider} from "next-auth/react"

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider session={pageProps.session}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </AuthProvider>
        
    )
}

export default MyApp
