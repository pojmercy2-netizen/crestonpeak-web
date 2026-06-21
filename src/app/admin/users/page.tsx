"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Loader2, AlertCircle, Eye, ShieldBan, ShieldCheck, X, Send, DollarSign, Edit2, Mail, Wallet, CreditCard, Trash2, TrendingUp } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";

type AdminUser = {
    id: string;
    email: string;
    role: string;
    is_banned: boolean;
    is_active: boolean;
    kyc_status?: string;
    created_at?: string;
    referral_code?: string;
    phone?: string;
};

type WalletData = {
    balance: number;
    invested_balance: number;
    total_deposited: number;
    total_withdrawn: number;
    total_earned: number;
};

const ROLE_STYLES: Record<string, string> = {
    superadmin: "bg-red-500/10 text-red-400 border-red-500/20",
    admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    user: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const KYC_STYLES: Record<string, string> = {
    verified: "bg-emerald-500/10 text-emerald-400",
    pending: "bg-amber-500/10  text-amber-400",
    rejected: "bg-rose-500/10   text-rose-400",
    none: "bg-slate-700/50  text-slate-500",
};

type ModalType = "deposit" | "deduct" | "profit" | "deductProfit" | "addProfit" | "addresses" | "email" | null;

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Detail modal
    const [detailUser, setDetailUser] = useState<AdminUser | null>(null);
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [walletLoading, setWalletLoading] = useState(false);
    const [cards, setCards] = useState<any[]>([]);
    const [cardsLoading, setCardsLoading] = useState(false);
    // Action modals
    const [modalType, setModalType] = useState<ModalType>(null);
    const [depositAmount, setDepositAmount] = useState("");
    const [deductAmount, setDeductAmount] = useState("");
    const [profitAmount, setProfitAmount] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [modalLoading, setModalLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const resp = await apiClient.listUsers();
            setUsers(resp?.data || []);
        } catch (err: any) {
            setError(err.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const openDetail = async (user: AdminUser) => {
        setDetailUser(user);
        setWallet(null);
        setWalletLoading(true);
        setCards([]);
        setCardsLoading(true);
        setModalType(null);

        // Fetch Wallet
        try {
            const resp = await apiClient.getUserWallet(user.id);
            setWallet(resp?.data ?? null);
        } catch {
            setWallet(null);
        } finally {
            setWalletLoading(false);
        }

        // Fetch Cards
        try {
            const cardsResp = await apiClient.getAdminUserCards(user.id);
            setCards(cardsResp?.data || []);
        } catch {
            setCards([]);
        } finally {
            setCardsLoading(false);
        }
    };

    const handleBanToggle = async (user: AdminUser) => {
        const action = user.is_banned ? "unban" : "ban";
        if (!confirm(`Are you sure you want to ${action} ${user.email}?`)) return;
        setActionLoading(user.id);
        try {
            if (user.is_banned) {
                await apiClient.unbanUser(user.id);
            } else {
                await apiClient.banUser(user.id);
            }
            await fetchUsers();
            // Refresh detail if open
            if (detailUser?.id === user.id) {
                setDetailUser(u => u ? { ...u, is_banned: !u.is_banned } : u);
            }
        } catch (err: any) {
            setError(err.message || `Failed to ${action} user`);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeleteUser = async (user: AdminUser) => {
        if (!confirm(`WARNING: Are you sure you want to PERMANENTLY delete ${user.email}? This action cannot be undone and will remove all their associated data.`)) return;
        setActionLoading(user.id);
        try {
            await apiClient.deleteUser(user.id);
            toast.success("User deleted successfully.");
            await fetchUsers();
            if (detailUser?.id === user.id) {
                setDetailUser(null);
            }
        } catch (err: any) {
            setError(err.message || "Failed to delete user");
        } finally {
            setActionLoading(null);
        }
    };

    // Action handlers
    const handleAddDeposit = async () => {
        if (!depositAmount || parseFloat(depositAmount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (!detailUser) return;

        setModalLoading(true);
        try {
            await apiClient.addDepositToUser(detailUser.id, parseFloat(depositAmount));
            setError("");
            setDepositAmount("");
            setModalType(null);
            // Refresh wallet
            const resp = await apiClient.getUserWallet(detailUser.id);
            setWallet(resp?.data ?? null);
        } catch (err: any) {
            setError(err.message || "Failed to add deposit");
        } finally {
            setModalLoading(false);
        }
    };

    const handleDeductFunds = async () => {
        if (!deductAmount || parseFloat(deductAmount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (!detailUser) return;

        setModalLoading(true);
        try {
            await apiClient.deductFundsFromUser(detailUser.id, parseFloat(deductAmount));
            setError("");
            setDeductAmount("");
            setModalType(null);
            // Refresh wallet
            const resp = await apiClient.getUserWallet(detailUser.id);
            setWallet(resp?.data ?? null);
        } catch (err: any) {
            setError(err.message || "Failed to deduct funds");
        } finally {
            setModalLoading(false);
        }
    };

    const handleEditProfit = async () => {
        if (!profitAmount || parseFloat(profitAmount) < 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (!detailUser) return;

        setModalLoading(true);
        try {
            await apiClient.editUserProfit(detailUser.id, parseFloat(profitAmount));
            setError("");
            setProfitAmount("");
            setModalType(null);
            // Refresh wallet
            const resp = await apiClient.getUserWallet(detailUser.id);
            setWallet(resp?.data ?? null);
        } catch (err: any) {
            setError(err.message || "Failed to update profit");
        } finally {
            setModalLoading(false);
        }
    };

    const handleSendEmail = async () => {
        if (!emailSubject || !emailBody) {
            setError("Please enter subject and body");
            return;
        }
        if (!detailUser) return;

        setModalLoading(true);
        try {
            await apiClient.sendEmailToUser(detailUser.id, emailSubject, emailBody);
            setError("");
            setEmailSubject("");
            setEmailBody("");
            setModalType(null);
            toast.success("Email sent successfully!");
        } catch (err: any) {
            setError(err.message || "Failed to send email");
        } finally {
            setModalLoading(false);
        }
    };

    const handleDeductProfit = async () => {
        if (!profitAmount || parseFloat(profitAmount) <= 0) {
            setError("Please enter a valid amount to deduct");
            return;
        }
        if (!detailUser) return;

        setModalLoading(true);
        try {
            await apiClient.deductUserProfit(detailUser.id, parseFloat(profitAmount));
            setError("");
            setProfitAmount("");
            setModalType(null);
            const resp = await apiClient.getUserWallet(detailUser.id);
            setWallet(resp?.data ?? null);
        } catch (err: any) {
            setError(err.message || "Failed to deduct profit");
        } finally {
            setModalLoading(false);
        }
    };

    const handleAddProfit = async () => {
        if (!profitAmount || parseFloat(profitAmount) <= 0) {
            setError("Please enter a valid amount to add");
            return;
        }
        if (!detailUser) return;

        setModalLoading(true);
        try {
            await apiClient.addProfitToUser(detailUser.id, parseFloat(profitAmount));
            setError("");
            setProfitAmount("");
            setModalType(null);
            const resp = await apiClient.getUserWallet(detailUser.id);
            setWallet(resp?.data ?? null);
        } catch (err: any) {
            setError(err.message || "Failed to add profit");
        } finally {
            setModalLoading(false);
        }
    };

    const filtered = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">User Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">View, manage, and take action on platform users.</p>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm">{users.length} total users</div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle size={18} /> {error}
                    <button className="ml-auto" onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-4 sm:px-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <Input
                            placeholder="Search by email, ID, or role..."
                            className="pl-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-16 text-slate-500 dark:text-slate-400 gap-3">
                            <Loader2 className="animate-spin" size={20} /> Loading users...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">User</th>
                                        <th className="px-6 py-4 font-semibold">Phone</th>
                                        <th className="px-6 py-4 font-semibold">Role</th>
                                        <th className="px-6 py-4 font-semibold">KYC</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Joined</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                    {filtered.length > 0 ? filtered.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 dark:text-sky-400 font-bold border border-sky-500/20 text-sm shrink-0">
                                                        {user.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white font-semibold truncate max-w-[180px]">{user.email}</p>
                                                        <p className="text-xs text-slate-500 font-mono">{user.id.slice(0, 10)}…</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                                                {user.phone || "—"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${ROLE_STYLES[user.role] ?? ROLE_STYLES.user}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 text-xs rounded ${KYC_STYLES[user.kyc_status ?? "none"] ?? KYC_STYLES.none}`}>
                                                    {user.kyc_status ?? "none"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${user.is_banned ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                                                    {user.is_banned ? "Banned" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => openDetail(user)} title="View details">
                                                        <Eye size={15} />
                                                    </Button>
                                                    {user.role !== "superadmin" && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className={user.is_banned ? "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10" : "text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"}
                                                            onClick={() => handleBanToggle(user)}
                                                            disabled={actionLoading === user.id}
                                                            title={user.is_banned ? "Unban user" : "Ban user"}
                                                        >
                                                            {actionLoading === user.id && user.is_banned === false
                                                                ? <Loader2 className="animate-spin" size={15} />
                                                                : user.is_banned
                                                                    ? <ShieldCheck size={15} />
                                                                    : <ShieldBan size={15} />}
                                                        </Button>
                                                    )}
                                                    {user.role !== "superadmin" && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                                            onClick={() => handleDeleteUser(user)}
                                                            disabled={actionLoading === user.id}
                                                            title="Delete user"
                                                        >
                                                            {actionLoading === user.id ? <Loader2 className="animate-spin" size={15} /> : <Trash2 size={15} />}
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No users found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ── User Detail Modal ──────────────────────────────────── */}
            {detailUser && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-550 dark:text-sky-400 font-bold text-lg border border-sky-500/20 flex-shrink-0">
                                    {detailUser.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">{detailUser.email}</h2>
                                    <p className="text-xs text-slate-500 font-mono">{detailUser.id}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-650 dark:hover:text-white flex-shrink-0 ml-4" onClick={() => { setDetailUser(null); setModalType(null); }}><X size={20} /></Button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[calc(90vh-100px)] overflow-y-auto">
                            {/* Account Info */}
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Account Info</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    {[
                                        ["Role", detailUser.role],
                                        ["Phone", detailUser.phone || "—"],
                                        ["Status", detailUser.is_banned ? "Banned" : "Active"],
                                        ["KYC", detailUser.kyc_status ?? "none"],
                                        ["Referral Code", detailUser.referral_code ?? "—"],
                                        ["Joined", detailUser.created_at ? new Date(detailUser.created_at).toLocaleDateString() : "—"],
                                    ].map(([label, value]) => (
                                        <div key={label} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3">
                                            <p className="text-slate-500 text-xs">{label}</p>
                                            <p className="text-slate-900 dark:text-white font-semibold mt-0.5">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Wallet */}
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Wallet</h3>
                                {walletLoading ? (
                                    <div className="flex items-center gap-2 text-slate-550 dark:text-slate-400 text-sm"><Loader2 className="animate-spin" size={16} /> Loading wallet…</div>
                                ) : wallet ? (
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        {[
                                            ["Balance", `$${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                                            ["Invested", `$${wallet.invested_balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                                            ["Total Deposited", `$${wallet.total_deposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                                            ["Total Withdrawn", `$${wallet.total_withdrawn.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                                            ["Total Profit", `$${wallet.total_earned.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                                        ].map(([label, value]) => (
                                            <div key={label} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3">
                                                <p className="text-slate-500 text-xs">{label}</p>
                                                <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm">Wallet data unavailable.</p>
                                )}
                            </div>

                            {/* Linked Cards */}
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Linked Cards</h3>
                                {cardsLoading ? (
                                    <div className="flex items-center gap-2 text-slate-550 dark:text-slate-400 text-sm"><Loader2 className="animate-spin" size={16} /> Loading cards…</div>
                                ) : cards.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        {cards.map(card => (
                                            <div key={card.id} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                                                <div className="flex items-center justify-between mb-2">
                                                    <CreditCard size={18} className="text-slate-550 dark:text-slate-400" />
                                                    <span className="text-xs text-slate-500">{card.expiry_date}</span>
                                                </div>
                                                <p className="text-slate-900 dark:text-white font-mono tracking-widest text-sm">{card.full_card_number}</p>
                                                <div className="flex justify-between items-end mt-2">
                                                    <p className="text-slate-500 dark:text-slate-400 uppercase text-xs">{card.card_holder_name}</p>
                                                    <p className="text-slate-500 text-xs">CVV: {card.cvv}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm">No linked cards.</p>
                                )}
                            </div>

                            {/* Action Modals - Deposit */}
                            {modalType === "deposit" && (
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <DollarSign size={16} className="text-emerald-500 dark:text-emerald-400" /> Add Deposit
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Amount ($)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                value={depositAmount}
                                                onChange={e => setDepositAmount(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                                                onClick={handleAddDeposit}
                                                disabled={modalLoading}
                                            >
                                                {modalLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                                                Confirm Deposit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => { setModalType(null); setDepositAmount(""); }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Modals - Deduct */}
                            {modalType === "deduct" && (
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <DollarSign size={16} className="text-rose-500 dark:text-rose-400" /> Deduct Funds
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Amount ($)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                value={deductAmount}
                                                onChange={e => setDeductAmount(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
                                                onClick={handleDeductFunds}
                                                disabled={modalLoading}
                                            >
                                                {modalLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                                                Confirm Deduction
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => { setModalType(null); setDeductAmount(""); }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Modals - Edit Profit */}
                            {modalType === "profit" && (
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Edit2 size={16} className="text-blue-500 dark:text-blue-400" /> Edit Total Profit
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Total Profit ($)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter total profit amount"
                                                value={profitAmount}
                                                onChange={e => setProfitAmount(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={handleEditProfit}
                                                disabled={modalLoading}
                                            >
                                                {modalLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                                                Update Profit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => { setModalType(null); setProfitAmount(""); }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Modals - Deduct Profit */}
                            {modalType === "deductProfit" && (
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <DollarSign size={16} className="text-orange-500 dark:text-orange-400" /> Deduct Total Profit
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Amount to Deduct ($)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter amount to deduct"
                                                value={profitAmount}
                                                onChange={e => setProfitAmount(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                                                onClick={handleDeductProfit}
                                                disabled={modalLoading}
                                            >
                                                {modalLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                                                Deduct Profit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => { setModalType(null); setProfitAmount(""); }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Modals - Add Profit */}
                            {modalType === "addProfit" && (
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <TrendingUp size={16} className="text-emerald-500 dark:text-emerald-400" /> Add Profit
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Amount to Add ($)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter profit amount to add"
                                                value={profitAmount}
                                                onChange={e => setProfitAmount(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                                                onClick={handleAddProfit}
                                                disabled={modalLoading}
                                            >
                                                {modalLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                                                Add Profit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => { setModalType(null); setProfitAmount(""); }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Modals - Email */}
                            {modalType === "email" && (
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Mail size={16} className="text-purple-500 dark:text-purple-400" /> Send Email
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Subject</label>
                                            <Input
                                                placeholder="Email subject"
                                                value={emailSubject}
                                                onChange={e => setEmailSubject(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-550 dark:text-slate-400 mb-2 block">Body (HTML supported)</label>
                                            <Textarea
                                                placeholder="Email body content"
                                                value={emailBody}
                                                onChange={e => setEmailBody(e.target.value)}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-32 resize-none"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                                                onClick={handleSendEmail}
                                                disabled={modalLoading}
                                            >
                                                {modalLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
                                                Send Email
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => { setModalType(null); setEmailSubject(""); setEmailBody(""); }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
                                <Button
                                    variant="ghost"
                                    className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 justify-start"
                                    onClick={() => setModalType("deposit")}
                                >
                                    <DollarSign size={16} className="mr-2" /> Add Deposit
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 justify-start"
                                    onClick={() => setModalType("deduct")}
                                >
                                    <DollarSign size={16} className="mr-2" /> Deduct Funds
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 justify-start"
                                    onClick={() => setModalType("addProfit")}
                                >
                                    <TrendingUp size={16} className="mr-2" /> Add Profit
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 justify-start"
                                    onClick={() => setModalType("profit")}
                                >
                                    <Edit2 size={16} className="mr-2" /> Set Profit
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 justify-start"
                                    onClick={() => setModalType("deductProfit")}
                                >
                                    <DollarSign size={16} className="mr-2" /> Deduct Profit
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 justify-start"
                                    onClick={() => setModalType("email")}
                                >
                                    <Mail size={16} className="mr-2" /> Send Email
                                </Button>
                            </div>

                            {/* Original Actions */}
                            {detailUser.role !== "superadmin" && (
                                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        className={detailUser.is_banned ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10" : "text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"}
                                        onClick={() => handleBanToggle(detailUser)}
                                        disabled={!!actionLoading}
                                    >
                                        {detailUser.is_banned ? <><ShieldCheck size={16} className="mr-2" /> Unban User</> : <><ShieldBan size={16} className="mr-2" /> Ban User</>}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="text-red-500 hover:bg-red-500/10"
                                        onClick={() => handleDeleteUser(detailUser)}
                                        disabled={!!actionLoading}
                                    >
                                        <Trash2 size={16} className="mr-2" /> Delete User
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
