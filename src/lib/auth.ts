import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { sendVerificationEmail } from "./email";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  events: {
    async createUser({ user }) {
      // Send verification email for new users (OAuth)
      if (user.email) {
        // Check if user already has verified email (from OAuth providers)
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { emailVerified: true },
        });

        if (!dbUser?.emailVerified) {
          const token = crypto.randomBytes(32).toString("hex");
          const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
          
          await prisma.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires,
              userId: parseInt(user.id),
            },
          });
          
          try {
            await sendVerificationEmail(user.email, token);
          } catch (error) {
            console.error("Failed to send verification email:", error);
          }
        }
      }
    },
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // Check if email is verified for credential users
        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in");
        }

        return {
          id: String(user.id),
          name: user.name ?? undefined,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
        // Get user role from database
        const user = await prisma.user.findUnique({
          where: { id: Number(token.id) },
          select: { role: true }
        });
        (session.user as any).role = user?.role || "user";
      }
      return session;
    },
  },
};

export const authHandler = NextAuth(authOptions);


