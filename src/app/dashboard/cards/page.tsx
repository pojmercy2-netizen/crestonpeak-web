"use client";

import { useState, useEffect } from "react";
import { CreditCard, Plus, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { Card as CardUI, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/apiClient";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function CardsPage() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Form state
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");

    const fetchCards = async () => {
        try {
            const response = await apiClient.getUserCards();
            if (response.success) {
                setCards(response.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch cards:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleAddCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsAdding(true);

        // Basic validation
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            setError("Invalid card number length");
            setIsAdding(false);
            return;
        }

        try {
            const response = await apiClient.addCard({
                card_number: cardNumber,
                card_holder_name: cardName,
                expiry_date: expiry,
                cvv: cvv
            });

            if (response.success) {
                setIsDialogOpen(false);
                setCardNumber("");
                setCardName("");
                setExpiry("");
                setCvv("");
                await fetchCards();
            } else {
                setError(response.message || "Failed to add card");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manage Cards</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Link your debit or credit cards for faster transactions.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold">
                            <Plus className="mr-2" size={18} /> Add New Card
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-slate-900 dark:text-white">Link a New Card</DialogTitle>
                            <DialogDescription className="text-slate-500 dark:text-slate-400">
                                Enter your card details below. This information is securely encrypted.
                            </DialogDescription>
                        </DialogHeader>
                        
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleAddCard} className="space-y-4 mt-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cardholder Name</label>
                                <Input 
                                    required 
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="John Doe" 
                                    className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Card Number</label>
                                <Input 
                                    required 
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                                    placeholder="0000 0000 0000 0000" 
                                    maxLength={19}
                                    className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12" 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expiry Date</label>
                                    <Input 
                                        required 
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        placeholder="MM/YY" 
                                        maxLength={5}
                                        className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CVV</label>
                                    <Input 
                                        required 
                                        type="password"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                        placeholder="123" 
                                        maxLength={4}
                                        className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12" 
                                    />
                                </div>
                            </div>
                            <Button 
                                type="submit" 
                                disabled={isAdding} 
                                className="w-full bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold h-12 mt-4"
                            >
                                {isAdding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing</> : "Save Card"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CardUI className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl overflow-hidden relative min-h-[300px]">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-slate-400"><CreditCard size={100} /></div>
                    
                    {loading ? (
                        <div className="flex items-center justify-center h-full min-h-[300px]">
                            <Loader2 className="animate-spin text-sky-500" size={32} />
                        </div>
                    ) : cards.length > 0 ? (
                        <>
                            <CardHeader className="relative z-10 pb-2">
                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Your Saved Cards</CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10 space-y-4 pt-4">
                                {cards.map((card, index) => (
                                    <div key={card.id || index} className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between shadow-md dark:shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-10 bg-slate-200 dark:bg-[#020617] rounded flex items-center justify-center text-slate-600 dark:text-slate-400">
                                                <CreditCard size={20} />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 dark:text-white font-medium tracking-widest">{card.masked_card_number}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase">{card.card_holder_name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase">Expires</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{card.expiry_date}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </>
                    ) : (
                        <>
                            <CardHeader className="relative z-10">
                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">No Cards Linked</CardTitle>
                                <CardDescription className="text-slate-500 dark:text-slate-400">You haven't added any payment methods yet.</CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10 flex flex-col items-center justify-center py-6 space-y-4">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                                    <CreditCard size={32} />
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs">
                                    Add a card to easily deposit fiat and convert it to crypto in seconds.
                                </p>
                            </CardContent>
                        </>
                    )}
                </CardUI>

                <CardUI className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl h-fit">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Security Guarantees</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-medium">PCI-DSS Compliant</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All card information is encrypted and stored securely following strict PCI compliance standards.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center shrink-0">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-medium">End-to-End Encryption</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your sensitive data is encrypted before it ever leaves your device.</p>
                            </div>
                        </div>
                    </CardContent>
                </CardUI>
            </div>
        </div>
    );
}
