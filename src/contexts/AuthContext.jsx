"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user && parsed?.token) {
          setUser(parsed.user);
          setToken(parsed.token);
        }
      }
    } catch (err) {
      console.error("Failed to restore auth from storage", err);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Keep user in sync with NextAuth session (role comes from backend)
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const mappedUser = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role || "user",
      };
      setUser((prev) => prev || mappedUser);
    }
  }, [session, status]);

  const persist = useCallback((nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    try {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: nextUser,
          token: nextToken,
        })
      );
    } catch (err) {
      console.error("Failed to persist auth", err);
    }
  }, []);

  const clear = useCallback(() => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("auth");
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error || "Invalid credentials");
      }

      // Fetch session to get user + role from backend
      const res = await fetch("/api/auth/session");
      const json = await res.json();

      if (!json?.user) {
        throw new Error("Failed to load user session");
      }

      const mappedUser = {
        id: json.user.id,
        name: json.user.name,
        email: json.user.email,
        role: json.user.role || "user",
      };

      // Generate a simple token string (in a real app this would be a JWT from backend)
      const generatedToken = `session-${Date.now()}`;

      persist(mappedUser, generatedToken);

      return { user: mappedUser, token: generatedToken };
    } finally {
      setLoading(false);
    }
  }, [persist]);

  const logout = useCallback(async () => {
    clear();
    await signOut({ callbackUrl: "/" });
  }, [clear]);

  const value = {
    user,
    token,
    loading,
    initialized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}





