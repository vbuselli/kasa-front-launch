"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { signOutAction } from "@/lib/actions";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return user ? (
    <div className="flex items-center gap-4 text-white">
      Hey, {user.email}!
      <form action={signOutAction}>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link href="/sign-in" passHref>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer">
          Sign in
        </button>
      </Link>
      <Link href="/sign-up" passHref>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer">
          Sign up
        </button>
      </Link>
    </div>
  );
}
