import { createClient } from "@/utils/supabase/server";
import { DrawerProvider } from "context/DrawerContext";
import { InvestmentShareProvider } from "context/InvestmentContext";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { UserVerificationProvider } from "context/UserVerificationContext";
type Props = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <UserVerificationProvider>
      <DrawerProvider>
        <InvestmentShareProvider>{children}</InvestmentShareProvider>
      </DrawerProvider>
    </UserVerificationProvider>

  );
}
