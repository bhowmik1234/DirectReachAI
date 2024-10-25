import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
// import prisma from "@/lib/db";

// Safe access to environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const authOptions: NextAuthOptions = {
    // session: {
    //     strategy: 'jwt',
    // },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    debug: true,

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



    // callbacks: {
    //     async signIn({ account, profile }) {
    //         if (!profile?.email) {
    //             throw new Error("No email found in user profile");
    //         }

    //         // Use Prisma's upsert to create or update the user
    //         await prisma.user.upsert({
    //             where: { email: profile.email },
    //             create: {
    //                 email: profile.email,
    //                 name: profile.name || '', // Fallback to empty string if name is missing
    //             },
    //             update: {
    //                 name: profile.name || '', // Optional: You can decide not to update if name isn't needed
    //             },
    //         });
            
    //         return true;
    //     },
        // async jwt({ token, profile }) {
        //     // Attach the user ID to the token after sign-in
        //     if (profile) {
        //         const user = await prisma.user.findUnique({
        //             where: { email: profile.email },
        //         });

        //         if (user) {
        //             token.id = user.id;
        //         }
        //     }

        //     return token;
        // },
        // async session({ session, token }) {
        //     // Attach user ID to session object
        //     if (token?.id) {
        //         session.user.id = token.id;
        //     }
        //     return session;
        // },
    // },