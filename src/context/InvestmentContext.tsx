"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type InvestmentShare = {
  investmentAmount: number;
  setInvestmentAmount: (val: number) => void;
  commission: number;
  propertyValue: number;
  setPropertyValue: (val: number) => void;
};

const InvestmentShareContext = createContext<InvestmentShare>({
  investmentAmount: 2000,
  setInvestmentAmount: () => {},
  commission: 0,
  propertyValue: 0,
  setPropertyValue: () => {},
});

function calculateCommission(
  investment: number,
  propertyValue: number
): number {
  if (!propertyValue || propertyValue === 0) return 0;
  const share = (investment / propertyValue) * 100;
  if (share <= 2) return investment * 0.04;
  if (share <= 4) return investment * 0.03;
  if (share <= 6) return investment * 0.02;
  if (share <= 20) return investment * 0.015;
  return 0;
}

export function InvestmentShareProvider({ children }: { children: ReactNode }) {
  const [investmentAmount, setInvestmentAmount] = useState<number>(2000);
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [commission, setCommission] = useState<number>(0);

  useEffect(() => {
    setCommission(calculateCommission(investmentAmount, propertyValue));
  }, [investmentAmount, propertyValue]);

  return (
    <InvestmentShareContext.Provider
      value={{
        investmentAmount,
        setInvestmentAmount,
        commission,
        propertyValue,
        setPropertyValue,
      }}
    >
      {children}
    </InvestmentShareContext.Provider>
  );
}

export function useInvestmentShare() {
  return useContext(InvestmentShareContext);
}
