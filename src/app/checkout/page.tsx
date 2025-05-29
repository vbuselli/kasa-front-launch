"use client";
import InvestmentCheckoutCard from "@/components/InvestmentCheckoutCard";

export default function CheckoutPage() {
  const handleInvest = () => {};

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <InvestmentCheckoutCard
        areaTotal={3517.72}
        amountToPay={2060}
        operationalFees={60}
        effectiveInvestment={2000}
        expectedAnnualGain={135.64}
        onInvest={handleInvest}
      />
    </div>
  );
}
