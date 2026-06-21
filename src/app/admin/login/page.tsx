"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/apiClient";
import { ShieldCheck } from "lucide-react";

function AdminLoginForm() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Step 1: Login to get tokens
            const loginResp = await apiClient.post("/auth/login", { email, password });
            if (!loginResp?.success || !loginResp?.data) {
                throw new Error(loginResp?.message || "Login failed");
            }

            // Store tokens
            localStorage.setItem("access_token", loginResp.data.access_token);
            localStorage.setItem("refresh_token", loginResp.data.refresh_token);

            // Step 2: Fetch profile with the new token to check role
            const profileResp = await apiClient.get("/user/profile");
            if (!profileResp?.success || !profileResp?.data) {
                throw new Error("Failed to fetch user profile");
            }

            const userData = profileResp.data;
            if (userData.role !== "admin" && userData.role !== "superadmin") {
                // Not an admin — clear tokens and reject
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setError("Unauthorized. Admin access only.");
                setIsLoading(false);
                return;
            }

            // Valid admin — save user and hard redirect
            localStorage.setItem("user", JSON.stringify(userData));
            window.location.href = "/admin";
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-500/20 shadow-[-10px_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[-10px_10px_30px_rgba(16,185,129,0.1)]">
            <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-emerald-500/10 p-4 rounded-full w-fit mb-4">
                    <ShieldCheck size={32} className="text-emerald-500" />
                </div>
                <CardTitle className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Admin Login</CardTitle>
                <p className="text-slate-550 dark:text-slate-400 text-sm mt-2">Secure access for administrators only</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-4">
                    {error && <div className="p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>}

                    <Input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        required
                        disabled={isLoading}
                        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 h-12 focus-visible:ring-emerald-500"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        disabled={isLoading}
                        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 h-12 focus-visible:ring-emerald-500"
                    />
                    <Button disabled={isLoading} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 text-lg transition-all mt-2">
                        {isLoading ? "Authenticating..." : "Access Dashboard"}
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <AdminLoginForm />
            </Suspense>
        </div>
    );
}
