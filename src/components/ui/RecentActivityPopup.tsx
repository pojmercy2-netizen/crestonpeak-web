"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

const NAMES = [
    "James", "Sophia", "Mateo", "Emma", "Oliver",
    "Isabella", "Lucas", "Mia", "Alexander", "Charlotte",
    "Benjamin", "Amelia", "Elijah", "Harper", "Wei",
    "Elena", "Hiroshi", "Yuki", "Lars", "Astrid"
];

const COUNTRIES = [
    "USA", "UK", "Canada", "Germany", "Australia",
    "Singapore", "Japan", "Switzerland", "France", "Spain",
    "Italy", "Netherlands", "Sweden", "Norway", "South Korea"
];

const TYPES = ["deposited", "withdrew"];

export function RecentActivityPopup() {
    const [visible, setVisible] = useState(false);
    const [activity, setActivity] = useState({
        name: "",
        country: "",
        type: "deposited",
        amount: 0,
    });

    useEffect(() => {
        let active = true;
        let timeoutId: NodeJS.Timeout;
        let hideTimeoutId: NodeJS.Timeout;

        const triggerPopup = () => {
            if (!active) return;
            // Randomize data
            const name = NAMES[Math.floor(Math.random() * NAMES.length)];
            const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
            const type = TYPES[Math.floor(Math.random() * TYPES.length)];
            // Amount between 100 and 10000
            const amount = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

            setActivity({ name, country, type, amount });
            setVisible(true);

            // Hide after 5 seconds
            hideTimeoutId = setTimeout(() => {
                if (!active) return;
                setVisible(false);
                // Schedule next popup after a random interval (between 8 and 20 seconds)
                const nextInterval = Math.floor(Math.random() * (20000 - 8000 + 1)) + 8000;
                timeoutId = setTimeout(triggerPopup, nextInterval);
            }, 5000);
        };

        // Initial trigger after 3 seconds
        timeoutId = setTimeout(triggerPopup, 3000);

        return () => {
            active = false;
            clearTimeout(timeoutId);
            clearTimeout(hideTimeoutId);
        };
    }, []);

    const isDeposit = activity.type === "deposited";

    return (
        <div
            className={`fixed top-32 right-4 md:right-8 z-50 transition-all duration-700 ease-in-out transform ${visible ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-8 opacity-0 pointer-events-none"
                }`}
        >
            <div className="backdrop-blur-xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] rounded-2xl p-4 flex items-center gap-4 max-w-sm w-full" style={{ backgroundColor: '#A2B585' }}>
                <div className={`p-3 rounded-xl flex-shrink-0 ${isDeposit ? 'bg-white/20 text-white' : 'bg-white/20 text-white'}`}>
                    {isDeposit ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                </div>
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                        <span className="text-xs font-medium text-white tracking-wide">Live Platform Activity</span>
                    </div>
                    <p className="text-sm text-white/90 leading-tight">
                        <strong className="text-white font-medium">{activity.name}</strong> from <strong className="text-white font-medium">{activity.country}</strong> just {activity.type}{" "}
                        <strong className="text-white font-bold">
                            ${activity.amount.toLocaleString()}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
