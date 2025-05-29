import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyKasa from "@/components/WhyKasa";
import Comparison from "@/components/Comparison";
import FeaturedInvestments from "@/components/FeaturedInvestments";
import CommunityReferral from "@/components/CommunityReferral";
import Sponsors from "@/components/Sponsors";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sponsors />
      <HowItWorks />
      <WhyKasa />
      <Comparison />
      <FeaturedInvestments />
      <CommunityReferral />
    </>
  );
}
