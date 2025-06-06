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
    <div className="flex items-center gap-4 text-white lg:ml-2">
      <span
        className="max-w-[150px] truncate inline-block align-middle"
        title={user.email}
      >
        Hey, {user.email}!
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="bg-primary text-white text-sm px-2.5 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer text-nowrap"
        >
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2 lg:ml-2">
      <Link href="/sign-in" passHref>
        <button className="bg-primary text-white text-sm px-2.5 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer text-nowrap">
          Sign in
        </button>
      </Link>
      <Link href="/sign-up" passHref>
        <button className="bg-primary text-white text-sm px-2.5 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer text-nowrap">
          Sign up
        </button>
      </Link>
    </div>
  );
}
