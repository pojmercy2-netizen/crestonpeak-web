"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import { UserProfile, Register } from "@/lib/types";

export type User = UserProfile;

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: Register & { confirmPassword?: string }) => Promise<void>;
    logout: () => void;
    updateUser: (fields: Partial<User>) => void;
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    return JSON.parse(storedUser);
                }
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
            }
        }
        return null;
    });
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        try {
            const response = await apiClient.get("/user/profile");
            if (response?.success && response?.data) {
                setUser(response.data as User);
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        } catch (e) {
            console.warn("fetchProfile failed:", e);
            // Clear state on auth failure to force re-login
            setUser(null);
            if (typeof window !== "undefined") {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");
            }
        }
    };

    // Initialize session from stored token on mount
    useEffect(() => {
        const initSession = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (token) {
                    await fetchProfile();
                }
            } finally {
                setIsInitialized(true);
            }
        };

        initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/auth/login", { email, password });

            if (!response?.success || !response?.data) {
                throw new Error(response?.message || "Login failed");
            }

            // Store tokens
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);

            // Fetch actual user profile — errors here are non-fatal
            await fetchProfile();

        } catch (err: any) {
            const errorMsg = err.message || "Login failed";
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (
        userData: Register & { confirmPassword?: string }
    ): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const { confirmPassword, ...registerData } = userData;

            if (confirmPassword && registerData.password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await apiClient.post("/auth/register", registerData);

            if (!response?.success) {
                throw new Error(response?.message || "Registration failed");
            }

            // Auto-login after registration
            await login(userData.email, userData.password);
        } catch (err: any) {
            const errorMsg = err.message || "Registration failed";
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
    };

    const updateUser = (updatedFields: Partial<User>) => {
        if (!user) return;
        const newUser = { ...user, ...updatedFields };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                updateUser,
                isInitialized,
                isLoading,
                error,
                fetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
