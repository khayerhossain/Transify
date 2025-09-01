"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}
