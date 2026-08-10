import { createContext, useContext } from "react";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

export type AuthContextProps = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: Omit<User, "id" | "createdAt"> & { password: string },
  ) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a PostProviders");
  }

  return context;
};
