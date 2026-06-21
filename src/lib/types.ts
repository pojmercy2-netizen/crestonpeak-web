export type UserRole = "user" | "admin" | "superadmin";
export type KYCStatus = "none" | "pending" | "approved" | "rejected";
export type TransactionType = "deposit" | "withdrawal" | "plan_buy" | "roi_profit" | "referral_bonus";
export type TransactionStatus = "pending" | "completed" | "failed" | "rejected" | "approved";
export type InvestmentStatus = "active" | "completed" | "cancelled" | "liquidating";
export type ROICycle = "daily" | "weekly" | "monthly" | "end_of_term";

export interface UserRead {
    id: string;
    email: string;
    username: string;
    full_name: string;
    phone: string | null;
    country: string | null;
    profile_picture: string | null;
    role: UserRole;
    is_active: boolean;
    is_verified: boolean;
    is_banned: boolean;
    kyc_status: KYCStatus;
    referral_code: string;
    referred_by_id: string | null;
    last_login: string | null;
    created_at: string;
    updated_at: string;
}

export interface Register {
    email: string;
    username: string;
    full_name: string;
    phone: string;
    password: string;
    referral_code?: string;
}

export interface UserProfile extends UserRead {
    wallet: WalletRead | null;
}

export interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface WalletRead {
    id: string;
    user_id: string;
    balance: number;
    invested_balance: number;
    total_deposited: number;
    total_withdrawn: number;
    total_earned: number;
    referral_bonus: number;
    created_at: string;
    updated_at: string;
}

export interface TransactionRead {
    id: string;
    user_id: string;
    amount: number;
    currency: string;
    type: TransactionType;
    status: TransactionStatus;
    usd_equivalent: number | null;
    crypto_address_sent_to: string | null;
    txn_hash: string | null;
    crypto_network: string | null;
    withdrawal_address: string | null;
    withdrawal_network: string | null;
    admin_note: string | null;
    reviewed_by_id: string | null;
    reviewed_at: string | null;
    investment_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface InvestmentPlanRead {
    id: string;
    name: string;
    slug: string;
    description: string;
    min_amount: number;
    max_amount: number | null;
    roi_percent: number;
    roi_cycle: ROICycle;
    duration_days: number;
    total_return_percent: number;
    capital_returned: boolean;
    is_active: boolean;
    color: string;
    icon: string | null;
    features: string[];
    created_at: string;
    updated_at: string;
}

export interface InvestmentRead {
    id: string;
    user_id: string;
    plan_id: string;
    amount: number;
    currency_used: string;
    status: InvestmentStatus;
    roi_percent: number;
    roi_cycle: string;
    duration_days: number;
    total_return_expected: number;
    total_return_paid: number;
    cycles_total: number;
    cycles_completed: number;
    next_roi_date: string;
    started_at: string;
    ends_at: string;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}
