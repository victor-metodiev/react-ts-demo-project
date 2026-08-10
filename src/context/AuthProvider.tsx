import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./authContext";
import { BASE_URL } from "../constants";
import { authResponseSchema, userSchema } from "../schemas/auth.schema";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      return null;
    }

    try {
      return userSchema.parse(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  const saveAuthData = (userData: User, accessToken: string) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid email or password.");
    }

    const rawData = await response.json();
    const { user, accessToken } = authResponseSchema.parse(rawData);
    saveAuthData(user, accessToken);
  };

  const register = async (userData: Omit<User, "id" | "createdAt">) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      if (errorMessage.includes("Email")) {
        throw new Error("An account with this email already exists.");
      }
      throw new Error("An Error occured while trying to register this user.");
    }

    const rawData = await response.json();
    const { user, accessToken } = authResponseSchema.parse(rawData);
    saveAuthData(user, accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
