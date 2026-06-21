"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, TrendingUp, Clock, Zap, AlertCircle, Loader2, X } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { InvestmentPlanRead, InvestmentRead } from "@/lib/types";

export default function PlansPage() {
    const { user } = useAuth();
    const [plans, setPlans] = useState<InvestmentPlanRead[]>([]);
    const [investments, setInvestments] = useState<InvestmentRead[]>([]);
    const [wallet, setWallet] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const availableBalance = wallet ? Number(wallet.total_deposited) + Number(wallet.total_earned) - Number(wallet.total_withdrawn) : 0;

    // Investment dialog state
    const [selectedPlan, setSelectedPlan] = useState<InvestmentPlanRead | null>(null);
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [plansResp, investmentsResp, walletResp] = await Promise.all([
                    apiClient.getInvestmentPlans(),
                    apiClient.listInvestments(),
                    apiClient.getWallet(),
                ]);
                setPlans(plansResp?.data || []);
                setInvestments(investmentsResp?.data || []);
                setWallet(walletResp?.data);
            } catch (err: any) {
                setError(err.message || "Failed to load plans");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const openDialog = (plan: InvestmentPlanRead) => {
        setSelectedPlan(plan);
        setAmount(String(Number(plan.min_amount)));
        setAmountError("");
        setSuccessMessage("");
    };

    const closeDialog = () => {
        setSelectedPlan(null);
        setAmount("");
        setAmountError("");
    };

    const validateAmount = (val: string, plan: InvestmentPlanRead): string => {
        const num = parseFloat(val);
        const min = Number(plan.min_amount);
        const max = plan.max_amount ? Number(plan.max_amount) : Infinity;
        const balance = availableBalance;

        if (!val || isNaN(num) || num <= 0) return "Please enter a valid amount.";
        if (num < min) return `Minimum investment is $${min.toLocaleString()}.`;
        if (num > max) return `Maximum investment is $${max.toLocaleString()}.`;
        if (num > balance) return `Insufficient balance. Your available balance is $${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}.`;
        return "";
    };

    const handleAmountChange = (val: string) => {
        setAmount(val);
        if (selectedPlan) {
            setAmountError(validateAmount(val, selectedPlan));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) return;

        const err = validateAmount(amount, selectedPlan);
        if (err) { setAmountError(err); return; }

        setIsSubmitting(true);
        setAmountError("");

        try {
            await apiClient.createInvestment({
                plan_id: selectedPlan.id,
                amount: parseFloat(amount),
                currency_used: "USD",
            });

            // Refresh data
            const [investmentsResp, walletResp] = await Promise.all([
                apiClient.listInvestments(),
                apiClient.getWallet(),
            ]);
            setInvestments(investmentsResp?.data || []);
            setWallet(walletResp?.data);

            setSuccessMessage(`Successfully invested $${parseFloat(amount).toLocaleString()} in ${selectedPlan.name}!`);
            setTimeout(closeDialog, 2000);
        } catch (err: any) {
            setAmountError(err.message || "Failed to create investment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const activeInvestments = investments.filter((i) => i.status === "active");

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-16 flex flex-col items-center gap-4 text-slate-400">
                <Loader2 className="animate-spin" size={32} />
                Loading investment plans...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Investment Plans</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Choose a plan that fits your financial goals and start earning passive daily income.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle size={18} /> {error}
                </div>
            )}

            {wallet && (
                <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
                    Available balance:{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                        ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                </div>
            )}

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {plans.map((plan, idx) => {
                    const isPopular = idx === 1 || plan.features?.some((f: string) => f.toLowerCase().includes("popular"));
                    const IconComponent = idx === 0 ? Clock : idx === 1 ? Zap : TrendingUp;
                    const hasActivePlan = activeInvestments.some((i) => i.plan_id === plan.id);

                    return (
                        <Card
                            key={plan.id}
                            className={`bg-white dark:bg-[#0f172a] border ${
                                isPopular
                                    ? "border-sky-500 shadow-[0_4px_30px_rgba(14,165,233,0.15)] scale-105 z-10"
                                    : "border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl"
                            } rounded-2xl relative overflow-hidden flex flex-col`}
                        >
                            {isPopular && (
                                <div className="absolute top-0 right-0 bg-sky-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    Most Popular
                                </div>
                            )}
                            <CardHeader className="text-center pb-2">
                                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isPopular ? "bg-sky-50 dark:bg-sky-500/10 text-sky-500 dark:text-sky-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                                    <IconComponent size={24} />
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</CardTitle>
                                <div className="mt-4 flex justify-center items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{Number(plan.roi_percent)}%</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">ROI</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3 mt-6 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0" size={18} />
                                        <span>Duration: <strong className="text-slate-900 dark:text-white">{plan.duration_days} Days</strong></span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0" size={18} />
                                        <span>Min: <strong className="text-slate-900 dark:text-white">${Number(plan.min_amount).toLocaleString()}</strong></span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0" size={18} />
                                        <span>Max: <strong className="text-slate-900 dark:text-white">{plan.max_amount ? `$${Number(plan.max_amount).toLocaleString()}` : "Unlimited"}</strong></span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0" size={18} />
                                        <span>{plan.roi_cycle.charAt(0).toUpperCase() + plan.roi_cycle.slice(1)} Payouts</span>
                                    </li>
                                    {plan.features?.slice(0, 2).map((feature: string, fi: number) => (
                                        <li key={fi} className="flex items-center gap-3">
                                            <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0" size={18} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => openDialog(plan)}
                                    disabled={hasActivePlan}
                                    className={`w-full h-12 font-bold text-base transition-colors ${
                                        hasActivePlan
                                            ? "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-600/50 dark:text-emerald-300 cursor-default"
                                            : isPopular
                                            ? "bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950"
                                            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white"
                                    }`}
                                >
                                    {hasActivePlan ? "✓ Already Active" : "Invest Now"}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* Active Investments */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Your Active Investments</h2>
                {activeInvestments.length === 0 ? (
                    <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl">
                        <CardContent className="p-10 text-center text-slate-500 dark:text-slate-400">
                            <Zap size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                            <p>You don&apos;t have any active investments yet. Choose a plan above to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeInvestments.map((investment) => {
                            const plan = plans.find((p) => p.id === investment.plan_id);
                            const cycleProgress = investment.cycles_total > 0
                                ? Math.min((investment.cycles_completed / investment.cycles_total) * 100, 100)
                                : 0;

                            return (
                                <Card key={investment.id} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                <Zap size={20} className="text-emerald-500 dark:text-emerald-400" />
                                                {plan?.name || "Investment"}
                                            </CardTitle>
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm">Active</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-slate-500 dark:text-slate-400">Progress</span>
                                                    <span className="text-slate-900 dark:text-white font-bold">{cycleProgress.toFixed(0)}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                                                    <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${cycleProgress}%` }} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div>
                                                    <p className="text-slate-500 dark:text-slate-400">Amount Invested</p>
                                                    <p className="text-slate-900 dark:text-white font-bold">${Number(investment.amount).toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 dark:text-slate-400">Total Profit</p>
                                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">${Number(investment.total_return_paid).toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 dark:text-slate-400">Cycles</p>
                                                    <p className="text-slate-900 dark:text-white font-bold">{investment.cycles_completed} / {investment.cycles_total}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 dark:text-slate-400">Next Payout</p>
                                                    <p className="text-sky-600 dark:text-sky-400 font-bold">{investment.next_roi_date ? new Date(investment.next_roi_date).toLocaleDateString() : "—"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Investment Amount Dialog */}
            {selectedPlan && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedPlan.name}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{Number(selectedPlan.roi_percent)}% ROI · {selectedPlan.duration_days} days</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={closeDialog} disabled={isSubmitting}>
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Balance display */}
                            <div className="bg-slate-50 dark:bg-[#020617] rounded-xl p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-550 dark:text-slate-400">Available Balance</span>
                                    <span className="text-slate-900 dark:text-white font-bold">${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-550 dark:text-slate-400">Min Investment</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">${Number(selectedPlan.min_amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-550 dark:text-slate-400">Max Investment</span>
                                    <span className="text-sky-600 dark:text-sky-400 font-semibold">
                                        {selectedPlan.max_amount ? `$${Number(selectedPlan.max_amount).toLocaleString()}` : "Unlimited"}
                                    </span>
                                </div>
                            </div>

                            {/* Amount input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Investment Amount (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min={Number(selectedPlan.min_amount)}
                                        max={selectedPlan.max_amount ? Number(selectedPlan.max_amount) : undefined}
                                        required
                                        placeholder={String(Number(selectedPlan.min_amount))}
                                        value={amount}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        className="pl-9 h-12 text-lg bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-sky-500"
                                        disabled={isSubmitting}
                                        autoFocus
                                    />
                                </div>

                                {amountError && (
                                    <p className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1.5 mt-1">
                                        <AlertCircle size={13} /> {amountError}
                                    </p>
                                )}

                                {successMessage && (
                                    <p className="text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5 mt-1">
                                        <CheckCircle2 size={14} /> {successMessage}
                                    </p>
                                )}
                            </div>

                            {/* Quick fill buttons */}
                            <div className="flex gap-2">
                                {[selectedPlan.min_amount, ...(selectedPlan.max_amount ? [selectedPlan.max_amount] : [])].map((val) => (
                                    <button
                                        key={String(val)}
                                        type="button"
                                        onClick={() => handleAmountChange(String(Number(val)))}
                                        className="flex-1 text-xs py-1.5 rounded-lg border border-slate-250 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-sky-500 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                                    >
                                        ${Number(val).toLocaleString()} {Number(val) === Number(selectedPlan.min_amount) ? "(Min)" : "(Max)"}
                                    </button>
                                ))}
                                {wallet && availableBalance >= Number(selectedPlan.min_amount) && (
                                    <button
                                        type="button"
                                        onClick={() => handleAmountChange(String(Math.min(availableBalance, selectedPlan.max_amount ? Number(selectedPlan.max_amount) : availableBalance)))}
                                        className="flex-1 text-xs py-1.5 rounded-lg border border-slate-250 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        Max Available
                                    </button>
                                )}
                            </div>

                            {/* Estimated return */}
                            {amount && !amountError && parseFloat(amount) > 0 && (
                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-2">Estimated Return</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-300">Total ROI ({Number(selectedPlan.roi_percent)}%)</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                            +${(parseFloat(amount) * Number(selectedPlan.roi_percent) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-slate-600 dark:text-slate-300">After {selectedPlan.duration_days} Days</span>
                                        <span className="text-slate-900 dark:text-white font-bold">
                                            ${(parseFloat(amount) + parseFloat(amount) * Number(selectedPlan.roi_percent) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <Button type="button" variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white h-11" onClick={closeDialog} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold h-11"
                                    disabled={isSubmitting || !!amountError || !amount}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                                    {isSubmitting ? "Processing..." : "Confirm Investment"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
