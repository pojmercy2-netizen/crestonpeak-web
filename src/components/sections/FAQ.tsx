import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is Forex and Crypto trading?",
        answer: "Forex and cryptocurrency trading involve buying and selling currencies or digital assets to make profit from market price movements."
    },
    {
        question: "Is my investment secure?",
        answer: "Yes, we use advanced security measures, encryption, and risk management strategies to protect your funds."
    },
    {
        question: "How do I start trading?",
        answer: "Create an account, verify your details, fund your wallet, and start trading using our easy-to-use platform."
    },
    {
        question: "What is the minimum investment?",
        answer: "The minimum investment depends on the plan you choose. Some plans start as low as $50."
    },
    {
        question: "Can I withdraw my profits anytime?",
        answer: "Yes, withdrawals are available 24/7, subject to verification and processing time."
    }
];

export function FAQ() {
    return (
        <section id="faq-sections" className="faq-section w-full bg-white dark:bg-[#020617] py-12 md:py-24 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Frequently Asked <span className="text-[#A2B585]">Questions</span>
                    </h2>
                    <p className="text-black dark:text-slate-400 text-lg">
                        Find answers to common questions about our trading platform.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem 
                            key={index} 
                            value={`item-${index}`} 
                            className="bg-white dark:bg-[#0B1E19]/40 border border-slate-200 dark:border-slate-800/85 rounded-3xl px-6 transition-all duration-300 data-[state=open]:bg-[#EBF1E6] dark:data-[state=open]:bg-[#0F2E23]/60 border-none"
                        >
                            <AccordionTrigger className="text-lg font-semibold text-[#3F5933] dark:text-white hover:no-underline hover:text-[#A2B585] dark:hover:text-[#A2B585] py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-[#3F5933] dark:text-slate-350 pb-6 leading-relaxed text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}




