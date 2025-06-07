"use client";

import Link from "next/link";

import { signOutAction } from "@/lib/actions";
import { User } from "@supabase/supabase-js";

export default function AuthButton({ user }: { user: User | null }) {
  return user ? (
    <div className="flex items-center gap-4 text-white lg:ml-2">
      <span
        className="max-w-[150px] truncate inline-block align-middle"
        title={user.email}
      >
        Hey, {user.user_metadata.name?.split(" ")[0] || user.email}!
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="bg-primary text-white text-sm px-2.5 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer text-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2 lg:ml-2">
      <Link href="/sign-in" passHref>
        <button
          className="bg-transparent border border-primary text-white text-sm px-2.5 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer text-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          Sign in
        </button>
      </Link>
      <Link href="/sign-up" passHref>
        <button
          className="bg-primary text-white text-sm px-2.5 py-2 rounded hover:bg-primary-dark transition-colors cursor-pointer text-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          Sign up
        </button>
      </Link>
    </div>
  );
}
