'use client';
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyKasa from "@/components/WhyKasa";
import Comparison from "@/components/Comparison";
import FeaturedInvestments from "@/components/FeaturedInvestments";
import CommunityReferral from "@/components/CommunityReferral";
import Sponsors from "@/components/Sponsors";

import { useEffect } from 'react';
import { track } from '@/lib/gtag';

export default function HomePage() {
  useEffect(() => {
    // Enviar evento personalizado cuando carga la home
    track("llegada_web");
  }, []);
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
