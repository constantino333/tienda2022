import conectarDB from "../lib/connectDB";
import User from "../models/Users"

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

                const dato = {
                    email:'montana.rca@hotmail.com'
                }

                const platziUser2 = await User.findOne({email:'montana.rca@hotmail.com'})

                return res.status(200).json({succcess: true})

            } catch (error) {
                console.log(error);
                return res.status(400).json({succcess: false, error});
            }
        default:
            return res.status(500).json({succcess: false, error: 'Falla'});
    }
}