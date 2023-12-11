import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "../../../libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const authOptions : AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            id: "Credentials",
            name:  "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"},
            },
            
            async authorize(credentials) {
            
                console.log("credentials", credentials)
              
                if(!credentials?.email || !credentials?.password) {
                    console.log("wrong pass")
                    throw new Error("Invalid credentials");
                }
                
                try {
                 const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }

                });
            
               console.log("user", user)
                if(!user || !user.hashedPassword){
                    console.log("no password")
                    throw new Error("Invalid credentials");
                }

                
                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                
                if(!isValid) {
                    console.log("invalid")
                    throw new Error("Invalid credentials");
                }
                return user;
               
               // console.log("user", user)
            }catch(err){
                console.log("err", err)
                return null;
            }
                
            }
        
        }
        
        )
    ],

    pages:{
       signIn:'/',
    },
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

};

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST};