"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AssetPopulated } from "types/models";

type CartContextType = {
  count: number;
  firstPendingToken: AssetPopulated | null;
  refresh: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [firstPendingToken, setFirstPendingToken] = useState<any>(null);

  const fetchCart = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/get-my-asset-tokens`
      );
      if (res.ok) {
        const data = await res.json();
        const pendingTokens = Array.isArray(data)
          ? data.filter((token: any) => token.state === "pending")
          : [];
        setCount(pendingTokens.length);
        setFirstPendingToken(
          pendingTokens.length > 0 ? pendingTokens[0] : null
        );
      }
    } catch {
      setCount(0);
      setFirstPendingToken(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ count, refresh: fetchCart, firstPendingToken }}
    >
      {children}
    </CartContext.Provider>
  );
}
