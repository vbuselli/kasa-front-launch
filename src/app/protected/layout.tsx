import { createClient } from "@/utils/supabase/server";
import { InvestmentShareProvider } from "context/InvestmentContext";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

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
  return <InvestmentShareProvider>{children}</InvestmentShareProvider>;
}
