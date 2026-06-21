"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Save, Loader2, Wallet, Banknote, Mail } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner"; // Assuming sonner is used for toasts, if not I'll use alert

export default function GlobalSettingsPage() {
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    
    // Crypto Addresses State
    const [btcAddress, setBtcAddress] = useState("");
    const [ethAddress, setEthAddress] = useState("");
    const [usdtTrc20Address, setUsdtTrc20Address] = useState("");
    const [usdtErc20Address, setUsdtErc20Address] = useState("");
    
    // Fiat Deposit Methods State
    const [zelleEmail, setZelleEmail] = useState("");
    const [applePayTag, setApplePayTag] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [bankDetails, setBankDetails] = useState("");
    
    const [savingCrypto, setSavingCrypto] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const [waRes, emailRes, cryptoRes] = await Promise.all([
                    apiClient.getWhatsappNumber().catch(() => ({ value: "" })),
                    apiClient.getContactEmail().catch(() => ({ value: "" })),
                    apiClient.getGlobalDepositAddresses().catch(() => null)
                ]);
                
                if (waRes?.value) setWhatsappNumber(waRes.value);
                if (emailRes?.value) setContactEmail(emailRes.value);
                
                if (cryptoRes) {
                    setBtcAddress(cryptoRes.btc_address || "");
                    setEthAddress(cryptoRes.eth_address || "");
                    setUsdtTrc20Address(cryptoRes.usdt_trc20_address || "");
                    setUsdtErc20Address(cryptoRes.usdt_erc20_address || "");
                    setZelleEmail(cryptoRes.zelle_email || "");
                    setApplePayTag(cryptoRes.apple_pay_tag || "");
                    setPaypalEmail(cryptoRes.paypal_email || "");
                    setBankDetails(cryptoRes.bank_transfer_details || "");
                }
            } catch (err) {
                console.error("Failed to fetch settings", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all([
                apiClient.updateWhatsappNumber(whatsappNumber),
                apiClient.updateContactEmail(contactEmail)
            ]);
            // Fallback if toast is not available
            if (typeof toast !== "undefined") {
                toast.success("Support settings updated successfully");
            } else {
                alert("Support settings updated successfully");
            }
        } catch (err: any) {
            console.error("Failed to update support settings", err);
            alert("Error updating support settings: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveCrypto = async () => {
        setSavingCrypto(true);
        try {
            await apiClient.updateGlobalDepositAddresses({
                btc_address: btcAddress,
                eth_address: ethAddress,
                usdt_trc20_address: usdtTrc20Address,
                usdt_erc20_address: usdtErc20Address,
                zelle_email: zelleEmail,
                apple_pay_tag: applePayTag,
                paypal_email: paypalEmail,
                bank_transfer_details: bankDetails
            });
            if (typeof toast !== "undefined") {
                toast.success("Deposit methods updated successfully");
            } else {
                alert("Deposit methods updated successfully");
            }
        } catch (err: any) {
            console.error("Failed to update deposit methods", err);
            alert("Error updating deposit methods: " + err.message);
        } finally {
            setSavingCrypto(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Global Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden h-fit">
                    <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                            <MessageCircle className="text-emerald-500" size={20} />
                            Support & Contact
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-550 dark:text-slate-400">WhatsApp Number</label>
                            <Input 
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                placeholder="+1234567890"
                                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                            />
                            <p className="text-xs text-slate-500">
                                Enter the full number including the country code (e.g., +1234567890).
                                This is the number users will be redirected to when they click the WhatsApp icon.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-550 dark:text-slate-400">Contact Email</label>
                            <Input 
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="investment@crestonpeak.com"
                                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                            />
                            <p className="text-xs text-slate-500">
                                Enter the contact/support email address. This will be updated dynamically across the platform.
                            </p>
                        </div>
                        
                        <Button 
                            onClick={handleSave} 
                            disabled={saving}
                            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold h-11"
                        >
                            {saving ? <Loader2 className="mr-2 animate-spin" size={18} /> : <Save className="mr-2" size={18} />}
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden h-fit">
                    <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                            <Wallet className="text-amber-500" size={20} />
                            Global Deposit Addresses
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">Bitcoin (BTC)</label>
                                <Input 
                                    value={btcAddress}
                                    onChange={(e) => setBtcAddress(e.target.value)}
                                    placeholder="BTC Address"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">Ethereum (ERC20)</label>
                                <Input 
                                    value={ethAddress}
                                    onChange={(e) => setEthAddress(e.target.value)}
                                    placeholder="ETH Address"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">USDT (TRC20)</label>
                                <Input 
                                    value={usdtTrc20Address}
                                    onChange={(e) => setUsdtTrc20Address(e.target.value)}
                                    placeholder="USDT TRC20 Address"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">USDT (BEP20)</label>
                                <Input 
                                    value={usdtErc20Address}
                                    onChange={(e) => setUsdtErc20Address(e.target.value)}
                                    placeholder="USDT BEP20 Address"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <p className="text-xs text-slate-500">
                                These addresses will be shown to all users on the deposit page. Changing these will affect all new deposits.
                            </p>
                        </div>
                        
                        <Button 
                            onClick={handleSaveCrypto} 
                            disabled={savingCrypto}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold h-11 mt-2"
                        >
                            {savingCrypto ? <Loader2 className="mr-2 animate-spin" size={18} /> : <Save className="mr-2" size={18} />}
                            Save Addresses
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden h-fit">
                    <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                            <Banknote className="text-indigo-500" size={20} />
                            Fiat Deposit Methods
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">Zelle Email / Phone</label>
                                <Input 
                                    value={zelleEmail}
                                    onChange={(e) => setZelleEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">Apple Pay ID / Phone</label>
                                <Input 
                                    value={applePayTag}
                                    onChange={(e) => setApplePayTag(e.target.value)}
                                    placeholder="+1234567890"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">PayPal Email</label>
                                <Input 
                                    value={paypalEmail}
                                    onChange={(e) => setPaypalEmail(e.target.value)}
                                    placeholder="admin@paypal.com"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-550 dark:text-slate-400">Bank Transfer Details</label>
                                <Input 
                                    value={bankDetails}
                                    onChange={(e) => setBankDetails(e.target.value)}
                                    placeholder="Account Name, Account Number, Routing Number"
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                />
                            </div>
                            <p className="text-xs text-slate-500">
                                These details will be shown to users when they select Fiat payment methods. 
                            </p>
                        </div>
                        
                        <Button 
                            onClick={handleSaveCrypto} 
                            disabled={savingCrypto}
                            className="w-full bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold h-11 mt-2"
                        >
                            {savingCrypto ? <Loader2 className="mr-2 animate-spin" size={18} /> : <Save className="mr-2" size={18} />}
                            Save Methods
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
