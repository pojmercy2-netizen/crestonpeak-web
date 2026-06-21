"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
    const { login, isLoading, error: authError } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* ── Left Panel: background image + text overlay ── */}
            <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative flex-shrink-0 flex-col">
                {/* Background image */}
                <img
                    src="/auth-bg-light.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-black/60" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-8">
                    {/* Text — vertically centered, pulled slightly up */}
                    <div className="flex-1 flex flex-col items-center justify-center pb-16 text-center -mt-8">
                        {/* Logo centered above text */}
                        <Link href="/" className="mb-5">
                            <img src="/logo.png" alt="Creston Peak" className="h-36 w-36 object-contain drop-shadow-xl" />
                        </Link>

                        <p className="text-xs font-semibold text-[#3F5933] mb-2 tracking-widest uppercase">Welcome back!</p>
                        <h2 className="text-2xl xl:text-3xl font-black text-white keep-color leading-snug mb-3 drop-shadow-lg">
                            Trade. Invest. Grow<br />
                            with <span className="text-[#A2B585]">Creston Peak.</span>
                        </h2>
                        <p className="text-white/75 text-sm leading-relaxed max-w-[260px] drop-shadow">
                            Access your account to manage your investments in Forex &amp; Crypto markets with confidence.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right Panel: form with light-mode bg image ── */}
            <div
                className="flex-1 flex items-center justify-center min-h-screen relative
                    bg-white dark:bg-slate-950"
                style={{
                    backgroundImage: "var(--auth-bg-image)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* white overlay — light mode only, keeps form legible */}
                <div className="absolute inset-0 bg-white/75 dark:bg-transparent pointer-events-none" />

                <div className="relative z-10 w-full max-w-md px-6 sm:px-10 py-10">
                    {/* Logo — mobile only */}
                    <div className="flex justify-center mb-6 lg:hidden">
                        <Link href="/">
                            <img src="/logo.png" alt="Creston Peak" className="h-24 w-24 object-contain" />
                        </Link>
                    </div>

                    <h1 className="auth-heading text-3xl sm:text-4xl font-bold mb-1">
                        Welcome back
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                        Sign in to your Creston Peak account.
                    </p>

                    <form onSubmit={handleSubmit} className="auth-form space-y-5">
                        {registered && (
                            <div className="p-3 bg-green-500/10 border border-green-500/40 rounded-lg text-green-700 dark:text-green-400 text-sm">
                                Account created! Please log in.
                            </div>
                        )}
                        {(error || authError) && (
                            <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                {error || authError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                Email address
                            </label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                disabled={isLoading}
                                className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold hover:underline"
                                    style={{ color: "#2E5B46" }}
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                            />
                        </div>

                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="w-full text-white font-bold h-12 text-base transition-all hover:opacity-90 shadow-[0_0_20px_rgba(46,91,70,0.35)] hover:shadow-[0_0_30px_rgba(61,122,92,0.55)]"
                            style={{ background: "linear-gradient(135deg, #24342B 0%, #2E5B46 50%, #3D7A5C 100%)" }}
                        >
                            {isLoading ? "Signing in…" : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium" style={{ color: "#2E5B46" }}>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>

            {/* Inject CSS variable for light-mode bg image */}
            <style>{`
                :root {
                    --auth-bg-image: url('/auth-bg-light.png');
                }
                .dark {
                    --auth-bg-image: none;
                }
                .auth-heading {
                    color: #2E5B46 !important;
                }
                /* Force dark text in all auth form inputs in light mode */
                html:not(.dark) .auth-form input {
                    color: #0f172a !important;
                    caret-color: #0f172a !important;
                    -webkit-text-fill-color: #0f172a !important;
                }
                html:not(.dark) .auth-form input::placeholder {
                    color: #94a3b8 !important;
                    -webkit-text-fill-color: #94a3b8 !important;
                }
                /* Also fix browser autofill background */
                html:not(.dark) .auth-form input:-webkit-autofill,
                html:not(.dark) .auth-form input:-webkit-autofill:focus {
                    -webkit-text-fill-color: #0f172a !important;
                    box-shadow: 0 0 0 1000px #ffffff inset !important;
                }
            `}</style>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#2E5B46] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
