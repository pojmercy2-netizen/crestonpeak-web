import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { About } from "@/components/sections/About";
import { Statistics } from "@/components/sections/Statistics";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { TradingSessions } from "@/components/sections/TradingSessions";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestNews } from "@/components/sections/LatestNews";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { CallToAction } from "@/components/sections/CallToAction";
import { Certificate } from "@/components/sections/Certificate";
import { Footer } from "@/components/sections/Footer";
import { RecentActivityPopup } from "@/components/ui/RecentActivityPopup";

export default function Home() {
  return (
    <main className="min-h-screen">
      <RecentActivityPopup />
      <Header />
      <Hero />
      <WhyChooseUs />
      <About />
      <Statistics />
      <PricingPlans />
      <TradingSessions />
      <Testimonials />
      <LatestNews />
      <FAQ />
      <Contact />
      <CallToAction />
      <Certificate />
      <Footer />

      {/* Smartsupp Live Chat script - Added directly since next/script handles this differently */}
      {process.env.NEXT_PUBLIC_SMARTSUPP_KEY && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = '${process.env.NEXT_PUBLIC_SMARTSUPP_KEY}';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
      )}
    </main>
  );
}
