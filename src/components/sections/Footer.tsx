import Link from "next/link";
import Image from "next/image";
import apiClient from "@/lib/apiClient";

export async function Footer() {
    let whatsappNumber = "+1 (217) 335-0197";
    let contactEmail = "investment@crestonpeak.com";
    try {
        const [waRes, emailRes] = await Promise.all([
            apiClient.getWhatsappNumber().catch(() => null),
            apiClient.getContactEmail().catch(() => null)
        ]);
        if (waRes?.value) {
            whatsappNumber = waRes.value;
        }
        if (emailRes?.value) {
            contactEmail = emailRes.value;
        }
    } catch (e) {
        // Fallback to default on error
    }

    return (
        <footer className="bg-white dark:bg-[#0B1E19] text-slate-800 dark:text-white pt-16 pb-6 px-6 font-sans border-t border-slate-200 dark:border-transparent transition-colors duration-300">
            <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-200 dark:border-white/10 pb-12 mb-6">

                {/* Brand Info */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center">
                        <div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]">
                            <Image src="/logo.png" alt="Creston Peak Logo" fill className="object-contain" />
                        </div>
                    </Link>
                    <p className="text-sm mt-4 text-slate-500 dark:text-slate-400">
                        Creston Peak is a global forex and cryptocurrency trading platform
                        offering secure, fast, and transparent trading solutions for investors worldwide.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-[#A2B585] text-xl font-bold">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Home</Link></li>
                        <li><Link href="#about-section" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">About Us</Link></li>
                        <li><Link href="#plan-section" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Trading plan</Link></li>
                        <li><Link href="#faq-sections" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">FAQ</Link></li>
                        <li><Link href="#contact-section" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Contact</Link></li>
                    </ul>
                </div>

                {/* Trading */}
                <div className="space-y-4">
                    <h3 className="text-[#A2B585] text-xl font-bold">Trading</h3>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Forex Trading</Link></li>
                        <li><Link href="#" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Crypto Trading</Link></li>
                        <li><Link href="#" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Investment Plans</Link></li>
                        <li><Link href="#" className="text-slate-600 dark:text-[#cccccc] hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors text-xs font-semibold">Market Analysis</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-[#A2B585] text-xl font-bold">Contact Us</h3>
                    <div className="text-sm space-y-3 text-slate-500 dark:text-slate-400">
                        <p>Email: {contactEmail}</p>
                        <p>Phone: {whatsappNumber}</p>
                        <p>Location: Global</p>
                    </div>
                </div>

            </div>

            <div className="border-t border-slate-200 dark:border-[#A2B585]/10 mt-12 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>© 2016 Creston Peak. All Rights Reserved.</p>
            </div>
        </footer>
    );
}


