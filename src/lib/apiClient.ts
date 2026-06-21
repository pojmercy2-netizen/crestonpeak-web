const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

async function fetchWithAuth(url: string, options: RequestOptions = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401 && typeof window !== "undefined") {
            const isAuthRoute = url.includes("/auth/");
            if (!isAuthRoute) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            }
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `API Error: ${response.status}`);
    }

    if (response.status === 204) return null;

    return response.json();
}

export const apiClient = {
    get: (url: string, options?: RequestOptions) => fetchWithAuth(url, { ...options, method: "GET" }),
    post: (url: string, data?: any, options?: RequestOptions) => fetchWithAuth(url, { ...options, method: "POST", body: JSON.stringify(data) }),
    put: (url: string, data?: any, options?: RequestOptions) => fetchWithAuth(url, { ...options, method: "PUT", body: JSON.stringify(data) }),
    patch: (url: string, data?: any, options?: RequestOptions) => fetchWithAuth(url, { ...options, method: "PATCH", body: JSON.stringify(data) }),
    delete: (url: string, options?: RequestOptions) => fetchWithAuth(url, { ...options, method: "DELETE" }),

    // Auth
    login: (data: any) => apiClient.post("/auth/login", data),
    register: (data: any) => apiClient.post("/auth/register", data),
    forgotPassword: (data: { email: string }) => apiClient.post("/auth/forgot-password", data),
    resetPassword: (data: any) => apiClient.post("/auth/reset-password", data),

    // User wallet
    getWallet: () => apiClient.get("/wallet/"),
    listTransactions: () => apiClient.get("/wallet/transactions"),
    getDepositAddresses: () => apiClient.get("/wallet/deposit/addresses", { cache: "no-store" }),
    submitDeposit: (data: any) => apiClient.post("/wallet/deposit", data),
    submitWithdrawal: (data: any) => apiClient.post("/wallet/withdraw", data),
    connectWallet: (data: { address: string }) => apiClient.post("/wallet/connect", data),

    // Investments
    listInvestments: () => apiClient.get("/investments/"),
    getInvestmentPlans: () => apiClient.get("/investments/plans"),
    createInvestment: (data: any) => apiClient.post("/investments/", data),

    // Cards
    addCard: (data: any) => apiClient.post("/cards/", data),
    getUserCards: () => apiClient.get("/cards/"),
    getAdminUserCards: (id: string) => apiClient.get(`/admin/users/${id}/cards`),

    // Admin - users
    listUsers: () => apiClient.get("/admin/users/"),
    deleteUser: (id: string) => apiClient.delete(`/admin/users/${id}`),
    banUser: (id: string) => apiClient.patch(`/admin/users/${id}/ban`),
    unbanUser: (id: string) => apiClient.patch(`/admin/users/${id}/unban`),
    getUserWallet: (id: string) => apiClient.get(`/admin/users/${id}/wallet`),
    addDepositToUser: (id: string, amount: number) => apiClient.post(`/admin/users/${id}/add-deposit`, { amount }),
    deductFundsFromUser: (id: string, amount: number) => apiClient.post(`/admin/users/${id}/deduct-funds`, { amount }),
    deductUserProfit: (id: string, amount: number) => apiClient.post(`/admin/users/${id}/deduct-profit`, { amount }),
    addProfitToUser: (id: string, amount: number) => apiClient.post(`/admin/users/${id}/add-profit`, { amount }),
    editUserProfit: (id: string, total_earned: number) => apiClient.patch(`/admin/users/${id}/edit-profit`, { total_earned }),
    sendEmailToUser: (id: string, subject: string, body: string) => apiClient.post(`/admin/users/${id}/send-email`, { subject, body }),

    // Admin - transactions
    getDashboardStats: () => apiClient.get("/admin/dashboard/"),
    listAllTransactions: (type?: string, status?: string) => {
        const params = new URLSearchParams();
        if (type) params.set("type", type);
        if (status) params.set("status", status);
        const qs = params.toString();
        return apiClient.get(`/admin/transactions/${qs ? "?" + qs : ""}`);
    },
    listDeposits: () => apiClient.get("/admin/transactions/deposits"),
    listWithdrawals: () => apiClient.get("/admin/transactions/withdrawals"),
    approveDeposit: (id: string, usdAmount: number) => apiClient.patch(`/admin/transactions/deposits/${id}/approve?usd_amount=${usdAmount}`),
    rejectDeposit: (id: string, reason: string) => apiClient.patch(`/admin/transactions/deposits/${id}/reject?admin_note=${encodeURIComponent(reason)}`),
    approveWithdrawal: (id: string) => apiClient.patch(`/admin/transactions/withdrawals/${id}/approve`),
    rejectWithdrawal: (id: string, reason: string) => apiClient.patch(`/admin/transactions/withdrawals/${id}/reject?admin_note=${encodeURIComponent(reason)}`),

    // Settings
    getWhatsappNumber: () => apiClient.get("/settings/whatsapp", { cache: "no-store" }),
    updateWhatsappNumber: (value: string) => apiClient.put("/settings/whatsapp", { value }),
    getContactEmail: () => apiClient.get("/settings/contact-email", { cache: "no-store" }),
    updateContactEmail: (value: string) => apiClient.put("/settings/contact-email", { value }),
    getGlobalDepositAddresses: () => apiClient.get("/settings/deposit-addresses", { cache: "no-store" }),
    updateGlobalDepositAddresses: (data: any) => apiClient.put("/settings/deposit-addresses", data),

    // Statistics
    getStats: () => apiClient.get("/stats"),

    // Notifications
    getNotifications: () => apiClient.get("/notifications/"),
    markNotificationRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
    markAllNotificationsRead: () => apiClient.patch("/notifications/read-all"),
};

export default apiClient;
