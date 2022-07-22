import { ApolloClient, createHttpLink, InMemoryCache  } from '@apollo/client'
import { setContext } from 'apollo-link-context'
//import fetch from 'node-fetch'

const HttpLink = createHttpLink({
    uri: 'https://boiling-island-02321.herokuapp.com/'
    // uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {

    // Leer el storage
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat( HttpLink )
});

export default client