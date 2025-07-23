// hooks/useMyAssetTokens.ts
"use client";

import { useEffect, useState } from "react";
import { AssetPopulated } from "types/models";

export function useMyAssetTokens() {
  const [tokens, setTokens] = useState<AssetPopulated[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-my-asset-tokens`);
        if (res.ok) {
          const data = await res.json();
          setTokens(data ?? []);
        }
      } catch (error) {
        console.error("Error fetching tokens", error);
        setTokens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading };
}
