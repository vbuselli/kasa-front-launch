"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type UserVerificationContextType = {
  isVerified: boolean | null | string;
  refresh: () => void;
  loading: boolean;
};

const UserVerificationContext = createContext<
  UserVerificationContextType | undefined
>(undefined);

export function useUserVerification() {
  const ctx = useContext(UserVerificationContext);
  if (!ctx)
    throw new Error(
      "useUserVerification must be used within a UserVerificationProvider"
    );
  return ctx;
}

export function UserVerificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVerification = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/kyc`);
      if (res.ok) {
        const { is_verified } = await res.json();
        setIsVerified(!!is_verified);
      } else {
        setIsVerified(null);
      }
    } catch {
      setIsVerified(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVerification();
  }, []);

  console.log("UserVerificationProvider rendered", isVerified);

  return (
    <UserVerificationContext.Provider
      value={{ isVerified, refresh: fetchVerification, loading }}
    >
      {children}
    </UserVerificationContext.Provider>
  );
}
