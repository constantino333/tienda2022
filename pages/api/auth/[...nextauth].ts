import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import connectDB from './lib/connectDB'
connectDB();
import bcrypt from 'bcrypt'



const options: NextAuthOptions = {
    theme: {
        colorScheme: "light",
    },
    debug: true,
    session: {},
    jwt: {},
    secret: process.env.AUTH_PLATZI_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            
            credentials: {
                email: {  label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // const email = credentials.email;
                // const password = credentials.password;
                // console.log(password);

                // console.log(Users);

                // const user = await Users.findOne({email});
                // console.log(user);

                // if(!user){
                //     console.log('no');
                //     throw new Error('No está registrado');
                // }
                // if(user){
                //     return s({password, user});
                // }

                // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`,{
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-type": "application/json" }
                // })

                // const user = await res.json()

                // if(res.ok && user){
                //     return user
                // }

                // return null
            }
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
        })   

    ]
}

const s = async({password, user})=>{
    if(!user.password){
        throw new Error('Está mal la contraseña');
    }

    const isMatch = await bcrypt.compare(password, user);

    if(!isMatch){
        throw new Error("Mal la contraseña");
        return user;
    }
}

export default NextAuth(options);