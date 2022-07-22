import { useQuery, gql } from '@apollo/client'

const GET_USER = gql`
    query GetUser {
        getUser {
        id
        name
        }
    }
`;

export default function User() {
    const { data, loading, error } = useQuery(GET_USER, {
        update(cache, {data: { data }}){
            const { getUser, name } = cache.readQuery({ query: GET_USER })

            cache.writequery({
                query: GET_USER,
                data:{
                    getUser, name
                }
            })
        }
    });


    if(loading) return null;
    const { id, name } = data.getUser;
    console.log(name);

    return (
        <>
            {id}
        </>
    )
}
