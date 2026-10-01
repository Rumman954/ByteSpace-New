"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch, type AuthUser } from "@/lib/api";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persist(token: string, user: AuthUser) {
  localStorage.setItem("bytespace_token", token);
  localStorage.setItem("bytespace_user", JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bytespace_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("bytespace_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: AuthUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    persist(data.token, data.user);
    setUser(data.user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: AuthUser }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    persist(data.token, data.user);
    setUser(data.user);
  }, []);

  const demoLogin = useCallback(async () => {
    const data = await apiFetch<{ token: string; user: AuthUser }>("/api/auth/demo", {
      method: "POST",
    });
    persist(data.token, data.user);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bytespace_token");
    localStorage.removeItem("bytespace_user");
    setUser(null);
  }, []);

  const updateUser = useCallback((next: AuthUser) => {
    const token = localStorage.getItem("bytespace_token");
    if (token) persist(token, next);
    setUser(next);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, demoLogin, logout, setUser: updateUser }),
    [user, loading, login, register, demoLogin, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
