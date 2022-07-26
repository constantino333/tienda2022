import conectarDB from "../lib/connectDB";
import Movie from "../../models/Movie"
import User from "../../models/User"

export default async function handler(req, res){
    const {method} = req
    switch(method){
        case 'POST':
            try {
                await conectarDB()

                const platziUser = {
                    name: "Platzi Student",
                    email: "student@platzi.com"
                }

                const resp = await Movie.find({})

                console.log(resp);

                return res.status(200).json({succcess: true, resp})

            } catch (error) {
                console.log(error);
                return res.status(400).json({succcess: false, error});
            }
        default:
            return res.status(500).json({succcess: false, error: 'Falla'});
    }
}