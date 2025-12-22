import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect, { collectionNamesObj } from "./db.connect";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
  debug: true, // Enable NextAuth debugging
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          // Get users collection
          const usersCollection = await dbConnect(
            collectionNamesObj.usersCollection
          );
          const user = await usersCollection.findOne({ email });

          if (!user) return null;

          // Compare hashed password
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name || user.username || "",
            email: user.email,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email, image } = user;
          const usersCollection = await dbConnect(collectionNamesObj.usersCollection);
          const existingUser = await usersCollection.findOne({ email });

          if (!existingUser) {
            await usersCollection.insertOne({
              name,
              email,
              image,
              role: "user",
              provider: "google",
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
          return true;
        } catch (error) {
          console.error("Error checking/creating user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - user:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("Session callback - token:", token);
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
      }
      console.log("Session callback - session:", session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
