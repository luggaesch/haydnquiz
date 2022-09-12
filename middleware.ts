import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({ req, token }) {
            console.log(req, token);
            // `/admin` requires admin role
            if (req.nextUrl.pathname === "/admin") {
                return token?.userRole === "admin"
            }
            // `/me` only requires the user to be logged in
            return !!token
        },
    },
})

export const config = { matcher: ["/admin", "/@me"] }