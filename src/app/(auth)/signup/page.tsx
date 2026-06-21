"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
    const { register, isLoading, error: authError } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const phone = formData.get("phone") as string;
        if (!phone) {
            setError("Phone number is required");
            return;
        }

        try {
            await register({
                email: formData.get("email") as string,
                username: formData.get("username") as string,
                full_name: formData.get("fullName") as string,
                phone,
                password,
                confirmPassword,
                referral_code: (formData.get("referralCode") as string) || undefined,
            });
            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message || "An error occurred during registration");
        }
    };

    return (
        <>
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
                    className="flex-1 flex items-start justify-center min-h-screen relative bg-white dark:bg-slate-950"
                    style={{
                        backgroundImage: "var(--auth-bg-image)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* White overlay — light mode only */}
                    <div className="absolute inset-0 bg-white/75 dark:bg-transparent pointer-events-none" />

                    <div className="relative z-10 w-full max-w-md px-6 sm:px-10 py-10">
                        {/* Logo — mobile only */}
                        <div className="flex justify-center mb-6 lg:hidden">
                            <Link href="/">
                                <img src="/logo.png" alt="Creston Peak" className="h-24 w-24 object-contain" />
                            </Link>
                        </div>

                        <h1 className="auth-heading text-3xl sm:text-4xl font-bold mb-1">
                            Create account
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                            Join Creston Peak and start trading today.
                        </p>

                        <form onSubmit={handleSubmit} className="auth-form space-y-4">
                            {(error || authError) && (
                                <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                    {error || authError}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        required
                                        disabled={isLoading}
                                        className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                        Username
                                    </label>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="johndoe"
                                        required
                                        disabled={isLoading}
                                        className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                                    />
                                </div>
                            </div>

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
                                    className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-sky-500 disabled:opacity-50 backdrop-blur-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                    Phone Number
                                </label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="+1 217 335 0197"
                                    required
                                    disabled={isLoading}
                                    className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-sky-500 disabled:opacity-50 backdrop-blur-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Min. 8 characters"
                                        required
                                        disabled={isLoading}
                                        className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                        className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-[#2E5B46] disabled:opacity-50 backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                                    Referral Code{" "}
                                    <span className="text-slate-400 dark:text-slate-600 font-normal">(Optional)</span>
                                </label>
                                <Input
                                    type="text"
                                    name="referralCode"
                                    placeholder="Enter referral code"
                                    disabled={isLoading}
                                    className="bg-white/80 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 h-12 focus:border-sky-500 disabled:opacity-50 backdrop-blur-sm"
                                />
                            </div>

                            <div className="flex items-start space-x-3 pt-1">
                                <Checkbox
                                    id="terms"
                                    name="terms"
                                    required
                                    disabled={isLoading}
                                    className="mt-0.5 border-slate-400 dark:border-slate-600 data-[state=checked]:bg-[#2E5B46] data-[state=checked]:border-[#2E5B46]"
                                />
                                <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    I agree to the{" "}
                                    <Link href="#" style={{ color: "#2E5B46" }}>
                                        Terms &amp; Conditions
                                    </Link>
                                </label>
                            </div>

                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="w-full text-white font-bold h-12 text-base transition-all hover:opacity-90 shadow-[0_0_20px_rgba(46,91,70,0.35)] hover:shadow-[0_0_30px_rgba(61,122,92,0.55)]"
                                style={{ background: "linear-gradient(135deg, #24342B 0%, #2E5B46 50%, #3D7A5C 100%)" }}
                            >
                                {isLoading ? "Creating account…" : "Create Account"}
                            </Button>
                        </form>

                        <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-6">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium" style={{ color: "#2E5B46" }}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
