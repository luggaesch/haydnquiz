import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        /* EmailProvider({
             server: process.env.EMAIL_SERVER,
             from: process.env.EMAIL_FROM,
           }),
        */
        /*GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET,
        }),*/
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = user;
            return session
        }
    },
    /*pages: {
        signIn: "/auth/login"
    }*/
}

export default NextAuth(authOptions)
