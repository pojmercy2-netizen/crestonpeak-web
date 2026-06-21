"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/apiClient";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("password") as string;
        const confirmPassword = formData.get("confirm_password") as string;

        if (!token) {
            setError("Missing or invalid password reset token.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const resp = await apiClient.resetPassword({
                token,
                new_password: newPassword,
            });
            if (resp && resp.success) {
                setSuccessMsg(resp.message || "Your password has been successfully reset.");
            } else {
                setError(resp?.message || "Reset failed. The token may have expired.");
            }
        } catch (err: any) {
            setError(err.message || "Reset failed. The token may be invalid or expired.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* ── Left Panel: background image + text overlay ── */}
            <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative flex-shrink-0 flex-col">
                <img
                    src="/auth-bg-light.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-black/60" />

                <div className="relative z-10 flex flex-col h-full p-8">
                    <div className="flex-1 flex flex-col items-center justify-center pb-16 text-center -mt-8">
                        <Link href="/" className="mb-5">
                            <img src="/logo.png" alt="Creston Peak" className="h-36 w-36 object-contain drop-shadow-xl" />
                        </Link>

                        <p className="text-xs font-semibold text-[#3F5933] mb-2 tracking-widest uppercase">Security & Account</p>
                        <h2 className="text-2xl xl:text-3xl font-black text-white keep-color leading-snug mb-3 drop-shadow-lg">
                            Secure Your Space<br />
                            with <span className="text-[#A2B585]">Creston Peak.</span>
                        </h2>
                        <p className="text-white/75 text-sm leading-relaxed max-w-[260px] drop-shadow">
                            Create a strong, unique password to safeguard your investments and keep your funds safe.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right Panel: form ── */}
            <div
                className="flex-1 flex items-center justify-center min-h-screen relative bg-white dark:bg-slate-950"
                style={{
                    backgroundImage: "var(--auth-bg-image)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white/75 dark:bg-transparent pointer-events-none" />

                <div className="relative z-10 w-full max-w-md px-6 sm:px-10 py-10">
                    <div className="flex justify-center mb-6 lg:hidden">
                        <Link href="/">
                            <img src="/logo.png" alt="Creston Peak" className="h-24 w-24 object-contain" />
                        </Link>
                    </div>

                    <h1 className="auth-heading text-3xl sm:text-4xl font-bold mb-1">
                        Reset Password
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                        Please enter your new password below.
                    </p>

                    {!token ? (
                        <div className="space-y-6">
                            <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-xl text-red-600 dark:text-red-400 text-sm leading-relaxed">
                                Invalid, missing, or expired password reset link. Please request a new password reset link.
                            </div>
                            <Link
                                href="/forgot-password"
                                className="block w-full text-center py-3 bg-[#2E5B46] hover:bg-[#2E5B46]/90 text-white font-bold rounded-xl transition-all shadow-md"
                            >
                                Request New Link
                            </Link>
                        </div>
                    ) : successMsg ? (
                        <div className="space-y-6">
                            <div className="p-4 bg-green-500/10 border border-green-500/40 rounded-xl text-green-700 dark:text-green-400 text-sm leading-relaxed text-center font-medium">
                                {successMsg}
                            </div>
                            <Link
                                href="/login"
                                className="block w-full text-center py-3 bg-[#2E5B46] hover:bg-[#2E5B46]/90 text-white font-bold rounded-xl transition-all shadow-md"
                            >
                                Sign In Now
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="auth-form space-y-5">
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                    New Password
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                    className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                    Confirm New Password
                                </label>
                                <Input
                                    type="password"
                                    name="confirm_password"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                    className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                                />
                            </div>

                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="w-full text-white font-bold h-12 text-base transition-all hover:opacity-90 shadow-[0_0_20px_rgba(46,91,70,0.35)]"
                                style={{ background: "linear-gradient(135deg, #24342B 0%, #2E5B46 50%, #3D7A5C 100%)" }}
                            >
                                {isLoading ? "Updating Password…" : "Reset Password"}
                            </Button>

                            <div className="text-center mt-6">
                                <Link
                                    href="/login"
                                    className="font-medium text-sm hover:underline"
                                    style={{ color: "#2E5B46" }}
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>

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
                html:not(.dark) .auth-form input {
                    color: #0f172a !important;
                    caret-color: #0f172a !important;
                    -webkit-text-fill-color: #0f172a !important;
                }
                html:not(.dark) .auth-form input::placeholder {
                    color: #94a3b8 !important;
                    -webkit-text-fill-color: #94a3b8 !important;
                }
                html:not(.dark) .auth-form input:-webkit-autofill,
                html:not(.dark) .auth-form input:-webkit-autofill:focus {
                    -webkit-text-fill-color: #0f172a !important;
                    box-shadow: 0 0 0 1000px #ffffff inset !important;
                }
            `}</style>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#2E5B46] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
