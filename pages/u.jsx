import conectarDB from "./lib/connectDB";
import Movie from "../models/Movie";
import mongoose from "mongoose";

export default function U(movies) {
    
    // const pedir = async () => {
    //     try {
    //         const res = await fetch(`${process.env.NEXTAUTH_URL}/../api/order`,{
    //             method: 'POST',
    //             body: JSON.stringify({"name":"John Doe"}),
    //             headers: { "Content-type": "application/json" }
    //         })
            
    //         const data = await res.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // pedir();
    
    
    return (
        <>
            
        </>
    )
}

export async function getServerSideProps() {
    try {
        await conectarDB();

        const res = await Movie.find({});


        const movies = res.map((doc) => {
            const movie = doc.toObject();
            movie._id = `${movie._id}`;
            return movie;
        });

        console.log(res)

        return { props: { movies } };
    } catch (error) {
        console.log(error);
    }
  }