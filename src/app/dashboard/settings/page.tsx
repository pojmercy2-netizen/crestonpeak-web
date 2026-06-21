"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, Save, CheckCircle2, Camera } from "lucide-react";

export default function SettingsPage() {
    const { user, updateUser } = useAuth();
    const [saved, setSaved] = useState(false);
    const [name, setName] = useState(user?.full_name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [profilePicture, setProfilePicture] = useState(user?.profile_picture || "");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
                updateUser({ profile_picture: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const updates: any = {};
        if (name !== user?.full_name) updates.full_name = name;
        if (phone !== user?.phone) updates.phone = phone;

        if (Object.keys(updates).length > 0) {
            updateUser(updates);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal information and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 space-y-4">
                    <Button variant="ghost" className="w-full justify-start bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 hover:text-sky-700 dark:hover:text-sky-300">
                        <User size={18} className="mr-3" /> Profile Info
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">
                        <Lock size={18} className="mr-3" /> Security
                    </Button>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">Update your profile details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6 pb-6 pt-2">
                                <div className="relative w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                                    {profilePicture ? (
                                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={32} className="text-slate-400 dark:text-slate-500" />
                                    )}
                                    <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera size={20} className="text-white mb-0.5" />
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-medium">Profile Picture</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload a new avatar (JPG/PNG). Click the image to change.</p>
                                </div>
                            </div>
                            <form className="space-y-4" onSubmit={handleSave}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                    <Input
                                        defaultValue={user?.email || ""}
                                        readOnly
                                        className="bg-slate-50 dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed h-12"
                                    />
                                    <p className="text-xs text-slate-500">Email cannot be changed directly. Contact support.</p>
                                </div>
                                <Button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold h-12 mt-4 px-6">
                                    {saved ? <><CheckCircle2 size={18} className="mr-2" /> Saved!</> : <><Save size={18} className="mr-2" /> Save Changes</>}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Change Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                                    <Input
                                        type="password"
                                        className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                                    <Input
                                        type="password"
                                        className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                    />
                                </div>
                                <Button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold h-12 mt-4 px-6">
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
