import React, { Context, createContext } from "react";

interface AuthContextValue {
    signIn: (username: string, token: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: () => void;   
}

export const AuthContext = createContext<AuthContextValue | null>(null);
