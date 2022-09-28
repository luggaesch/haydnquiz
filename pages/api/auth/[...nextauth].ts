import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    theme: {
        colorScheme: "dark",
    },
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = user;
            return session
        },
    },
    /*pages: {
        signIn: "/auth/login"
    }*/
}

export default NextAuth(authOptions)
