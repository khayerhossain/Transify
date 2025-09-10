import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect, { collectionNamesObj } from "./db.connect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        // Get users collection
        const usersCollection = await dbConnect(
          collectionNamesObj.usersCollection
        );
        const user = await usersCollection.findOne({ email });

        if (!user) return null;

        // For now plain text password match
        if (password !== user.password) return null;

        return {
          id: user._id.toString(),
          name: user.name || user.username || "",
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
