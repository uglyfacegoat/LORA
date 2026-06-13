import { Comparison } from "../Comparison";
import { ContactSection } from "../ContactSection";
import { CtaBreak } from "../CtaBreak";
import { HeroSection } from "../HeroSection";
import { LiveSystem } from "../LiveSystem";
import { Manifesto } from "../Manifesto";
import { PainSection } from "../PainSection";
import { PricingSection } from "../PricingSection";
import { ProcessSection } from "../ProcessSection";
import { WhyLora } from "../WhyLora";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="mx-auto max-w-6xl px-6 md:px-20">
        <div className="relative h-px">
          <div className="absolute inset-0" style={{ background: "var(--surface-border)" }} />
          <div
            className="absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2"
            style={{ background: "radial-gradient(ellipse, var(--surface-mid), transparent)" }}
          />
        </div>
      </div>

      <Manifesto />
      <PainSection />
      <WhyLora />
      <LiveSystem />
      <div id="process">
        <ProcessSection />
      </div>
      <div id="results">
        <Comparison />
      </div>
      <PricingSection />
      <CtaBreak />
      <ContactSection />
    </>
  );
}
