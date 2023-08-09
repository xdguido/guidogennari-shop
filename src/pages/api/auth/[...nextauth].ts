import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '~/lib/db';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            profile: async (profile) => {
                const adminEmails = process.env.ADMIN_EMAILS?.split(',');
                const isAdmin = adminEmails?.includes(profile.email);
                return {
                    id: profile.sub,
                    email: profile.email,
                    name: profile.name,
                    image: profile.picture,
                    role: isAdmin ? 'admin' : 'user'
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.role = user.role;
            return session;
        }
    }
};

export default NextAuth(authOptions);
